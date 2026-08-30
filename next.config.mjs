import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This project sits inside a repo that has its own lockfile at the root
  // (the ViART site). Pin the root so Next does not infer the wrong one.
  turbopack: { root: here },
};

export default nextConfig;
