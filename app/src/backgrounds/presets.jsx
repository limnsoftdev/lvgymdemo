import {
  MeshGradient, Dithering, Swirl, Spiral,
  DotOrbit, ColorPanels, StaticRadialGradient,
} from '@paper-design/shaders-react';
import { Aurora, RetroGrid, Meteors, Spotlight, Particles, Beams } from './CustomBackgrounds';

// Page background presets, keyed like PRESETS in presetList.js. Each render
// takes a speed; 0 (phones) renders a still frame.
export const BACKGROUNDS = {
  mesh: {
    render: (speed) => (
      <MeshGradient
        colors={['#041f2e', '#0b4a60', '#03141e', '#08354a']}
        distortion={0.8}
        swirl={0.15}
        grainOverlay={0.12}
        speed={speed}
      />
    ),
  },
  aurora: { render: (speed) => <Aurora animate={speed > 0} /> },
  particles: { render: (speed) => <Particles animate={speed > 0} /> },
  beams: { render: (speed) => <Beams animate={speed > 0} /> },
  grid: { render: (speed) => <RetroGrid animate={speed > 0} /> },
  meteors: { render: (speed) => <Meteors animate={speed > 0} /> },
  spotlight: { render: () => <Spotlight /> },
  dither: {
    render: (speed) => (
      <Dithering
        colorBack="#041f2e"
        colorFront="#0b4a60"
        shape="warp"
        type="4x4"
        size={2}
        scale={1.2}
        speed={speed * 0.5}
      />
    ),
  },


  swirl: {
    render: (speed) => (
      <Swirl
        colorBack="#041f2e"
        colors={['#062a3c', '#0a3d52', '#052232']}
        bandCount={3}
        twist={0.15}
        center={0.2}
        proportion={0.5}
        softness={1}
        noiseFrequency={0.3}
        noise={0.15}
        scale={1.6}
        offsetX={0.4}
        speed={speed}
      />
    ),
  },
  spiral: {
    render: (speed) => (
      <Spiral
        colorBack="#0a3a4f"
        colorFront="#041f2e"
        density={0.5}
        distortion={0.15}
        strokeWidth={0.12}
        strokeTaper={0.5}
        noise={0.15}
        noiseFrequency={0.3}
        softness={0.35}
        scale={1.5}
        offsetX={0.35}
        speed={speed * 0.5}
      />
    ),
  },
  orbit: {
    render: (speed) => (
      <DotOrbit
        colorBack="#041f2e"
        colors={['#0e6e8c', '#0a3d52', '#062638']}
        size={0.3}
        sizeRange={0.5}
        spreading={0.6}
        stepsPerColor={3}
        scale={1.4}
        speed={speed * 1.5}
      />
    ),
  },

  panels: {
    render: (speed) => (
      <ColorPanels
        colorBack="#041f2e"
        colors={['#0b4a60', '#0a3a4f', '#4a4431', '#062a3c']}
        length={1.1}
        blur={0.3}
        fadeIn={1}
        fadeOut={0.4}
        density={2.5}
        scale={1}
        offsetX={0.3}
        speed={speed * 1.5}
      />
    ),
  },
  radial: {
    render: () => (
      <StaticRadialGradient
        colorBack="#041f2e"
        colors={['#0b4a60', '#062a3c', '#041f2e']}
        radius={1}
        focalDistance={0.9}
        focalAngle={200}
        falloff={0.3}
        mixing={0.6}
        grainOverlay={0.12}
        offsetX={0.35}
        offsetY={-0.2}
      />
    ),
  },
};

