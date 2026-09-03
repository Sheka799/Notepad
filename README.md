# 📝 Notepad

Полнофункциональное веб-приложение для создания и управления заметками с поддержкой авторизации, загрузки аватаров и расширенного текстового редактора.

## 🎯 Основные функции

- ✍️ **Создание и редактирование заметок** - редактор на базе Tiptap
- 👤 **Управление профилем** - регистрация, вход, загрузка аватара
- 💾 **Облачное хранилище** - интеграция с S3 для хранения файлов
- 🔐 **JWT аутентификация** - access-токен в памяти вкладки (не в cookie), refresh-токен в httpOnly cookie
- 📱 **Адаптивный дизайн** - работает на десктопе и мобильных устройствах
- ⚙️ **Управление настройками** - персонализация профиля и приложения
- 📄 **Политика обработки персональных данных** - страница `/privacy-policy` + согласие при регистрации
- 🛡️ **Rate limiting** - ограничение попыток входа/регистрации, security-заголовки (helmet)

## 🏗️ Архитектура проекта

Проект разделен на две части:

```
notepad/
├── notepad-backend/    # NestJS API сервер
├── notepad-frontend/   # Next.js фронтенд приложение
└── docker-compose.yml  # Продакшн-стек (db + backend + frontend) для Dokploy
```

## 🔧 Технологический стек

### Backend (NestJS)
- **Framework**: NestJS 11
- **БД**: PostgreSQL с Prisma ORM (миграции в `prisma/migrations`)
- **Аутентификация**: JWT (Passport.js), rate limiting через `@nestjs/throttler`
- **Хранилище**: S3-совместимое (в проде — reg.ru)
- **Валидация**: class-validator, class-transformer (глобальный `ValidationPipe` с `whitelist`)
- **Безопасность**: helmet, Argon2 для хеширования паролей
- **Другое**: Sharp для обработки изображений

### Frontend (Next.js)
- **Framework**: Next.js 15
- **Язык**: TypeScript
- **Стилизация**: Tailwind CSS, SCSS
- **Состояние**: React Query для кэширования данных
- **Формы**: React Hook Form
- **Редактор**: Tiptap (Rich Text Editor)
- **UI компоненты**: Headless UI, Radix UI
- **HTTP клиент**: Axios
- **Аналитика**: Яндекс.Метрика

## 📋 Требования

- Node.js 22+
- Docker & Docker Compose
- S3-совместимое хранилище (для загрузки аватаров)

## 🚀 Быстрый старт

В проекте два разных `docker-compose.yml` для разных целей.

### Локальная разработка (hot-reload)

БД + бэкенд поднимаются в dev-режиме, фронтенд — отдельно через `npm run dev`:

```bash
cd notepad-backend
docker compose up -d          # поднимет Postgres + NestJS (nest start --watch)
docker exec notepad-backend npx prisma migrate deploy   # только при первом запуске / новой схеме

cd ../notepad-frontend
npm install
npm run dev                   # http://localhost:3000
```

Переменные окружения — см. `notepad-backend/.env` и `notepad-frontend/.env.local` (не коммитятся, создаются локально).

## 📚 Структура проекта

### Backend структура

```
notepad-backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/       # история миграций (prisma migrate)
├── src/
│   ├── auth/                 # Аутентификация и авторизация
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   ├── decorators/       # Custom декораторы (@Auth, @CurrentUser)
│   │   ├── guards/           # JWT гварды
│   │   └── dto/              # Data Transfer Objects
│   ├── user/                 # Управление профилем и аватаром
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── dto/
│   ├── notepad/              # CRUD операции для заметок
│   │   ├── notepad.controller.ts
│   │   ├── notepad.service.ts
│   │   └── dto/
│   ├── storage/               # Работа с S3
│   │   ├── storage.service.ts
│   │   └── storage.module.ts
│   ├── config/                # Конфигурация (jwt.config.ts и т.п.)
│   ├── utils/                 # Утилиты
│   ├── app.module.ts          # Главный модуль (Throttler, ConfigModule)
│   └── main.ts                # Entry point (helmet, ValidationPipe, CORS)
```

### Frontend структура

```
notepad-frontend/src/
├── app/
│   ├── layout.tsx          # Главный layout
│   ├── page.tsx            # Домашняя страница
│   ├── privacy-policy/     # Политика обработки персональных данных
│   ├── auth/               # Вход
│   │   └── register/       # Регистрация (с согласием на обработку ПДн)
│   └── (admin)/            # Защищённые routes (см. middleware.ts)
│       ├── create/         # Создание заметки
│       ├── edit/[id]/      # Редактирование заметки
│       ├── notepad/[id]/   # Просмотр одной заметки
│       ├── notepads/       # Список заметок
│       └── settings/       # Настройки профиля
├── components/              # Переиспользуемые компоненты
│   ├── rich-text-editor/   # Tiptap редактор
│   ├── admin-layout/       # Макет для защищённой части
│   ├── YandexMetrika.tsx   # Аналитика
│   └── ui/                 # UI компоненты
├── hooks/                   # Custom React хуки (мутации, запросы)
├── services/                # API сервисы (axios)
├── types/                   # TypeScript типы
├── config/                  # Конфигурация
├── constants/                # Константы
├── middleware.ts             # Гейт защищённых страниц по refresh-cookie
└── lib/                      # Утилиты
```

## 🔌 API Endpoints

Базовый префикс: `/api`. Защищённые роуты требуют `Authorization: Bearer <accessToken>`.

### Аутентификация (`/api/auth`)
- `POST /auth/register` — регистрация (лимит 5 попыток/мин с IP)
- `POST /auth/login` — вход (лимит 5 попыток/мин с IP)
- `POST /auth/login/access-token` — обновить access-токен по refresh-cookie
- `POST /auth/logout` — выход

### Пользователь (`/api/user`, защищено)
- `GET /user` — профиль (включая список заметок)
- `PUT /user` — обновить email/имя/пароль
- `POST /user` — загрузить аватар (`multipart/form-data`, поле `avatar`, до 15 МБ, jpg/png/webp)
- `PUT /user/delete` — удалить аватар

### Заметки (`/api/user/notepads`, защищено)
- `GET /user/notepads` — список своих заметок
- `GET /user/notepads/:id` — одна заметка
- `POST /user/notepads` — создать
- `PUT /user/notepads/:id` — обновить
- `DELETE /user/notepads/:id` — удалить

## 🗄️ База данных

### Модели данных (Prisma)

**User**
- id (cuid)
- email (уникальный)
- name
- password (хеш Argon2)
- avatar (ключ файла в S3)
- avatarUrl (публичный URL)
- createdAt, updatedAt

**Notepad**
- id (cuid)
- name
- description (HTML от Tiptap)
- userId (связь с User)
- createdAt, updatedAt

Изменения схемы вносятся через `npx prisma migrate dev --name <описание>` (не `db push`) — миграции коммитятся в `prisma/migrations` и применяются в проде командой `prisma migrate deploy` (уже встроена в CMD продакшн-образа бэкенда).
