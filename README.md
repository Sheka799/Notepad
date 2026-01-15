# 📝 Notepad

Полнофункциональное веб-приложение для создания и управления заметками с поддержкой авторизации, загрузки аватаров и расширенного текстового редактора.

## 🎯 Основные функции

- ✍️ **Создание и редактирование заметок** - редактор на базе Tiptap
- 👤 **Управление профилем** - Регистрация, авторизация, загрузка аватара
- 💾 **Облачное хранилище** - Интеграция с AWS S3 для хранения файлов
- 🔐 **JWT аутентификация** - Безопасное управление сессиями
- 📱 **Адаптивный дизайн** - Работает на десктопе и мобильных устройствах
- ⚙️ **Управление настройками** - Персонализация профиля и приложения

## 🏗️ Архитектура проекта

Проект разделен на две части:

```
notepad/
├── notepad-backend/    # NestJS API сервер
└── notepad-frontend/   # Next.js фронтенд приложение
```

## 🔧 Технологический стек

### Backend (NestJS)
- **Framework**: NestJS 11
- **БД**: PostgreSQL с Prisma ORM
- **Аутентификация**: JWT (Passport.js)
- **Хранилище**: AWS S3
- **Валидация**: class-validator, class-transformer
- **Другое**: Argon2 для хеширования паролей, Sharp для обработки изображений

### Frontend (Next.js)
- **Framework**: Next.js 15
- **Язык**: TypeScript
- **Стилизация**: Tailwind CSS, SCSS
- **Состояние**: React Query для кэширования данных
- **Формы**: React Hook Form
- **Редактор**: Tiptap (Rich Text Editor)
- **UI компоненты**: Headless UI, Radix UI
- **HTTP клиент**: Axios

## 📋 Требования

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15 (или использовать Docker)
- AWS S3 аккаунт (для загрузки файлов)

## 📚 Структура проекта

### Backend структура

```
notepad-backend/src/
├── auth/                 # Аутентификация и авторизация
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── decorators/       # Custom декораторы
│   ├── guards/           # JWT гварды
│   └── dto/              # Data Transfer Objects
├── user/                 # Управление профилем
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── dto/
├── notepad/              # CRUD операции для заметок
│   ├── notepad.controller.ts
│   ├── notepad.service.ts
│   └── dto/
├── storage/              # Работа с AWS S3
│   ├── storage.service.ts
│   └── storage.module.ts
├── config/               # Конфигурация приложения
├── utils/                # Утилиты
├── app.module.ts         # Главный модуль
└── main.ts               # Entry point
```

### Frontend структура

```
notepad-frontend/src/
├── app/
│   ├── layout.tsx        # Главный layout
│   ├── page.tsx          # Домашняя страница
│   └── (admin)/          # Защищенные routes
│       ├── create/       # Создание заметки
│       ├── edit/         # Редактирование заметки
│       ├── notepads/     # Список заметок
│       └── settings/     # Настройки профиля
├── components/           # Переиспользуемые компоненты
│   ├── rich-text-editor/ # Tiptap редактор
│   ├── admin-layout/     # Макет для защищенной части
│   └── ui/               # UI компоненты
├── hooks/                # Custom React хуки
├── services/             # API сервисы
├── types/                # TypeScript типы
├── config/               # Конфигурация
├── constants/            # Константы
└── lib/                  # Утилиты
```

## 🔌 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/logout` - Выход из системы

### Пользователь
- `GET /api/user/profile` - Получить профиль (защищено)
- `PATCH /api/user/update` - Обновить профиль (защищено)
- `POST /api/user/avatar` - Загрузить аватар (защищено)
- `DELETE /api/user/avatar` - Удалить аватар (защищено)

### Заметки
- `GET /api/notepad` - Получить все заметки (защищено)
- `GET /api/notepad/:id` - Получить заметку по ID (защищено)
- `POST /api/notepad` - Создать заметку (защищено)
- `PATCH /api/notepad/:id` - Обновить заметку (защищено)
- `DELETE /api/notepad/:id` - Удалить заметку (защищено)

## 🗄️ База данных

### Модели данных

**User**
- id (уникальный идентификатор)
- email (уникальный)
- name
- password (хеширован с Argon2)
- avatar (путь к аватару)
- avatarUrl (URL в S3)
- createdAt, updatedAt

**Notepad**
- id (уникальный идентификатор)
- userId (связь с User)
- title
- content (HTML от Tiptap)
- createdAt, updatedAt
