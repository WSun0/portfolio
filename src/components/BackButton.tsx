import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href === "/writing" ? "/blog" : href}
      className="back-link"
    >
      <span aria-hidden="true">←</span>
      {label === "Back to Blog" ? "back to blog" : label}
    </Link>
  );
}
