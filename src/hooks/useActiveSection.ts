"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "about",
  "works",
  "capabilities",
  "trajectory",
  "leadership",
  "honors",
  "contact",
];

export function useActiveSection(sectionIds = SECTION_IDS): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}
