import { LiquidMetal } from '@paper-design/shaders-react';

const SCALE = 0.95;

// The Tidal logo PNG (white on transparent) with a liquid-metal sheen.
export default function LiquidMetalLogo({ src, width = 150, height = 55, className }) {
  // Solid copy underneath keeps every letter legible; the metal is screen-blended
  // on top so its dark stripes can only add shine, never hide letters.
  return (
    <span className={className} style={{ position: 'relative', display: 'block', width, height }}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `scale(${SCALE})`,
          opacity: 0.75,
        }}
      />
      <LiquidMetal
        width={width}
        height={height}
        image={src}
        scale={SCALE}
        colorBack="#00000000"
        colorTint="#efdcb6"
        repetition={1.6}
        softness={0.75}
        shiftRed={0.02}
        shiftBlue={-0.02}
        distortion={0.03}
        contour={0.35}
        angle={135}
        speed={0.4}
        style={{ position: 'relative', display: 'block', mixBlendMode: 'screen' }}
        role="img"
        aria-label="Tidal Gym"
      />
    </span>
  );
}
