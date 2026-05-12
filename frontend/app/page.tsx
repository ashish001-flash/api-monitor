"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from '@/components/Sidebar';
import { RequestBar } from '@/components/RequestBar';
import { ResponseViewer } from '@/components/ResponseViewer';
import { KVEditor } from '@/components/KVEditor';
import { BodyEditor } from '@/components/BodyEditor';
import { Save, Share2, Settings } from 'lucide-react';

export default function Home() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([{ id: '1', key: '', value: '', enabled: true }]);
  const [headers, setHeaders] = useState([{ id: '1', key: 'Content-Type', value: 'application/json', enabled: true }]);
  const [body, setBody] = useState('{\n  "key": "value"\n}');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('at_history');
    const savedCollections = localStorage.getItem('at_collections');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedCollections) setCollections(JSON.parse(savedCollections));
  }, []);

  const handleSend = async () => {
    setIsLoading(true);
    setResponse(null);

    // Build query params
    const activeParams = params.filter(p => p.enabled && p.key);
    const queryString = activeParams.length > 0 
      ? '?' + activeParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&')
      : '';
    
    const fullUrl = url.includes('?') ? url : url + queryString;

    // Build headers
    const activeHeaders = headers.reduce((acc: any, h) => {
      if (h.enabled && h.key) acc[h.key] = h.value;
      return acc;
    }, {});

    try {
      // Call our proxy backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await axios.post(`${apiUrl}/api/proxy`, {
        method,
        url: fullUrl,
        headers: activeHeaders,
        data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) ? JSON.parse(body) : null
      });

      setResponse(res.data);

      // Add to history
      const historyItem = { method, url, timestamp: Date.now() };
      const newHistory = [historyItem, ...history.slice(0, 19)];
      setHistory(newHistory);
      localStorage.setItem('at_history', JSON.stringify(newHistory));

    } catch (err: any) {
      setResponse({
        status: 500,
        statusText: 'INTERNAL ERROR',
        data: err.response?.data || { error: err.message },
        latency: 0,
        size: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item: any) => {
    setMethod(item.method);
    setUrl(item.url);
  };

  const saveToCollection = () => {
    const name = prompt('Enter a name for this collection item:');
    if (name) {
      const newItem = { name, method, url, params, headers, body };
      const newCollections = [...collections, newItem];
      setCollections(newCollections);
      localStorage.setItem('at_collections', JSON.stringify(newCollections));
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('at_history');
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0f18] text-foreground overflow-hidden">
      <Sidebar 
        history={history} 
        collections={collections} 
        onSelect={handleSelectHistory} 
        onClearHistory={clearHistory}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 glass z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-muted-foreground">My Workspace</h2>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={saveToCollection} className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 transition-all border border-indigo-500/20">
              <Save size={16} />
              <span>Save</span>
            </button>
            <button className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
          <RequestBar 
            method={method} 
            setMethod={setMethod} 
            url={url} 
            setUrl={setUrl} 
            onSend={handleSend} 
            isLoading={isLoading}
          />

          <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
            {/* Workspace Editor */}
            <div className="flex-1 flex flex-col min-h-0 glass-card rounded-xl border border-white/5 overflow-hidden">
              <Tabs defaultValue="params" className="flex-1 flex flex-col">
                <div className="px-4 pt-4">
                  <TabsList className="bg-accent/30 w-full justify-start gap-1 p-1 h-auto">
                    <TabsTrigger value="params" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-all">Params</TabsTrigger>
                    <TabsTrigger value="headers" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-all">Headers</TabsTrigger>
                    <TabsTrigger value="body" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-all">Body</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                  <TabsContent value="params" className="m-0 focus-visible:outline-none">
                    <KVEditor items={params} setItems={setParams} />
                  </TabsContent>
                  <TabsContent value="headers" className="m-0 focus-visible:outline-none">
                    <KVEditor items={headers} setItems={setHeaders} />
                  </TabsContent>
                  <TabsContent value="body" className="m-0 focus-visible:outline-none">
                    <BodyEditor content={body} setContent={setBody} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Response Area */}
            <div className="flex-1 flex flex-col min-h-0 glass-card rounded-xl border border-white/5 overflow-hidden shadow-2xl">
              <ResponseViewer response={response} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
