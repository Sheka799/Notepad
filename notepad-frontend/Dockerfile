FROM node:22.17.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Для продакшена используем standalone билд
RUN npm run build

EXPOSE 3000

# Запуск в production режиме
CMD ["npm", "start"]