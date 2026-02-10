import React, { useState, useEffect } from 'react';

interface TickerData {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
}

export const MechanicaTicker: React.FC = () => {
    const [tickers, setTickers] = useState<TickerData[]>([]);

    useEffect(() => {
        // Fetch initial ticker data
        const fetchTickers = async () => {
            try {
                const res = await fetch('/api/demo/ticker');
                if (res.ok) {
                    const data = await res.json();
                    setTickers(data);
                }
            } catch (error) {
                console.error('Failed to fetch ticker data:', error);
            }
        };

        fetchTickers();

        // Set up polling for updates every 5 seconds
        const interval = setInterval(fetchTickers, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-slate-950 border-y border-slate-800 py-2 overflow-hidden relative group">
            <div 
                className="flex whitespace-nowrap animate-mechanica-ticker-scroll hover:[animation-play-state:paused]"
                aria-live="polite"
                style={{
                    animationPlayState: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'paused' : 'running'
                }}
            >
                {tickers.map((item, idx) => (
                    <div
                        key={`${item.symbol}-${idx}`}
                        className="inline-flex items-center space-x-4 px-8 border-r border-slate-800"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            STK//
                        </span>
                        <span className="text-sm font-bold font-mono text-white tracking-tighter">
                            {item.symbol}
                        </span>
                        <span className="text-xs font-mono text-slate-300">
                            {item.price}
                        </span>
                        <span className={`text-[10px] font-bold font-mono ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {item.change} {item.up ? '▲' : '▼'}
                        </span>
                    </div>
                ))}
            </div>

            {/* Gloss Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-950 via-transparent to-slate-950 opacity-50"></div>
        </div>
    );
};
