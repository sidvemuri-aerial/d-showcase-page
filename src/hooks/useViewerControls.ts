import { useEffect, useRef, useState } from "react";
import * as OV from "online-3d-viewer";

export const useViewerControls = (viewer: OV.EmbeddedViewer | null) => {
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const animationFrameRef = useRef<number>();

  const setCameraView = (direction: 'top' | 'front' | 'side' | 'iso') => {
    // Placeholder - will enhance once model structure is understood
    console.log('Setting camera view:', direction);
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(prev => !prev);
  };

  return { setCameraView, toggleAutoRotate, isAutoRotating };
};
