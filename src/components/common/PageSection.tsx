type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageSection({ children, className = "" }: Props) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

