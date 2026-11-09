import React, { useState } from "react";
import type { MicroserviceRoute } from "../types/gateway";

interface RequestBuilderProps {
  route: MicroserviceRoute;
  onSendRequest: (body: string) => void;
}

export const RequestBuilder: React.FC<RequestBuilderProps> = ({
  route,
  onSendRequest,
}) => {
  const [activeTab, setActiveTab] = useState<"headers" | "body">("body");
  const [requestBody, setRequestBody] = useState<string>(
    JSON.stringify(
      route.method === "POST"
        ? {
            clientId: "client_xyz_890",
            scope: "read:profile write:billing",
            timestamp: new Date().toISOString(),
          }
        : {},
      null,
      2,
    ),
  );

  return (
    <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col flex-1">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            API Request Workbench
          </h2>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            Proxy Target: {route.targetUrl}
          </p>
        </div>
        <button
          onClick={() => onSendRequest(requestBody)}
          className="bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-lg shadow-pink-950/50"
        >
          Send Request ⚡
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-800/60 pb-2 text-xs">
        <button
          onClick={() => setActiveTab("body")}
          className={`px-3 py-1 rounded-lg border transition-all ${
            activeTab === "body"
              ? "bg-pink-500/10 border-pink-500/40 text-pink-400 font-bold"
              : "bg-slate-950 border-slate-800 text-slate-400"
          }`}
        >
          JSON Payload Body
        </button>
        <button
          onClick={() => setActiveTab("headers")}
          className={`px-3 py-1 rounded-lg border transition-all ${
            activeTab === "headers"
              ? "bg-pink-500/10 border-pink-500/40 text-pink-400 font-bold"
              : "bg-slate-950 border-slate-800 text-slate-400"
          }`}
        >
          Gateway Headers ({route.authRequired ? "Auth Required" : "Public"})
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        {activeTab === "body" ? (
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            rows={8}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-pink-500 flex-1 resize-none"
          />
        ) : (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono space-y-2 text-slate-300">
            <div>
              <strong className="text-pink-400">Authorization:</strong> Bearer
              sec_token_prod_99281a
            </div>
            <div>
              <strong className="text-pink-400">X-Gateway-Route:</strong>{" "}
              {route.serviceName}
            </div>
            <div>
              <strong className="text-pink-400">X-Request-ID:</strong> req_
              {Math.random().toString(16).substring(2, 10)}
            </div>
            <div>
              <strong className="text-pink-400">Content-Type:</strong>{" "}
              application/json
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
