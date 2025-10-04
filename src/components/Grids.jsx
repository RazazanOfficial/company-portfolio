"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";

/** تکونِ نرم با GSAP روی hover */
function ShakySlot({ children, className }) {
  const ref = useRef(null);
  const tlRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onEnter = () => {
    if (prefersReducedMotion || !ref.current) return;
    if (tlRef.current) tlRef.current.kill();

    const el = ref.current;
    tlRef.current = gsap
      .timeline({ defaults: { ease: "power1.inOut" } })
      .to(el, { rotate: 1.2, x: 2, duration: 0.06 })
      .to(el, { rotate: -1.2, x: -2, duration: 0.06, repeat: 5, yoyo: true })
      .to(el, { rotate: 0, x: 0, duration: 0.18, ease: "power2.out" });
  };

  const onLeave = () => {
    if (!ref.current) return;
    if (tlRef.current) tlRef.current.kill();
    gsap.to(ref.current, { rotate: 0, x: 0, duration: 0.2, ease: "power2.out" });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn("flex items-center justify-center w-full h-full will-change-transform select-none", className)}
    >
      {children}
    </div>
  );
}

export default function Grids({ className }) {
  const baseItemClass =
    "glass bg-[color:color-mix(in_oklab,var(--surface)_72%,transparent)] " +
    "border-[color:var(--border)] hover:border-[color:color-mix(in_oklab,var(--accent-cool)_38%,var(--border))] " +
    "shadow-none hover:shadow-xl/0 h-full";

  const slot = "w-full h-full p-4 text-sm text-[var(--color-text-muted)]";

  return (
    <BentoGrid className={cn("md:auto-rows-[22rem] max-w-none", className)}>
      {/* div1 => 8/12 */}
      <BentoGridItem className={cn("md:col-span-8", baseItemClass)}>
        <ShakySlot className={slot}>div1</ShakySlot>
      </BentoGridItem>

      {/* div2 => 4/12 */}
      <BentoGridItem className={cn("md:col-span-4", baseItemClass)}>
       <div>sada</div>
      </BentoGridItem>

      {/* div3 => 12/12 */}
      <BentoGridItem className={cn("md:col-span-12", baseItemClass)}>
        <ShakySlot className={slot}>div3</ShakySlot>
      </BentoGridItem>

      {/* نمونه‌های بعدی—دلخواه */}
      <BentoGridItem className={cn("md:col-span-8", baseItemClass)}>
        <ShakySlot className={slot}>div4 (md:8/12)</ShakySlot>
      </BentoGridItem>

      <BentoGridItem className={cn("md:col-span-4", baseItemClass)}>
        <ShakySlot className={slot}>div5</ShakySlot>
      </BentoGridItem>

      <BentoGridItem className={cn("md:col-span-4", baseItemClass)}>
        <ShakySlot className={slot}>div6</ShakySlot>
      </BentoGridItem>

      <BentoGridItem className={cn("md:col-span-8", baseItemClass)}>
        <ShakySlot className={slot}>div7 (md:8/12)</ShakySlot>
      </BentoGridItem>
    </BentoGrid>
  );
}
