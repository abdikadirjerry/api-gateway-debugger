export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface MicroserviceRoute {
  id: string;
  serviceName: string;
  path: string;
  method: HttpMethod;
  targetUrl: string;
  authRequired: boolean;
  rateLimit: string;
}

export interface ApiRequestConfig {
  method: HttpMethod;
  endpoint: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  latencyMs: number;
  sizeBytes: number;
  headers: Record<string, string>;
  body: string;
  timestamp: string;
}
