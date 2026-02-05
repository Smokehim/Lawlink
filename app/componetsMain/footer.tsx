import React from 'react'
import { Shield } from 'lucide-react'
const Footer = () => {
  return (
    <div className='flex flex-col p-5  bg-gray-900'>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">Lawlink</span>
              </div>
              <p className="text-gray-400">
                Connecting Zambians with verified legal professionals
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                  // onClick={() => onNavigate('client-register')} 
                  className="hover:text-white transition-colors">
                    For Clients
                  </button>
                </li>
                <li>
                  <button 
                  // onClick={() => onNavigate('lawyer-login')} 
                  className="hover:text-white transition-colors">
                    For Lawyers
                  </button>
                </li>
                <li>
                  <button 
                  // onClick={() => onNavigate('admin-login')} 
                  className="hover:text-white transition-colors">
                    Admin Portal
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Email: info@legalconnect.zm</p>
              <p className="text-gray-400">Phone: +260 XXX XXX XXX</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 LegalConnect Zambia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
