import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';

const BlogPage: NextPage = () => {
  // This will be replaced with actual data from your CMS later
  const blogPosts = [
    {
      id: 1,
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js',
      excerpt: 'Learn how to build modern websites with Next.js, React, and more.',
      date: 'June 1, 2025',
      category: 'Technology'
    },
    {
      id: 2,
      slug: 'designing-for-mobile-first',
      title: 'Designing for Mobile-First Experiences',
      excerpt: 'Best practices for creating responsive, mobile-first web experiences.',
      date: 'June 5, 2025',
      category: 'Design'
    },
    {
      id: 3,
      slug: 'content-strategy-for-developers',
      title: 'Content Strategy for Developers',
      excerpt: 'How to think about content structure when building websites and applications.',
      date: 'June 8, 2025',
      category: 'Content'
    },
    // More placeholder posts can be added here
  ];

  return (
    <Layout>
      <Head>
        <title>Blog | Kesaru's Chronicles</title>
        <meta name="description" content="Read the latest articles and insights from Kesaru's digital universe." />
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Chronicles</h1>
        <p className="text-xl text-gray-600 mb-12">
          Thoughts, insights, and explorations from my digital journey.
        </p>

        {/* Category Filter - Simple version for now */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="font-medium text-gray-700">Categories:</span>
          <button className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">All</button>
          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">Technology</button>
          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">Design</button>
          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">Content</button>
        </div>

        {/* Blog Post List */}
        <div className="space-y-12">
          {blogPosts.map(post => (
            <article key={post.id} className="border-b pb-10">
              <div className="mb-2">
                <span className="text-sm text-blue-600">{post.category}</span>
                <span className="text-sm text-gray-500 mx-2">•</span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold mb-3 hover:text-blue-600">{post.title}</h2>
              </Link>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                Read more →
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination - Simple version */}
        <div className="mt-12 flex justify-between">
          <button className="px-4 py-2 border rounded-md text-gray-500 hover:bg-gray-50" disabled>
            ← Previous
          </button>
          <button className="px-4 py-2 border rounded-md text-gray-800 hover:bg-gray-50">
            Next →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;