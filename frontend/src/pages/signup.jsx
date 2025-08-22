import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
   
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pakistan phone regex: accepts 0300... or +92300...
    // const phoneRegex = /^(?:\+92|0)3[0-9]{9}$/;
    // if (!phoneRegex.test(formData.phone)) {
    //   alert("❌ Enter a valid Pakistani phone number (e.g. 03001234567 or +923001234567)");
    //   return;
    // }

    console.log("✅ Form submitted:", formData);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Employee">Employee</option>
          </select>

          {/* Mobile Number */}
          {/* <input
            type="tel"
            name="phone"
            placeholder="Mobile Number (03XXXXXXXXX or +923XXXXXXXXX)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          /> */} 

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       text-white font-semibold rounded-lg shadow-lg 
                       hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 
                       transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Already have an account?</p>
          <Link
            to="/"
            className="inline-block w-full sm:w-auto px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
