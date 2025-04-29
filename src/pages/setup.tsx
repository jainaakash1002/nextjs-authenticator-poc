import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader2, QrCode, CheckCircle, ArrowRight, Copy } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Setup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    generateSecret()
  }, [])

  const generateSecret = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate')
      const data = await response.json()

      if (response.ok) {
        setSecret(data.secret)
        setQrCode(data.qrCode)
      } else {
        setError(data.error || 'Failed to generate QR code')
      }
    } catch (err) {
      setError('Error connecting to server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!secret) return

    navigator.clipboard.writeText(secret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Set Up Two-Factor Authentication
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Scan the QR code with your authenticator app to get started.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
              <p className="text-lg text-gray-600">Generating your secure code...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">{error}</div>
              <button
                onClick={generateSecret}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Scan QR Code</h2>
                <div className="space-y-6">
                  <p className="text-gray-600">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.).
                  </p>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Your Secret Key:</h3>
                    <div className="flex items-center">
                      <code className="bg-gray-100 px-3 py-1 rounded text-sm mr-2 flex-1 overflow-x-auto">
                        {secret}
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                        aria-label="Copy to clipboard"
                      >
                        {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button
                      onClick={() => {
                        if (secret)
                          localStorage.setItem('2fa_secret', secret);
                        router.push('/verify')
                      }
                      }
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      Continue to Verification
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                {qrCode ? (
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <img
                      src={qrCode}
                      alt="QR Code for 2FA"
                      className="h-64 w-64"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 w-64 bg-gray-100 rounded-lg">
                    <QrCode className="h-20 w-20 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Don't have an authenticator app?</h3>
          <p className="text-blue-700 mb-4">
            Download one of these popular authenticator apps to get started:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://apps.apple.com/us/app/google-authenticator/id388497605"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-white rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Google Authenticator</div>
            </a>
            <a
              href="https://authy.com/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-white rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Authy</div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}