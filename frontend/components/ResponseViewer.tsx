"use client";

import React, { useEffect } from 'react';
import { Copy, Clock, Database, CheckCircle, AlertCircle } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
import { cn } from '@/lib/utils';

interface ResponseViewerProps {
  response: any;
  isLoading: boolean;
}

export function ResponseViewer({ response, isLoading }: ResponseViewerProps) {
  useEffect(() => {
    if (response) {
      Prism.highlightAll();
    }
  }, [response]);

  const copyToClipboard = () => {
    if (response && response.data) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground animate-in fade-in duration-500">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mb-4" />
        <p className="text-sm font-medium">Executing Request...</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/40 border-2 border-dashed border-border rounded-xl m-4">
        <Database size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">No response yet</p>
        <p className="text-sm">Send a request to see the response here</p>
      </div>
    );
  }

  const isError = response.status >= 400;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-card/20 overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between glass">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-muted-foreground">Status:</span>
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-sm font-bold",
              isError ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"
            )}>
              {isError ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
              {response.status} {response.statusText}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={14} className="text-muted-foreground" />
            <span className="text-xs uppercase font-bold text-muted-foreground">Time:</span>
            <span className="text-sm font-semibold text-indigo-400">{response.latency} ms</span>
          </div>

          <div className="flex items-center gap-2">
            <Database size={14} className="text-muted-foreground" />
            <span className="text-xs uppercase font-bold text-muted-foreground">Size:</span>
            <span className="text-sm font-semibold text-cyan-400">
              {response.size > 1024 ? `${(response.size / 1024).toFixed(2)} KB` : `${response.size} B`}
            </span>
          </div>
        </div>

        <button
          onClick={copyToClipboard}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors flex items-center gap-2 text-sm"
        >
          <Copy size={16} />
          <span>Copy</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <pre className="rounded-xl overflow-hidden text-sm leading-relaxed">
          <code className="language-json">
            {JSON.stringify(response.data, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
}
