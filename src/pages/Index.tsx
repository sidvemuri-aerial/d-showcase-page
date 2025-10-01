import { useState, useRef, useCallback } from "react";
import { Viewer3D } from "@/components/Viewer3D";
import { ViewerControls } from "@/components/ViewerControls";
import { CameraControls } from "@/components/CameraControls";
import { MeasurementPanel } from "@/components/MeasurementPanel";
import { useViewerControls } from "@/hooks/useViewerControls";
import { Box } from "lucide-react";
import * as OV from "online-3d-viewer";

const Index = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const viewerRef = useRef<OV.EmbeddedViewer | null>(null);
  const [measurements, setMeasurements] = useState<any>(null);
  
  const { setCameraView, toggleAutoRotate, isAutoRotating } = useViewerControls(viewerRef.current);

  const handleModelLoad = useCallback(() => {
    setModelLoaded(true);
    // Mock measurements for now
    setMeasurements({
      dimensions: { x: 15.5, y: 8.2, z: 12.3 },
      volume: 1567.89,
      surfaceArea: 845.32,
    });
  }, []);

  const handleLoadFromUrl = async (url: string) => {
    // This will be handled by the Viewer3D component
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      // Trigger URL loading through the viewer
      const event = new CustomEvent("loadFromUrl", { detail: { url } });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Box className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Aerial Insight Pro</h1>
              <p className="text-xs text-muted-foreground">3D Model Viewer for Aerial Inspections</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[350px_1fr] gap-6">
          {/* Controls Panel */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-4">
            <ViewerControls onLoadFromUrl={handleLoadFromUrl} />
            {modelLoaded && (
              <>
                <CameraControls 
                  onViewChange={setCameraView}
                  onToggleRotate={toggleAutoRotate}
                  isRotating={isAutoRotating}
                />
                <MeasurementPanel measurements={measurements} />
              </>
            )}
          </aside>

          {/* Viewer */}
          <section className="space-y-4">
            <div className="bg-card rounded-lg border border-border shadow-elevated overflow-hidden">
              <Viewer3D onModelLoad={handleModelLoad} />
            </div>

            {!modelLoaded && (
              <div className="text-center p-8 bg-card/50 rounded-lg border border-dashed border-border">
                <Box className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  No model loaded. Upload a file or load from URL to get started.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by <span className="text-primary font-semibold">Online3DViewer</span></p>
            <p className="mt-1 text-xs">
              Supporting OBJ, STL, GLTF, FBX, and many more formats
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
