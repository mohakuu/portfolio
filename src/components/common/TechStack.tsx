type Props = {
  technologies: string[];
  maxVisible?: number;
  className?: string;
};

export default function TechStack({
  technologies,
  maxVisible = 3,
  className = "",
}: Props) {
  const visibleTechs = technologies.slice(0, maxVisible);
  const remainingCount = technologies.length - maxVisible;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleTechs.map((tech) => (
        <span
          key={tech}
          className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
        >
          {tech}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
