/**
 * Header Component
 * 
 * This component renders the site's header/navigation bar that appears on all pages.
 * It includes:
 * - The site logo/name ("Kesaru") that links to the homepage
 * - The main navigation menu with links to primary site sections
 * 
 * The component uses Tailwind CSS for styling:
 * - py-4 px-6: Adds padding to the header (vertical: 1rem, horizontal: 1.5rem)
 * - border-b: Adds a bottom border for visual separation
 * - container mx-auto: Centers content with automatic margins
 * - flex justify-between items-center: Creates a flexbox layout with space between items
 */
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 px-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        {/* 
          Logo/Site Title section
          - font-bold: Makes the text bold
          - text-xl: Sets a larger font size
        */}
        <div className="font-bold text-xl">
          <Link href="/">
            Kesaru
          </Link>
        </div>
        
        {/* 
          Navigation Menu section
          - flex: Creates a flexbox layout for menu items
          - space-x-6: Adds horizontal spacing between menu items
          - hover:text-gray-500: Changes text color on hover for better UX
        */}
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-gray-500">Home</Link></li>
            <li><Link href="/blog" className="hover:text-gray-500">Blog</Link></li>
            <li><Link href="/about" className="hover:text-gray-500">About</Link></li>
            <li><Link href="/contact" className="hover:text-gray-500">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}