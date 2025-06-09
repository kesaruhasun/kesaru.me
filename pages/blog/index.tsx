import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';

// Sample blog posts data (this would come from your CMS later)
const allPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js and Tailwind CSS',
    excerpt: 'Learn how to set up a new project with Next.js and Tailwind CSS to create beautiful, responsive websites.',
    date: 'June 5, 2025',
    category: 'Web Development',
    slug: 'getting-started-with-nextjs-and-tailwind',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2, 
    title: 'The Future of Personal Websites',
    excerpt: 'Exploring how personal websites are evolving and why having your own digital space matters more than ever.',
    date: 'June 1, 2025',
    category: 'Digital Identity',
    slug: 'the-future-of-personal-websites',
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Creating an Efficient Content Workflow',
    excerpt: 'How to create a sustainable content creation workflow that keeps your blog active and engaging.',
    date: 'May 28, 2025',
    category: 'Content Strategy',
    slug: 'creating-an-efficient-content-workflow',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'The Importance of Performance in Web Design',
    excerpt: 'Why website performance matters and how it affects user experience and SEO rankings.',
    date: 'May 20, 2025',
    category: 'Web Development',
    slug: 'importance-of-performance-in-web-design',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Building a Personal Brand Online',
    excerpt: 'How to craft and maintain a consistent personal brand across various online platforms.',
    date: 'May 15, 2025',
    category: 'Digital Identity',
    slug: 'building-a-personal-brand-online',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'SEO Best Practices for Blogs in 2025',
    excerpt: 'The latest search engine optimization techniques to help your blog content rank higher.',
    date: 'May 10, 2025',
    category: 'Content Strategy',
    slug: 'seo-best-practices-for-blogs',
    imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5f989?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Get all unique categories
const categories = ['All', ...new Set(allPosts.map(post => post.category))];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter posts by category and search term
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout title="Blog | Kesaru.me">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Chronicles</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, stories, and ideas about technology, personal development, and beyond.
          </p>
        </header>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    {post.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">No posts found matching your criteria.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchTerm('');}}
              className="mt-4 px-4 py-2 text-purple-600 border border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;