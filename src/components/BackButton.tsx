import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center glass-btn !text-sm mb-6"
    >
      <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
      {label}
    </Link>
  );
}
