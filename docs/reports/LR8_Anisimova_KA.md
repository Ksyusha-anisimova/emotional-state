# Лабораторная работа №8
## Приемочное тестирование и BDD

**Тема (вариант):** Программное обеспечение для распознавания эмоционального состояния человека с помощью моделей ИИ.

## 1. Цель работы
Изучить приемочное тестирование и подход BDD, описать поведение системы на языке Gherkin и автоматизировать сценарии на базе существующего приложения ЛР7.

## 2. Описание приемочных сценариев (задание 1)

### 2.1 Feature: Успешная авторизация
Файл: `features/auth_login_success.feature`

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

Сценарий покрывает базовое бизнес-требование: действующий пользователь может войти в систему.

### 2.2 Feature: Негативный вход
Файл: `features/auth_login_invalid.feature`

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

Сценарий проверяет негативный путь и ожидаемую реакцию системы на ошибочные данные.

### 2.3 Feature: Регистрация и вход
Файл: `features/registration_login.feature`

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

Сценарий показывает полный пользовательский поток: создание аккаунта и вход в систему.

### 2.4 Feature: Управление ролями
Файл: `features/admin_role_change.feature`

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

Сценарий покрывает административную функцию, важную для приемки по ролям.

### 2.5 Feature: Распознавание эмоции (Scenario Outline)
Файл: `features/emotion_recognition_outline.feature`

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

Этот сценарий проверяет несколько наборов данных в одном шаблоне и закрывает требование к `Scenario Outline`.

Связь с требованиями системы:
- авторизация и регистрация — доступ в систему;
- управление ролями — администрирование;
- распознавание эмоции — основная функция выбранного варианта.

## 3. Описание автоматизации (задание 2)

### 3.1 Выбранный фреймворк и обоснование
Выбран `Cucumber.js` вместе с `Playwright`.

Причины выбора:
- проект уже реализован на Node.js;
- в ЛР7 уже использовался Playwright;
- интеграция с `.feature` и step definitions выполняется без смены технологического стека.

### 3.2 Листинг шагов (Step Definitions)
Файл: `features/step-definitions/common.steps.js`

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

### 3.3 Пример запуска и результаты
Команда запуска:
```bash
npm run test:bdd
```

Ожидаемый тип результата:
- passed: все шаги и сценарии;
- failed: при несовпадении ожидаемого сообщения или проблеме окружения.

В текущей учебной среде автопрогон не выполнен полностью из-за ограничений среды (нет сетевого доступа для установки `@cucumber/cucumber`, ограничение на запуск локального web server).

### 3.4 Места для скриншотов
- Скриншот консольного вывода `npm run test:bdd` с passed-сценариями.
- Скриншот списка feature/scenario в IDE.

## 4. Выводы
По сравнению с обычными UI-тестами, BDD-сценарии дают более понятное описание поведения на языке, который можно обсуждать с заказчиком. Это упрощает согласование требований: сначала фиксируется ожидаемое поведение в `.feature`, затем подключается автоматизация шагов.

Главные преимущества:
- единый формат требований и проверок;
- прозрачные позитивные и негативные потоки;
- удобный `Scenario Outline` для набора входных данных.

Основные сложности:
- требуется дисциплина в формулировке шагов;
- на первом запуске важна корректная настройка окружения (зависимости, браузер, порт сервера);
- из-за in-memory состояния нужно следить за изоляцией тестов.
