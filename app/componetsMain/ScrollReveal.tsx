"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-sr]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("sr-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
