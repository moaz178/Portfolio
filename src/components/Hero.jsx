import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = ({ scrollToSection, openGroqSidebar }) => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-800 overflow-hidden">
   
      <div className="absolute inset-0 overflow-hidden">
      
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-pink-200/20 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl rotate-180 animate-slow-spin"></div>
      
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Hello, I'm <span>Moaz Ahmad</span>
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-8">
            Full Stack Developer and AI Expert
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
            >
              View My Work
            </button>
            <button 
              onClick={openGroqSidebar}
              className="px-8 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300 hover:scale-105"
            >
              Talk to Agent
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('about')}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;