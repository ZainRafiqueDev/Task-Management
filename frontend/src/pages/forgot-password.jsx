import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4">
      {/* Card */}
      <div className="w-full  p-8 space-y-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40">
        
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800">
          Forgot Password 🔑
        </h1>
        <p className="text-center text-gray-600">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        {/* Form */}
        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-gray-700"
          />
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="px-4 py-2 text-center bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
