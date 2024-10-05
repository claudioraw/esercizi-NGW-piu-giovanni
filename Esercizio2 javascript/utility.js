function loopStampa() {
    while (true) {
        let input = prompt("Inserire un valore e se vuoi uscire digita 'ESCI':");

        if (input === "ESCI") {
            console.log("Uscita dal ciclo.");
            break; 
        } else {
            console.log("Hai inserito: " + input);
        }
    }
}
