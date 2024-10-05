function listaSpesa() {
    let listaProdotti = [];
    let loop = true;

    while (loop) {
        let prodotto = prompt("Cosa vuoi aggiungere alla lista della spesa?");
        
        if (prodotto) {
            listaProdotti.push(prodotto);
            console.log("Lista della spesa:", listaProdotti);
            alert("Prodotto aggiunto alla lista.");
        }

        let risposta = prompt("Vuoi continuare ad aggiungere prodotti? SI o NO");
        if (risposta && risposta.toUpperCase() === "NO") {
            break;
        }
    }

    console.log("Questa e' la lista finale:", listaProdotti);
}
