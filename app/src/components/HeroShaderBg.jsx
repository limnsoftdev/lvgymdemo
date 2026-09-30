import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import useIsDesktop from '../hooks/useIsDesktop';

// pixelDensity is the absolute canvas DPR, not a multiplier. Render at the
// screen's native ratio (capped) so the glow stays sharp instead of upscaled.
const NATIVE_DPR = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
const DESKTOP_DPR = Math.min(NATIVE_DPR, 1.5);
const MOBILE_DPR = Math.min(NATIVE_DPR, 2);

// Tidal's ocean palette with soft golden light on the swell (the sand accent). A tall phone screen frames the pale centre of the
// glow, which washes out, so phones get a deeper, more saturated teal.
const PALETTE = {
  desktop: { color1: '#d6bd8a', color2: '#0c5670', brightness: 0.62 },
  mobile: { color1: '#dcbd86', color2: '#0a4a64', brightness: 0.66 },
};

export default function HeroShaderBg() {
  const isDesktop = useIsDesktop();
  const palette = isDesktop ? PALETTE.desktop : PALETTE.mobile;

  return (
    <ShaderGradientCanvas
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      pixelDensity={isDesktop ? DESKTOP_DPR : MOBILE_DPR}
      pointerEvents="none"
      powerPreference="low-power"
    >
      <ShaderGradient
        control="props"
        type="waterPlane"
        animate="on"
        uSpeed={0.12}
        uStrength={2.8}
        uDensity={1.6}
        uFrequency={5.5}
        uAmplitude={1.45}
        color1={palette.color1}
        color2={palette.color2}
        color3="#041f2e"
        reflection={0.1}
        cAzimuthAngle={180}
        cPolarAngle={100}
        cDistance={3.2}
        cameraZoom={1}
        positionX={0}
        positionY={-0.6}
        positionZ={0}
        rotationX={0}
        rotationY={0}
        rotationZ={0}
        lightType="3d"
        brightness={palette.brightness}
        envPreset="city"
        grain="off"
        grainBlending={0.12}
        toggleAxis={false}
        zoomOut={false}
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
}
