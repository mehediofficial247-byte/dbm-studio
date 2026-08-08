interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-balance text-base text-text-secondary md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
