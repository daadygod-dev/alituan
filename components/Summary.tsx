import Link from "next/link";

export default function Summary() {
  return (
    <div className="flex flex-col gap-4 py-3">
      <div>
        <p className="text-base leading-relaxed text-neutral-700 dark:text-zinc-100 sm:text-lg">
          Hey, I'm Samuel Umuhoza. Software engineer, frontend engineer, and designer.
          I turn ideas into websites, tools, and systems that work. Based in Rwanda.
        </p>
      </div>
    </div>
  );
}