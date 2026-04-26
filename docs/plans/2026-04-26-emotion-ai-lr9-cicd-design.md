# Дизайн ЛР9: CI/CD и анализ качества кода

Дата: 2026-04-26  
Тема: ПО для распознавания эмоционального состояния человека с помощью моделей ИИ

## 1. Цель
Настроить CI/CD-конвейер для автоматической проверки качества кода, запуска тестов, оценки покрытия и публикации артефактов.

## 2. Архитектура решения
- Статический анализ: ESLint (стиль/дефекты), Lizard (цикломатическая сложность), CodeQL (безопасность в GitHub).
- Тесты: unit (node:test) и integration (BDD на Cucumber/Playwright).
- Покрытие: c8 с порогами fail при coverage < 70%.
- Отчеты: сохранение artifacts из всех стадий в GitHub Actions.
- SonarCloud: подключается при наличии секрета токена и переменных проекта.

## 3. Пайплайн
Стадии реализованы тремя job:
- `test`: lint + static analysis + unit coverage.
- `integration`: запуск BDD-тестов.
- `report`: сбор и публикация артефактов, запуск SonarCloud (условно).

Запуск: `push` и `pull_request`.

## 4. Изменения проекта
- Обновление `package.json` скриптами и dev-зависимостями.
- Добавление `eslint.config.js`.
- Добавление workflow-файлов `.github/workflows/ci.yml` и `codeql.yml`.
- Добавление `sonar-project.properties`.
- Добавление документации для запуска ЛР9.

## 5. Риски и ограничения
- Branch protection настраивается в UI GitHub и не может быть закоммичен в коде.
- SonarCloud требует ручной настройки `SONAR_TOKEN`, `SONAR_PROJECT_KEY`, `SONAR_ORGANIZATION`.
- Интеграционные тесты зависят от доступности Playwright Chromium в среде CI.
