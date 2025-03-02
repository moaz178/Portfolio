import React from 'react';
import profilePic from './assets/IMG_0355.jpg';



const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-lg transform rotate-3"></div>
                <img 
  src={profilePic} 
  alt="Profile" 
  className="relative rounded-lg w-full h-auto object-cover z-10" 
/>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I'm a passionate Full Stack Developer with expertise in building modern web applications. With over 5 years of experience in the industry, I've worked on a variety of projects ranging from small business websites to complex enterprise applications.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                My journey in web development started when I was in college, and since then, I've been constantly learning and adapting to new technologies. I believe in writing clean, maintainable code and creating intuitive user experiences.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                When I'm not coding, you can find me hiking, reading books on technology and design, or experimenting with new recipes in the kitchen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;