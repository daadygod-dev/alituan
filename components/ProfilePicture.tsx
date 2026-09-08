import Image from "next/image";

export default function ProfilePicture() {
  return (
   <div className="flex w-full flex-col items-start self-start gap-3.5">
      <Image
        src="/profile.jpg"
        alt="Samuel Umuhoza"
        priority
        className="h-20 w-20 rounded-full object-cover outline outline-4 outline-muted"
        width={80}
        height={80}
      />

      <div className="py-3 text-left">
        <h3 className="flex flex-row items-center gap-1">
          <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Samuel Umuhoza
          </span>
          <Image
            src="/seal-check.svg"
            width={16}
            height={16}
            alt=""
            className="my-auto"
          />
        </h3>
        <p className="text-md text-neutral-700 dark:text-neutral-400">
          Software Engineer
        </p>
      </div>
    </div>
  );
}