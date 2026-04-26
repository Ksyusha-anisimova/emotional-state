import test from "node:test";
import assert from "node:assert/strict";
import { isPasswordStrong } from "./passwordPolicy.js";

test("пароль короче 8 символов -> false", () => {
  assert.equal(isPasswordStrong("short"), false);
});

test("длина 8, но без цифры -> false", () => {
  assert.equal(isPasswordStrong("Stronggg"), false);
});

test("валидный пароль StrongPass1 -> true", () => {
  assert.equal(isPasswordStrong("StrongPass1"), true);
});

test("null -> false", () => {
  assert.equal(isPasswordStrong(null), false);
});
