import useMediaQuery from './useMediaQuery';

// Gate for the heavy WebGL pieces (shader gradients, liquid glass, r3f scenes) —
// keeps phones from paying for continuous render loops they'll never notice.
export default function useIsDesktop() {
  return useMediaQuery('(min-width: 769px) and (pointer: fine)');
}
