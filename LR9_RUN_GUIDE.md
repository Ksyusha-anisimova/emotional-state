# ЛР9 — CI/CD и анализ качества кода

## 1. Что добавлено
- CI pipeline: `.github/workflows/ci.yml`
- Security-анализ: `.github/workflows/codeql.yml`
- Линтинг: `eslint.config.js`
- Сложность кода: `npm run complexity` (Lizard)
- Coverage с порогами: `npm run test:coverage` (c8)
- SonarCloud-конфиг: `sonar-project.properties`

## 2. Локальный запуск проверок
```bash
npm install
npm run ci:test
npm run ci:integration
```

## 3. Запуск в GitHub Actions
Pipeline стартует автоматически на `push` и `pull_request`.

Стадии:
1. `test`: lint + static analysis + unit coverage
2. `integration`: BDD-тесты
3. `report`: публикация артефактов

## 4. Обязательные шаги в GitHub UI
1. Settings -> Branches -> Branch protection rules
2. Для основной ветки включить обязательные проверки:
- `test (lint + static + unit)`
- `integration (BDD)`
- `report (artifacts + quality)`
- `CodeQL / analyze`

## 5. SonarCloud (если требуется преподавателем)
Добавьте в GitHub:
- `Settings -> Secrets and variables -> Actions -> New repository secret`
  - `SONAR_TOKEN`
- `Settings -> Secrets and variables -> Actions -> Variables`
  - `SONAR_PROJECT_KEY`
  - `SONAR_ORGANIZATION`

После этого job `SonarCloud scan` включится автоматически.

## 6. Что прикладывать в отчёт
- Скриншот успешного pipeline в Actions.
- Скриншот job `test`, `integration`, `report`.
- Скриншот `CodeQL`.
- Скриншот branch protection с required checks.
- Скриншот coverage-отчета (`coverage/index.html`).
- Скриншоты проблем до/после исправления (линтер и/или Lizard).
