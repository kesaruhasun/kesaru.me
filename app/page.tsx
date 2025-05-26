export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground">Kesaru</div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">About</a>
            <a href="#projects" className="text-foreground/80 hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-foreground tracking-tight">
            Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Kesaru</span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/70 max-w-3xl mx-auto">
            Full-Stack Developer & DevOps Engineer building modern web applications and automated infrastructure solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#projects" 
              className="bg-foreground text-background px-8 py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="border border-foreground/20 text-foreground px-8 py-3 rounded-lg font-medium hover:border-foreground/40 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="mt-32">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-foreground">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-foreground/80">
                I'm a passionate developer who loves creating efficient, scalable solutions. My expertise spans across 
                modern web technologies, cloud infrastructure, and DevOps practices.
              </p>
              <p className="text-lg text-foreground/80">
                Currently focused on building automated deployment pipelines, modern web applications with Next.js, 
                and infrastructure as code solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-foreground/5 p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Frontend</h3>
                <p className="text-sm text-foreground/70">Next.js, React, TypeScript, Tailwind CSS</p>
              </div>
              <div className="bg-foreground/5 p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Backend</h3>
                <p className="text-sm text-foreground/70">Node.js, Python, PostgreSQL, MongoDB</p>
              </div>
              <div className="bg-foreground/5 p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">DevOps</h3>
                <p className="text-sm text-foreground/70">Docker, Nginx, CI/CD, DigitalOcean</p>
              </div>
              <div className="bg-foreground/5 p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Tools</h3>
                <p className="text-sm text-foreground/70">Git, GitHub Actions, Ansible, Terraform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mt-32">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-foreground">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-foreground/5 p-6 rounded-lg hover:bg-foreground/10 transition-colors">
              <h3 className="text-xl font-semibold text-foreground mb-3">Portfolio Website</h3>
              <p className="text-foreground/70 mb-4">
                Modern portfolio built with Next.js and automated CI/CD deployment to DigitalOcean.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded text-sm">Next.js</span>
                <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-sm">CI/CD</span>
                <span className="bg-purple-500/10 text-purple-600 px-2 py-1 rounded text-sm">DigitalOcean</span>
              </div>
              <a href="#" className="text-foreground hover:text-foreground/80 transition-colors">View Project →</a>
            </div>
            
            <div className="bg-foreground/5 p-6 rounded-lg hover:bg-foreground/10 transition-colors">
              <h3 className="text-xl font-semibold text-foreground mb-3">Infrastructure Automation</h3>
              <p className="text-foreground/70 mb-4">
                Automated server setup and configuration management using Ansible and Terraform.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-red-500/10 text-red-600 px-2 py-1 rounded text-sm">Ansible</span>
                <span className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded text-sm">Terraform</span>
                <span className="bg-gray-500/10 text-gray-600 px-2 py-1 rounded text-sm">Linux</span>
              </div>
              <a href="#" className="text-foreground hover:text-foreground/80 transition-colors">View Project →</a>
            </div>

            <div className="bg-foreground/5 p-6 rounded-lg hover:bg-foreground/10 transition-colors">
              <h3 className="text-xl font-semibold text-foreground mb-3">Web Application</h3>
              <p className="text-foreground/70 mb-4">
                Full-stack web application with modern authentication and real-time features.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-sm">React</span>
                <span className="bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded text-sm">Node.js</span>
                <span className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded text-sm">PostgreSQL</span>
              </div>
              <a href="#" className="text-foreground hover:text-foreground/80 transition-colors">View Project →</a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-32 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">Let's Connect</h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Interested in working together? I'd love to hear about your project and discuss how we can bring it to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:hello@kesaru.me" 
              className="bg-foreground text-background px-8 py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              Send Email
            </a>
            <a 
              href="https://github.com/kesaru" 
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/20 text-foreground px-8 py-3 rounded-lg font-medium hover:border-foreground/40 transition-colors"
            >
              View GitHub
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 mt-32 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto text-center text-foreground/60">
          <p>&copy; 2025 Kesaru. Built with Next.js and deployed with love.</p>
        </div>
      </footer>
    </div>
  );
}
