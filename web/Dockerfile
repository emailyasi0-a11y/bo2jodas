# Imagen unica: compila la web (React/Vite) y la sirve con el servidor Node.
FROM node:22-alpine AS cliente
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund
COPY client/ ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app/server
ENV NODE_ENV=production PORT=3000 DATA_DIR=/data CLIENT_DIR=/app/client/dist
COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev --no-audit --no-fund || npm install --omit=dev --no-audit --no-fund
COPY server/src ./src
COPY --from=cliente /app/client/dist /app/client/dist
VOLUME ["/data"]
EXPOSE 3000
CMD ["node", "src/index.js"]
