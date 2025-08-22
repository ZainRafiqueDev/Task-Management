import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4">
      {/* Card */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40">
        
        {/* Heading */}
       <h1 className="text-4xl font-extrabold text-center text-gray-800">
  Welcome Back <span className="wave">👋</span>
</h1>

        <p className="text-center text-gray-600">
          Login to continue to your account
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-gray-700"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-gray-700"
          />

          {/* Role Selection */}
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-gray-700"
            defaultValue=""
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="teamlead">Team Lead</option>
            <option value="employee">Employee</option>
          </select>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Extra Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-4 py-2 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </Link>

          <Link
            to="/forgot-password"
            className="w-full sm:w-auto px-4 py-2 text-center bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}

