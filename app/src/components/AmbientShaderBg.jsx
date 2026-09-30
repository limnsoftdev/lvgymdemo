import { useState } from 'react';
import { BACKGROUNDS } from '../backgrounds/presets';
import { PRESETS, DEFAULT_BG } from '../backgrounds/presetList';
import useIsDesktop from '../hooks/useIsDesktop';

// Background behind everything below the hero. In dev, ?bg=<key> or the
// switcher bar picks a preset (see /previews); production uses DEFAULT_BG.
function initialChoice() {
  if (!import.meta.env.DEV) return DEFAULT_BG;
  const fromUrl = new URLSearchParams(window.location.search).get('bg');
  return BACKGROUNDS[fromUrl] ? fromUrl : DEFAULT_BG;
}

export default function AmbientShaderBg() {
  const isDesktop = useIsDesktop();
  const [choice, setChoice] = useState(initialChoice);
  const speed = isDesktop ? 0.2 : 0;

  function pick(key) {
    setChoice(key);
    const url = new URL(window.location.href);
    url.searchParams.set('bg', key);
    window.history.replaceState(null, '', url);
  }

  return (
    <>
      <div id="ambient-bg">
        <div key={choice} style={{ width: '100%', height: '100%' }} className="ambient-bg-shader">
          {BACKGROUNDS[choice].render(speed)}
        </div>
      </div>
      {import.meta.env.DEV && (
        <div className="bg-picker" role="group" aria-label="Background (dev only)">
          {PRESETS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={choice === key}
              onClick={() => pick(key)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
