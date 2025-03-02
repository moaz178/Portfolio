import React from 'react';

const Skills = () => {
  const frontendSkills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'Redux', level: 80 },
  ];

  const backendSkills = [
    { name: 'Node.js', level: 80 },
    { name: 'Express', level: 85 },
    { name: 'MongoDB', level: 75 },
    { name: 'PostgreSQL', level: 70 },
    { name: 'GraphQL', level: 65 },
  ];

  const otherSkills = [
    { name: 'Git', level: 85 },
    { name: 'Docker', level: 70 },
    { name: 'AWS', level: 65 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Agile/Scrum', level: 80 },
  ];

  const SkillBar = ({ name, level }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Skills
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6 text-center text-indigo-600 dark:text-indigo-400">Frontend</h3>
            {frontendSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6 text-center text-indigo-600 dark:text-indigo-400">Backend</h3>
            {backendSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6 text-center text-indigo-600 dark:text-indigo-400">Other</h3>
            {otherSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;