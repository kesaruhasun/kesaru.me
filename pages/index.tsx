import type { NextPage } from 'next';
import { useEffect, useState, useRef, KeyboardEvent } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Terminal command response types
type CommandResponse = {
  type: 'text' | 'link' | 'error' | 'html';
  content: string | React.ReactNode;
};

const TypedText = ({ text, typingSpeed = 50, onComplete }: { text: string, typingSpeed?: number, onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, typingSpeed, onComplete]);
  
  return <span>{displayText}<span className="animate-pulse">▊</span></span>;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<Array<{command?: string, response: CommandResponse[]}>>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  // Initialize terminal with welcome message
  useEffect(() => {
    if (!initialized) {
      setTerminalOutput([
        { 
          response: [
            { type: 'text', content: 'Welcome to Kesaru Terminal v1.0.4' },
            { type: 'text', content: 'Type "help" for available commands.' }
          ] 
        }
      ]);
      setInitialized(true);
    }
  }, [initialized]);

  // Scroll to bottom when output changes
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalOutput]);

  // Focus input on mount and clicks
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle terminal commands
  const processCommand = (cmd: string): CommandResponse[] => {
    const command = cmd.trim().toLowerCase();
    
    // Basic command parsing
    if (command === 'help') {
      return [
        { type: 'text', content: 'Available commands:' },
        { type: 'text', content: '  help - Show this help message' },
        { type: 'text', content: '  about - Show information about me' },
        { type: 'text', content: '  blog - View my blog posts' },
        { type: 'text', content: '  contact - Get in touch with me' },
        { type: 'text', content: '  clear - Clear the terminal' },
        { type: 'text', content: '  ls - List available sections' }
      ];
    } 
    else if (command === 'about' || command === 'cd about') {
      // You could navigate to about page or show info inline
      setTimeout(() => router.push('/about'), 500);
      return [{ type: 'text', content: 'Navigating to about page...' }];
    }
    else if (command === 'blog' || command === 'cd blog') {
      setTimeout(() => router.push('/blog'), 500);
      return [{ type: 'text', content: 'Navigating to blog page...' }];
    }
    else if (command === 'contact' || command === 'cd contact') {
      setTimeout(() => router.push('/contact'), 500);
      return [{ type: 'text', content: 'Navigating to contact page...' }];
    }
    else if (command === 'clear') {
      setTerminalOutput([]);
      return [];
    }
    else if (command === 'ls') {
      return [
        { type: 'text', content: 'Directories:' },
        { 
          type: 'html', 
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 pl-4">
              <div className="flex">
                <span className="text-terminal-blue mr-4">drwxr-xr-x</span>
                <Link href="/blog" className="text-terminal-white hover:text-terminal-brightGreen">
                  blog/ <span className="text-terminal-gray">(chronicles)</span>
                </Link>
              </div>
              <div className="flex">
                <span className="text-terminal-blue mr-4">drwxr-xr-x</span>
                <Link href="/about" className="text-terminal-white hover:text-terminal-brightGreen">
                  about/ <span className="text-terminal-gray">(identity)</span>
                </Link>
              </div>
              <div className="flex">
                <span className="text-terminal-blue mr-4">drwxr-xr-x</span>
                <Link href="/contact" className="text-terminal-white hover:text-terminal-brightGreen">
                  contact/ <span className="text-terminal-gray">(message)</span>
                </Link>
              </div>
            </div>
          ) 
        }
      ];
    }
    else if (command === '') {
      return [];
    }
    else {
      return [{ type: 'error', content: `Command not found: ${command}. Type "help" for available commands.` }];
    }
  };

  // Handle command submission
  const handleCommandSubmit = () => {
    if (currentInput.trim() === '') return;
    
    // Process command and update history
    const response = processCommand(currentInput);
    setTerminalOutput(prev => [...prev, { command: currentInput, response }]);
    setCommandHistory(prev => [...prev, currentInput]);
    setCommandIndex(-1);
    setCurrentInput('');
  };

  // Handle keyboard events for command history and submission
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandSubmit();
    } 
    else if (e.key === 'ArrowUp') {
      // Navigate command history (older commands)
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = commandIndex < commandHistory.length - 1 ? commandIndex + 1 : commandIndex;
        setCommandIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } 
    else if (e.key === 'ArrowDown') {
      // Navigate command history (newer commands)
      e.preventDefault();
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setCommandIndex(-1);
        setCurrentInput('');
      }
    }
  };

  // Handle clicks on terminal to focus input
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Layout>
      <Head>
        <title>Kesaru | Terminal</title>
        <meta name="description" content="Welcome to Kesaru's digital universe - a personal blog sharing insights, projects, and creative explorations." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
        className="max-w-3xl mx-auto mt-8 pb-20 min-h-[60vh]" 
        onClick={handleTerminalClick}
      >
        {/* Terminal output */}
        <div className="mb-4">
          {terminalOutput.map((entry, i) => (
            <div key={i} className="mb-3">
              {/* Show the command that was entered */}
              {entry.command && (
                <div className="pb-1">
                  <span className="text-terminal-white">kesaru@terminal</span>
                  <span className="text-terminal-gray">:~$ </span>
                  <span>{entry.command}</span>
                </div>
              )}
              
              {/* Show the command response */}
              {entry.response.map((res, j) => (
                <div key={j} className={`pl-0 ${res.type === 'error' ? 'text-terminal-red' : ''}`}>
                  {res.type === 'html' ? res.content : <div>{res.content}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Command input */}
        <div className="flex items-center">
          <span className="text-terminal-white">kesaru@terminal</span>
          <span className="text-terminal-gray">:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent border-none outline-none text-terminal-green pl-1"
            autoFocus
            aria-label="Terminal input"
          />
        </div>
        
        {/* Invisible element to scroll to */}
        <div ref={outputEndRef} />
      </div>
    </Layout>
  );
};

export default Home;