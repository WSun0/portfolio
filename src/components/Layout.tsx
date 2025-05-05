import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import PageTransition from "@/components/PageTransition";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}