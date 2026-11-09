import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold shadow-lg shadow-pink-950/50">
          GW
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-100 tracking-wider uppercase">
            API-GATEWAY // Traffic Inspector & Debugger
          </h1>
          <p className="text-[10px] text-slate-400">
            MICROSERVICE ROUTING & LATENCY TELEMETRY WORKSPACE
          </p>
        </div>
      </div>
      <div className="text-xs text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
        <span>
          Gateway Proxy:{" "}
          <strong className="text-pink-400">Active (Edge US-East)</strong>
        </span>
      </div>
    </header>
  );
};
