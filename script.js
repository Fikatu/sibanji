const scuze = document.getElementById("scuze");
const frica = document.getElementById("frica");
const nut = document.getElementById("nuLua");
const iati = document.getElementById("ia-ti")
const platesc = document.getElementById("platesc");
const plateste = document.getElementById("plateste")

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

function plat() {
    alert("Plateste el 🤮")
}

function plate() {
    alert("He'll pay 🤮🤮🤮🤮")
}

scuze.addEventListener("click", alerta);
frica.addEventListener("click", frica1);
nut.addEventListener("click", nuti);
iati.addEventListener("click", ial);
platesc.addEventListener("click", plat);
plateste.addEventListener("click", plate);