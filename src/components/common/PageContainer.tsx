type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageContainer({ children, className = "" }: Props) {
  return (
    <div className={`bg-white dark:bg-gray-900 ${className}`}>{children}</div>
  );
}
