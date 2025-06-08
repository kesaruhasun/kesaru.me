import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Image from 'next/image';

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About | Kesaru</title>
        <meta name="description" content="Learn more about Kesaru - background, interests, and the story behind the digital universe." />
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        
        {/* Profile section */}
        <section className="mb-12 md:flex gap-8 items-start">
          <div className="md:w-1/3 mb-6 md:mb-0">
            {/* Replace with your actual profile image */}
            <div className="bg-gray-200 w-full h-64 rounded-lg relative overflow-hidden mb-4">
              {/* Uncomment and update path when you have an actual image */}
              {/* <Image 
                src="/images/profile.jpg" 
                alt="Kesaru" 
                layout="fill" 
                objectFit="cover"
              /> */}
            </div>
            
            {/* Social links */}
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Hello, I'm Kesaru! 👋</h2>
            <p className="mb-4">
              I'm a passionate [your profession/interest] based in [your location]. This digital space 
              serves as my personal blog, project showcase, and creative outlet where I share my thoughts on 
              technology, design, and whatever else catches my interest.
            </p>
            <p className="mb-4">
              With a background in [your background], I've developed a unique perspective on 
              [topics you're interested in]. I'm particularly fascinated by [specific interests] 
              and how they shape our digital and physical worlds.
            </p>
            <p>
              When I'm not [your main activity], you might find me [your hobbies/interests]. I believe in 
              [personal philosophy or belief] and hope to share that through my work and writing.
            </p>
          </div>
        </section>
        
        {/* Skills/Interests section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What I Do</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">💻 Technology</h3>
              <p>
                Detail your technical skills, interests, or expertise. What technologies are you 
                passionate about? What are you currently learning?
              </p>
            </div>
            
            <div className="border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">✏️ Writing</h3>
              <p>
                Describe your writing style, topics you cover, and your approach to sharing knowledge 
                and experiences through your blog.
              </p>
            </div>
            
            <div className="border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🚀 Projects</h3>
              <p>
                Highlight the kinds of projects you work on or are interested in. What are you building 
                or contributing to?
              </p>
            </div>
            
            <div className="border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🌱 Learning</h3>
              <p>
                Share what you're currently learning or areas you're interested in exploring further.
              </p>
            </div>
          </div>
        </section>
        
        {/* Personal journey timeline - simple version */}
        <section>
          <h2 className="text-2xl font-bold mb-6">My Journey</h2>
          
          <div className="space-y-12">
            <div className="relative pl-8 border-l-2 border-gray-200">
              <div className="absolute -left-2 mt-1 h-4 w-4 rounded-full bg-blue-600"></div>
              <h3 className="text-xl font-semibold">2022 - Present</h3>
              <p className="text-gray-600 mb-2">Current Role/Activity</p>
              <p>Description of what you're currently doing, your role, projects, etc.</p>
            </div>
            
            <div className="relative pl-8 border-l-2 border-gray-200">
              <div className="absolute -left-2 mt-1 h-4 w-4 rounded-full bg-blue-600"></div>
              <h3 className="text-xl font-semibold">2019 - 2022</h3>
              <p className="text-gray-600 mb-2">Previous Experience</p>
              <p>Details about your previous experience, role, or education.</p>
            </div>
            
            <div className="relative pl-8 border-l-2 border-gray-200">
              <div className="absolute -left-2 mt-1 h-4 w-4 rounded-full bg-blue-600"></div>
              <h3 className="text-xl font-semibold">2015 - 2019</h3>
              <p className="text-gray-600 mb-2">Earlier Experience</p>
              <p>Information about your earlier career, education, or formative experiences.</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;