/*et tema = localStorage.getItem("tema");
if(tema) 
    document.body.classList.add("dark");

window.addEventListener("load", function() {
    document.getElementById("tema").onclick = function() {
        if(document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            localStorage.removeItem("tema");
        } else {
            document.body.classList.add("dark");
            localStorage.setItem("tema", "dark");
        }
    }
});*/

let tema = localStorage.getItem("tema");
if (tema) {
    document.body.classList.add("dark");
    document.getElementById("checkbox").checked = true;
}

window.addEventListener("load", function() {
    document.getElementById("checkbox").addEventListener("change", function() {
        if (this.checked) {
            document.body.classList.add("dark");
            localStorage.setItem("tema", "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.removeItem("tema");
        }
    });
});
