import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "/no-image.png",
}: Props) {
  const imageSrc = src || fallbackSrc;
  const isFallback = !src;

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
      <Image
        className={`h-full w-full object-cover ${isFallback ? "opacity-50" : ""} ${className}`}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}
