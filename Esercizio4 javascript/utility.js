function listaDellaSpesa() {
    let listaSpesa = [];
    let loop = true;

    while (loop) {
        let azione = prompt("Vuoi AGGIUNGERE (1) o ELIMINARE (2) un prodotto dalla lista della spesa?");

        switch (azione) {
            case "1":
                let aggiuntaProdotto = prompt("Cosa vuoi aggiungere alla lista della spesa?");
                if (aggiuntaProdotto) {
                    listaSpesa.push(aggiuntaProdotto);
                    console.log("Lista della spesa:", listaSpesa);
                    alert("Prodotto aggiunto correttamente alla lista della spesa.");
                }
                break;

            case "2":
                let eliminaProdotto = prompt("Quale prodotto vuoi eliminare dalla lista della spesa?");
                // Il metodo indexOf() restituisce l'indice del primo elemento corrispondente o -1 se l'elemento non è trovato.
                let index = listaSpesa.indexOf(eliminaProdotto);
                if (index !== -1) {
                    listaSpesa.splice(index, 1);
                    console.log("Lista della spesa:", listaSpesa);
                    alert("Prodotto eliminato correttamente dalla lista della spesa.");
                } else {
                    alert("Il prodotto non è presente nella lista della spesa.");
                }
                break;

            default:
                alert("Azione non valida. Per favore, digita '1' per AGGIUNGERE o '2' per ELIMINARE.");
        }

        let continua = prompt("Vuoi fare un'altra operazione? SI o NO");
        if (continua && continua.toUpperCase() === "NO") {
            loop = false;
        }
    }

    console.log("Ecco la tua lista finale:", listaSpesa);
}
