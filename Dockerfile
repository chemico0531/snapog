# syntax = docker/dockerfile:1

# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Production stage ─────────────────────────────────────────────────────────
FROM node:22-slim
WORKDIR /app

# Install runtime dependencies (better-sqlite3 needs build tools for native addon)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Remove build tools after npm install (keep image small)
RUN apt-get purge -y python3 make g++ && apt-get autoremove -y

COPY --from=build /app/dist ./dist
COPY --from=build /app/migrations ./migrations
COPY --from=build /app/fonts ./fonts

RUN mkdir -p /data
ENV PORT=3000
ENV DB_PATH=/data/snapog.db
ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "dist/server.js"]
