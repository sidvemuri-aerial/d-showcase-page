import { useState, useRef } from "react";
import { Viewer3D } from "@/components/Viewer3D";
import { ViewerControls } from "@/components/ViewerControls";
import { Box } from "lucide-react";

const Index = () => {
  const [modelLoaded, setModelLoaded] = useState(false);

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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Box className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Online 3D Viewer</h1>
              <p className="text-xs text-muted-foreground">Visualize and explore 3D models</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[350px_1fr] gap-6">
          {/* Controls Panel */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <ViewerControls onLoadFromUrl={handleLoadFromUrl} />
          </aside>

          {/* Viewer */}
          <section className="space-y-4">
            <div className="bg-card rounded-lg border border-border shadow-elevated overflow-hidden">
              <Viewer3D onModelLoad={() => setModelLoaded(true)} />
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
      <footer className="mt-12 border-t border-border bg-card/30 backdrop-blur-sm">
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
