// Interfaccia Motorizzato
interface Motorizzato {
    avviaMotore(): void;
}

// Classe astratta Veicolo
abstract class Veicolo {
    private readonly targa: string;
    protected marca: string;
    protected modello: string; 
    private _velocitaMassima: number;

    protected constructor(marca: string, modello: string, velocitaMassima: number, targa: string) {
        this.marca = marca;
        this.modello = modello;
        this._velocitaMassima = velocitaMassima;
        this.targa = targa;
    }

    public getVelocitaMassima(): number {
        return this._velocitaMassima;
    }

    public setVelocitaMassima(value: number): void {
        if (value < 0) {
            throw new Error("La velocità massima deve essere un valore positivo.");
        }
        this._velocitaMassima = value;
    }

    public descrizione(): string {
        return `Marca: ${this.marca}, Modello: ${this.modello}, Velocità Massima: ${this._velocitaMassima} km/h`;
    }

    public abstract avviaMotore(): void;
}

// Classe derivata Auto
class Auto extends Veicolo implements Motorizzato {
    private numeroPorte: number;

    constructor(marca: string, modello: string, velocitaMassima: number, targa: string, numeroPorte: number) {
        super(marca, modello, velocitaMassima, targa);
        this.numeroPorte = numeroPorte;
    }

    public descriviAuto(): string {
        return `${this.descrizione()}, Numero di Porte: ${this.numeroPorte}`;
    }

    public avviaMotore(): void {
        console.log(`Il motore dell'auto ${this.marca} ${this.modello} è stato avviato.`);
    }
}

// Classe derivata Moto
class Moto extends Veicolo implements Motorizzato {
    private tipoManubrio: string;

    constructor(marca: string, modello: string, velocitaMassima: number, targa: string, tipoManubrio: string) {
        super(marca, modello, velocitaMassima, targa);
        this.tipoManubrio = tipoManubrio;
    }

    public descriviMoto(): string {
        return `${this.descrizione()}, Tipo di Manubrio: ${this.tipoManubrio}`;
    }

    public avviaMotore(): void {
        console.log(`Il motore della moto ${this.marca} ${this.modello} è stato avviato.`);
    }
}

// Creazione di istanze e utilizzo
const miaAuto = new Auto('Fiat', 'Panda', 180, 'AB123CD', 5);
const miaMoto = new Moto('Yamaha', 'MT-07', 200, 'XY456EF', 'Sport');

console.log(miaAuto.descriviAuto());
console.log(miaMoto.descriviMoto());
miaAuto.avviaMotore();
miaMoto.avviaMotore();
