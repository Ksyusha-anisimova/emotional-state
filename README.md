# ЛР7 — Автоматизация тестирования и TDD

**Вариант:** Программное обеспечение для распознавания эмоционального состояния человека с помощью моделей ИИ.

## Запуск приложения
1. `npm install`
2. `npm run start`
3. Открыть `http://localhost:3000`

## Данные по умолчанию
- admin / Admin123 (роль admin)
- user1 / User1234 (роль user)

## UI-тесты (Playwright)
- `npm run test:ui`

## TDD тесты для IsPasswordStrong
- `npm run test:tdd`

## Распознавание эмоции
- В интерфейсе загружается изображение (JPG/PNG).
- Эмоция имитируется детерминированно по имени файла:
  - `*happy*` или `*joy*` -> радость
  - `*sad*` -> грусть
  - `*angry*` или `*mad*` -> злость
  - иначе -> нейтрально

## Структура проекта
- `server/index.js` — Express сервер и API
- `public/index.html` — интерфейс
- `public/app.js` — логика UI
- `tests/` — Playwright тесты (Page Object Model)
- `tdd/` — модуль и тесты для IsPasswordStrong
