МИНОБРНАУКИ РОССИИ  
Федеральное государственное бюджетное образовательное учреждение высшего образования  
"Тульский государственный университет"  

Кафедра вычислительной техники  

Процессы обеспечения качества программного обеспечения  

Лабораторная работа №8  

Приемочное тестирование и BDD (Behavior-Driven Development)  


Выполнил  
Студент гр. 220621  
Анисимова К.А.  

Проверил  
Пестин М.С  

Тула 2026 г.

## Цель работы
Изучить подход приемочного тестирования и BDD, научиться описывать требования на языке Gherkin и автоматизировать эти сценарии для веб-приложения по теме распознавания эмоционального состояния человека.

## Задание на лабораторную работу
На базе приложения из ЛР7 необходимо:
- подготовить 3-5 приемочных сценариев на Gherkin;
- покрыть позитивные и негативные пути;
- обязательно использовать минимум один `Scenario Outline` с `Examples`;
- реализовать Step Definitions и добиться успешного прохождения тестов.

## 1. Теоретическая часть

### 1.1. Приемочное тестирование
Приемочное тестирование - это проверка того, что система действительно решает задачу пользователя и соответствует бизнес-требованиям. Если говорить проще, это ответ на вопрос: "Готово ли решение к использованию с точки зрения заказчика?".

Ключевой элемент приемочного тестирования - критерии приемки (Acceptance Criteria). Именно они задают, какое поведение считается корректным и что нужно проверить в сценариях.

### 1.2. Идея BDD
BDD (Behavior-Driven Development) развивает идею TDD, но поднимает фокус на уровень поведения системы. Мы описываем не внутреннюю реализацию, а ожидаемые действия и результаты в бизнес-терминах.

Для учебной работы это особенно удобно: можно сначала согласовать сценарии в читаемом виде, а затем связать их с кодом автотестов.

### 1.3. Gherkin
Язык Gherkin применяется для формализации требований в виде понятных сценариев.

Основные ключевые слова:
- `Feature` - функция системы;
- `Scenario` - конкретный сценарий;
- `Given` - начальный контекст;
- `When` - действие пользователя/системы;
- `Then` - ожидаемый результат;
- `And` - уточнение шага;
- `Scenario Outline` + `Examples` - параметризованные проверки с несколькими наборами данных.

### 1.4. Почему выбран Cucumber.js
Методичка допускает выбор инструмента под стек проекта. Так как приложение ЛР7 реализовано на Node.js и уже использует Playwright, для ЛР8 был выбран `Cucumber.js`.

Плюсы этого выбора:
- без смены технологического стека;
- повторно используется UI-автоматизация;
- сценарии на Gherkin напрямую связаны с шагами и исполняемым кодом.

## 2. Практическая часть

### 2.1. Описание проекта
Тема варианта: программное обеспечение для распознавания эмоционального состояния человека с помощью моделей ИИ.

В учебной реализации распознавание эмоции имитируется по имени файла изображения:
- `happy` / `joy` -> `радость`;
- `sad` -> `грусть`;
- `angry` / `mad` -> `злость`;
- иначе -> `нейтрально`.

В системе также реализованы:
- регистрация пользователя;
- вход;
- роли `user` и `admin`;
- смена роли администратором.

### 2.2. Реализованные BDD-сценарии
Для ЛР8 добавлено 5 `.feature` файлов:

1. `features/auth_login_success.feature`  
Позитивный сценарий успешной авторизации.

2. `features/auth_login_invalid.feature`  
Негативный сценарий: неверный пароль и ожидаемая ошибка.

3. `features/registration_login.feature`  
Позитивный сценарий: регистрация нового пользователя и вход.

4. `features/admin_role_change.feature`  
Позитивный сценарий: администратор меняет роль пользователя.

5. `features/emotion_recognition_outline.feature`  
`Scenario Outline` с таблицей `Examples` для проверки разных имен файлов и ожидаемых эмоций.

Таким образом, требования методички выполнены:
- есть и позитивные, и негативные пути;
- есть минимум один `Scenario Outline` с несколькими наборами данных.

### 2.3. Автоматизация шагов (Step Definitions)
Сценарии связаны с кодом в файле:
- `features/step-definitions/common.steps.js`

В этом файле реализованы:
- шаги авторизации;
- шаги регистрации;
- шаги администрирования;
- шаги загрузки файлов и проверки эмоции.

Поддержка выполнения организована через:
- `features/support/hooks.js` - запуск/остановка браузера и подготовка контекста;
- `features/support/world.js` - общее состояние сценария;
- `cucumber.js` - конфигурация раннера.

### 2.4. Команды запуска
```bash
npm install
npx playwright install chromium
npm run test:bdd
```

### 2.5. Результаты прогона
По фактическому запуску в локальной среде получен результат:

- `8 scenarios (8 passed)`
- `25 steps (25 passed)`

Почему 8 сценариев при 5 файлах:
- `Scenario Outline` из feature-файла запускается как несколько отдельных сценариев по строкам таблицы `Examples`.

Примечания по логам:
- при установке был `npm warn deprecated glob@10.5.0`;
- было сообщение про `5 moderate severity vulnerabilities`;
- также был временный сетевой сбой `ECONNRESET` при загрузке ffmpeg, после чего установка успешно завершилась.

На прохождение BDD-тестов это не повлияло.

### 2.6. Что добавлено в проект
- папка `features/` с Gherkin-сценариями;
- папка `features/step-definitions/` с реализацией шагов;
- папка `features/support/` с инфраструктурой запуска;
- `cucumber.js`;
- `tests/fixtures/` с тестовыми изображениями;
- скрипт `test:bdd` в `package.json`.

### 2.7. Блок-схема
Для отчета подготовлена блок-схема процесса ЛР8 в формате draw.io:
- `LR8_BDD_Блок_схема.drawio`

Схема оформлена с учетом требований:
- начало/конец - овал;
- условие - ромб;
- ввод/вывод - параллелограмм;
- действия - прямоугольник;
- размер каждого блока: 200x60.

## 3. Выводы
В этой работе BDD показал себя как практичный мост между требованиями и автотестами. Сценарии на Gherkin читаются проще, чем чистый тестовый код, и их удобнее обсуждать на уровне "что должно происходить".

По сравнению с обычным набором UI-тестов, BDD дал более прозрачную структуру:
- сначала фиксируется поведение (`Feature/Scenario`),
- затем реализуются шаги,
- потом выполняется автоматическая проверка.

Основные плюсы, которые я увидела в ЛР8:
- лучшее соответствие тестов бизнес-ожиданиям;
- единый понятный язык описания;
- удобная параметризация через `Scenario Outline`.

Сложности:
- требуется аккуратно поддерживать формулировки шагов;
- при изменениях интерфейса шаги нужно синхронно обновлять.

В итоге все сценарии были успешно автоматизированы и пройдены, поэтому цель лабораторной работы достигнута.

## 4. Контрольные вопросы

1. Что такое приемочное тестирование и чем оно отличается от системного?  
Приемочное тестирование подтверждает соответствие бизнес-требованиям и готовность к эксплуатации. Системное тестирование проверяет систему как целое с технической точки зрения.

2. Какие существуют виды приемочного тестирования?  
Альфа, бета, операционное (OAT), приемка по контракту.

3. Что такое критерии приемки и как они связаны с тестами?  
Это условия, которым должна соответствовать система. На их основе составляют приемочные сценарии.

4. В чем основная идея BDD?  
Определять и проверять поведение системы через понятные бизнесу сценарии.

5. Как BDD связан с TDD и чем они различаются?  
Оба подхода тест-ориентированные. TDD чаще фокусируется на уровне функций/классов, BDD - на уровне поведения и требований.

6. Для чего нужен Gherkin?  
Для формального и при этом читаемого описания требований и сценариев.

7. Объясните структуру Given/When/Then/And.  
Given - контекст, When - действие, Then - ожидаемый результат, And - уточнение шага.

8. Что такое Scenario Outline и Examples?  
Это шаблон сценария, который запускается несколько раз с разными данными из таблицы.

9. Кто основной читатель Gherkin-сценариев и почему это важно?  
Команда целиком: разработчик, тестировщик, аналитик, заказчик. Важно, потому что уменьшается риск неверной интерпретации требований.

10. Что такое единый язык (Ubiquitous Language) в BDD?  
Набор одинаково понимаемых терминов предметной области, которые используют в сценариях и обсуждениях.

11. Какие BDD-фреймворки для .NET/Python/Java вы знаете?  
SpecFlow (.NET), Behave/pytest-bdd (Python), Cucumber-JVM/JBehave (Java).

12. Что делают Step Definitions?  
Связывают текст шагов из `.feature` с исполняемым кодом автоматизации.

13. Почему удобно писать приемочные сценарии до реализации?  
Сначала фиксируется ожидаемое поведение, а уже потом код. Это снижает риск лишней или неверной реализации.

14. Почему Scenario Outline полезен в реальных проектах?  
Он уменьшает дублирование и позволяет быстро проверять несколько наборов входных данных.

15. Какие основные сложности при внедрении BDD?  
Поддержка качества формулировок, дисциплина команды и необходимость регулярно обновлять шаги при изменении UI/API.


## ПРИЛОЖЕНИЕ А
### Листинг Gherkin-сценариев

Файл `features/auth_login_success.feature`:
```gherkin
Feature: Авторизация пользователя
  Чтобы получить доступ к функциям системы
  Как зарегистрированный пользователь
  Я хочу успешно входить в систему

  @positive
  Scenario: Успешный вход существующего пользователя
    Given пользователь находится на странице авторизации
    When пользователь входит с логином "user1" и паролем "User1234"
    Then система показывает статус "Вы вошли как user1"
```

Файл `features/auth_login_invalid.feature`:
```gherkin
Feature: Проверка ошибок авторизации
  Чтобы защитить систему от неверных попыток входа
  Как пользователь
  Я хочу видеть понятное сообщение при неверном пароле

  @negative
  Scenario: Ошибка входа при неверном пароле
    Given пользователь находится на странице авторизации
    When пользователь входит с логином "user1" и паролем "WrongPassword"
    Then система показывает сообщение входа "Неверный логин или пароль"
```

Файл `features/registration_login.feature`:
```gherkin
Feature: Регистрация и последующий вход
  Чтобы использовать систему с новым аккаунтом
  Как новый пользователь
  Я хочу зарегистрироваться и затем войти

  @positive
  Scenario: Успешная регистрация и вход нового пользователя
    Given пользователь находится на странице авторизации
    When пользователь регистрируется с уникальным логином и паролем "Pass1234"
    And пользователь входит с зарегистрированными данными
    Then система показывает статус для нового пользователя
```

Файл `features/admin_role_change.feature`:
```gherkin
Feature: Управление ролями пользователей
  Чтобы администратор мог управлять правами доступа
  Как администратор
  Я хочу менять роль пользователя

  @positive
  Scenario: Администратор успешно меняет роль пользователя
    Given администратор авторизован в системе
    When администратор меняет роль пользователя "user1" на "admin"
    Then система показывает сообщение администратора "Роль обновлена"
```

Файл `features/emotion_recognition_outline.feature`:
```gherkin
Feature: Распознавание эмоции по изображению
  Чтобы пользователь видел результат распознавания
  Как авторизованный пользователь
  Я хочу загружать изображения и получать эмоцию

  @positive @outline
  Scenario Outline: Определение эмоции по имени файла
    Given пользователь "user1" с паролем "User1234" авторизован
    When пользователь загружает файл "<file_name>" для распознавания эмоции
    Then система показывает результат эмоции "<emotion>"

    Examples:
      | file_name        | emotion    |
      | happy_face.jpg   | радость    |
      | sad_face.png     | грусть     |
      | angry_face.jpg   | злость     |
      | neutral_face.png | нейтрально |
```

## ПРИЛОЖЕНИЕ Б
### Листинг Step Definitions

Файл `features/step-definitions/common.steps.js`:
```javascript
import assert from "assert/strict";
import path from "path";
import { Given, When, Then } from "@cucumber/cucumber";

Given("пользователь находится на странице авторизации", async function () {
  await this.page.goto("/");
});

When(
  "пользователь входит с логином {string} и паролем {string}",
  async function (username, password) {
    await this.page.locator("#login-username").fill(username);
    await this.page.locator("#login-password").fill(password);
    await this.page.locator("#login-submit").click();
  }
);

Then("система показывает статус {string}", async function (expectedText) {
  const status = this.page.locator("#user-status");
  await status.waitFor({ state: "visible" });
  const text = (await status.textContent()) || "";
  assert.ok(text.includes(expectedText), `Ожидался текст '${expectedText}', получено '${text}'`);
});

Then("система показывает сообщение входа {string}", async function (expectedError) {
  const message = this.page.locator("#login-msg");
  await message.waitFor({ state: "visible" });
  const text = (await message.textContent()) || "";
  assert.ok(text.includes(expectedError), `Ожидалась ошибка '${expectedError}', получено '${text}'`);
});

When(
  "пользователь регистрируется с уникальным логином и паролем {string}",
  async function (password) {
    const random = Math.random().toString(36).slice(2, 8);
    const username = `bdd_user_${random}`;

    this.createdUsername = username;
    this.createdPassword = password;

    await this.page.locator("#reg-username").fill(username);
    await this.page.locator("#reg-password").fill(password);
    await this.page.locator("#reg-submit").click();

    const regMsg = this.page.locator("#reg-msg");
    await regMsg.waitFor({ state: "visible" });
    const regText = (await regMsg.textContent()) || "";
    assert.ok(regText.includes("Регистрация успешна"), `Не удалось зарегистрироваться: '${regText}'`);
  }
);

When("пользователь входит с зарегистрированными данными", async function () {
  assert.ok(this.createdUsername, "Не сохранен созданный логин");
  assert.ok(this.createdPassword, "Не сохранен созданный пароль");

  await this.page.locator("#login-username").fill(this.createdUsername);
  await this.page.locator("#login-password").fill(this.createdPassword);
  await this.page.locator("#login-submit").click();
});

Then("система показывает статус для нового пользователя", async function () {
  const status = this.page.locator("#user-status");
  await status.waitFor({ state: "visible" });
  const text = (await status.textContent()) || "";
  assert.ok(
    text.includes(`Вы вошли как ${this.createdUsername}`),
    `Ожидался пользователь '${this.createdUsername}', получено '${text}'`
  );
});

Given("администратор авторизован в системе", async function () {
  await this.page.goto("/");
  await this.page.locator("#login-username").fill("admin");
  await this.page.locator("#login-password").fill("Admin123");
  await this.page.locator("#login-submit").click();

  const adminButton = this.page.locator("#admin-submit");
  await adminButton.waitFor({ state: "visible" });
});

When(
  "администратор меняет роль пользователя {string} на {string}",
  async function (username, role) {
    await this.page.locator("#admin-user").selectOption(username);
    await this.page.locator("#admin-role").selectOption(role);
    await this.page.locator("#admin-submit").click();
  }
);

Then("система показывает сообщение администратора {string}", async function (expectedText) {
  const msg = this.page.locator("#admin-msg");
  await msg.waitFor({ state: "visible" });
  const text = (await msg.textContent()) || "";
  assert.ok(text.includes(expectedText), `Ожидалось '${expectedText}', получено '${text}'`);
});

Given("пользователь {string} с паролем {string} авторизован", async function (username, password) {
  await this.page.goto("/");
  await this.page.locator("#login-username").fill(username);
  await this.page.locator("#login-password").fill(password);
  await this.page.locator("#login-submit").click();

  const status = this.page.locator("#user-status");
  await status.waitFor({ state: "visible" });
});

When("пользователь загружает файл {string} для распознавания эмоции", async function (fileName) {
  const filePath = path.resolve(process.cwd(), "tests", "fixtures", fileName);
  await this.page.locator("#emotion-image").setInputFiles(filePath);
  await this.page.locator("#emotion-submit").click();
});

Then("система показывает результат эмоции {string}", async function (expectedEmotion) {
  const msg = this.page.locator("#emotion-msg");
  await msg.waitFor({ state: "visible" });
  const text = (await msg.textContent()) || "";
  assert.ok(
    text.includes(`Эмоция: ${expectedEmotion}`),
    `Ожидалась эмоция '${expectedEmotion}', получено '${text}'`
  );
});
```
