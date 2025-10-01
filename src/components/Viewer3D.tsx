import { useEffect, useRef, useState } from "react";
import * as OV from "online-3d-viewer";
import { toast } from "sonner";

interface Viewer3DProps {
  onModelLoad?: () => void;
}

export const Viewer3D = ({ onModelLoad }: Viewer3DProps) => {
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<OV.EmbeddedViewer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!viewerContainerRef.current) return;

    // Initialize the viewer
    const parentDiv = viewerContainerRef.current;
    
    viewerRef.current = new OV.EmbeddedViewer(parentDiv, {
      backgroundColor: new OV.RGBAColor(242, 242, 242, 255),
      defaultColor: new OV.RGBColor(200, 200, 200),
      edgeSettings: new OV.EdgeSettings(false, new OV.RGBColor(0, 0, 0), 1),
    });

    return () => {
      if (viewerRef.current) {
        viewerRef.current = null;
      }
    };
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsLoading(true);
    try {
      if (viewerRef.current) {
        const fileList: File[] = Array.from(files);
        await viewerRef.current.LoadModelFromFileList(fileList);
        toast.success("Model loaded successfully!");
        onModelLoad?.();
      }
    } catch (error) {
      console.error("Error loading model:", error);
      toast.error("Failed to load 3D model. Please check the file format.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromUrl = async (url: string) => {
    setIsLoading(true);
    try {
      if (viewerRef.current) {
        await viewerRef.current.LoadModelFromUrlList([url]);
        toast.success("Model loaded from URL!");
        onModelLoad?.();
      }
    } catch (error) {
      console.error("Error loading model from URL:", error);
      toast.error("Failed to load model from URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={viewerContainerRef}
        className="w-full h-full bg-viewer-bg rounded-lg overflow-hidden"
        style={{ minHeight: "600px" }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading 3D model...</p>
          </div>
        </div>
      )}
      <input
        id="file-input"
        type="file"
        multiple
        accept=".obj,.stl,.gltf,.glb,.fbx,.dae,.3ds,.ply,.off,.3dm,.wrl,.ifc,.stp,.step,.iges,.igs,.brep"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};


