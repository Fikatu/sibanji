const scuze = document.getElementById("scuze");
const frica = document.getElementById("frica");
const nut = document.getElementById("nuLua");
const iati = document.getElementById("ia-ti")

function alerta() {
    alert("Bine ca iti ceri scuze. Incerc sa il calmez!");
}

function frica1() {
    alert("Arunca-i niste mici repede si fugi!")
}

function nuti() {
    alert("Nu-si ia ca oricum e degeaba!")
}

function ial() {
    alert("Isi ia da-l drecu")
}

scuze.addEventListener("click", alerta);
frica.addEventListener("click", frica1);
nut.addEventListener("click", nuti);
iati.addEventListener("click", ial)