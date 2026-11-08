// Funções "puras" do agendamento (recebem um valor e devolvem outro, sem mexer na tela).
// Vieram do js/agendamento.js do vanilla, que usava a lógica fornecida pelo professor.

// Link do WhatsApp com a mensagem pronta.
export function linkWhatsapp(numero, mensagem) {
  const base = `https://wa.me/${numero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

// CPF com dígitos verificadores válidos (rejeita sequências como 111.111.111-11).
export function cpfValido(digitos) {
  if (!/^\d{11}$/.test(digitos) || /^(\d)\1{10}$/.test(digitos)) return false;
  for (let tamanho = 9; tamanho < 11; tamanho++) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(digitos[i]) * (tamanho + 1 - i);
    if (((soma * 10) % 11) % 10 !== Number(digitos[tamanho])) return false;
  }
  return true;
}

// Máscara do CPF: 000.000.000-00
export function mascararCpf(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// Máscara do telefone: (21) 3333-4444 para fixo, (21) 99999-9999 para celular
export function mascararTelefone(valor) {
  const v = valor.replace(/\D/g, "").slice(0, 11);
  if (v.length > 6) {
    const corte = v.length === 11 ? 7 : 6;
    return `(${v.slice(0, 2)}) ${v.slice(2, corte)}-${v.slice(corte)}`;
  }
  if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return v;
}
