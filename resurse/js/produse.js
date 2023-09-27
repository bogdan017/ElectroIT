window.addEventListener("load", function() {

    let iduriProduse = localStorage.getItem("cos_virtual");
    iduriProduse = iduriProduse ? iduriProduse.split(",") : [];
  
    for (let idp of iduriProduse) {
      let ch = document.querySelector(`[value='${idp}'].select-cos`);
      if (ch) {
        ch.checked = true;
      } else {
        console.log("id cos virtual inexistent:", idp);
      }
    }
  
    let checkboxuri = document.getElementsByClassName("select-cos");
    for (let ch of checkboxuri) {
      ch.onchange = function() {
        let iduriProduse = localStorage.getItem("cos_virtual");
        iduriProduse = iduriProduse ? iduriProduse.split(",") : [];
  
        if (this.checked) {
          iduriProduse.push(this.value);
        } else {
          let poz = iduriProduse.indexOf(this.value);
          if (poz != -1) {
            iduriProduse.splice(poz, 1);
          }
        }
  
        localStorage.setItem("cos_virtual", iduriProduse.join(","));
      }
    }
  
    document.getElementById("inp-baterie").onchange = function() {
      document.getElementById("infoRange").innerHTML = `(${this.value})`;
    }
  
    document.getElementById("filtrare").onclick = function() {
  
  
      // Retrieve filter values
      let val_nume = document.getElementById("inp-nume").value.toLowerCase();
      
  
      let radiobuttons = document.getElementsByName("gr_rad");
      let val_tipProd;
      for (let r of radiobuttons) {
          if (r.checked) {
              val_tipProd = r.value.toLowerCase();
              break;
          }
      }
  
      let val_baterie = parseInt(document.getElementById("inp-baterie").value);
      let val_categ = document.getElementById("inp-categorie").value.toLowerCase();
      let val_sloturi = document.getElementById("inp-slot").checked;
      let val_garantie = parseInt(document.getElementById("inp-garantie").value);
      let val_keywords = document.getElementById("inp-cuvinte-cheie").value.toLowerCase();
      let val_pret = Array.from(document.getElementById("inp-pret").selectedOptions).map(option => option.value.split("-").map(Number));
      
      var produse = document.getElementsByClassName("produs");
    
      for (let prod of produse) {
        prod.style.display = "none";
      
        // Filter conditions
        let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();
        let cond1 = nume.startsWith(val_nume);
    
        let tipProd = prod.getElementsByClassName("val-tipProdus")[0].innerHTML.toLowerCase();
        console.log("tipProd:", tipProd);
        let cond2 = (val_tipProd == "toate" || val_tipProd == tipProd);
    
        let baterie = parseInt(prod.getElementsByClassName("val-baterie")[0].innerHTML);
        let cond3 = (val_baterie == 308 || baterie >= val_baterie);
    
        let garantie = parseInt(prod.getElementsByClassName("val-garantie")[0].innerHTML);
        let cond4 = (isNaN(val_garantie) || garantie === val_garantie);
    
        let sloturi = prod.getElementsByClassName("val-slot")[0].innerHTML;
        let cond5 = (!val_sloturi || (sloturi === 'true' && val_sloturi));
    
        let descriere = prod.getElementsByClassName("val-descriere")[0].innerHTML.toLowerCase();
        let positiveKeywords = [];
        let negativeKeywords = [];
        
        val_keywords.split(" ").forEach(keyword => {
          if (keyword.startsWith("+")) {
            positiveKeywords.push(keyword.slice(1));
          } else if (keyword.startsWith("-")) {
            negativeKeywords.push(keyword.slice(1));
          }
        });
        
        let hasPositiveKeyword = positiveKeywords.some(keyword => {
          let regex = new RegExp(`\\b${keyword}\\b`, 'i');
          return regex.test(descriere);
        });
        
        let hasNegativeKeyword = negativeKeywords.some(keyword => {
          let regex = new RegExp(`\\b${keyword}\\b`, 'i');
          return regex.test(descriere);
        });
        
        let cond6 = (positiveKeywords.length === 0 || (hasPositiveKeyword && !hasNegativeKeyword));
        
    
        let categorie = prod.getElementsByClassName("val-categorie")[0].innerHTML.toLowerCase();
        let cond7 = (val_categ === "toate" || val_categ === categorie);
    
        let pret = parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
        let cond8 = (val_pret.length === 0 || val_pret.some(interval => pret >= interval[0] && pret <= interval[1]));
    
        if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8) {
          prod.style.display = "block";
        }
      }
    };
    
  
    document.getElementById("resetare").onclick = function() {
        if(confirm("Doriti sa resetati filtrele?")) {
            document.getElementById("inp-nume").value = "";
            document.getElementById("toate").checked = true;
            document.getElementById("inp-baterie").value = document.getElementById("inp-baterie").min;
            document.getElementById("inp-categorie").value = "toate";
            document.getElementById("inp-slot").checked = false;
            document.getElementById("inp-garantie").value = "";
            document.getElementById("inp-cuvinte-cheie").value = "";
            document.getElementById("inp-pret").value = "";
            document.getElementById("infoRange").innerHTML="(308)";
        
            var produse = document.getElementsByClassName("produs");
        
            for (let prod of produse) {
                prod.style.display = "block";
            }
        }
    }
  
    function sortare(semn) {
      var produse = document.getElementsByClassName("produs");
      var v_produse = Array.from(produse);
      v_produse.sort(function(a, b) {
        let pret_a = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
        let pret_b = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
  
        if (pret_a === pret_b) {
          let nume_a = a.getElementsByClassName("val-nume")[0].innerHTML;
          let nume_b = b.getElementsByClassName("val-nume")[0].innerHTML;
  
          return semn * nume_a.localeCompare(nume_b);
        }
  
        return semn * (pret_a - pret_b);
      });
  
      for (let prod of v_produse) {
        prod.parentElement.appendChild(prod);
      }
    }
  
    document.getElementById("sortCrescNume").onclick = function() {
      sortare(1);
    }
  
    document.getElementById("sortDescrescNume").onclick = function() {
      sortare(-1);
    }
  
    window.onkeydown = function(e) {
      if (e.altKey) {
        if (document.getElementById("info-suma")) {
          return;
        }
  
        var produse = document.getElementsByClassName("produs");
        let suma = 0;
  
        for (let prod of produse) {
          if (prod.style.display !== "none") {
            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
            suma += pret;
          }
        }
  
        let p = document.createElement("p");
        p.innerHTML = suma;
        p.id = "info-suma";
        let ps = document.getElementById("p-suma");
        let container = ps.parentNode;
        let frate = ps.nextElementSibling;
        container.insertBefore(p, frate);
  
        setTimeout(function() {
          let info = document.getElementById("info-suma");
          if (info) {
            info.remove();
          }
        }, 2000);
      }
    };
  });
  