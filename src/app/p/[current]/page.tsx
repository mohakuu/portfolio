import { Metadata } from "next";
import ArticleList from "@/features/blog/components/ArticleList";
import { LIMIT } from "@/libs/constants";

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    alternates: {
      canonical: `/p/${params.current}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const current = parseInt(params.current as string, 10);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ArticleList
        queries={{
          offset: LIMIT * (current - 1),
        }}
        current={current}
      />
    </div>
  );
}
