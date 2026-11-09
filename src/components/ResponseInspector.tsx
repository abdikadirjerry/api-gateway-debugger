import React from "react";
import type { ApiResponse } from "../types/gateway";

interface ResponseInspectorProps {
  response: ApiResponse | null;
}

export const ResponseInspector: React.FC<ResponseInspectorProps> = ({
  response,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col flex-1">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Gateway Response & Telemetry
        </h2>
        {response ? (
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-lg border bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold">
              {response.status} {response.statusText}
            </span>
            <span className="text-slate-400">⏱️ {response.latencyMs}ms</span>
            <span className="text-slate-400">
              📦 {response.sizeBytes} bytes
            </span>
          </div>
        ) : (
          <span className="text-xs text-slate-500">
            Awaiting request execution...
          </span>
        )}
      </div>

      {response ? (
        <div className="space-y-4 flex-1 flex flex-col">
          {/* Latency Waterfall */}
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Latency Waterfall Timeline
            </span>
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-300">
                <span>1. DNS Resolution & TLS Handshake</span>
                <span className="text-pink-400">12ms</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-pink-500 h-full w-[15%]"></div>
              </div>

              <div className="flex justify-between text-slate-300 pt-1">
                <span>2. API Gateway Auth & Rate Limit Check</span>
                <span className="text-cyan-400">18ms</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[30%]"></div>
              </div>

              <div className="flex justify-between text-slate-300 pt-1">
                <span>3. Microservice Upstream Execution</span>
                <span className="text-emerald-400">
                  {response.latencyMs - 30}ms
                </span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[75%]"></div>
              </div>
            </div>
          </div>

          {/* Response Payload */}
          <div className="flex-1 flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
              Response JSON Body
            </span>
            <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-emerald-400 font-mono overflow-auto max-h-[220px]">
              {response.body}
            </pre>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center py-16 text-slate-500 text-xs">
          Execute an API request from the workbench to inspect response
          telemetry and waterfall latency.
        </div>
      )}
    </div>
  );
};
