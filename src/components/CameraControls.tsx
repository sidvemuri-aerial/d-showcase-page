import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, RotateCw, Square, Box as BoxIcon } from "lucide-react";

interface CameraControlsProps {
  onViewChange: (view: 'top' | 'front' | 'side' | 'iso') => void;
  onToggleRotate: () => void;
  isRotating: boolean;
}

export const CameraControls = ({ onViewChange, onToggleRotate, isRotating }: CameraControlsProps) => {
  return (
    <Card className="p-4 bg-card border-border shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Eye className="w-4 h-4" />
          Camera Views
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => onViewChange('top')}>
            Top
          </Button>
          <Button variant="outline" size="sm" onClick={() => onViewChange('front')}>
            Front
          </Button>
          <Button variant="outline" size="sm" onClick={() => onViewChange('side')}>
            Side
          </Button>
          <Button variant="outline" size="sm" onClick={() => onViewChange('iso')}>
            <BoxIcon className="w-3 h-3 mr-1" />
            ISO
          </Button>
        </div>

        <Button
          variant={isRotating ? "default" : "outline"}
          size="sm"
          onClick={onToggleRotate}
          className="w-full"
        >
          <RotateCw className={`w-3 h-3 mr-2 ${isRotating ? 'animate-spin' : ''}`} />
          {isRotating ? 'Stop' : 'Auto Rotate'}
        </Button>
      </div>
    </Card>
  );
};
