import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthFormProps {
  mode?: 'login' | 'signup';
}

export default function AuthForm({ mode = 'login' }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { login, signup, loading, error } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    // Basic client-side validation check
    if (!email || !password) {
      setFormError("Please enter both email and password.");
      return;
    }

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      // Successful auth will trigger redirect in login page
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed. Please try again.';
      setFormError(errorMessage);
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
          className="mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
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
          className="mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full px-4 py-2 bg-mechanica-moonlight-blue text-white rounded-md hover:bg-mechanica-moonlight-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (mode === 'login' ? 'Signing in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
      </button>

      {/* Display form errors and auth errors */}
      {(formError || error) && (
        <div className="mt-2 text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-md">
          {formError || error}
        </div>
      )}
    </form>
  );
}