"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const MAX_CHARS = 200;

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-zinc-800 px-3 py-2.5 flex items-center gap-2 bg-zinc-950">
      <span className="font-mono text-[11px] text-zinc-600 select-none shrink-0">&gt;</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, MAX_CHARS))}
        onKeyDown={handleKey}
        placeholder="type a command..."
        disabled={disabled}
        className="flex-1 bg-transparent font-mono text-[11px] text-white placeholder:text-zinc-700 outline-none disabled:opacity-40 min-w-0"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      <button
        type="button"
        onClick={submit}
        disabled={!value.trim() || disabled}
        className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors disabled:opacity-30 shrink-0"
        aria-label="send"
      >
        [↵]
      </button>
    </div>
  );
}
