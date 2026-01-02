import { Writer } from "../types";

type Props = {
  writer?: Writer;
};

export default function Profile({ writer }: Props) {
  if (!writer) {
    return null;
  }
  return (
    <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex gap-4">
        {writer.image && (
          <picture>
            <source
              type="image/webp"
              srcSet={`${writer?.image?.url}?fm=webp&fit=crop&w=96&h=96 1x, ${writer?.image?.url}?fm=webp&fit=crop&w=96&h=96&dpr=2 2x`}
            />
            <img
              src={writer?.image?.url}
              alt=""
              className="h-24 w-24 rounded-full object-cover"
              width={writer?.image?.width}
              height={writer?.image?.height}
            />
          </picture>
        )}
        <div className="flex-1">
          <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            {writer?.name}
          </p>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {writer?.profile}
          </p>
        </div>
      </div>
    </div>
  );
}
