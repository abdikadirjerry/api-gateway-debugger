import React from "react";
import { MOCK_ROUTES } from "../data/mockRoutes";
import type { MicroserviceRoute } from "../types/gateway";

interface RouteSelectorProps {
  selectedRoute: MicroserviceRoute;
  onSelectRoute: (route: MicroserviceRoute) => void;
}

const methodStyles: Record<string, string> = {
  GET: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  POST: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  PUT: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  DELETE: "bg-rose-500/10 border-rose-500/30 text-rose-400",
};

export const RouteSelector: React.FC<RouteSelectorProps> = ({
  selectedRoute,
  onSelectRoute,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
      <h2 className="text-xs font-bold text-pink-400 uppercase tracking-wider">
        Gateway Routes & Services
      </h2>
      <div className="space-y-2.5">
        {MOCK_ROUTES.map((route) => {
          const isSelected = route.id === selectedRoute.id;
          return (
            <button
              key={route.id}
              onClick={() => onSelectRoute(route)}
              className={`w-full text-left bg-slate-950 border p-3 rounded-xl transition-all space-y-1.5 ${
                isSelected
                  ? "border-pink-500 shadow-md shadow-pink-950/50 bg-slate-900"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${methodStyles[route.method]}`}
                >
                  {route.method}
                </span>
                <span className="text-[10px] text-slate-500">
                  {route.rateLimit}
                </span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-200">
                  {route.serviceName}
                </h3>
                <p className="text-[10px] text-slate-400 font-mono truncate">
                  {route.path}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
