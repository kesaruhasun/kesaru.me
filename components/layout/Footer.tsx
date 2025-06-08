import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-8 px-6 border-t">
      <div className="container mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kesaru</h3>
            <p className="text-gray-600">
              A personal blog and digital universe sharing insights, projects, and creative explorations.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">GitHub</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-4 border-t text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Kesaru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}