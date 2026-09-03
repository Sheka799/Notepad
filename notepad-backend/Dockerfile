FROM node:22.17.1-alpine AS base

WORKDIR /app

COPY package*.json ./

# ---- деплой-зависимости (только production, без dev-инструментов) ----
FROM base AS deps-prod
RUN npm cache clean --force && \
    npm ci --omit=dev --legacy-peer-deps

# ---- полные зависимости для сборки (нужны devDependencies: nest-cli, typescript и т.д.) ----
FROM base AS build
RUN npm cache clean --force && \
    npm install --legacy-peer-deps

# Копируем Prisma схему отдельно для кэширования
COPY prisma ./prisma/
# Генерируем Prisma Client в стадии build
RUN npx prisma generate

# Копируем остальной код и собираем
COPY . .
RUN npm run build

# ---- production ----
FROM node:22.17.1-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# 1. Копируем package файлы
COPY --from=build /app/package*.json ./

# 2. Только production-зависимости (без eslint/jest/nest-cli и т.д.)
COPY --from=deps-prod /app/node_modules ./node_modules

# 3. Копируем собранное приложение
COPY --from=build /app/dist ./dist

# 4. Копируем ВСЕ сгенерированные файлы Prisma
# Важно: копируем .prisma директорию, а не только prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# 5. Копируем Prisma схему (для миграций или будущих генераций)
COPY --from=build /app/prisma ./prisma

# Запуск от непривилегированного пользователя
RUN chown -R node:node /app
USER node

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3001/api', r => process.exit(r.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
