# ЛР9 — CI/CD и анализ качества кода

## 1. Что добавлено
- CI pipeline: `.github/workflows/ci.yml`
- Security-анализ: `.github/workflows/codeql.yml`
- Линтинг: `eslint.config.js`
- 
- 
- 
- Сложность кода: `npm run complexity` (Lizard)
- Coverage с порогами: `npm run test:coverage` (c8)
- SonarCloud-конфиг: `sonar-project.properties`

## 2. Локальный запуск проверок
```bash
npm install
npm run ci:test
npm run ci:integration
```

Примечание: для `complexity` используется `python3 -m lizard`.  
Если пакет не установлен, скрипт поставит его автоматически через `pip`.

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
