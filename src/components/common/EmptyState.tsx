type Props = {
  message: string;
  className?: string;
};

export default function EmptyState({ message, className = "" }: Props) {
  return (
    <p
      className={`py-12 text-center text-gray-600 dark:text-gray-400 ${className}`}
    >
      {message}
    </p>
  );
}
