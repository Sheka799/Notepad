FROM node:22.17.1-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM node:22.17.1-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# SERVER_URL и DOMAIN встраиваются Next.js прямо в JS-бандл браузера
# на этапе сборки (см. env в next.config.ts) — поэтому их нужно
# передавать именно как build args, а не только как runtime-переменные.
ARG SERVER_URL
ARG DOMAIN
ENV SERVER_URL=$SERVER_URL
ENV DOMAIN=$DOMAIN

RUN npm run build

# ---- production: standalone-сборка Next.js, без node_modules и исходников ----
FROM node:22.17.1-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/', r => process.exit(r.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "server.js"]
