import { Link } from "react-router";
import { Brand, Icon } from "./components.jsx";

export default function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <Brand compact />
        <p>
          Good foundations.
          <br />
          <span>Brighter futures.</span>
        </p>
        <Link to="/contact" className="footer-contact">
          Let’s build something meaningful.
          <Icon name="northeast" />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} H SAT Edu Solutions</span>
        <span>Hyderabad, India</span>
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)")
                ?.matches
                ? "instant"
                : "smooth",
            });
          }}
        >
          Back to top <Icon name="arrow" />
        </a>
      </div>
    </footer>
  );
}
