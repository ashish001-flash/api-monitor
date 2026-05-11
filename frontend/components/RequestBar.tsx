"use client";

import React from 'react';
import { Send, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

interface RequestBarProps {
  method: string;
  setMethod: (method: string) => void;
  url: string;
  setUrl: (url: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function RequestBar({ method, setMethod, url, setUrl, onSend, isLoading }: RequestBarProps) {
  return (
    <div className="flex items-center gap-2 p-4 glass-card rounded-xl border border-white/5 shadow-2xl">
      <div className="relative group">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="appearance-none bg-accent/50 text-indigo-400 font-bold px-4 py-2 pr-10 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all"
        >
          {METHODS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={16} />
      </div>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://api.example.com/v1/resource"
        className="flex-1 bg-accent/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
      />

      <button
        onClick={onSend}
        disabled={isLoading || !url}
        className={cn(
          "bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95",
          isLoading && "animate-pulse"
        )}
      >
        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        <span>Send</span>
      </button>
    </div>
  );
}
