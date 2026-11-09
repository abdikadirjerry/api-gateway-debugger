import React, { useState } from "react";
import { MOCK_ROUTES } from "./data/mockRoutes";
import type { MicroserviceRoute, ApiResponse } from "./types/gateway";
import { Header } from "./components/Header";
import { RouteSelector } from "./components/RouteSelector";
import { RequestBuilder } from "./components/RequestBuilder";
import { ResponseInspector } from "./components/ResponseInspector";

export const App: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<MicroserviceRoute>(
    MOCK_ROUTES[0],
  );
  const [response, setResponse] = useState<ApiResponse | null>({
    status: 200,
    statusText: "OK",
    latencyMs: 64,
    sizeBytes: 342,
    headers: {
      "content-type": "application/json",
      "x-gateway-edge": "us-east-1",
    },
    body: JSON.stringify(
      {
        success: true,
        token: "ey_sec_gateway_token_99812739",
        expiresIn: 3600,
        service: selectedRoute.serviceName,
      },
      null,
      2,
    ),
    timestamp: new Date().toLocaleTimeString(),
  });

  const handleSendRequest = (body: string) => {
    const latency = Math.floor(Math.random() * 80) + 40;
    setResponse({
      status: 200,
      statusText: "OK",
      latencyMs: latency,
      sizeBytes: body.length + 120,
      headers: {
        "content-type": "application/json",
        "x-gateway-route": selectedRoute.path,
      },
      body: JSON.stringify(
        {
          gatewayStatus: "Proxied successfully",
          routedTarget: selectedRoute.targetUrl,
          receivedPayload: JSON.parse(body || "{}"),
          timestamp: new Date().toISOString(),
        },
        null,
        2,
      ),
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col selection:bg-pink-500 selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RouteSelector
            selectedRoute={selectedRoute}
            onSelectRoute={(route) => {
              setSelectedRoute(route);
              setResponse(null);
            }}
          />
          <div className="lg:col-span-2 flex flex-col">
            <RequestBuilder
              route={selectedRoute}
              onSendRequest={handleSendRequest}
            />
          </div>
        </div>

        <ResponseInspector response={response} />
      </main>
    </div>
  );
};

export default App;
