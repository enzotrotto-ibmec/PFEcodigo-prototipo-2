// Testes das funções puras do agendamento. Rodam com o Node, sem instalar nada: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { cpfValido, linkWhatsapp, ocultarCpf } from "./agendamento.js";

test("o CPF na mensagem do WhatsApp mostra só os 2 últimos dígitos", () => {
  assert.equal(ocultarCpf("529.982.247-25"), "***.***.***-25");
  assert.equal(ocultarCpf("52998224725"), "***.***.***-25");
});

test("CPF incompleto ou vazio não vaza nenhum dígito", () => {
  assert.equal(ocultarCpf("123"), "***.***.***-**");
  assert.equal(ocultarCpf(""), "***.***.***-**");
});

test("o CPF completo nunca aparece no link do WhatsApp", () => {
  const mensagem = `CPF: ${ocultarCpf("529.982.247-25")}`;
  const link = decodeURIComponent(linkWhatsapp("5521000000000", mensagem));
  assert.doesNotMatch(link, /529\.?982\.?247/);
  assert.match(link, /\*\*\*\.\*\*\*\.\*\*\*-25/);
});

test("linkWhatsapp codifica a mensagem e aceita número sem mensagem", () => {
  assert.equal(linkWhatsapp("5521000000000"), "https://wa.me/5521000000000");
  assert.match(linkWhatsapp("5521000000000", "Olá & tudo bem?"), /\?text=Ol%C3%A1%20%26%20tudo%20bem%3F$/);
});

test("a validação do CPF continua rejeitando sequências repetidas", () => {
  assert.equal(cpfValido("52998224725"), true);
  assert.equal(cpfValido("11111111111"), false);
});
