import { useState } from 'react';
import { BookOpenText, Sun, Moon } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login({ onLogin, isDarkMode, toggleTheme }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) return;
    
    setLoading(true);
    setErrorMsg('');

    try {
      const endpoint = isRegister ? '/api/register' : '/api/login';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin(data.user);
      } else {
        setErrorMsg(data.message || 'Authentication failed');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setErrorMsg('');
      try {
        // Fetch user details from Google
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        // Send to our backend
        const response = await fetch(`http://localhost:5000/api/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: userInfo.name, email: userInfo.email })
        });
        
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          onLogin(data.user);
        } else {
          setErrorMsg(data.message || 'Google Auth failed');
        }
      } catch (err) {
        setErrorMsg('Failed to process Google Login');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setErrorMsg('Google Login Failed')
  });

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-primary-dark to-primary-light'}`}>
      
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur transition-colors"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className={`p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="flex items-center justify-center gap-3 mb-6 text-primary-light">
          <BookOpenText size={32} />
          <h2 className="text-2xl font-bold">SmartEdu</h2>
        </div>
        
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {isRegister ? 'Create a new account.' : 'Welcome back! Please login.'}
        </p>

        <form onSubmit={handleSubmit} className="text-left space-y-5">
          
          {errorMsg && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg dark:bg-red-900/30 dark:text-red-300">
              {errorMsg}
            </div>
          )}

          {isRegister && (
            <div>
              <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Full Name</label>
              <input 
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-light transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email Address</label>
            <input 
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-light transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Password</label>
            <input 
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-light transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-light hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>Or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            type="button" 
            className={`mt-6 w-full flex items-center justify-center gap-3 border font-semibold py-3 rounded-lg transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-700'}`}
          >
            <span className="font-bold text-blue-500 text-xl leading-none">G</span>
            Google
          </button>
        </div>

        <p className={`mt-8 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-primary-light font-semibold hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>

      </div>
    </div>
  );
}
