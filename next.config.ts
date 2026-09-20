import type { NextConfig } from "next";
import { airportAliases } from './src/lib/airport-canonical';

const nextConfig: NextConfig = {
  // Keep production builds within the shared server's memory budget.
  experimental: { cpus: 1 },
  async redirects() {
    const host = [{type:'host' as const,value:'www.zakazminivena.ru'}];
    return [
      // Specific www aliases first: one hop directly to the final canonical URL.
      ...Object.entries(airportAliases).map(([slug,iata])=>({source:`/airports/${slug}`,destination:`https://zakazminivena.ru/airport/${iata}`,statusCode:301,has:host})),
      // Preserve POST and its body on APIs and the staff workspace.
      {source:'/api/:path*',destination:'https://zakazminivena.ru/api/:path*',statusCode:308,has:host},
      {source:'/work/:path*',destination:'https://zakazminivena.ru/work/:path*',statusCode:308,has:host},
      {source:'/:path*',destination:'https://zakazminivena.ru/:path*',statusCode:301,has:host},
      ...Object.entries(airportAliases).map(([slug,iata])=>({source:`/airports/${slug}`,destination:`/airport/${iata}`,statusCode:301})),
    ];
  },
};

export default nextConfig;
