export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-8 text-center text-xs text-gray-500 bg-white/80">
      <div className="max-w-3xl mx-auto px-8 flex flex-col items-center gap-2">
        <div>© {new Date().getFullYear()} William Sun</div>
        <div className="flex gap-6 mt-1">
          <a
            href="https://www.linkedin.com/in/william1sun/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:text-gray-700 transition"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle"><path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-9h4v1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="9" width="4" height="9" rx="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/wsun0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:text-gray-700 transition"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
} 