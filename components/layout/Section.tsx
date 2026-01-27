import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  muted?: boolean;
  className?: string;
};

export default function Section({
  children,
  id,
  muted,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`
        relative
        py-28
        ${className}
      `}
    >
      <div className="max-w-6xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}