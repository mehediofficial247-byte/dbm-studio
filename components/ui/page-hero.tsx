interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-border pb-16 pt-40 md:pt-48">
      <div className="container-content flex flex-col gap-5">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-xl text-balance text-lg text-text-secondary">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
