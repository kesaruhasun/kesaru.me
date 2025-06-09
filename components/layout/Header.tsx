import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-2 px-6 bg-terminal-dark border-b border-terminal-gray/30">
      <div className="container mx-auto flex justify-between items-center">
        {/* Terminal Window Controls */}
        <div className="flex space-x-2 items-center">
          <span className="h-3 w-3 rounded-full bg-terminal-red block"></span>
          <span className="h-3 w-3 rounded-full bg-terminal-yellow block"></span>
          <span className="h-3 w-3 rounded-full bg-terminal-brightGreen block"></span>
        </div>
        
        {/* Terminal Title */}
        <div className="font-bold text-center flex-grow">
          <span className="text-terminal-white">kesaru@terminal</span>
          <span className="text-terminal-gray">:~$</span>
        </div>
        
        {/* Navigation Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-terminal-white transition-colors">home</Link></li>
            <li><Link href="/blog" className="hover:text-terminal-white transition-colors">blog</Link></li>
            <li><Link href="/about" className="hover:text-terminal-white transition-colors">about</Link></li>
            <li><Link href="/contact" className="hover:text-terminal-white transition-colors">contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}