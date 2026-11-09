import type { MicroserviceRoute } from "../types/gateway";

export const MOCK_ROUTES: MicroserviceRoute[] = [
  {
    id: "route-1",
    serviceName: "Auth Service",
    path: "/api/v1/auth/token",
    method: "POST",
    targetUrl: "http://auth-svc.internal:8081/token",
    authRequired: false,
    rateLimit: "100 req/min",
  },
  {
    id: "route-2",
    serviceName: "User Profile Service",
    path: "/api/v1/users/{id}",
    method: "GET",
    targetUrl: "http://users-svc.internal:8082/profile",
    authRequired: true,
    rateLimit: "1000 req/min",
  },
  {
    id: "route-3",
    serviceName: "Payment Gateway Service",
    path: "/api/v1/billing/charge",
    method: "POST",
    targetUrl: "http://billing-svc.internal:8083/charge",
    authRequired: true,
    rateLimit: "50 req/min",
  },
  {
    id: "route-4",
    serviceName: "Telemetry Log Ingest",
    path: "/api/v1/telemetry/ingest",
    method: "POST",
    targetUrl: "http://telemetry-svc.internal:8084/ingest",
    authRequired: true,
    rateLimit: "5000 req/min",
  },
];
