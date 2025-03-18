// src/components/tokens/TokenBuilder.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, Plus, Save, Trash2, FileText, Code, Loader2, RefreshCw, ArrowLeft } from "lucide-react";
import { useStore } from "@/store/store";

import { TOKEN_STANDARDS } from "@/types/tokenStandards";
import { TOKEN_TEMPLATES } from "@/types/productTemplates";
import { PRODUCT_CATEGORIES } from "@/types/productCategories";

interface Token {
  id: string;
  project_id: string;
  name: string;
  symbol: string;
  decimals: number;
  standard: string;
  blocks: { compliance: string[]; features: string[]; governance: string[] };
  metadata: any;
  status: string;
  contract_preview?: string;
  created_at: string;
  updated_at: string;
}

const TokenBuilder: React.FC<{ projectId?: string }> = ({ projectId: propProjectId }) => {
  const { projectId: paramProjectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tokens, projects, ui } = useStore();
  const { tokenForm, setTokenForm, resetTokenForm } = tokens;
  const { selectedProjectId, projectName, setSelectedProject } = projects;
  const { activeTab, setActiveTab, isLoading, setLoading } = ui;

  const currentProjectId = propProjectId || paramProjectId || selectedProjectId;
  const [tokensList, setTokensList] = useState<Token[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  useEffect(() => {
    if (currentProjectId) {
      setLoading(true);
      fetchTokens();
      fetchProjectDetails();
      setLoading(false);
    }
  }, [currentProjectId]);

  const fetchProjectDetails = async () => {
    if (currentProjectId) {
      const { data, error } = await supabase
        .from("projects")
        .select("name")
        .eq("id", currentProjectId)
        .single();
      if (error) console.error("Error fetching project:", error);
      else setSelectedProject(currentProjectId, data.name || "Unnamed Project");
    }
  };

  const fetchTokens = async () => {
    if (currentProjectId) {
      const { data, error } = await supabase
        .from("tokens")
        .select("*")
        .eq("project_id", currentProjectId)
        .order("created_at", { ascending: false });
      if (error) toast({ title: "Error", description: "Failed to load tokens.", variant: "destructive" });
      else setTokensList(data || []);
    }
  };

  const handleCreateToken = () => {
    setSelectedToken(null);
    setActiveTab("templates");
    resetTokenForm();
  };

  const handleSelectToken = (token: Token) => {
    setSelectedToken(token);
    setActiveTab("builder");
    setTokenForm(token);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedProduct("");
  };

  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product);
    const matchingTemplates = TOKEN_TEMPLATES.filter((t) => t.category === product);
    if (matchingTemplates.length === 1) handleSelectTemplate(matchingTemplates[0]);
  };

  const handleSelectTemplate = (template: any) => {
    const defaultTranches = (template.standard === "ERC-3525" || ["Structured Products", "Private Equity"].includes(template.category))
      ? [
          { id: 1, name: "Senior", value: 700000, interestRate: 3 },
          { id: 2, name: "Mezzanine", value: 200000, interestRate: 5 },
          { id: 3, name: "Junior", value: 100000, interestRate: 8 },
        ]
      : [];
    setTokenForm({
      name: template.name,
      symbol: template.symbol || template.name.slice(0, 3).toUpperCase(),
      decimals: template.standard === "ERC-3525" ? 0 : 18,
      standard: template.standard,
      totalSupply: 1000000,
      blocks: template.defaultBlocks,
      metadata: {
        ...tokenForm.metadata,
        category: template.category,
        product: template.name,
        issuanceDate: new Date().toISOString().split("T")[0],
        maturityDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split("T")[0],
        tranches: defaultTranches,
        lockupPeriod: template.category === "Private Equity" ? 365 : undefined,
        erc20ConversionRatio: 15,
        dividendFrequency: "quarterly",
        reinvestmentAllowed: false,
        votingThreshold: 5,
        valuationSchedule: {
          frequency: "quarterly",
          method: "dcf",
          nextValuationDate: new Date().toISOString().split("T")[0],
        },
      },
    });
    setActiveTab("builder");
  };

  const saveToken = async () => {
    setIsSaving(true);
    if (!tokenForm.name || !tokenForm.symbol || !tokenForm.standard) {
      toast({ title: "Validation Error", description: "Name, symbol, and standard are required.", variant: "destructive" });
      setIsSaving(false);
      return;
    }
    const tokenData = {
      project_id: currentProjectId,
      name: tokenForm.name,
      symbol: tokenForm.symbol,
      decimals: tokenForm.decimals,
      standard: tokenForm.standard,
      blocks: tokenForm.blocks,
      metadata: tokenForm.metadata,
      status: "DRAFT",
      contract_preview: `// Simplified preview for ${tokenForm.name}\ncontract ${tokenForm.name} is ${tokenForm.standard} {}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      if (selectedToken) {
        const { error } = await supabase
          .from("tokens")
          .update(tokenData)
          .eq("id", selectedToken.id);
        if (error) throw error;
        toast({ title: "Success", description: "Token updated." });
      } else {
        const { data, error } = await supabase.from("tokens").insert(tokenData).select().single();
        if (error) throw error;
        setSelectedToken(data);
        toast({ title: "Success", description: "Token created." });
      }
      fetchTokens();
    } catch (error) {
      toast({ title: "Error", description: "Failed to save token.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Token Builder</h1>
          <p className="text-gray-500">Design and structure tokenized assets for {projectName || "your project"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchTokens} className="text-gray-600 hover:text-gray-900">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button onClick={handleCreateToken} className="bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> New Token
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 rounded-lg p-1">
          <TabsTrigger value="tokens" className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 rounded-md p-2">
            <Coins className="h-4 w-4" /> My Tokens
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 rounded-md p-2" disabled={!isCreating && !selectedToken}>
            <FileText className="h-4 w-4" /> Templates
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 rounded-md p-2" disabled={!isCreating && !selectedToken}>
            <Code className="h-4 w-4" /> Token Builder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : tokensList.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-500">No tokens yet. Create one to get started.</p>
              <Button onClick={handleCreateToken} className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" /> Create Token
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tokensList.map((token) => (
                <Card key={token.id} className="hover:border-blue-500 cursor-pointer" onClick={() => handleSelectToken(token)}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg text-gray-900">{token.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">{token.symbol}</CardDescription>
                    <Badge variant={token.status === "DRAFT" ? "outline" : "default"} className="mt-2">
                      {token.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600">Standard: {token.standard}</p>
                    <p className="text-sm text-gray-500">Created: {new Date(token.created_at).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-600">Select Product Category</CardTitle>
              <CardDescription>Choose a financial product category to see relevant templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRODUCT_CATEGORIES.map((category) => (
                  <Card
                    key={category.name}
                    className={`cursor-pointer hover:border-blue-500 ${selectedCategory === category.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => handleSelectCategory(category.name)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-gray-900">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {category.products.map((product) => (
                          <li key={product}>{product}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedCategory && (
            <Card className="mt-6 shadow-sm">
              <CardHeader>
                <CardTitle>Select Product Type</CardTitle>
                <CardDescription>Choose a product within {selectedCategory}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {PRODUCT_CATEGORIES.find((c) => c.name === selectedCategory)?.products.map((product) => (
                    <Button
                      key={product}
                      variant={selectedProduct === product ? "default" : "outline"}
                      className="w-full justify-start text-gray-700 hover:text-gray-900"
                      onClick={() => handleSelectProduct(product)}
                    >
                      {product}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedProduct && (
            <Card className="mt-6 shadow-sm">
              <CardHeader>
                <CardTitle>Select Template</CardTitle>
                <CardDescription>Choose a template for {selectedProduct}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TOKEN_TEMPLATES.filter((t) => t.category === selectedProduct).map((template) => (
                    <Card
                      key={template.name}
                      className="cursor-pointer hover:border-blue-500"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-gray-900">{template.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-600">Standard: {template.standard}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {[...template.defaultBlocks.compliance, ...template.defaultBlocks.features, ...template.defaultBlocks.governance].slice(0, 4).map((block) => (
                            <Badge key={block} variant="secondary" className="text-xs">
                              {block}
                            </Badge>
                          ))}
                          {[...template.defaultBlocks.compliance, ...template.defaultBlocks.features, ...template.defaultBlocks.governance].length > 4 && (
                            <Badge variant="secondary" className="text-xs">+{[...template.defaultBlocks.compliance, ...template.defaultBlocks.features, ...template.defaultBlocks.governance].length - 4} more</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="builder">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">{selectedToken ? "Edit Token" : "Create Token"}</CardTitle>
              <CardDescription className="text-gray-500">{selectedToken ? `Editing ${selectedToken.name} (${selectedToken.symbol})` : "Configure your token properties"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="standard">Token Standard</Label>
                  <Select value={tokenForm.standard} onValueChange={(value) => setTokenForm({ standard: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a standard" />
                    </SelectTrigger>
                    <SelectContent>
                      {TOKEN_STANDARDS.map((standard) => (
                        <SelectItem key={standard.value} value={standard.value}>
                          {standard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dynamic Configuration Panels */}
              {tokenForm.standard === "ERC-20" && <div>ERC-20 Config Coming Soon</div>}
              {tokenForm.standard === "ERC-721" && <div>ERC-721 Config Coming Soon</div>}
              {tokenForm.standard === "ERC-1155" && <div>ERC-1155 Config Coming Soon</div>}
              {tokenForm.standard === "ERC-1400" && <div>ERC-1400 Config Coming Soon</div>}
              {tokenForm.standard === "ERC-3525" && <div>ERC-3525 Config Coming Soon</div>}
              {tokenForm.standard === "ERC-4626" && <div>ERC-4626 Config Coming Soon</div>}
              {tokenForm.standard === "ERC-3643" && <div>ERC-3643 Config Coming Soon</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={tokenForm.name}
                    onChange={(e) => setTokenForm({ name: e.target.value })}
                    placeholder="e.g., MyToken"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    value={tokenForm.symbol}
                    onChange={(e) => setTokenForm({ symbol: e.target.value })}
                    placeholder="e.g., MTK"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="decimals">Decimals</Label>
                  <Input
                    id="decimals"
                    type="number"
                    value={tokenForm.decimals}
                    onChange={(e) => setTokenForm({ decimals: parseInt(e.target.value) || 0 })}
                    placeholder="e.g., 18"
                    min="0"
                    max="18"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalSupply">Total Supply</Label>
                  <Input
                    id="totalSupply"
                    type="number"
                    value={tokenForm.totalSupply}
                    onChange={(e) => setTokenForm({ totalSupply: parseInt(e.target.value) || 0 })}
                    placeholder="e.g., 1000000"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-2">
                <Button variant="outline" onClick={() => setActiveTab("tokens")}>
                  Cancel
                </Button>
                <Button onClick={saveToken} disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  {selectedToken ? "Update Token" : "Create Token"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenBuilder;