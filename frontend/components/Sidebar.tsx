"use client";

import React from 'react';
import { History, Bookmark, Plus, Search, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  history: any[];
  collections: any[];
  onSelect: (item: any) => void;
  onClearHistory: () => void;
}

export function Sidebar({ history, collections, onSelect, onClearHistory }: SidebarProps) {
  return (
    <div className="w-64 h-full border-r border-border bg-card/30 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="font-bold text-white text-sm">RR</span>
          </div>
          <h1 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Api-Tester
          </h1>
        </div>
        <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground">
          <Plus size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-accent/50 border border-border rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-6">
            <section>
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <Bookmark size={12} />
                  <span>Collections</span>
                </div>
              </div>
              <div className="space-y-1">
                {collections.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-1 italic">No collections yet</p>
                ) : (
                  collections.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => onSelect(c)}
                      className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-accent transition-colors truncate"
                    >
                      {c.name}
                    </button>
                  ))
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <History size={12} />
                  <span>History</span>
                </div>
                <button
                  onClick={onClearHistory}
                  className="p-1 rounded-md hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="space-y-1">
                {history.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-1 italic">No history yet</p>
                ) : (
                  history.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => onSelect(h)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-accent transition-colors group"
                    >
                      <span className={cn(
                        "text-[10px] font-bold min-w-[32px]",
                        h.method === 'GET' ? 'text-green-400' :
                          h.method === 'POST' ? 'text-blue-400' :
                            h.method === 'PUT' ? 'text-orange-400' :
                              'text-red-400'
                      )}>
                        {h.method}
                      </span>
                      <span className="truncate text-foreground/80 group-hover:text-foreground">
                        {h.url || 'Untitled Request'}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
