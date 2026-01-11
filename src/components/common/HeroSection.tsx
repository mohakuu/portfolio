type Props = {
  title: string;
  description?: string | React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export default function HeroSection({
  title,
  description,
  className = "",
  children,
}: Props) {
  return (
    <section className={`border-b border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

