import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'

export default function Verify() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [secret, setSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // In a real app, this would be stored securely or passed via state management
    // For demo purposes we'll use localStorage
    const savedSecret = localStorage.getItem('2fa_secret')
    if (savedSecret) {
      setSecret(savedSecret)
    } else {
      router.push('/setup')
    }
  }, [router])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    if (!token || token.length < 6) {
      setError('Please enter a valid token')
      setLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, secret }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setVerified(true)
        // In a real app, you'd update the user's profile to mark 2FA as enabled
      } else {
        setError(data.error || 'Failed to verify token')
      }
    } catch (err) {
      setError('Error connecting to server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const resetProcess = () => {
    setVerified(false)
    setToken('')
    setError(null)
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Verify Your Two-Factor Authentication
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter the 6-digit code from your authenticator app to complete the setup.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-10 max-w-md mx-auto">
          {verified ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your two-factor authentication has been successfully set up.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </button>
                <button 
                  onClick={resetProcess}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Test Again
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <button
                type="button"
                onClick={() => router.push('/setup')}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to setup
              </button>
              
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                  Authentication Code
                </label>
                <input
                  type="text"
                  id="token"
                  name="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, '').substring(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg tracking-widest text-center"
                  maxLength={6}
                  autoComplete="one-time-code"
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-red-700 text-sm">{error}</div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || token.length !== 6}
                className={`w-full px-6 py-3 rounded-md text-white font-medium transition-all duration-200 ${
                  loading || token.length !== 6
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Verifying...
                  </span>
                ) : (
                  'Verify Code'
                )}
              </button>
              
              <div className="text-sm text-gray-500 text-center">
                Open your authenticator app to view your authentication code.
              </div>
            </form>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  )
}