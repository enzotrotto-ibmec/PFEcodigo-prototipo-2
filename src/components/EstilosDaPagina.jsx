// Aplica as folhas de estilo de uma página só enquanto ela está na tela.
//
// Por quê: no vanilla cada .html carregava o seu CSS, e as duas marcas usam os MESMOS nomes
// de classe e de variável (--bg-base, .hero-section...) com valores diferentes. Num app React
// todo CSS importado do jeito normal vale para o site inteiro, então o tema da PKZ brigaria
// com o da One To One. Importando com "?inline" (ex.: import css from "../styles/pkz.css?inline")
// o Vite entrega o CSS como texto, e este componente o coloca num <style>. Quando a página sai
// da tela, o <style> sai junto. Assim os arquivos de CSS continuam iguais aos do vanilla.
export default function EstilosDaPagina({ folhas }) {
  return <style>{folhas.join("\n")}</style>;
}
