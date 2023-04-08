const { render } = require("ejs");
const express = require("express");
const fs= require('fs');
const path = require('path');
const sharp = require("sharp");
const sass = require("sass");

obGlobal={
    obErori:null,
    obImagini:null,
    folderScss: path.join(__dirname, "resurse/scss"),
    folderCss: path.join(__dirname, "resurse/css")

}

vectorFoldere = ["temp", "temp1", "backup"];
for (let folder of vectorFoldere) {
    //let caleFolder = __dirname+"/"+folder;
    caleFolder = path.join(__dirname + folder);
    if (!fs.existsSync(caleFolder)) {
        fs.mkdirSync(caleFolder);    
    }

}

function compileazaScss(caleScss, caleCss) {
    if(!path.isAbsolute(caleScss))
        caleScss = path.join(obGlobal.folderScss,caleScss);
    if(!path.isAbsolute(caleCss))
        caleCss = path.join(obGlobal.folderScss,caleCss);
}

app = express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());

app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"));
app.use("/node_modules", express.static(__dirname+"/node_modules"));

app.use(/^\/resurse(\/[a-zA-Z0-9]*)*$/, function(req,res) {
    afisareEroare(res, 403);
});


app.get("/favicon.ico", function(req, res) {
    res.sendFile(__dirname+"/resurse/imagini/favicon.ico");
});


app.get("/ceva", function(req, res){
    console.log("cale:",req.url)
    res.send("<h1>altceva</h1> ip:"+req.ip);
})



app.get(["/index","/","/home" ], function(req, res){
    res.render("pagini/index" , {ip: req.ip, a: 10, b:20, imagini:obGlobal.obImagini.imagini});
});




/* ^\w+\.ejs$/gm - expresie regualta care preia fisierele de tip .ejs */

app.get(["/*.ejs"] , function(req, res) {
    afisareEroare(res,400);
});


app.get("/*",function(req, res){
    try {
        res.render("pagini"+req.url, function(err, rezRandare){
            if(err){
                console.log(err);
                if(err.message.startsWith("Failed to lookup view"))
                    /*afisareEroare(res,{_identificator: 404, _titlu: "ceva"});*/
                    afisareEroare(res, 404, "ceva");
                else
                    afisareEroare(res);
            }
            else{
                console.log(rezRandare);
                res.send(rezRandare);
            }
        });
    } catch(err) {
        if(err.message.startsWith("Cannot find module"))
        /*afisareEroare(res,{_identificator: 404, _titlu: "ceva"});*/
            afisareEroare(res, 404);
        else
            afisareEroare(res);
    }
});


function initErori(){
    var continut= fs.readFileSync(__dirname+"/resurse/json/erori.json").toString("utf-8");
    obGlobal.obErori=JSON.parse(continut);
    let vErori=obGlobal.obErori.info_erori;
    //for (let i=0; i< vErori.length; i++ )
    for (let eroare of vErori){
        eroare.imagine="/"+obGlobal.obErori.cale_baza+"/"+eroare.imagine;
    }
}
initErori();

/*
daca programatorul seteaza titlul, se ia titlul din argument
daca nu e setat se ia cel din json
daca nu avem titlul nici in json se ia titlul de valoarea default
idem pentru celelalte
*/

/*function afisareEroare(res,{ _identificator, _titlu = "titlu default", _text, _imagine} = {} ){*/
function afisareEroare(res,_identificator, _titlu = "titlu default", _text, _imagine){
    let vErori=obGlobal.obErori.info_erori;
    let eroare=vErori.find(function(elem) {return elem.identificator==_identificator;} )
    if(eroare){
        let titlu1= _titlu == "titlu default" ? (eroare.titlu || _titlu) : _titlu;
        let text1= _text || eroare.text;
        let imagine1= _imagine || eroare.imagine;
        if(eroare.status)
            res.status(eroare.identificator).render("pagini/eroare", {titlu:titlu1, text:text1, imagine:imagine1});
        else
            res.render("pagini/eroare", {titlu:titlu1, text:text1, imagine:imagine1});
    }
    else{
        let errDef=obGlobal.obErori.eroare_default;
        res.render("pagini/eroare", {titlu:errDef.titlu, text:errDef.text, imagine:obGlobal.obErori.cale_baza+"/"+errDef.imagine});
    }
    

}


function initImagini(){
    var continut= fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf-8");

    obGlobal.obImagini=JSON.parse(continut);
    let vImagini=obGlobal.obImagini.imagini;
    let caleAbs = path.join(__dirname, obGlobal.obImagini.cale_galerie);
    let caleAbsMediu = path.join(caleAbs, "mediu");
    if(!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu);
    //for (let i=0; i< vErori.length; i++ )
    for (let imag of vImagini){
        [numeFis, ext] = imag.fisier.split(".");
        let caleFisAbs = path.join(caleAbs, imag.fisier);
        let caleFisMediuAbs = path.join(caleAbsMediu, numeFis + ".webp");
        sharp(caleFisAbs).resize(400).toFile(caleFisMediuAbs);
        imag.fisier_mediu = "/"+path.join(obGlobal.obImagini.cale_galerie, "mediu", numeFis + ".webp");
        imag.fisier = "/"+path.join(obGlobal.obImagini.cale_galerie, imag.fisier);
        //imag.imagine="/"+obGlobal.obImagini.cale_baza+"/"+imag.imagine;
    }
}
initImagini();

app.listen(8080);
console.log("Serverul a pornit");