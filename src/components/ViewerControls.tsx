import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload, Link, Info, FileBox } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ViewerControlsProps {
  onLoadFromUrl?: (url: string) => void;
}

export const ViewerControls = ({ onLoadFromUrl }: ViewerControlsProps) => {
  const [urlInput, setUrlInput] = useState("");

  const handleFileUploadClick = () => {
    document.getElementById("file-input")?.click();
  };

  const handleLoadFromUrl = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    onLoadFromUrl?.(urlInput);
    setUrlInput("");
  };

  const supportedFormats = [
    "OBJ", "STL", "GLTF/GLB", "FBX", "DAE", "3DS", 
    "PLY", "OFF", "3DM", "WRL", "IFC", "STEP/STP"
  ];

  return (
    <Card className="p-6 bg-card border-border shadow-elevated">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">3D Model Viewer</h2>
          <p className="text-sm text-muted-foreground">
            Upload or load 3D models from various formats
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload from Computer
            </Label>
            <Button
              onClick={handleFileUploadClick}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Link className="w-4 h-4" />
              Load from URL
            </Label>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com/model.obj"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="bg-input border-border"
                onKeyDown={(e) => e.key === "Enter" && handleLoadFromUrl()}
              />
              <Button
                onClick={handleLoadFromUrl}
                variant="secondary"
                className="shrink-0"
              >
                Load
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <FileBox className="w-4 h-4" />
            Supported Formats
          </div>
          <div className="flex flex-wrap gap-2">
            {supportedFormats.map((format) => (
              <span
                key={format}
                className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded border border-border"
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-viewer-panel rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Tips:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Use mouse to rotate, zoom, and pan</li>
                <li>Multiple files can be uploaded together</li>
                <li>Textures are automatically applied if included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
