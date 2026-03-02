import React from 'react'

import { CheckCircle,MessageSquare, Shield } from 'lucide-react';



const Connect = () => {
    
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose LawLink?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Verified Lawyers
              </h3>
              <p className="text-gray-900">
                All lawyers are thoroughly verified and certified by our admin team to ensure quality legal services
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold  mb-3">
                Instant Contact
              </h3>
              <p className="text-gray-600">
                Connect with lawyers instantly and get quick responses to your legal queries
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Messaging
              </h3>
              <p className="text-gray-600">
                Your conversations are private and secure with end-to-end encryption
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Connect
