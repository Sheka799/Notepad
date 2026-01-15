FROM node:22.17.1-alpine AS base

# RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force && \
    npm install -g npm@latest && \
    npm install --legacy-peer-deps

FROM base AS build

# Копируем Prisma схему отдельно для кэширования
COPY prisma ./prisma/
# Генерируем Prisma Client в стадии build
RUN npx prisma generate

# Копируем остальной код и собираем
COPY . .
RUN npm run build

FROM node:22.17.1-alpine AS production

# RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production

# 1. Копируем package файлы
COPY --from=build /app/package*.json ./

# 2. Устанавливаем ТОЛЬКО production зависимости
COPY --from=build /app/node_modules ./node_modules
# RUN npm ci --only=production

# 3. Копируем собранное приложение
COPY --from=build /app/dist ./dist

# 4. Копируем ВСЕ сгенерированные файлы Prisma
# Важно: копируем .prisma директорию, а не только prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# 5. Копируем Prisma схему (для миграций или будущих генераций)
COPY --from=build /app/prisma ./prisma

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]