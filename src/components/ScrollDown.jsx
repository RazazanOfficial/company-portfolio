"use client";
import React from "react";
import "@/styles/scrollDown.css";

export default function ScrollDown({
  colorClass = "text-[var(--color-accent-cool)]",

  label = "scroll",
  className = "",
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
        "relative inline-flex h-[50px] w-[30px] items-center justify-center rounded-[30px]",
        "bg-transparent outline outline-2 outline-current",
        "mouse-float",
        colorClass,
        className,
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute -inset-4 -z-10 rounded-[36px]",
          "bg-current/15 blur-lg",
        ].join(" ")}
      />

      <div
        className={[
          "h-[10px] w-[5px] rounded-[10px] bg-[currentColor]",
          "scroll-nub-anim",
          "[filter:drop-shadow(0_0_10px_currentColor)]",
        ].join(" ")}
      />

      <span
        aria-hidden
        className="w-[102px] pointer-events-none absolute top-[140%] select-none text-xs uppercase tracking-wider text-[currentColor]"
      >
        {label}
      </span>
    </button>
  );
}
