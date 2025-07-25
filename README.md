# Новые Схемы – Frontend

## Стек технологий

| Слой | Пакеты |
|------|--------|
| Ядро | **React 18**, **TypeScript**, **Vite** |
| UI   | **Mantine 8** (Core, Hooks, Form), @tabler/icons-react |
| Стили | CSS-modules, Mantine theming (тёмная тема, зелёный primary) |
| Роутинг | **react-router-dom 7** |
| Состояние | **zustand** (глобальный стейт) |
| Серверные данные | **@tanstack/react-query 5** + **axios** |
| Формы/валидация | **@mantine/form**, **react-hook-form**, **zod** |
| Тесты | **Vitest** + Testing Library (можно добавить) |
| Качество кода | **ESLint**, **Prettier**, strict TypeScript |

## Скрипты

```bash
npm run dev       # запуск дев-сервера Vite
npm run build     # production-сборка
npm run preview   # предпросмотр production-бандла
npm run lint      # ESLint
npm run format    # Prettier
```

## Структура

```
src/
  components/   – переиспользуемые компоненты (Navbar, Header и т.д.)
  pages/        – страницы /requests, /stats, /pay, /login …
  assets/       – статические ресурсы (logo.png)
```

## Начало работы

```bash
git clone <repo>
cd masterfront
npm install
npm run dev
```

Проект автоматически откроется на http://localhost:5173

---

При необходимости добавить Storybook, e2e-тесты или CI/CD – см. Issues или создайте Pull Request.
