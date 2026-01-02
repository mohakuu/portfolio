import Link from "next/link";
import { Tag } from "../types";

type Props = {
  tag: Tag;
  hasLink?: boolean;
};

export default function TagListItem({ tag, hasLink = true }: Props) {
  const tagElement = (
    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      #{tag.name}
    </span>
  );

  if (hasLink) {
    return (
      <Link
        href={`/tags/${tag.id}`}
        className="transition-opacity hover:opacity-70"
      >
        {tagElement}
      </Link>
    );
  }
  return tagElement;
}
