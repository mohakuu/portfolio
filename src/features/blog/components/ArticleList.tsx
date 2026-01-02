import { Article } from "../types";
import ArticleListItem from "./ArticleListItem";

type Props = {
  articles?: Article[];
};

export default function ArticleList({ articles }: Props) {
  if (!articles) {
    return null;
  }
  if (articles.length === 0) {
    return (
      <p className="py-12 text-center text-gray-600 dark:text-gray-400">
        記事がありません。
      </p>
    );
  }
  return (
    <ul className="space-y-8">
      {articles.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </ul>
  );
}
