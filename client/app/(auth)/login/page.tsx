'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/dashboard';
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-white text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 p-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block  text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 p-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={handleClick}
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p className="text-white">Donot have an account?</p>
           
            <Link href="/register" className="text-blue-500 hover:text-blue-700">
             Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
