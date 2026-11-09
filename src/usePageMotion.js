import { useEffect } from "react";

export function usePageMotion(main, routeKey) {
  useEffect(() => {
    if (!main.current || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (preference?.matches) return;
    const elements = [
      ...main.current.querySelectorAll(
        ".home-intro, .home-services, .home-cta, .about-section, .service-detail, .contact-main, .location-section",
      ),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );
    for (const element of elements) {
      element.classList.add("reveal-ready");
      observer.observe(element);
    }
    const showAll = () => {
      if (!preference?.matches) return;
      for (const element of elements) element.classList.add("is-visible");
      observer.disconnect();
    };
    preference?.addEventListener?.("change", showAll);
    return () => {
      observer.disconnect();
      preference?.removeEventListener?.("change", showAll);
      for (const element of elements)
        element.classList.remove("reveal-ready", "is-visible");
    };
  }, [main, routeKey]);
}
