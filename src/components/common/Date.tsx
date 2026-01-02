import { formatDate } from "@/libs/utils";

type Props = {
  date: string;
};

export default function PublishedDate({ date }: Props) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {formatDate(date)}
    </span>
  );
}
