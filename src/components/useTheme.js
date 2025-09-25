// "use client";
// import { useEffect, useState } from "react";

// export function useTheme() {
//   const getInitial = () => {
//     if (typeof window === "undefined") return "dark";
//     try {
//       const saved = localStorage.getItem("theme");
//       if (saved === "light" || saved === "dark") return saved;
//     } catch {}
//     const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
//     return prefersDark ? "dark" : "dark";
//   };

//   const [theme, setTheme] = useState(getInitial);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     try { localStorage.setItem("theme", theme); } catch {}
//   }, [theme]);

//   useEffect(() => setMounted(true), []);

//   useEffect(() => {
//     const onStorage = (e) => {
//       if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
//         setTheme(e.newValue);
//       }
//     };
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, []);

//   const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
//   return { theme, setTheme, toggle, mounted };
// }
