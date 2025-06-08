import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Kesaru | Personal Blog & Digital Universe</title>
        <meta name="description" content="Welcome to Kesaru's digital universe - a personal blog sharing insights, projects, and creative explorations." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Kesaru's Universe</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
          Exploring ideas, sharing knowledge, and building a digital space for curiosity and creativity.
        </p>
        <div className="mt-8">
          <Link href="/blog" 
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Read the Blog
          </Link>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-12 border-t">
        <h2 className="text-3xl font-bold mb-8">Latest Chronicles</h2>
        
        {/* This will be replaced with dynamic content later */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((post) => (
            <div key={post} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <span className="text-sm text-gray-500">June 8, 2025</span>
                <h3 className="text-xl font-semibold mt-2 mb-3">Sample Blog Post {post}</h3>
                <p className="text-gray-600">This is a placeholder for your amazing blog content that will appear here once connected to your CMS.</p>
                <Link href="/blog/post-slug" 
                      className="inline-block mt-4 text-blue-600 hover:underline">
                  Continue reading →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 border-t">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to the Newsletter</h2>
          <p className="text-gray-600 mb-6">Get the latest posts and updates delivered directly to your inbox.</p>
          
          <form className="flex flex-col md:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Home;