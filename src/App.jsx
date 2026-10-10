import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  if (!user) {
    return <Login onLogin={(userData) => setUser(userData)} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
}

export default App;
