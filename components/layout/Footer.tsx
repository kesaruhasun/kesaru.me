import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-terminal-dark py-4 px-6 border-t border-terminal-gray/30 text-terminal-gray">
      <div className="container mx-auto">
        {/* Command prompt style footer */}
        <div className="text-sm flex flex-wrap justify-between items-center">
          <div>
            <span className="text-terminal-green">kesaru@terminal</span>
            <span>:~$ </span>
            <span className="text-terminal-white">echo </span>
            <span>"© {new Date().getFullYear()} Kesaru. All rights reserved."</span>
          </div>
          
          <div className="space-x-4">
            <Link href="/blog" className="hover:text-terminal-white transition-colors">blog</Link>
            <Link href="/about" className="hover:text-terminal-white transition-colors">about</Link>
            <Link href="/contact" className="hover:text-terminal-white transition-colors">contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}