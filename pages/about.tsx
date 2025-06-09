import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About | Kesaru</title>
        <meta name="description" content="Learn more about Kesaru - background, interests, and the story behind the digital universe." />
      </Head>

      <div className="max-w-3xl mx-auto mt-4">
        {/* Terminal style about page */}
        <div className="mb-6">
          <div className="flex">
            <span className="text-terminal-white">kesaru@terminal</span>
            <span className="text-terminal-gray">:~$ </span>
            <span>cat about.md</span>
          </div>
        </div>
        
        <div className="border border-terminal-gray/30 rounded p-6 bg-terminal-dark/50">
          {/* Personal Info Section - CUSTOMIZE THIS PART */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 text-terminal-brightGreen">මම කෙසරු(Māma Kesaru)</h1>
            
            <div className="mb-6 pl-2 border-l-2 border-terminal-blue">
              <p className="mb-3">
                I'm a developer and tech enthusiast based in Sri Lanka. This terminal is my 
                digital space where I share my thoughts, projects, and experiences.
              </p>
              <p>
                With a background in software engineering, I've developed a passion for 
                creating clean, efficient solutions to complex problems.
              </p>
            </div>
          </div>
          
          {/* Skills Section - EDIT THIS WITH YOUR SKILLS */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-terminal-yellow">$ skills --list</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
              <div>
                <h3 className="text-terminal-brightGreen mb-2">Programming:</h3>
                <ul className="list-disc pl-5 text-terminal-white">
                  <li>JavaScript/TypeScript</li>
                  <li>React & Next.js</li>
                  <li>Python</li>
                  <li>Node.js</li>
                </ul>
              </div>
              <div>
                <h3 className="text-terminal-brightGreen mb-2">Tools & Technologies:</h3>
                <ul className="list-disc pl-5 text-terminal-white">
                  <li>Git & GitHub</li>
                  <li>Docker</li>
                  <li>AWS/Cloud Services</li>
                  <li>Linux</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Journey Section - UPDATE WITH YOUR TIMELINE */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-terminal-yellow">$ git log --author="Kesaru"</h2>
            
            <div className="space-y-5 pl-4">
              <div className="border-l-2 border-terminal-purple pl-4 pb-1">
                <h3 className="text-terminal-brightGreen">2023 - Present</h3>
                <p className="text-terminal-white">Software Developer at Tech Company</p>
                <p className="text-terminal-gray">Working on web applications and services using modern JavaScript frameworks.</p>
              </div>
              
              <div className="border-l-2 border-terminal-purple pl-4 pb-1">
                <h3 className="text-terminal-brightGreen">2019 - 2023</h3>
                <p className="text-terminal-white">Computer Science Degree</p>
                <p className="text-terminal-gray">Studied algorithms, data structures, and software engineering principles.</p>
              </div>
              
              <div className="border-l-2 border-terminal-purple pl-4 pb-1">
                <h3 className="text-terminal-brightGreen">2017 - 2019</h3>
                <p className="text-terminal-white">Self-taught Programming</p>
                <p className="text-terminal-gray">Began learning to code through online resources and personal projects.</p>
              </div>
            </div>
          </div>
          
          {/* Interests Section - ADD YOUR PERSONAL INTERESTS */}
          <div>
            <h2 className="text-xl font-bold mb-3 text-terminal-yellow">$ grep -i "interests" ~/profile</h2>
            <div className="pl-4">
              <p className="mb-2">When not coding, I enjoy:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center">
                  <span className="text-terminal-brightGreen mr-2">▶</span>
                  <span>Reading tech blogs</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-brightGreen mr-2">▶</span>
                  <span>Hiking and exploring nature</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-brightGreen mr-2">▶</span>
                  <span>Photography</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-brightGreen mr-2">▶</span>
                  <span>Open-source contributions</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-brightGreen mr-2">▶</span>
                  <span>Learning new technologies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;