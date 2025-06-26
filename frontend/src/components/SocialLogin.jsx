import React from "react"
import { FaFacebook, FaInstagram } from "react-icons/fa"

export default function SocialLogin() {
  const AUTH_API = import.meta.env.VITE_AUTH_URL

  const handleFacebookLogin = () => {
    window.location.href = `${AUTH_API}/facebook`
  }

  const handleInstagramLogin = () => {
    window.location.href = `${AUTH_API}/instagram`
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-950 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Facebook Login Button */}
        <button
          onClick={handleFacebookLogin}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <FaFacebook className="w-5 h-5 mr-2" />
          Facebook
        </button>

        {/* Instagram Login Button */}
        <button
          onClick={handleInstagramLogin}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
        >
          <FaInstagram className="w-5 h-5 mr-2" />
          Instagram
        </button>
      </div>
    </div>
  )
}
