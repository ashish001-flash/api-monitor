"use client";

import React from 'react';
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react';

interface KVItem {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

interface KVEditorProps {
  items: KVItem[];
  setItems: (items: KVItem[]) => void;
}

export function KVEditor({ items, setItems }: KVEditorProps) {
  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), key: '', value: '', enabled: true }]);
  };

  const updateItem = (id: string, field: 'key' | 'value' | 'enabled', val: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2 group">
          <button
            onClick={() => updateItem(item.id, 'enabled', !item.enabled)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {item.enabled ? <CheckSquare size={16} className="text-indigo-500" /> : <Square size={16} />}
          </button>
          
          <input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={(e) => updateItem(item.id, 'key', e.target.value)}
            className="flex-1 bg-accent/30 border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
          />
          
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => updateItem(item.id, 'value', e.target.value)}
            className="flex-1 bg-accent/30 border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
          />
          
          <button
            onClick={() => removeItem(item.id)}
            className="p-1.5 text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      
      <button
        onClick={addItem}
        className="flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors mt-2"
      >
        <Plus size={14} />
        <span>Add New Row</span>
      </button>
    </div>
  );
}
