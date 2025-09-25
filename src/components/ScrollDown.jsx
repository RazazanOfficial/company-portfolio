// components/ScrollDown.jsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDown({className}) {

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        type="button"
        aria-label="Scroll down"
        className="w-[30px] h-[50px] rounded-[30px] flex items-center justify-center bg-transparent outline-none ring-2 ring-[rgb(105,127,255)] shadow-[0_0_10px_rgb(105,127,255)] relative"
      >
        <div
          className="w-[5px] h-[10px] rounded-[10px] bg-[rgb(105,127,255)] shadow-[0_0_10px_rgb(105,127,255)] translate-y-[40%]"
        />
      </button>
      <span className="mt-2 text-[12px] uppercase tracking-[0.15em] text-white/90 select-none">
        scroll
      </span>
    </div>
  );
}
