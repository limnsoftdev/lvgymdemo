import LiquidMetalLogo from './LiquidMetalLogo';
import useIsDesktop from '../hooks/useIsDesktop';

const YEAR = new Date().getFullYear();
const LOGO = `${import.meta.env.BASE_URL}assets/images/logo.png`;

export default function Footer() {
  const isDesktop = useIsDesktop();

  return (
    <footer>
      <a className="footer-logo" href="#" aria-label="Tidal Athletic home">
        {isDesktop
          ? <LiquidMetalLogo src={LOGO} width={150} height={55} />
          : <img src={LOGO} alt="Tidal Gym" width="120" height="44" />}
      </a>
      <ul className="footer-links">
        <li><a href="#">Instagram</a></li>
        <li><a href="#">Twitter</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#">Careers</a></li>
      </ul>
      <div className="footer-copy">© {YEAR} Tidal Athletic · Santa Cruz, CA</div>
    </footer>
  );
}
