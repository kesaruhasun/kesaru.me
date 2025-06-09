import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

// Sample blog posts data (this would come from your CMS later)
const allPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js and Tailwind CSS',
    excerpt: 'Learn how to set up a new project with Next.js and Tailwind CSS to create beautiful, responsive websites.',
    content: `
      <p>Next.js has quickly become one of the most popular frameworks for building React applications. Combined with Tailwind CSS, it offers an incredibly powerful toolkit for creating modern, responsive websites.</p>
      
      <h2>Setting Up Your Project</h2>
      <p>To get started with Next.js and Tailwind CSS, you'll need to have Node.js installed on your machine. Then, you can create a new Next.js project by running:</p>
      
      <pre><code>npx create-next-app my-awesome-project</code></pre>
      
      <p>Once your project is created, you can add Tailwind CSS by following these steps:</p>
      
      <ol>
        <li>Install Tailwind CSS and its dependencies</li>
        <li>Create a configuration file</li>
        <li>Configure your PostCSS settings</li>
        <li>Add Tailwind directives to your CSS</li>
      </ol>
      
      <h2>Why This Combination Works So Well</h2>
      <p>Next.js provides an excellent development experience with features like:</p>
      
      <ul>
        <li>Server-side rendering and static site generation</li>
        <li>Automatic code splitting</li>
        <li>Built-in routing</li>
        <li>API routes</li>
      </ul>
      
      <p>Tailwind CSS, on the other hand, offers a utility-first approach to styling that can significantly speed up your development process. Instead of writing custom CSS for each component, you apply pre-defined utility classes directly in your HTML.</p>
      
      <blockquote>
        <p>"Tailwind CSS is the only framework that I've seen scale on large teams. It's easy to customize, adapts to any design, and the build size is tiny."</p>
      </blockquote>
      
      <p>With these two technologies combined, you can build fast, responsive, and beautiful websites in record time.</p>
    `,
    date: 'June 5, 2025',
    author: 'Kesaru',
    category: 'Web Development',
    slug: 'getting-started-with-nextjs-and-tailwind',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readingTime: '5 min read'
  },
  // Note: Add other blog posts here
];

const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  // Find the post with the matching slug
  const post = allPosts.find(post => post.slug === slug);
  
  // Handle loading and not found states
  if (router.isFallback) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout title="Post Not Found">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/blog" 
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Browse All Posts
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={`${post.title} | Kesaru.me Blog`}>
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          <div className="mb-6">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Posts
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 gap-4 mb-6">
            <div className="flex items-center">
              <span className="font-medium text-purple-600 dark:text-purple-400">{post.category}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="relative h-72 md:h-96 mb-10 rounded-xl overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Post Content */}
        <div 
          className="prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-purple-600 dark:prose-a:text-purple-400 max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Author and Sharing */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            {/* Author */}
            <div className="flex items-center">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Author & Creator</p>
              </div>
            </div>
            
            {/* Share Links */}
            <div>
              <p className="text-sm font-medium mb-2">Share this article:</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-blue-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-700">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.828 13L13.828 19H11.828L5.828 13 11.828 7H13.828L7.828 13Z" />
                    <path d="M13.828 13L19.828 19H17.828L11.828 13 17.828 7H19.828L13.828 13Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostPage;