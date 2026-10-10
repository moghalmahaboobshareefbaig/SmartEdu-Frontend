import React, { useState } from 'react';
import { BookOpen, Video, ClipboardList, CheckSquare, Library as LibraryIcon, StickyNote, HelpCircle, TrendingUp, Award, Bell, Play, FileText, Download } from 'lucide-react';

export function MyCourses({ isDarkMode, onCourseComplete }) {
  const [activeCourse, setActiveCourse] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [finished, setFinished] = useState(false);

  const coursesData = [
    { name: 'Mathematics', questions: [
      { q: 'What is the value of Pi (approx)?', options: ['3.14', '2.71', '1.61', '3.00'], answer: '3.14' },
      { q: 'What is the square root of 144?', options: ['10', '12', '14', '16'], answer: '12' },
      { q: 'What is 5 cubed (5³)?', options: ['125', '150', '25', '100'], answer: '125' },
      { q: 'If x + 5 = 12, what is x?', options: ['5', '6', '7', '8'], answer: '7' },
      { q: 'What is the area of a square with side 4?', options: ['8', '12', '16', '20'], answer: '16' }
    ]},
    { name: 'Science', questions: [
      { q: 'What is the chemical symbol for water?', options: ['H2O', 'O2', 'CO2', 'HO'], answer: 'H2O' },
      { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 'Mars' },
      { q: 'What gas do plants need for photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'], answer: 'Carbon Dioxide' },
      { q: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Quartz'], answer: 'Diamond' },
      { q: 'How many bones are in the adult human body?', options: ['206', '208', '210', '200'], answer: '206' }
    ]}
  ];

  const handleStart = (course) => {
    if (completedCourses.includes(course.name)) return;
    setActiveCourse(course);
    setCurrentQIndex(0);
    setFinished(false);
  };

  const handleAnswer = (option) => {
    // Only proceed if correct for learning purposes (or just proceed anyway)
    // We will just proceed to next question
    if (currentQIndex + 1 < activeCourse.questions.length) {
      setCurrentQIndex(i => i + 1);
    } else {
      setFinished(true);
      if (!completedCourses.includes(activeCourse.name)) {
        setCompletedCourses([...completedCourses, activeCourse.name]);
        if (onCourseComplete) onCourseComplete();
      }
    }
  };

  if (activeCourse) {
    return (
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><BookOpen /> Studying: {activeCourse.name}</h2>
        {finished ? (
          <div className="text-center p-8">
            <h3 className="text-3xl font-bold mb-4 text-green-500">Course Module Completed!</h3>
            <p className="text-xl mb-6">You successfully answered all 5 questions.</p>
            <button onClick={() => setActiveCourse(null)} className="bg-primary-light text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark">Back to Courses</button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <p className="text-sm font-semibold mb-4 text-primary-light">Learning Check {currentQIndex + 1} of 5</p>
            <h3 className="text-xl font-semibold mb-6">{activeCourse.questions[currentQIndex].q}</h3>
            <div className="grid grid-cols-1 gap-4">
              {activeCourse.questions[currentQIndex].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(opt)}
                  className={`p-4 rounded-xl border text-left font-semibold transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><BookOpen /> My Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map(course => {
          const isCompleted = completedCourses.includes(course.name);
          return (
            <div key={course.name} className={`p-5 rounded-xl border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
              <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isCompleted ? 'Module Completed' : '5 practice questions pending'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-primary-light h-2 rounded-full" style={{ width: isCompleted ? '100%' : '0%' }}></div>
              </div>
              <button 
                onClick={() => handleStart(course)}
                disabled={isCompleted}
                className={`w-full py-2 rounded-lg font-semibold transition-colors ${isCompleted ? 'bg-green-600 text-white cursor-default' : 'bg-primary-light text-white hover:bg-primary-dark'}`}
              >
                {isCompleted ? 'Completed' : 'Continue Learning'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LiveClasses({ isDarkMode }) {
  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Video /> Live Classes Schedule</h2>
      <div className="space-y-4">
        {[
          { title: 'Algebra Equations', time: 'Today, 10:00 AM', subject: 'Math', active: true },
          { title: 'Photosynthesis', time: 'Tomorrow, 11:00 AM', subject: 'Science', active: false },
          { title: 'Grammar Basics', time: 'Oct 12, 09:00 AM', subject: 'English', active: false }
        ].map((cls, i) => (
          <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-white'}`}>
            <div>
              <h4 className="font-semibold">{cls.title} <span className="text-xs ml-2 px-2 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">{cls.subject}</span></h4>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cls.time}</p>
            </div>
            <button className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 ${cls.active ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-600 dark:text-gray-300'}`}>
              {cls.active ? <><Play size={16}/> Join Now</> : 'Set Reminder'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Assignments({ isDarkMode }) {
  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ClipboardList /> Pending Assignments</h2>
      <div className="space-y-4">
        {['Math Worksheet 5', 'Science Lab Report', 'English Essay'].map((ass, i) => (
          <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="flex items-center gap-4">
              <FileText className="text-primary-light" size={30} />
              <div>
                <h4 className="font-semibold">{ass}</h4>
                <p className="text-red-500 text-xs font-semibold mt-1">Due Tomorrow</p>
              </div>
            </div>
            <button className="bg-primary-light text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark">Submit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Quizzes({ isDarkMode, onQuizComplete }) {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const quizzes = [
    {
      id: 1, title: 'Mid-Term Math Quiz', questions: [
        { q: 'What is 15 + 27?', options: ['32', '42', '52', '45'], answer: '42' },
        { q: 'What is 8 x 7?', options: ['54', '56', '64', '48'], answer: '56' }
      ]
    },
    {
      id: 2, title: 'Biology Chapter 1', questions: [
        { q: 'What part of the plant conducts photosynthesis?', options: ['Root', 'Stem', 'Leaf', 'Flower'], answer: 'Leaf' },
        { q: 'What gas do plants absorb?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], answer: 'Carbon Dioxide' }
      ]
    }
  ];

  const handleStart = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQIndex(0);
    setScore(0);
    setFinished(false);
  };

  const handleAnswer = (option) => {
    if (option === activeQuiz.questions[currentQIndex].answer) {
      setScore(s => s + 1);
    }
    
    if (currentQIndex + 1 < activeQuiz.questions.length) {
      setCurrentQIndex(i => i + 1);
    } else {
      setFinished(true);
      if (onQuizComplete) onQuizComplete();
    }
  };

  if (activeQuiz) {
    return (
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CheckSquare /> {activeQuiz.title}</h2>
        
        {finished ? (
          <div className="text-center p-8">
            <h3 className="text-3xl font-bold mb-4">Quiz Completed!</h3>
            <p className="text-xl mb-6">You scored {score} out of {activeQuiz.questions.length}</p>
            <button onClick={() => setActiveQuiz(null)} className="bg-primary-light text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark">Back to Quizzes</button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <p className="text-sm font-semibold mb-4 text-primary-light">Question {currentQIndex + 1} of {activeQuiz.questions.length}</p>
            <h3 className="text-xl font-semibold mb-6">{activeQuiz.questions[currentQIndex].q}</h3>
            <div className="grid grid-cols-1 gap-4">
              {activeQuiz.questions[currentQIndex].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(opt)}
                  className={`p-4 rounded-xl border text-left font-semibold transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CheckSquare /> Upcoming Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((q) => (
          <div key={q.id} className={`p-5 rounded-xl border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className="font-semibold text-lg mb-2">{q.title}</h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{q.questions.length} Questions</p>
            <button onClick={() => handleStart(q)} className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700">Start Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Library({ isDarkMode }) {
  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><LibraryIcon /> E-Library Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Physics Vol 1', 'History of World', 'Grammar Guide'].map((book, i) => (
          <div key={i} className={`p-4 text-center rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <BookOpen size={40} className="text-gray-400" />
            </div>
            <h4 className="font-semibold mb-2">{book}</h4>
            <button className="text-primary-light text-sm font-semibold flex items-center justify-center gap-2 mx-auto"><Download size={14}/> Download PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Notes({ isDarkMode }) {
  const [notes, setNotes] = useState('My study notes...');
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><StickyNote /> Personal Notes</h2>
      <textarea 
        className={`w-full h-64 p-4 rounded-xl border focus:outline-primary-light resize-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`}
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Type your notes here..."
      />
      <div className="mt-4 flex items-center gap-4">
        <button onClick={handleSave} className="bg-primary-light text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark">Save Notes</button>
        {saved && <span className="text-green-500 font-semibold text-sm">Notes saved successfully!</span>}
      </div>
    </div>
  );
}

export function DoubtCenter({ isDarkMode }) {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(question.trim()){
      setSubmitted(true);
      setQuestion('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  }

  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><HelpCircle /> Doubt Center</h2>
      <form onSubmit={handleSubmit} className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className="font-semibold mb-4">Ask a new question</h3>
        <textarea 
          className={`w-full h-32 p-3 mb-4 rounded-lg border focus:outline-primary-light resize-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
          placeholder="Describe your doubt here..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <button type="submit" className="bg-primary-light text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark">Submit Question</button>
        {submitted && <p className="text-green-500 mt-3 text-sm font-semibold">Your question has been sent to a teacher!</p>}
      </form>
    </div>
  );
}

export function Progress({ isDarkMode }) {
  return (
    <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center min-h-[400px] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <TrendingUp size={60} className="text-primary-light mb-4" />
      <h2 className="text-2xl font-bold mb-2">Your Progress Analytics</h2>
      <p className={`text-center max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Detailed charts and analytics will appear here as you complete more lessons and quizzes!</p>
    </div>
  );
}

export function Certificates({ isDarkMode }) {
  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Award /> My Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['Basics of Math', 'Intro to Biology'].map((cert, i) => (
          <div key={i} className={`flex items-center gap-6 p-6 rounded-xl border ${isDarkMode ? 'border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800' : 'border-gray-200 bg-gradient-to-r from-green-50 to-white'}`}>
            <Award size={50} className="text-yellow-500" />
            <div>
              <h3 className="font-bold text-lg">{cert}</h3>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Issued: Oct 2026</p>
              <button className="text-sm bg-primary-light text-white px-4 py-1.5 rounded font-semibold">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Announcements({ isDarkMode }) {
  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Bell /> Latest Announcements</h2>
      <div className="space-y-4">
        {[
          { title: 'School Closed on Friday', date: 'Oct 8, 2026', type: 'alert' },
          { title: 'New Math Courses Available', date: 'Oct 7, 2026', type: 'info' }
        ].map((ann, i) => (
          <div key={i} className={`p-4 rounded-xl border-l-4 ${ann.type === 'alert' ? 'border-l-red-500' : 'border-l-blue-500'} ${isDarkMode ? 'bg-gray-700 border-y-gray-700 border-r-gray-700' : 'bg-gray-50 border-y-gray-100 border-r-gray-100'}`}>
            <h4 className="font-semibold">{ann.title}</h4>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ann.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
