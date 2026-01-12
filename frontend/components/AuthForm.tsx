import React, { useState } from 'react';

interface AuthFormProps {
  mode?: 'login' | 'signup';
}

export default function AuthForm({ mode = 'login' }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    // Basic client-side validation check
    if (!email || !password) {
        setFormError("Please enter both email and password.");
        return;
    }

    // Demo mode - show success message
    if (mode === 'login') {
      setFormError("Demo mode: Login functionality disabled");
    } else {
      setFormError("Demo mode: Signup functionality disabled");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
      <label className="flex flex-col w-full text-sm">
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email" // Added autocomplete for better UX
          className="mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </label>
      <label className="flex flex-col w-full text-sm">
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          className="mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </label>
      <button
        type="submit"
        className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
      
      {/* Display the friendly formError */}
      {formError && (
        <div className="mt-2 text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-md">
          {formError}
        </div>
      )}
    </form>
  );
}