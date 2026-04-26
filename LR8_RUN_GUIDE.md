# ЛР8 — подробный запуск и важные моменты

## 1. Что добавлено для ЛР8
- BDD-сценарии: `features/*.feature`
- Автоматизация шагов: `features/step-definitions/common.steps.js`
- Поддержка BDD-раннера:
  - `features/support/world.js`
  - `features/support/hooks.js`
  - `cucumber.js`
- Фикстуры для Scenario Outline (эмоции): `tests/fixtures/*`
- Новый скрипт запуска: `npm run test:bdd`

## 2. Требования к окружению
- Node.js 18+
- npm 9+
- Установленный Chromium для Playwright (обычно ставится автоматически)
- Доступ в интернет при первом `npm install` (нужно для `@cucumber/cucumber`)

## 3. Установка зависимостей
```bash
npm install
```

Если Playwright-браузеры не подтянулись автоматически:
```bash
npx playwright install chromium
```

## 4. Запуск приложения вручную (опционально)
```bash
npm run start
```
Приложение будет доступно по адресу `http://localhost:3000`.

Для BDD это не обязательно: в `hooks.js` тесты сами пытаются поднять сервер, если он не запущен.

## 5. Запуск BDD-сценариев (ЛР8)
```bash
npm run test:bdd
```

Что должно пройти:
- успешный вход;
- вход с неверным паролем;
- регистрация + вход;
- смена роли админом;
- Scenario Outline по распознаванию эмоций.

## 6. Структура BDD-файлов
- `features/auth_login_success.feature`
- `features/auth_login_invalid.feature`
- `features/registration_login.feature`
- `features/admin_role_change.feature`
- `features/emotion_recognition_outline.feature`

Конфигурация:
- `cucumber.js` — пути к `features`, `support`, `step-definitions`.

## 7. Важные моменты по проекту ЛР8
1. Сервер хранит пользователей и сессии в памяти.
Перезапуск сервера сбрасывает изменения ролей и созданных пользователей.

2. Распознавание эмоций имитируется по имени файла:
- содержит `happy` или `joy` -> `радость`
- содержит `sad` -> `грусть`
- содержит `angry` или `mad` -> `злость`
- иначе -> `нейтрально`

3. Для сценария эмоций важен именно файл и его имя.
В `tests/fixtures` уже лежат файлы под Examples.

4. Если порт `3000` занят, BDD может упасть.
Освободите порт или измените `BASE_URL` в `features/support/hooks.js` и конфиг приложения.

5. Если сценарии не стартуют из-за отсутствия `@cucumber/cucumber`, повторите:
```bash
npm install
```
в среде с доступом к `https://registry.npmjs.org`.

## 8. Полезные команды
```bash
# ЛР7 UI-тесты
npm run test:ui

# ЛР7 TDD-тесты
npm run test:tdd

# ЛР8 BDD-тесты
npm run test:bdd
```

## 9. Что сдавать по ЛР8
- Код проекта с папкой `features/` и step definitions.
- Отчёт `LR8_Anisimova_KA.docx`.
- Этот файл-инструкция `LR8_RUN_GUIDE.md`.
