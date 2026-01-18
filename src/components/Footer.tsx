export default function Footer() {
  return (
    <footer className="w-full relative z-10 glass-footer">
      <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href="https://www.linkedin.com/in/william1sun/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn !text-xs !py-2 !px-4"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/wsun0"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn !text-xs !py-2 !px-4"
          >
            GitHub
          </a>
        </div>
        <div className="text-xs opacity-60">© {new Date().getFullYear()} William Sun</div>
      </div>
    </footer>
  );
} 