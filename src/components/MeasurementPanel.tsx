import { Card } from "@/components/ui/card";
import { Ruler } from "lucide-react";

interface MeasurementData {
  dimensions: { x: number; y: number; z: number };
  volume: number;
  surfaceArea: number;
}

interface MeasurementPanelProps {
  measurements: MeasurementData | null;
}

export const MeasurementPanel = ({ measurements }: MeasurementPanelProps) => {
  if (!measurements) return null;

  return (
    <Card className="p-4 bg-card border-border shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Ruler className="w-4 h-4" />
          Measurements
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Width (X):</span>
            <span className="font-mono font-medium">{measurements.dimensions.x.toFixed(2)}m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height (Y):</span>
            <span className="font-mono font-medium">{measurements.dimensions.y.toFixed(2)}m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Depth (Z):</span>
            <span className="font-mono font-medium">{measurements.dimensions.z.toFixed(2)}m</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-mono font-medium">{measurements.volume.toFixed(2)}m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Surface Area:</span>
              <span className="font-mono font-medium">{measurements.surfaceArea.toFixed(2)}m²</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
