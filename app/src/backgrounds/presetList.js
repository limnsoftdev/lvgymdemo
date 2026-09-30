// Names of the page background presets. Shared by the dev switcher in
// AmbientShaderBg and the preview gallery in /previews, so they stay in sync.
export const DEFAULT_BG = 'mesh';

export const PRESETS = [
  { key: 'mesh', label: 'Mesh', note: 'Soft blending deep-water folds' },
  { key: 'aurora', label: 'Aurora', note: 'Slow northern-light clouds' },
  { key: 'particles', label: 'Particles', note: 'Drifting specks that dodge the cursor' },
  { key: 'beams', label: 'Beams', note: 'Light streaks along diagonal lines' },
  { key: 'grid', label: 'Retro grid', note: 'Perspective grid floor' },
  { key: 'meteors', label: 'Meteors', note: 'Occasional falling streaks' },
  { key: 'spotlight', label: 'Spotlight', note: 'Glow that follows the cursor' },
  { key: 'dither', label: 'Dithering', note: 'Retro-print dotted swirls' },
  { key: 'swirl', label: 'Swirl', note: 'Large slow teal vortex' },
  { key: 'spiral', label: 'Spiral', note: 'Soft thin spiral' },
  { key: 'orbit', label: 'Dot orbit', note: 'Sparse orbiting dots' },
  { key: 'panels', label: 'Glass panels', note: 'Blurred slabs of light' },
  { key: 'radial', label: 'Radial glow', note: 'Single soft corner glow' },
];
