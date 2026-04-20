import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { Button } from '../components/UIComponents.jsx'
import { validateEmail, validatePassword } from '../utils/helpers.js'
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login, signup, showToast } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) return setError('Invalid email address')
    if (!validatePassword(password)) return setError('Password must be at least 6 characters')
    if (!isLogin && !name.trim()) return setError('Name is required')

    const result = isLogin ? login(email, password) : signup(name.trim(), email, password)

    if (result.success) {
      showToast(isLogin ? 'Welcome back!' : 'Account created!')
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <span className="text-5xl">📚</span>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isLogin ? 'Login to your dashboard' : 'Join TaskOrbit today'}
          </p>
        </div>

        <div className="
          rounded-2xl p-6
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          shadow-lg
        ">

          {error && (
            <div className="
              mb-4 p-3 rounded-lg 
              bg-red-100 text-red-600 
              dark:bg-red-500/10 dark:text-red-400
              border border-red-200 dark:border-red-500/20
              text-sm
            ">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Name
                </label>

                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="
                      w-full pl-9 pr-4 py-2.5 rounded-xl
                      border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-900
                      text-gray-800 dark:text-gray-100 text-sm
                      focus:outline-none focus:ring-2 focus:ring-indigo-500
                      placeholder:text-gray-400
                    "
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Email
              </label>

              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="
                    w-full pl-9 pr-4 py-2.5 rounded-xl
                    border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900
                    text-gray-800 dark:text-gray-100 text-sm
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    placeholder:text-gray-400
                  "
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Password
              </label>

              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="
                    w-full pl-9 pr-4 py-2.5 rounded-xl
                    border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900
                    text-gray-800 dark:text-gray-100 text-sm
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    placeholder:text-gray-400
                  "
                />
              </div>
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              {isLogin
                ? <><LogIn size={16} /> Login</>
                : <><UserPlus size={16} /> Sign Up</>}
            </Button>

          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError('') }}
              className="
                text-sm text-indigo-600 dark:text-indigo-400
                hover:underline transition
              "
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}