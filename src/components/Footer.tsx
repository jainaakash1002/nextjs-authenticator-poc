import { ShieldCheck, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">SecureAuth</span>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/jainaakash1002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} SecureAuth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}