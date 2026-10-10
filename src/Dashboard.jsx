import { useState } from 'react';
import { 
  BookOpen, Home, Video, ClipboardList, CheckSquare, 
  Library, StickyNote, HelpCircle, Bot, TrendingUp, 
  Award, Bell, Settings, Search, LogOut, BookOpenText,
  Trophy, CalendarCheck, Sun, Plus, Check, Play, FileText,
  MessageCircleQuestion, Moon, X, Send
} from 'lucide-react';

import { MyCourses, LiveClasses, Assignments, Quizzes, Library as LibComp, Notes, DoubtCenter, Progress, Certificates, Announcements } from './Pages';

export default function Dashboard({ user, onLogout, isDarkMode, toggleTheme }) {
  const [activePage, setActivePage] = useState('Dashboard');
  const [showAIAgent, setShowAIAgent] = useState(false);
  
  // Dashboard Home State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Watch: Linear Equations (Mathematics)', completed: true },
    { id: 2, text: 'Complete: Science Quiz', completed: true },
    { id: 3, text: 'Read: Photosynthesis (Science)', completed: true },
    { id: 4, text: 'Join Live Class - English (4:00 PM)', completed: false },
    { id: 5, text: 'Submit Assignment - Social Studies', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);

  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete 5 lessons', completed: true },
    { id: 2, text: 'Score 70%+ in quiz', completed: false },
    { id: 3, text: 'Join 1 live class', completed: false },
    { id: 4, text: 'Study for 2 hours', completed: false }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: `Hello ${user.name}! I am your AI study assistant. How can I help you today?` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const completedTasks = tasks.filter(t => t.completed).length;
  const completedGoals = goals.filter(g => g.completed).length;

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const toggleGoal = (id) => setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
      setShowTaskInput(false);
    }
  };

  const sendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: `You are an AI study assistant for a rural student named ${user.name}. Keep your answers concise, encouraging, and easy to understand. The user asks: ${userMessage}` }] }]
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.candidates && data.candidates[0].content.parts[0].text) {
        setChatMessages(prev => [...prev, { sender: 'ai', text: data.candidates[0].content.parts[0].text }]);
      } else {
        const errorMsg = data.error?.message || "Unknown API error";
        setChatMessages(prev => [...prev, { sender: 'ai', text: `API Error: ${errorMsg}` }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: `Network/Fetch Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  const navItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: BookOpen, label: 'My Courses' },
    { icon: Video, label: 'Live Classes' },
    { icon: ClipboardList, label: 'Assignments' },
    { icon: CheckSquare, label: 'Quizzes' },
    { icon: Library, label: 'Library' },
    { icon: StickyNote, label: 'Notes' },
    { icon: HelpCircle, label: 'Doubt Center' },
    { icon: Bot, label: 'AI Agent', isAction: true, action: () => setShowAIAgent(true) },
    { icon: TrendingUp, label: 'Progress' },
    { icon: Award, label: 'Certificates' },
    { icon: Bell, label: 'Announcements' },
  ];

  const renderContent = () => {
    switch(activePage) {
      case 'My Courses': return <MyCourses isDarkMode={isDarkMode} onCourseComplete={() => setCoursesCompleted(c => c + 1)} />;
      case 'Live Classes': return <LiveClasses isDarkMode={isDarkMode} />;
      case 'Assignments': return <Assignments isDarkMode={isDarkMode} />;
      case 'Quizzes': return <Quizzes isDarkMode={isDarkMode} onQuizComplete={() => setQuizzesCompleted(q => q + 1)} />;
      case 'Library': return <LibComp isDarkMode={isDarkMode} />;
      case 'Notes': return <Notes isDarkMode={isDarkMode} />;
      case 'Doubt Center': return <DoubtCenter isDarkMode={isDarkMode} />;
      case 'Progress': return <Progress isDarkMode={isDarkMode} />;
      case 'Certificates': return <Certificates isDarkMode={isDarkMode} />;
      case 'Announcements': return <Announcements isDarkMode={isDarkMode} />;
      case 'Dashboard':
      default:
        return (
          <>
            {/* Banner */}
            <div className="bg-primary-dark rounded-2xl p-8 text-white mb-6 flex justify-between relative overflow-hidden">
              <div className="max-w-[60%] relative z-10">
                <h4 className="text-xs text-green-200 uppercase tracking-wider mb-2 font-semibold">Welcome Back</h4>
                <h1 className="text-3xl font-semibold mb-3 flex items-center gap-2">Hello, {user.name}! <span className="text-4xl">👋</span></h1>
                <p className="text-sm text-green-100 mb-6 leading-relaxed">Your hard work today builds a brighter tomorrow.<br/>Keep learning, keep growing!</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              <StatCard isDarkMode={isDarkMode} icon={<BookOpenText size={20} className="text-green-700 dark:text-green-300"/>} bg="bg-green-50 dark:bg-green-900/30" title="Courses Completed" value={`${coursesCompleted} / 5`} progress={(coursesCompleted/5)*100} color="bg-green-600" footer={`${(coursesCompleted/5)*100}% finished`} footerColor="text-green-700 dark:text-green-400" />
              <StatCard isDarkMode={isDarkMode} icon={<Video size={20} className="text-blue-700 dark:text-blue-300"/>} bg="bg-blue-50 dark:bg-blue-900/30" title="Lessons Completed" value="48 / 72" progress={67} color="bg-blue-600" footer="67% completed" footerColor="text-blue-700 dark:text-blue-400" />
              <StatCard isDarkMode={isDarkMode} icon={<Trophy size={20} className="text-purple-700 dark:text-purple-300"/>} bg="bg-purple-50 dark:bg-purple-900/30" title="Quizzes Attended" value={quizzesCompleted} progress={Math.min((quizzesCompleted/5)*100, 100)} color="bg-purple-600" footer="Keep it up!" footerColor="text-purple-700 dark:text-purple-400" />
              <StatCard isDarkMode={isDarkMode} icon={<Award size={20} className="text-pink-600 dark:text-pink-300"/>} bg="bg-pink-50 dark:bg-pink-900/30" title="Certificates" value="3" progress={30} color="bg-pink-500" footer="Earn more!" footerColor="text-pink-600 dark:text-pink-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><CalendarCheck size={20}/> Today's Plan</h3>
                    <button onClick={() => setShowTaskInput(!showTaskInput)} className="bg-primary-dark text-white text-xs px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-90">
                      <Plus size={14}/> Add Task
                    </button>
                  </div>

                  {showTaskInput && (
                    <div className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-primary-light ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                        placeholder="Task name..."
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addTask()}
                        autoFocus
                      />
                      <button onClick={addTask} className="bg-primary-light text-white px-4 py-2 rounded-lg text-sm font-semibold">Add</button>
                    </div>
                  )}

                  <ul className="space-y-1">
                    {tasks.map(task => (
                      <li key={task.id} className={`flex items-center gap-3 p-2.5 border-b last:border-0 text-sm ${isDarkMode ? 'border-gray-700' : 'border-gray-50'}`}>
                        <button onClick={() => toggleTask(task.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-primary-light border-primary-light text-white' : 'border-gray-400 text-transparent'}`}>
                          <Check size={14} />
                        </button>
                        <span className={task.completed ? 'text-gray-400 line-through' : ''}>{task.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className="font-semibold text-md flex items-center gap-2 mb-4">⚡ Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <QuickBtn onClick={() => setActivePage('Live Classes')} icon={<Play size={20}/>} label="Live Class" color="text-blue-700 dark:text-blue-300" bg="bg-blue-50 dark:bg-blue-900/30" iconBg="bg-blue-600 text-white" />
                    <QuickBtn onClick={() => setShowAIAgent(true)} icon={<Bot size={20}/>} label="AI Agent" color="text-pink-700 dark:text-pink-300" bg="bg-pink-50 dark:bg-pink-900/30" iconBg="bg-pink-600 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-gray-800'}`}>
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-primary-dark text-white flex flex-col overflow-y-auto custom-scrollbar flex-shrink-0">
        <div className="p-6 flex items-center gap-3">
          <BookOpen size={28} />
          <div>
            <h3 className="font-semibold text-lg leading-tight">SmartEdu</h3>
            <p className="text-[10px] text-green-200">Digital Learning Platform</p>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-2">
          <ul className="space-y-2">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => {
                    if (item.isAction) {
                      item.action();
                    } else {
                      setActivePage(item.label);
                    }
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm transition-colors ${activePage === item.label && !item.isAction ? 'bg-primary-light text-white' : 'text-green-200 hover:bg-primary-light hover:text-white'}`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className={`flex justify-between items-center px-8 py-4 border-b transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`flex items-center px-4 py-2 rounded-full w-[400px] ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <Search size={18} className="text-gray-400 mr-3" />
            <input type="text" placeholder="Search courses..." className="bg-transparent border-none outline-none w-full text-sm" />
          </div>

          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="text-gray-400 hover:text-yellow-500 transition-colors">
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <div className="relative cursor-pointer">
              <Bell size={24} className="text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-800">3</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <h4 className="font-semibold text-sm">{user.name}</h4>
                <p className="text-xs text-gray-500">Student Account</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
            </div>
            <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut size={24} />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {renderContent()}
        </div>
      </main>

      {/* AI Agent Modal */}
      {showAIAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[600px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="bg-primary-dark p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bot size={24} />
                <h3 className="font-semibold">AI Study Assistant</h3>
              </div>
              <button onClick={() => setShowAIAgent(false)} className="hover:text-red-300 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user' ? 'bg-primary-light text-white rounded-br-none' : isDarkMode ? 'bg-gray-700 text-white rounded-bl-none' : 'bg-white border text-gray-800 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`rounded-2xl px-4 py-2 text-sm italic ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white border text-gray-500'}`}>
                    AI is thinking...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={sendChatMessage} className={`p-4 border-t flex gap-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                className={`flex-1 px-4 py-2 rounded-full border outline-none focus:border-primary-light ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-200'}`}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button type="submit" className="bg-primary-light text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-dark">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
        html.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; }
      `}</style>
    </div>
  );
}

function StatCard({ icon, bg, title, value, progress, color, footer, footerColor, isDarkMode }) {
  return (
    <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
          {icon}
        </div>
        <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</div>
      </div>
      <div className="text-2xl font-bold mb-3">{value}</div>
      <div className={`h-1.5 rounded-full mb-2 overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className={`h-full rounded-full ${color}`} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={`text-xs font-semibold ${footerColor}`}>{footer}</div>
    </div>
  );
}

function QuickBtn({ icon, label, color, bg, iconBg, onClick }) {
  return (
    <button onClick={onClick} className={`p-4 rounded-xl flex flex-col items-center gap-3 transition-transform hover:scale-105 ${bg} ${color}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <span className="text-xs font-semibold text-center leading-tight">{label}</span>
    </button>
  );
}
