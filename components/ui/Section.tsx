import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
};

export default function Section({ id, children }: SectionProps) {
  return (
    <section
      id={id}
      className="
        relative
        py-28

        /* subtle depth */
        shadow-[0_1px_0_rgba(0,0,0,0.04)]
        dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]

        /* invisible separator */
        after:absolute after:inset-x-0 after:bottom-0
        after:h-px
        after:bg-gradient-to-r
        after:from-transparent
        after:via-gray-200/60
        after:to-transparent
        dark:after:via-neutral-800/60
      "
    >
      <div className="max-w-6xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
