// Faixa de números que contam de 0 até o valor quando entram na tela (GSAP, em utils/animacoes.js).
// Usa só números reais do próprio site (quantidade de modalidades, dias e horários da agenda),
// nada inventado. Props: itens = [{ valor, rotulo }]
export default function FaixaNumeros({ itens }) {
  return (
    <section className="numeros-section" aria-label="O estúdio em números">
      <ul className="numeros-grid">
        {itens.map(({ valor, rotulo }) => (
          <li className="numero-card" key={rotulo}>
            {/* O contador animado é só visual (aria-hidden); o leitor de tela lê sempre o valor final.
                data-valor: o GSAP conta até este número; sem JS o valor final já está no texto. */}
            <strong className="numero-valor">
              <span className="numero-contador" data-valor={valor} aria-hidden="true">
                {valor}
              </span>
              <span className="visually-hidden">{valor}</span>
            </strong>
            <span className="numero-rotulo">{rotulo}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
