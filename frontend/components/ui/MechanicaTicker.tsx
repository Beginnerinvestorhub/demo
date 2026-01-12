import React from 'react';

const MOCK_TICKERS = [
    { symbol: 'PROTOC', price: '1,420.50', change: '+1.2%', up: true },
    { symbol: 'VALVE', price: '89.20', change: '-0.4%', up: false },
    { symbol: 'OSCILL', price: '450.75', change: '+2.1%', up: true },
    { symbol: 'GEAR', price: '12.40', change: '+0.0%', up: true },
    { symbol: 'PISTON', price: '2,840.10', change: '-1.5%', up: false },
    { symbol: 'BOILER', price: '67.30', change: '+0.8%', up: true },
    { symbol: 'CLUTCH', price: '124.50', change: '+3.4%', up: true },
];

export const MechanicaTicker: React.FC = () => {
    return (
        <div className="w-full bg-slate-950 border-y border-slate-800 py-2 overflow-hidden relative group">
            <div className="flex whitespace-nowrap animate-mechanica-ticker-scroll hover:[animation-play-state:paused]">
                {[...MOCK_TICKERS, ...MOCK_TICKERS].map((item, idx) => (
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
