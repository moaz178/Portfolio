import React, { useState } from 'react';
import Groq from 'groq-sdk';
import { ChevronRight } from 'lucide-react';

// Initialize Groq with your API key and bypass browser restrictions
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const GroqSidebar = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('');
    setLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: query }],
        model: 'llama-3.3-70b-versatile',
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null,
      });

      let accumulatedResponse = '';
      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || '';
        accumulatedResponse += content;
        setResponse(accumulatedResponse);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('An error occurred while fetching the response.');
    }
    setLoading(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-80 z-[10000] transform transition-transform duration-500 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <aside className="relative h-full bg-white dark:bg-gray-800 shadow-lg overflow-y-auto pt-16 p-4">
        {/* Close Button repositioned to top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          aria-label="Close sidebar"
        >
          <ChevronRight size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Moaz's AI Agent</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            className="p-2 !bg-white !text-black border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Response:</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{response}</p>
        </div>
      </aside>
    </div>
  );
};

export default GroqSidebar;
