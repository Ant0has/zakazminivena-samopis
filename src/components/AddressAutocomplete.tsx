"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { dadataOsrmService } from "@/lib/dadata-osrm";
import { MapPinIcon, LoaderIcon, PlaneIcon, MountainIcon } from "lucide-react";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Город или адрес",
  icon,
  className,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Закрывать выпадашку при клике вне компонента
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Поиск с дебаунсом 250 мс
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await dadataOsrmService.getSuggestions(value);
        setSuggestions(results);
        setOpen(results.length > 0);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  function pick(item: string) {
    onChange(item);
    setOpen(false);
  }

  function detectIcon(s: string) {
    if (/аэропорт|svo|vko|dme|led|aer|mrv/i.test(s)) return <PlaneIcon className="h-4 w-4 text-emerald" />;
    if (/полян|курорт|териберк|сортавал|рускеал/i.test(s)) return <MountainIcon className="h-4 w-4 text-emerald" />;
    return <MapPinIcon className="h-4 w-4 text-muted-foreground" />;
  }

  return (
    <div ref={wrapperRef} className={`relative ${className ?? ""}`}>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className={`h-11 bg-secondary ${icon ? "pl-9" : ""}`}
        />
        {loading && (
          <LoaderIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-lg border bg-popover p-1 shadow-lg">
          {suggestions.map((s, idx) => (
            <li
              key={`${s}-${idx}`}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(s);
              }}
              className="flex cursor-pointer items-start gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              <span className="mt-0.5 shrink-0">{detectIcon(s)}</span>
              <span className="leading-5">{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
