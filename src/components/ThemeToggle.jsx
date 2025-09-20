"use client";
import { useTheme } from "./useTheme";
import "@/styles/theme-toggle.css";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle, mounted } = useTheme();
  const checked = theme === "dark";

  // قبل از مونت: یه div خالی یا اسکلت نشون بده (تا mismatch نگیریم)
  if (!mounted) {
    return (
      <label
        className={`theme-toggle relative inline-block w-[60px] h-[34px] ${className}`}
        title="Loading theme..."
      >
        <div className="slider round"></div>
      </label>
    );
  }

  return (
    <label
      className={`theme-toggle relative inline-block w-[60px] h-[34px] ${className}`}
      title={checked ? "Switch to Day" : "Switch to Night"}
    >
      <input
        type="checkbox"
        aria-label="Toggle dark theme"
        className="sr-only"
        checked={checked}
        onChange={toggle}
      />
      <div className="slider round">
        <div className="sun-moon" aria-hidden="true">
          {/* Moon craters */}
          <svg className="moon-dot" viewBox="0 0 100 100" id="moon-dot-1">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="moon-dot" viewBox="0 0 100 100" id="moon-dot-2">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="moon-dot" viewBox="0 0 100 100" id="moon-dot-3">
            <circle cx="50" cy="50" r="50" />
          </svg>

          {/* Sun rays */}
          <svg className="light-ray" viewBox="0 0 100 100" id="light-ray-1">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="light-ray" viewBox="0 0 100 100" id="light-ray-2">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="light-ray" viewBox="0 0 100 100" id="light-ray-3">
            <circle cx="50" cy="50" r="50" />
          </svg>

          {/* Clouds */}
          <svg className="cloud-dark" viewBox="0 0 100 100" id="cloud-1">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="cloud-dark" viewBox="0 0 100 100" id="cloud-2">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="cloud-dark" viewBox="0 0 100 100" id="cloud-3">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="cloud-light" viewBox="0 0 100 100" id="cloud-4">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="cloud-light" viewBox="0 0 100 100" id="cloud-5">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="cloud-light" viewBox="0 0 100 100" id="cloud-6">
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        {/* Night stars */}
        <div className="stars" aria-hidden="true">
          <svg className="star" viewBox="0 0 20 20" id="star-1">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="star" viewBox="0 0 20 20" id="star-2">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="star" viewBox="0 0 20 20" id="star-3">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="star" viewBox="0 0 20 20" id="star-4">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
        </div>
      </div>
    </label>
  );
}
