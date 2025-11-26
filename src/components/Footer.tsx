export default function Footer() {
  return (
    <footer className="w-full py-12 text-center text-sm text-gray-500 relative z-10">
      <div className="max-w-3xl mx-auto px-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <a
            href="https://www.linkedin.com/in/william1sun/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href="https://github.com/wsun0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition"
          >
            GitHub
          </a>
        </div>
        <div className="text-xs mt-1">© {new Date().getFullYear()} William Sun</div>
      </div>
    </footer>
  );
} 