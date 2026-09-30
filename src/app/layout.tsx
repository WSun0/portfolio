import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import NotebookShell from "@/components/NotebookShell";

export const metadata: Metadata = {
  title: "William Sun",
  description: "William Sun's personal website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script nonce={nonce} dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}` }} /></head>
      <body>
        <NotebookShell>{children}</NotebookShell>
      </body>
    </html>
  );
}
