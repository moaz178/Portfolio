import React, { useState, useEffect } from 'react';
import Groq from 'groq-sdk';
import { ChevronRight } from 'lucide-react';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 

});




const MODELS = [
  "llama-3.3-70b-versatile",
  "deepseek-r1-distill-qwen-32b",
  "gemma2-9b-it",
  "qwen-2.5-32b",
];

function isRateLimitError(error) {
  const message = (error?.message || "").toLowerCase();
  return message.includes("rate limit") || message.includes("429");
}

async function chatCompletionWithFallback({
  messages,
  temperature,
  max_completion_tokens,
  top_p,
  stream,
  stop,
}) {
  let lastError = null;
  for (const model of MODELS) {
    try {
      return await groq.chat.completions.create({
        messages,
        model,
        temperature,
        max_completion_tokens,
        top_p,
        stream,
        stop,
      });
    } catch (error) {
      lastError = error;
      if (isRateLimitError(error)) {
        console.warn(`Rate limit error with model "${model}". Trying next...`);
        continue;
      } else {
        throw error;
      }
    }
  }
  throw lastError || new Error("All models are rate-limited or failed.");
}

const portfolioContext = `
You are Moaz’s portfolio assistant. Your responses should primarily be based on the following portfolio details. If a question is directly about the portfolio, use the details below to provide an answer. However, if the user's message is a simple greeting (e.g., "Hello", "How are you?") or an expression of appreciation, respond with a friendly greeting and ask if they need help with portfolio-related queries. For any other off-topic questions, reply with: "I can only help with portfolio-related questions." Use the details below as your knowledge base. If you don't find information in his portfolio, respond with "He might have done this, you can contact him for this specific information." Always provide answers in a beautiful and professional way with a soft tone, proper spacing, and punctuation. Stay relevant to the question.

Profile Overview:
- Name: Moaz Ahmad
- Role: Full Stack Developer & Middleware Specialist
- Current Position: Full Stack Developer, Middleware at Royal Cyber Inc. (May 2024 – Present)
- Contact: moazahmed6767@gmail.com | +923018325413
- Location: LDA Avenue One, Lahore, Punjab, Pakistan
- Online Presence:
  - LinkedIn: https://linkedin.com/in/moaz-ahmad-ba4a52200
  - StackOverflow: https://stackoverflow.com/users/21646759/moaz-ahmad

Technical Skills & Expertise:
- Programming & Frameworks: React.js, Next.js, TypeScript, Node.js, Django, Flask
- Database & Backend: MongoDB, SQL, Postgres, API (REST & SOAP), GraphQL
- DevOps & Scripting: Linux/Shell Scripting, Jenkins, DevOps practices
- Cloud & Integration: Mulesoft, Salesforce, ServiceNow, Microsoft Copilot Studio, Power Automate, Power BI
- Generative AI & Data Technologies: RAG, Finetuning, Prompt Engineering, Apache Kafka, IBM MQ, Chromadb, Faiss, Langchain, Llama Index, Lang-graph, Langsmith, PG vector
- Frontend & UI: Bootstrap, Tailwind CSS, ShadCN, JQuery
- AI agents developer, AI Integration expert, Building AI chatbots

Experience:
- Technical Associate, Valyrian Systems Inc. (Sep 2022 – Jul 2023): Gained experience with networking protocols, Linux, and CLI usage in Ubuntu. Contributed to a MERN-based network management system for PTA.
- Internee, Bitnine Global (Feb 2023 – Sep 2023): Specialized in database management (Postgres, Apache Kafka, Apache AGE) and query optimization in Linux environments.
- Full Stack Developer, Middleware, Royal Cyber Inc. (May 2024 – Present): Worked on API management, full-stack development using the MERN stack, and explored generative AI techniques including API security and creative integrations.

Education:
- Matriculation from District Public School.
- Intermediate from Punjab College.
- Electrical Engineering, NUST (National University of Sciences and Technology) (2023)

Achievements:
- First position in matriculation (Sahiwal board, overall boys section)
- Overall 2nd position in FSC engineering (boys)
- Winner in DPS Speech Competition and Punjab College General Knowledge Competition

Projects:
- RC AI Ops Solution: Designed an automation platform using Generative AI for IT operations, advanced monitoring (Isolation Forest), and an automated bug-healing mechanism integrating Microsoft SharePoint, ServiceNow, and a RAG approach. Frontend built in ReactJS.
- Secura API: Developed an API monitoring system to identify vulnerabilities and improve frontend design with modern, responsive techniques.
- IBM MQ Migrator Assistant: Built the frontend for a tool assisting in migrating queues from IBM IIB to IBM ACE, including API integrations for generating PDF and Excel reports.
- Crew AI Lead Generator: Developed an agentic framework for AI-powered sales lead generation using tools like Crew AI, SerperDev, FireCrawl, and a Text RAG system for dynamic email templates.

Languages:
- Urdu: Native
- English: Fluent
- Punjabi: Proficient

Certifications:
- Certified Devops by Coursera
- Python Programming: Certified by Coursera
- Machine Learning: Coursera
- Data Science: Coursera
- Multiagents with Crew AI and advanced multiagent systems
- Generative AI: Coursera
`;

const initialSuggestions = [
  "Who is Moaz?",
  "What are his AI skills?",
];

const GroqSidebar = ({ open, onClose }) => {
  const [query, setQuery] = useState(
    sessionStorage.getItem('portfolioAssistantQuery') || ''
  );
  const [response, setResponse] = useState(
    sessionStorage.getItem('portfolioAssistantResponse') || ''
  );
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(
    sessionStorage.getItem('portfolioAssistantSuggestions')
      ? JSON.parse(sessionStorage.getItem('portfolioAssistantSuggestions'))
      : initialSuggestions
  );
  const [suggestionsOpacity, setSuggestionsOpacity] = useState(1);

  useEffect(() => {
console.log('import.meta.env:', import.meta.env);

    sessionStorage.setItem('portfolioAssistantQuery', query);
  }, [query]);

  useEffect(() => {
    sessionStorage.setItem('portfolioAssistantResponse', response);
  }, [response]);

  useEffect(() => {
    sessionStorage.setItem('portfolioAssistantSuggestions', JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('portfolioAssistantQuery');
      sessionStorage.removeItem('portfolioAssistantResponse');
      sessionStorage.removeItem('portfolioAssistantSuggestions');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (open && !response) {
      setResponse("Hello! I'm Moaz's portfolio assistant. How may I help you today?");
      setSuggestions(initialSuggestions);
      setSuggestionsOpacity(1);
    }
  }, [open, response]);

  const submitQuery = async (userQuery) => {
    setResponse('');
    setLoading(true);
    try {
      const chatCompletion = await chatCompletionWithFallback({
        messages: [
          { role: 'system', content: portfolioContext },
          { role: 'user', content: userQuery },
        ],
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

      await getDynamicSuggestions(userQuery, accumulatedResponse);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('An error occurred while fetching the response.');
    }
    setLoading(false);
  };

  const getDynamicSuggestions = async (userQuery, answer) => {
    try {
      const suggestionPrompt = `
Based on the conversation below, provide two very short follow-up questions (4-5 words max) to further explore Moaz's portfolio.
User query: ${userQuery}
Agent answer: ${answer}
Portfolio details (for reference): ${portfolioContext}
Follow-up questions:
      `;

      const suggestionResult = await chatCompletionWithFallback({
        messages: [
          { role: 'system', content: portfolioContext },
          { role: 'user', content: suggestionPrompt },
        ],
        temperature: 1,
        max_completion_tokens: 500,
        top_p: 1,
        stream: false,
        stop: null,
      });

      const suggestionsText = suggestionResult.choices[0]?.message?.content || "";
      const dynamicSuggestions = suggestionsText
        .split(/\r?\n/)
        .map(s => s.replace(/^\d+\.\s*/, '').trim())
        .filter(s => s.length > 0)
        .slice(0, 2);

      if (dynamicSuggestions.length > 0) {
        setSuggestionsOpacity(0);
        setTimeout(() => {
          setSuggestions(dynamicSuggestions);
          setSuggestionsOpacity(1);
        }, 300);
      } else {
        setSuggestions(initialSuggestions);
      }
    } catch (error) {
      console.error("Error fetching dynamic suggestions:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    await submitQuery(query);
  };

  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion);
    await submitQuery(suggestion);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-96 z-[10000] transform transition-transform duration-500 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <aside className="relative h-full bg-white dark:bg-gray-800 shadow-lg pt-16 p-4 custom-scrollbar">
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
          <h3 className="text-lg font-semibold mb-2">Try asking:</h3>
          <div
            className="grid grid-cols-2 gap-2 transition-opacity duration-300"
            style={{ opacity: suggestionsOpacity }}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Response:</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{response}</p>
        </div>
      </aside>
      <style jsx>{`
        .custom-scrollbar {
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default GroqSidebar;
