var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Classe astratta Veicolo
var Veicolo = /** @class */ (function () {
    function Veicolo(marca, modello, velocitaMassima, targa) {
        this.marca = marca;
        this.modello = modello;
        this._velocitaMassima = velocitaMassima;
        this.targa = targa;
    }
    Veicolo.prototype.getVelocitaMassima = function () {
        return this._velocitaMassima;
    };
    Veicolo.prototype.setVelocitaMassima = function (value) {
        if (value < 0) {
            throw new Error("La velocità massima deve essere un valore positivo.");
        }
        this._velocitaMassima = value;
    };
    Veicolo.prototype.descrizione = function () {
        return "Marca: ".concat(this.marca, ", Modello: ").concat(this.modello, ", Velocit\u00E0 Massima: ").concat(this._velocitaMassima, " km/h");
    };
    return Veicolo;
}());
// Classe derivata Auto
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto(marca, modello, velocitaMassima, targa, numeroPorte) {
        var _this = _super.call(this, marca, modello, velocitaMassima, targa) || this;
        _this.numeroPorte = numeroPorte;
        return _this;
    }
    Auto.prototype.descriviAuto = function () {
        return "".concat(this.descrizione(), ", Numero di Porte: ").concat(this.numeroPorte);
    };
    Auto.prototype.avviaMotore = function () {
        console.log("Il motore dell'auto ".concat(this.marca, " ").concat(this.modello, " \u00E8 stato avviato."));
    };
    return Auto;
}(Veicolo));
// Classe derivata Moto
var Moto = /** @class */ (function (_super) {
    __extends(Moto, _super);
    function Moto(marca, modello, velocitaMassima, targa, tipoManubrio) {
        var _this = _super.call(this, marca, modello, velocitaMassima, targa) || this;
        _this.tipoManubrio = tipoManubrio;
        return _this;
    }
    Moto.prototype.descriviMoto = function () {
        return "".concat(this.descrizione(), ", Tipo di Manubrio: ").concat(this.tipoManubrio);
    };
    Moto.prototype.avviaMotore = function () {
        console.log("Il motore della moto ".concat(this.marca, " ").concat(this.modello, " \u00E8 stato avviato."));
    };
    return Moto;
}(Veicolo));
// Creazione di istanze e utilizzo
var miaAuto = new Auto('Fiat', 'Panda', 180, 'AB123CD', 5);
var miaMoto = new Moto('Yamaha', 'MT-07', 200, 'XY456EF', 'Sport');
console.log(miaAuto.descriviAuto());
console.log(miaMoto.descriviMoto());
miaAuto.avviaMotore();
miaMoto.avviaMotore();
