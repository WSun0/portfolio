import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-4"
    >
      <span className="mr-1">←</span>
      {label}
    </Link>
  );
}
