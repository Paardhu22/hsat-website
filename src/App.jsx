import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigationType } from "react-router";
import { Brand, ButtonLink, Icon } from "./components.jsx";
import { Home, About, Services, Contact } from "./pages.jsx";
import { usePageMotion } from "./usePageMotion.js";
import SiteFooter from "./SiteFooter.jsx";
import WavingKidsScene from "./WavingKidsScene.jsx";

const navigation = [
  ["/", "Home"],
  ["/about", "About Us"],
  ["/services", "Our Services"],
  ["/contact", "Contact Us"],
];
const titles = {
  "/": "A brighter way forward.",
  "/about": "The people behind the purpose.",
  "/services": "Room for your vision to grow.",
  "/contact": "Good things begin with a conversation.",
};

export default function App() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const main = useRef(null);
  const menuToggle = useRef(null);
  const previousLocation = useRef(location.key);
  const scrollPositions = useRef(new Map());
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const path = location.pathname.replace(/\/$/, "") || "/";
  usePageMotion(main, location.key);
  const theme =
    {
      "/": "home",
      "/about": "about",
      "/services": "services",
      "/contact": "contact",
    }[path] || "home";

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.title = `${titles[path] || "Page not found"} | H SAT Edu Solutions`;
    document.querySelector('meta[name="theme-color"]').content = "#f5f4ee";
    const changed = previousLocation.current !== location.key;
    setMenuOpen(false);
    if (location.hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" }),
      );
    } else if (changed) {
      window.scrollTo({
        top:
          navigationType === "POP"
            ? scrollPositions.current.get(location.key) || 0
            : 0,
        behavior: "instant",
      });
    }
    if (changed) {
      main.current?.focus({ preventScroll: true });
      setAnnouncement(
        `${navigation.find(([url]) => url === path)?.[1] || "Page not found"} page`,
      );
    }
    previousLocation.current = location.key;
    const remember = () =>
      scrollPositions.current.set(location.key, window.scrollY);
    window.addEventListener("scroll", remember, { passive: true });
    return () => window.removeEventListener("scroll", remember);
  }, [location.key, location.hash, navigationType, path, theme]);

  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header wrap">
        <Brand />
        <nav
          className={`navigation ${menuOpen ? "is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map(([to, title]) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-dot" />
              {title}
            </NavLink>
          ))}
        </nav>
        <Link className="header-cta" to="/contact">
          Let’s talk
          <Icon name="northeast" />
        </Link>
        <button
          className="menu-toggle"
          ref={menuToggle}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "plus"} />
        </button>
      </header>

      <main id="main" ref={main} tabIndex="-1" className={`page-${theme}`}>
        <div className="page-view" key={path}>
          {path === "/" ? (
            <Home />
          ) : path === "/about" ? (
            <About />
          ) : path === "/services" ? (
            <Services />
          ) : path === "/contact" ? (
            <Contact />
          ) : (
            <section className="wrap not-found">
              <h1>
                This page is still
                <br />
                an open possibility.
              </h1>
              <ButtonLink to="/">Back to Home</ButtonLink>
            </section>
          )}
        </div>
      </main>

      {path === "/contact" ? (
        <div className="contact-closing">
          <WavingKidsScene className="farewell-section" />
          <div className="closing-footer">
            <SiteFooter />
          </div>
        </div>
      ) : (
        <SiteFooter />
      )}
      <span
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </span>
    </>
  );
}
