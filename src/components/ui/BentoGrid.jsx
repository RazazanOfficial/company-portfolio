import { cn } from "@/lib/utils";

export function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-12",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({ className, title, description, header, icon }) {
  return (
    <div
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:border-blue-200/80 hover:shadow-xl dark:border-neutral-800/70 dark:bg-neutral-900/80",
        className
      )}
    >
      {header}

      <div className="transition duration-200 group-hover/bento:translate-x-1">
        {icon}
        <div className="mt-2 mb-2 font-sans text-sm font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </div>
        <div className="font-sans text-xs font-normal leading-relaxed text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
}
