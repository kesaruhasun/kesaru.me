import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';

// This would normally come from a CMS
interface BlogPost {
  title: string;
  date: string;
  category: string;
  content: string;
}

const blogData: Record<string, BlogPost> = {
  "getting-started-with-nextjs": {
    title: "Getting Started with Next.js",
    date: "June 1, 2025",
    category: "Technology",
    content: `
      <p>Next.js is a powerful React framework that makes building websites easier than ever before. It provides features like server-side rendering, static site generation, and more out of the box.</p>
      
      <h2>Why Next.js?</h2>
      <p>There are several advantages to using Next.js for your web projects:</p>
      <ul>
        <li>Automatic code splitting for faster page loads</li>
        <li>Simple client-side routing</li>
        <li>API routes to build your API</li>
        <li>Development environment with Fast Refresh</li>
        <li>Static site generation (SSG) and server-side rendering (SSR)</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a Next.js app, run the following command:</p>
      <pre><code>npx create-next-app@latest my-next-app</code></pre>
      
      <p>This is just the beginning of what you can do with Next.js!</p>
    `
  }
};

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  // Handle loading state
  if (router.isFallback || !slug) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }
  
  // Handle post not found
  const post = blogData[slug as string];
  if (!post) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-8">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to all posts
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{post.title} | Kesaru's Chronicles</title>
        <meta name="description" content={`Read about ${post.title} in Kesaru's blog.`} />
      </Head>

      <article className="max-w-2xl mx-auto">
        {/* Back link */}
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to all posts
          </Link>
        </div>
        
        {/* Post header */}
        <header className="mb-12">
          <div className="mb-4">
            <span className="text-sm text-blue-600">{post.category}</span>
            <span className="text-sm text-gray-500 mx-2">•</span>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        </header>
        
        {/* Post content */}
        <div className="prose lg:prose-lg max-w-none" 
             dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* Share links */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Share this post:</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-500">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-blue-800">Facebook</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">LinkedIn</a>
          </div>
        </div>
      </article>
    </Layout>
  );
}