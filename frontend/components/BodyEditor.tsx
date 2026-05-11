"use client";

import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

interface BodyEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export function BodyEditor({ content, setContent }: BodyEditorProps) {
  return (
    <div className="border border-border rounded-lg bg-accent/20 overflow-hidden min-h-[200px]">
      <Editor
        value={content}
        onValueChange={code => setContent(code)}
        highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
        padding={15}
        className="font-mono text-sm min-h-[200px] focus:outline-none"
        style={{
          fontFamily: '"Geist Mono", "Fira code", "Fira Mono", monospace',
          fontSize: 14,
        }}
      />
    </div>
  );
}
