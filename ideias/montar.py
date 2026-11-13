"""Gera ideias/repaginacao.html a partir de modelo.html, embutindo as fotos (data URI) para a página abrir em qualquer lugar."""
import base64, pathlib, re

raiz = pathlib.Path(__file__).resolve().parent
fotos = {
    "pkz": "pkz/EquipePKZ-800.webp",
    "oto": "one-to-one/equipe-800.webp",
    "karate": "pkz/karate-480.webp",
    "jiu": "pkz/JiuJitsu-480.webp",
    "volei": "pkz/volei-480.webp",
    "pt": "one-to-one/personal-training-480.webp",
    "fisio": "fisio/equipe-480.webp",
    "nutri": "one-to-one/nutricao-480.webp",
}
base = raiz.parent / "public" / "assets" / "img"
html = (raiz / "modelo.html").read_text(encoding="utf-8")
for nome, caminho in fotos.items():
    dados = base64.b64encode((base / caminho).read_bytes()).decode()
    html = html.replace("{{IMG:%s}}" % nome, "data:image/webp;base64," + dados)
assert not re.search(r"\{\{IMG:", html), "imagem sem substituição"
(raiz / "repaginacao.html").write_text(html, encoding="utf-8")
print("ok", len(html) // 1024, "KB")
