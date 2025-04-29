import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SecureAuth</span>
          </Link>
          
          <nav className="flex space-x-4">
            <Link 
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/setup"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Setup 2FA
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}