import { useState } from 'react'
import { useRouter } from 'next/router'
import { Shield, QrCode, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const router = useRouter()
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-10">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Enhanced Security</h2>
                <p className="text-gray-600 mb-6">
                  Two-factor authentication adds an additional layer of security to your account by requiring a second form of verification beyond just a password.
                </p>
                <button 
                  onClick={() => router.push('/setup')}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <QrCode className="h-48 w-48 text-gray-900" />
                  <div className="mt-4 text-center text-sm text-gray-500">Sample QR Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Generate",
              description: "Create a unique secret key and QR code for your account."
            },
            {
              title: "Scan",
              description: "Scan the QR code with your favorite authenticator app."
            },
            {
              title: "Verify",
              description: "Enter the time-based code to complete the setup."
            }
          ].map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  )
}