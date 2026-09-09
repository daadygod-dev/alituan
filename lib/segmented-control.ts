import { cva } from "class-variance-authority";

export type SegmentedControlSize = "default" | "lg" | "sm";

export const segmentedControlItemSizeClassNames: Record<
  SegmentedControlSize,
  string
> = {
  default: "h-9 px-[calc(--spacing(2.5)-1px)] sm:h-8.5",
  lg: "h-10.5 px-[calc(--spacing(4)-2px)] sm:h-9.5",
  sm: "h-8.5 px-[calc(--spacing(2)-1px)] sm:h-7.5",
};

export const segmentedControlRootClassName =
  "relative z-0 flex w-fit items-center justify-center gap-2.5 rounded-full bg-white border dark:border-zinc-800 border-neutral-300 shadow-[0_0_25px_rgba(0,0,0,0.3)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] dark:bg-neutral-800 p-3";

export const segmentedControlItemLayoutClassName =
  "gap-1.5 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0";

export const segmentedControlItemVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full border border-transparent font-thin text-base text-muted-foreground/72 outline-2 outline-transparent transition-[outline-color] hover:bg-transparent hover:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-64 data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-sm",
    segmentedControlItemLayoutClassName,
  ],
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: segmentedControlItemSizeClassNames,
      state: {
        checked:
          "data-checked:bg-background data-checked:text-foreground data-checked:shadow-sm/5 dark:data-checked:bg-input",
        current:
          "aria-[current=page]:bg-background aria-[current=page]:text-foreground aria-[current=page]:shadow-sm/5 dark:aria-[current=page]:bg-input",
        pressed:
          "data-pressed:bg-background data-pressed:text-foreground data-pressed:shadow-sm/5 dark:data-pressed:bg-input",
      },
    },
  },
);
