'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 p-8 flex flex-col items-center justify-center min-h-screen font-sans">
        <div className="max-w-md w-full text-center space-y-4 p-6 rounded-2xl border border-gray-200 shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">Application Error</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {error?.message || 'An unexpected error occurred in the root layout.'}
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-xl shadow hover:bg-gray-800 transition-all"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
