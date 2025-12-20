FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

FROM base AS build

# Копируем Prisma схему отдельно для кэширования
COPY prisma ./prisma/
# Генерируем Prisma Client в стадии build
RUN npx prisma generate

# Копируем остальной код и собираем
COPY . .
RUN npm run build

FROM node:20-alpine AS production

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production

# 1. Копируем package файлы
COPY --from=build /app/package*.json ./

# 2. Устанавливаем ТОЛЬКО production зависимости
RUN npm ci --only=production --frozen-lockfile

# 3. Копируем собранное приложение
COPY --from=build /app/dist ./dist

# 4. Копируем ВСЕ сгенерированные файлы Prisma
# Важно: копируем .prisma директорию, а не только prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# 5. Копируем Prisma схему (для миграций или будущих генераций)
COPY --from=build /app/prisma ./prisma

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]