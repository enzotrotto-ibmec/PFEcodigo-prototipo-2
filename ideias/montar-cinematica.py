"""Gera ideias/cinematica.html: simulação navegável da Direção 3 (cinemática).
Embute GSAP + ScrollTrigger (de node_modules), as fotos e os logos, para abrir com duplo clique, sem servidor."""
import base64, pathlib, re

raiz = pathlib.Path(__file__).resolve().parent
projeto = raiz.parent
img = projeto / "public" / "assets" / "img"
fotos = {
    "pkz": "pkz/EquipePKZ-1280.webp",
    "oto": "one-to-one/equipe-1280.webp",
    "fisio": "fisio/equipe-1280.webp",
    "fisio2": "fisio/atendimento-1280.webp",
    "karate": "pkz/karate-800.webp",
    "jiu": "pkz/JiuJitsu-800.webp",
    "volei": "pkz/volei-800.webp",
    "pt": "one-to-one/personal-training-800.webp",
    "otoFisio": "one-to-one/fisioterapia-800.webp",
    "nutri": "one-to-one/nutricao-800.webp",
}
logos = {
    "pkz": "logos/pkz-lab-horizontal-branco.svg",
    "oto": "logos/one-to-one-branco.svg",
    "fisio": "logos/fisio-provisorio-branco.svg",
}
html = (raiz / "cinematica-modelo.html").read_text(encoding="utf-8")
for nome, caminho in fotos.items():
    dados = base64.b64encode((img / caminho).read_bytes()).decode()
    html = html.replace("{{IMG:%s}}" % nome, "data:image/webp;base64," + dados)
for nome, caminho in logos.items():
    dados = base64.b64encode((img / caminho).read_bytes()).decode()
    html = html.replace("{{LOGO:%s}}" % nome, "data:image/svg+xml;base64," + dados)
gsap = (projeto / "node_modules/gsap/dist/gsap.min.js").read_text(encoding="utf-8")
st = (projeto / "node_modules/gsap/dist/ScrollTrigger.min.js").read_text(encoding="utf-8")
assert "</script" not in gsap and "</script" not in st
html = html.replace("{{GSAP}}", gsap).replace("{{ST}}", st)
assert not re.search(r"\{\{(IMG|LOGO|GSAP|ST)", html), "placeholder sem substituição"
(raiz / "cinematica.html").write_text(html, encoding="utf-8")
print("ok", len(html) // 1024, "KB")
