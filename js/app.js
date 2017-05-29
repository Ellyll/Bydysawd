var Bydysawd;
(function (Bydysawd) {
    class Fector2D {
        constructor(x, y) {
            this._data = [x, y];
        }
        get 0() { return this._data[0]; }
        get 1() { return this._data[1]; }
        get x() { return this._data[0]; }
        get y() { return this._data[1]; }
        get length() { return 2; }
        toString() {
            return `(${this.x},${this.y})`;
        }
        // Dot product
        dot(fector) {
            return this.x * fector.x + this.y * fector.y;
        }
        lluosi(n) {
            return new Fector2D(this.x * n, this.y * n);
        }
        rhannu(n) {
            return new Fector2D(this.x / n, this.y / n);
        }
        ychwanegu(fector) {
            return new Fector2D(this.x + fector.x, this.y + fector.y);
        }
        tynnu(fector) {
            return new Fector2D(this.x - fector.x, this.y - fector.y);
        }
        maint() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        maintSgwar() {
            return this.x * this.x + this.y * this.y;
        }
        pellterI(fector) {
            const a = fector.tynnu(this);
            return a.maint();
        }
        pellterSgwarI(fector) {
            const a = fector.tynnu(this);
            return a.maintSgwar();
        }
        uned() {
            return this.rhannu(this.maint());
        }
        map(func) {
            return new Fector2D(func(this.x), func(this.y));
        }
    }
    Bydysawd.Fector2D = Fector2D;
})(Bydysawd || (Bydysawd = {}));
var Bydysawd;
(function (Bydysawd) {
    class Lliw {
        constructor(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            if (!Lliw.ynDilys(r))
                throw Error(`Cydran r annilys: ${r}`);
            if (!Lliw.ynDilys(g))
                throw Error(`Cydran g annilys: ${g}`);
            if (!Lliw.ynDilys(b))
                throw Error(`Cydran b annilys: ${b}`);
            if (!Lliw.ynDilys(a))
                throw Error(`Cydran a annilys: ${a}`);
        }
        static ynDilys(cydran) {
            return cydran >= 0 && cydran <= 255;
        }
        static oRGBA(r, g, b, a) {
            return new Lliw(r, g, b, a);
        }
        static oRGB(r, g, b) {
            return new Lliw(r, g, b, 255);
        }
        static oHex(hex) {
            const str = hex.startsWith("#") ? hex.substr(1) : hex;
            const hyd = str.length;
            // RGB, RGBA, RRGGBB, RRGGBBAA
            let step;
            switch (hyd) {
                case 3:
                case 4:
                    step = 1;
                    break;
                case 6:
                case 8:
                    step = 2;
                    break;
                default:
                    throw Error(`Fformat lliw anhywir: ${hex}`);
            }
            const c = []; // cydrannau
            for (let i = 0; i < hyd; i += step) {
                c.push(parseInt(str.substr(i, step), 16));
            }
            if (c.length < 4)
                c.push(255);
            return new Lliw(c[0], c[1], c[2], c[3]);
        }
        felRGBA() {
            return `rgba(${this.r},${this.g},${this.b},${this.a})`;
        }
    }
    Bydysawd.Lliw = Lliw;
})(Bydysawd || (Bydysawd = {}));
/// <reference path="./fector.ts" />
/// <reference path="./lliw.ts" />
var Bydysawd;
(function (Bydysawd) {
    class Endid {
        constructor(x, y, cyflymderX, cyflymderY, radiws, mas, lliw) {
            this.radiws = radiws;
            this.mas = mas;
            this.lliw = lliw;
            this.lleoliad = new Bydysawd.Fector2D(x, y);
            this.cyflymder = new Bydysawd.Fector2D(cyflymderX, cyflymderY);
        }
        gydaCyflymder(cyflymder) {
            return new Endid(this.lleoliad.x, this.lleoliad.y, cyflymder.x, cyflymder.y, this.radiws, this.mas, this.lliw);
        }
        gydaLleoliad(lleoliad) {
            return new Endid(lleoliad.x, lleoliad.y, this.cyflymder.x, this.cyflymder.y, this.radiws, this.mas, this.lliw);
        }
        gydaLliw(lliw) {
            return new Endid(this.lleoliad.x, this.lleoliad.y, this.cyflymder.x, this.cyflymder.y, this.radiws, this.mas, lliw);
        }
    }
    Bydysawd.Endid = Endid;
})(Bydysawd || (Bydysawd = {}));
/// <reference path="./endid.ts" />
var Bydysawd;
(function (Bydysawd) {
    class FfatriEndidau {
        static CreuArHap(nifer, isafswmX, isafswmY, uchafswmX, uchafswmY, endidauPresenol = []) {
            if (nifer < 1)
                return [];
            const canol = new Bydysawd.Fector2D((isafswmX + uchafswmX) / 2, (isafswmY + uchafswmY) / 2);
            const endidau = endidauPresenol.slice();
            for (let i = 0; i < nifer; i++) {
                let x;
                let y;
                while (true) {
                    const x = FfatriEndidau.NolIntArHap(isafswmX, uchafswmX);
                    const y = FfatriEndidau.NolIntArHap(isafswmY, uchafswmY);
                    const unedAtYCanol = canol.tynnu(new Bydysawd.Fector2D(x, y)).uned();
                    const cyflymder = unedAtYCanol.lluosi(FfatriEndidau.NolArHap(0, 10));
                    const cyflymderX = cyflymder.x; //FfatriEndidau.NolArHap(-10,10);
                    const cyflymderY = cyflymder.y; // FfatriEndidau.NolArHap(-10,10);
                    const radiws = Bydysawd.CynhyrchyddGaussian.nolAmrediadInt(1, 15); //FfatriEndidau.NolIntArHap(1,15);
                    const cyfaint = (4 / 3) * Math.PI * Math.pow(radiws, 3); // V = 4/3 PI r^3
                    const dwysedd = 5514; // y ddear yn 5514 kg/m^3
                    const mas = dwysedd * cyfaint; //150; //(5.97237*Math.pow(10,24));
                    const endidNewydd = new Bydysawd.Endid(x, y, cyflymderX, cyflymderY, radiws, mas, FfatriEndidau.NolLliwArHap());
                    if (endidau.every(e => !Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(e, endidNewydd))) {
                        endidau.push(endidNewydd);
                        break;
                    }
                }
            }
            return endidau;
        }
        static NolLliwArHap() {
            return Bydysawd.Lliw.oRGB(FfatriEndidau.NolIntArHap(0, 255), FfatriEndidau.NolIntArHap(0, 255), FfatriEndidau.NolIntArHap(0, 255));
        }
        static NolArHap(isaf, uchaf) {
            return (Math.random() * (uchaf - isaf)) + isaf;
        }
        static NolIntArHap(isaf, uchaf) {
            const min = Math.ceil(isaf);
            const max = Math.floor(uchaf);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    Bydysawd.FfatriEndidau = FfatriEndidau;
})(Bydysawd || (Bydysawd = {}));
/// <reference path="./endid.ts" />
var Bydysawd;
(function (Bydysawd) {
    class CanfodyddGwrthdrawiadau {
        static YnGwrthdaro(endid, targed) {
            const pellter = endid.lleoliad.pellterI(targed.lleoliad);
            return (endid.radiws + targed.radiws) >= pellter;
        }
    }
    Bydysawd.CanfodyddGwrthdrawiadau = CanfodyddGwrthdrawiadau;
})(Bydysawd || (Bydysawd = {}));
/// <reference path="./endid.ts" />
var Bydysawd;
(function (Bydysawd) {
    class Lliniadydd {
        constructor(context) {
            this._context = context;
        }
        LluniaduEndidau(endidau) {
            endidau.forEach(pwynt => this.LluniaduEndid(pwynt));
        }
        LluniaduEndid(endid) {
            const ctx = this._context;
            //ctx.strokeStyle = "#FFF";
            //ctx.fillStyle = "#FFF";
            ctx.fillStyle = endid.lliw.felRGBA();
            ctx.beginPath();
            ctx.arc(endid.lleoliad.x, endid.lleoliad.y, endid.radiws, 0, Math.PI * 2.0, false);
            ctx.fill();
            //ctx.fillRect(endid.lleoliad.x, endid.lleoliad.y, 1, 1);
        }
    }
    Bydysawd.Lliniadydd = Lliniadydd;
})(Bydysawd || (Bydysawd = {}));
/// <reference path="./ffatriEndidau.ts" />
/// <reference path="./canfodyddGwrthdrawiadau.ts" />
/// <reference path="./lluniadu.ts" />
var Bydysawd;
(function (Bydysawd) {
    class App {
        cychwyn() {
            const canvas = document.getElementById("canvas");
            const context = canvas.getContext("2d");
            const lliniadydd = new Bydysawd.Lliniadydd(context);
            // Gosod y canvas i'r maint mwyaf bosib
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            const xCanol = (canvas.width / 2) - 1;
            const yCanol = (canvas.height / 2) - 1;
            const endidCanol = Bydysawd.FfatriEndidau.CreuArHap(1, xCanol, xCanol, xCanol, yCanol);
            const endidauCychwyn = Bydysawd.FfatriEndidau.CreuArHap(100, 0, 0, canvas.width - 1, canvas.height - 1);
            let amserHen = performance.now();
            let niferFframiau = 0;
            const lluniadu = (amserRwan, amserHen, endidau) => {
                niferFframiau++;
                let gwahaniaeth = amserRwan - amserHen;
                while (gwahaniaeth > 128) {
                    const eiliadau = 128 / 1000;
                    endidau = diweddaru(context, endidau, eiliadau);
                    gwahaniaeth = gwahaniaeth - 128;
                }
                endidau = diweddaru(context, endidau, gwahaniaeth / 1000);
                context.clearRect(0, 0, canvas.width, canvas.height);
                lliniadydd.LluniaduEndidau(endidau);
                //if (niferFframiau % 1000 === 0) console.log(`Nifer fframiau: ${niferFframiau}`, endidau.map(e => e.cyflymder.toString()));
                if (endidau.length > 0) {
                    const amserDiwethaf = amserRwan;
                    window.requestAnimationFrame((rwan) => lluniadu(rwan, amserDiwethaf, endidau));
                }
                else {
                    console.log("Wedi gorffen");
                }
            };
            window.requestAnimationFrame((rwan) => lluniadu(rwan, performance.now(), endidauCychwyn));
        }
    }
    Bydysawd.App = App;
    function diweddaru(context, endidauGwreiddiol, eiliadau) {
        let endidau = Bydysawd.Disgyrchiant.gweithreduDisgyrchiant(endidauGwreiddiol, eiliadau);
        for (let i = 0; i < endidau.length; i++) {
            const e1 = endidau[i];
            const lleoliadNewydd = e1.lleoliad.ychwanegu(e1.cyflymder.lluosi(eiliadau));
            const endidNewydd = e1.gydaLleoliad(lleoliadNewydd);
            let wediGwrthdaro = false;
            for (let j = 0; j < endidau.length; j++) {
                if (j === i)
                    continue;
                let targed = endidau[j];
                if (Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(endidNewydd, targed)) {
                    const endidauArOlGwrthdaro = gwrthdaro(e1, targed);
                    endidau[i] = endidauArOlGwrthdaro[0];
                    endidau[j] = endidauArOlGwrthdaro[1];
                    wediGwrthdaro = true;
                    break;
                }
            }
            if (!wediGwrthdaro) {
                endidau[i] = endidNewydd;
            }
        }
        const lled = context.canvas.width;
        const uchder = context.canvas.height;
        endidau = endidau
            .filter(e => e.lleoliad.x >= -lled && e.lleoliad.x < 2 * lled && e.lleoliad.y >= -uchder && e.lleoliad.y < 2 * uchder);
        return endidau;
    }
    function gwrthdaro(e1, e2) {
        const m1 = e1.mas;
        const m2 = e2.mas;
        // Crewyd o 2-dimensional elastic collision - http://vobarian.com/collisions/2dcollisions2.pdf
        // 1
        const n = new Bydysawd.Fector2D(e2.lleoliad.x - e1.lleoliad.x, e2.lleoliad.y - e1.lleoliad.y); // normal vector
        const magN = Math.sqrt(n[0] * n[0] + n[1] * n[1]); // magnitude of n
        const un = new Bydysawd.Fector2D(n[0] / magN, n[1] / magN); // find unit vector of n by dividing by magnitude of n
        const ut = new Bydysawd.Fector2D(-un[1], un[0]); // unit tangent vector
        // 2 - Initial velocities
        const v1 = e1.cyflymder;
        const v2 = e2.cyflymder;
        // 3 - Resolve velocities into normal and tangential components
        const v1n = un.dot(v1);
        const v1t = ut.dot(v1);
        const v2n = un.dot(v2);
        const v2t = ut.dot(v2);
        // 4 - Find tangential velocities after collision (easy as they don't change)
        const v1tAfter = v1t;
        const v2tAfter = v2t;
        // 5 - Find new normal velocities after collision
        const v1nAfter = ((v1n * (m1 - m2)) + (2 * m2 * v2n)) / (m1 + m2);
        const v2nAfter = ((v2n * (m2 - m1)) + (2 * m1 * v1n)) / (m1 + m2);
        // 6 - Convert the scalar normal and tangential velocities into vector
        const v1nAfterFector = un.lluosi(v1nAfter);
        const v1tAfterFector = un.lluosi(v1tAfter);
        const v2nAfterFector = un.lluosi(v2nAfter);
        const v2tAfterFector = un.lluosi(v2tAfter);
        // 7 - Find the final velocity vectors by adding the normal and tangential components
        const v1After = v1nAfterFector.ychwanegu(v1tAfterFector);
        const v2After = v2nAfterFector.ychwanegu(v2tAfterFector);
        // Creu pwyntiau newydd
        const e1a = new Bydysawd.Endid(e1.lleoliad.x, e1.lleoliad.y, v1After.x, v1After.y, e1.radiws, e1.mas, e1.lliw);
        const e2a = new Bydysawd.Endid(e2.lleoliad.x, e2.lleoliad.y, v2After.x, v2After.y, e2.radiws, e2.mas, e2.lliw);
        return [e1a, e2a];
    }
})(Bydysawd || (Bydysawd = {}));
var Bydysawd;
(function (Bydysawd) {
    class CynhyrchyddGaussian {
        static nol(mean, stdDev) {
            // Defnyddio https://en.wikipedia.org/wiki/Marsaglia_polar_method
            if (CynhyrchyddGaussian.isSpareReady) {
                CynhyrchyddGaussian.isSpareReady = false;
                return CynhyrchyddGaussian.spare * stdDev + mean;
            }
            else {
                let u;
                let v;
                let s;
                do {
                    u = Math.random() * 2 - 1;
                    v = Math.random() * 2 - 1;
                    s = u * u + v * v;
                } while (s >= 1 || s == 0);
                let mul = Math.sqrt(-2.0 * Math.log(s) / s);
                CynhyrchyddGaussian.spare = v * mul;
                CynhyrchyddGaussian.isSpareReady = true;
                return mean + stdDev * u * mul;
            }
        }
        static nolAmrediadInt(cychwyn, gorffen) {
            const canol = (cychwyn + gorffen) / 2;
            const gwyriadSafonol = (gorffen - cychwyn) / 2;
            let n = cychwyn - 1;
            do {
                n = CynhyrchyddGaussian.nol(canol, gwyriadSafonol);
            } while (n < cychwyn || n > gorffen);
            return Math.round(n);
        }
    }
    CynhyrchyddGaussian.isSpareReady = false;
    Bydysawd.CynhyrchyddGaussian = CynhyrchyddGaussian;
})(Bydysawd || (Bydysawd = {}));
var Bydysawd;
(function (Bydysawd) {
    class Disgyrchiant {
        static gweithreduDisgyrchiant(endidau, eiliadau) {
            const cyflymderIsaf = -30.0;
            const cyflymderUchaf = 30.0;
            // Disgyrchiant
            const endidauNewydd = endidau.slice();
            for (let i = 0; i < endidauNewydd.length; i++) {
                for (let j = i + 1; j < endidauNewydd.length; j++) {
                    const e1 = endidauNewydd[i];
                    const e2 = endidauNewydd[j];
                    const cyflymiadP1 = Disgyrchiant.nolCyflymiad(e1, e2, eiliadau);
                    const cyflymiadP2 = Disgyrchiant.nolCyflymiad(e2, e1, eiliadau);
                    const cyflymderE1 = e1.cyflymder
                        .ychwanegu(cyflymiadP1)
                        .map(n => Disgyrchiant.clampio(n, cyflymderIsaf, cyflymderUchaf));
                    const cyflymderE2 = e2.cyflymder
                        .ychwanegu(cyflymiadP2)
                        .map(n => Disgyrchiant.clampio(n, cyflymderIsaf, cyflymderUchaf));
                    endidauNewydd[i] = e1.gydaCyflymder(cyflymderE1);
                    endidauNewydd[j] = e2.gydaCyflymder(cyflymderE2);
                }
            }
            return endidauNewydd;
        }
        static nolCyflymiad(e1, e2, eiliadau) {
            const cefndirol = 0; //0.001;
            const addaswrG = 1000000; //1000000000; //10000000000;
            const G = 6.67408 * Math.pow(10, -11) * addaswrG;
            const pellter = e2.lleoliad.tynnu(e1.lleoliad);
            const rSgwar = pellter.maintSgwar();
            const m = e2.mas;
            const maintCyflymiad = cefndirol + (G * m / (rSgwar)) * eiliadau;
            const uned = pellter.uned();
            const cyflymiad = uned.lluosi(maintCyflymiad);
            return cyflymiad;
        }
        static clampio(n, isaf, uchaf) {
            return n < isaf ? isaf : (n > uchaf ? uchaf : n);
        }
    }
    Bydysawd.Disgyrchiant = Disgyrchiant;
})(Bydysawd || (Bydysawd = {}));
/// <reference path="../canfodyddGwrthdrawiadau.ts" />
var Bydysawd;
(function (Bydysawd) {
    describe("CanfodyddGwrthdrawiadau", () => {
        describe("YnGwrthdaro", () => {
            it("Dylai dychweld gwir os yw cyfanswm y ddau radiws yn mwy na'r pellter", () => {
                const radiws1 = 7;
                const radiws2 = 5;
                const e1 = new Bydysawd.Endid(2, 2, 0, 0, radiws1, 1, Bydysawd.Lliw.oHex("FFFFFF"));
                const e2 = new Bydysawd.Endid(2, 2 + radiws1, 0, 0, radiws2, 1, Bydysawd.Lliw.oHex("FFFFFF"));
                const gwerth = Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwerth).toBe(true);
            });
            it("Dylai dychweld gwir os yw cyfanswm y ddau radiws yn hafal i'r pellter", () => {
                const radiws1 = 7;
                const radiws2 = 5;
                const e1 = new Bydysawd.Endid(2, 2, 0, 0, radiws1, 1, Bydysawd.Lliw.oHex("FFFFFF"));
                const e2 = new Bydysawd.Endid(2, 2 + (radiws1 + radiws2), 0, 0, radiws2, 1, Bydysawd.Lliw.oHex("FFFFFF"));
                const gwerth = Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwerth).toBe(true);
            });
            it("Dylai dychweld anwir os yw cyfanswm y ddau radiws yn llai na'r pellter", () => {
                const radiws1 = 7;
                const radiws2 = 5;
                const e1 = new Bydysawd.Endid(2, 2, 0, 0, radiws1, 1, Bydysawd.Lliw.oHex("FFFFFF"));
                const e2 = new Bydysawd.Endid(2, 2 + (radiws1 + radiws2) + 1, 0, 0, radiws2, 1, Bydysawd.Lliw.oHex("FFFFFF"));
                const gwerth = Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwerth).toBe(false);
            });
        });
    });
})(Bydysawd || (Bydysawd = {}));
/// <reference path="../cynhyrchyddGaussian.ts" />
/// <reference path="../types/jasmine/index.d.ts" />
var Bydysawd;
(function (Bydysawd) {
    describe("CynhyrchyddGaussian", () => {
        describe("nol", () => {
            const cymedr = 10;
            const gwyriadSafonol = 5;
            const rhifau = [];
            // Cynhyrchu 10000 o rifau ar gyfer profi
            for (let i = 1; i <= 10000; i++) {
                rhifau.push(Bydysawd.CynhyrchyddGaussian.nol(cymedr, gwyriadSafonol));
            }
            const cyfartaledd = rhifau.reduce((cyfanswm, x) => cyfanswm + x, 0) / rhifau.length;
            it("Dylai dychweld rhifau gyda cyfartaledd agos i'r cymedr a rhoddwyd", () => {
                expect(Math.abs(cyfartaledd - cymedr)).toBeLessThan(1.0);
            });
            it("Dylai gwyriad safonol rhifau cynhyrchwyd fod yn agos i'r un a rhoddwyd", () => {
                const amrywiant = rhifau
                    .map(x => Math.pow(x - cyfartaledd, 2))
                    .reduce((cyfanswm, x) => cyfanswm + x, 0)
                    / rhifau.length;
                const gwyriad = Math.sqrt(amrywiant);
                expect(Math.abs(gwyriad - gwyriadSafonol)).toBeLessThan(1.0);
            });
        });
        describe("nolAmrediadInt", () => {
            const rhifau = [];
            const cychwyn = 5;
            const gorffen = 15;
            const canol = (cychwyn + gorffen) / 2;
            // Cynhyrchu 10000 o rifau ar gyfer profi
            for (let i = 1; i <= 10000; i++) {
                rhifau.push(Bydysawd.CynhyrchyddGaussian.nolAmrediadInt(cychwyn, gorffen));
            }
            const cyfartaledd = rhifau.reduce((cyfanswm, x) => cyfanswm + x, 0) / rhifau.length;
            it("Dylai fod bob rhif yn int", () => {
                expect(rhifau.every(n => n === Math.floor(n))).toBe(true);
            });
            it("Dylai bob rhif fod oddifewn yr amrediad", () => {
                expect(rhifau.every(n => n >= cychwyn && n <= gorffen)).toBe(true);
            });
            it("Dylai'r cyfartalled fod yn agos i canol yr amrediad", () => {
                expect(Math.abs(cyfartaledd - canol)).toBeLessThan(1.0);
            });
        });
    });
})(Bydysawd || (Bydysawd = {}));
/// <reference path="../fector.ts" />
/// <reference path="../types/jasmine/index.d.ts" />
/* <reference path="../../bower_components/jasmine-core/lib/jasmine-core/jasmine.js" /> */
var Bydysawd;
(function (Bydysawd) {
    describe("Fector2D", () => {
        describe("Properties", () => {
            const fector2D = new Bydysawd.Fector2D(3.1, 4.7);
            it("Dylai cynnwys x", () => { expect(fector2D.x).toBe(3.1); });
            it("Dylai cynnwys y", () => { expect(fector2D.y).toBe(4.7); });
            it("Dylai cynnwys [0]", () => { expect(fector2D[0]).toBe(3.1); });
            it("Dylai cynnwys [1]", () => { expect(fector2D[1]).toBe(4.7); });
            it("Dylai cynnwys length o 2", () => { expect(fector2D.length).toBe(2); });
        });
        describe("Methods", () => {
            it("Dylai cynnwys dot", () => {
                const gwir = new Bydysawd.Fector2D(3, 4).dot(new Bydysawd.Fector2D(5, 6));
                const disgwyl = (3 * 5) + (4 * 6);
                expect(gwir).toBe(disgwyl);
            });
            it("Dylai cynnwys lluosi", () => {
                const gwir = new Bydysawd.Fector2D(3, 4).lluosi(2);
                expect(gwir.x).toBe(6);
                expect(gwir.y).toBe(8);
            });
            it("Dylai cynnwys rhannu", () => {
                const gwir = new Bydysawd.Fector2D(6, 8).rhannu(2);
                expect(gwir.x).toBe(3);
                expect(gwir.y).toBe(4);
            });
            it("Dylai cynnwys ychwagenu", () => {
                const gwir = new Bydysawd.Fector2D(6, 8).ychwanegu(new Bydysawd.Fector2D(3, 4));
                expect(gwir.x).toBe(9);
                expect(gwir.y).toBe(12);
            });
            it("Dylai cynnwys tynnu", () => {
                const gwir = new Bydysawd.Fector2D(6, 8).tynnu(new Bydysawd.Fector2D(2, 3));
                expect(gwir.x).toBe(4);
                expect(gwir.y).toBe(5);
            });
            it("Dylai cynnwys maint", () => {
                const gwir = new Bydysawd.Fector2D(6, 8).maint();
                const disgwyl = Math.sqrt(6 * 6 + 8 * 8);
                expect(gwir).toBe(disgwyl);
            });
            it("Dylai cynnwys maintSgwar", () => {
                const gwir = new Bydysawd.Fector2D(6, 8).maintSgwar();
                const disgwyl = 6 * 6 + 8 * 8;
                expect(gwir).toBe(disgwyl);
            });
            it("Dylai cynnwys pellterI", () => {
                const gwir = new Bydysawd.Fector2D(6, 8).pellterI(new Bydysawd.Fector2D(9, 10));
                const disgwyl = Math.sqrt(3 * 3 + 2 * 2);
                expect(gwir).toBe(disgwyl);
            });
            it("Dylai cynnwys pellterSgwarI", () => {
                const gwir = new Bydysawd.Fector2D(6, 8).pellterSgwarI(new Bydysawd.Fector2D(9, 10));
                const disgwyl = 3 * 3 + 2 * 2;
                expect(gwir).toBe(disgwyl);
            });
            it("Dylai cynnwys uned", () => {
                // I gyfrifo uned mae angen rhannu'r gwerthoedd gyda'r maint
                const fector = new Bydysawd.Fector2D(6, 8);
                const gwir = fector.uned();
                const maint = fector.maint();
                const disgwylX = 6 / maint;
                const disgwylY = 8 / maint;
                expect(gwir.x).toBe(disgwylX);
                expect(gwir.y).toBe(disgwylY);
            });
            it("Dylai cynnwys map", () => {
                const gwir = new Bydysawd.Fector2D(6, 8).map(n => n + 3);
                expect(gwir.x).toBe(9);
                expect(gwir.y).toBe(11);
            });
        });
    });
})(Bydysawd || (Bydysawd = {}));
/// <reference path="../lliw.ts" />
/// <reference path="../types/jasmine/index.d.ts" />
var Bydysawd;
(function (Bydysawd) {
    describe("Lliw", () => {
        describe("Pryd yn creu o RGBA", () => {
            it("Dylai creu gyda chydrannau cywir", () => {
                const lliw = Bydysawd.Lliw.oRGBA(1, 2, 3, 4);
                expect(lliw.r).toBe(1);
                expect(lliw.g).toBe(2);
                expect(lliw.b).toBe(3);
                expect(lliw.a).toBe(4);
            });
            it("Dylai llechio gyda chydrannau < 0", () => {
                expect(() => Bydysawd.Lliw.oRGBA(-1, 0, 0, 0)).toThrowError("Cydran r annilys: -1");
                expect(() => Bydysawd.Lliw.oRGBA(0, -1, 0, 0)).toThrowError("Cydran g annilys: -1");
                expect(() => Bydysawd.Lliw.oRGBA(0, 0, -1, 0)).toThrowError("Cydran b annilys: -1");
                expect(() => Bydysawd.Lliw.oRGBA(0, 0, 0, -1)).toThrowError("Cydran a annilys: -1");
            });
            it("Dylai llechio gyda chydrannau > 255", () => {
                expect(() => Bydysawd.Lliw.oRGBA(256, 0, 0, 0)).toThrowError("Cydran r annilys: 256");
                expect(() => Bydysawd.Lliw.oRGBA(0, 256, 0, 0)).toThrowError("Cydran g annilys: 256");
                expect(() => Bydysawd.Lliw.oRGBA(0, 0, 256, 0)).toThrowError("Cydran b annilys: 256");
                expect(() => Bydysawd.Lliw.oRGBA(0, 0, 0, 256)).toThrowError("Cydran a annilys: 256");
            });
        });
        describe("Pryd yn creu o RGB", () => {
            it("Dylai creu gyda chydrannau cywir", () => {
                const lliw = Bydysawd.Lliw.oRGB(1, 2, 3);
                expect(lliw.r).toBe(1);
                expect(lliw.g).toBe(2);
                expect(lliw.b).toBe(3);
                expect(lliw.a).toBe(255);
            });
            it("Dylai llechio gyda chydrannau < 0", () => {
                expect(() => Bydysawd.Lliw.oRGB(-1, 0, 0)).toThrowError("Cydran r annilys: -1");
                expect(() => Bydysawd.Lliw.oRGB(0, -1, 0)).toThrowError("Cydran g annilys: -1");
                expect(() => Bydysawd.Lliw.oRGB(0, 0, -1)).toThrowError("Cydran b annilys: -1");
            });
            it("Dylai llechio gyda chydrannau > 255", () => {
                expect(() => Bydysawd.Lliw.oRGB(256, 0, 0)).toThrowError("Cydran r annilys: 256");
                expect(() => Bydysawd.Lliw.oRGB(0, 256, 0)).toThrowError("Cydran g annilys: 256");
                expect(() => Bydysawd.Lliw.oRGB(0, 0, 256)).toThrowError("Cydran b annilys: 256");
            });
        });
        describe("Pryd yn creu o hex", () => {
            it('Dylai creu o fformat FFF', () => {
                const lliw = Bydysawd.Lliw.oHex('ABC');
                expect(lliw.r).toBe(10);
                expect(lliw.g).toBe(11);
                expect(lliw.b).toBe(12);
                expect(lliw.a).toBe(255);
            });
            it('Dylai creu o fformat #FFF', () => {
                const lliw = Bydysawd.Lliw.oHex('#ABC');
                expect(lliw.r).toBe(10);
                expect(lliw.g).toBe(11);
                expect(lliw.b).toBe(12);
                expect(lliw.a).toBe(255);
            });
            it('Dylai creu o fformat FFFF', () => {
                const lliw = Bydysawd.Lliw.oHex('ABCD');
                expect(lliw.r).toBe(10);
                expect(lliw.g).toBe(11);
                expect(lliw.b).toBe(12);
                expect(lliw.a).toBe(13);
            });
            it('Dylai creu o fformat #FFFF', () => {
                const lliw = Bydysawd.Lliw.oHex('#ABCD');
                expect(lliw.r).toBe(10);
                expect(lliw.g).toBe(11);
                expect(lliw.b).toBe(12);
                expect(lliw.a).toBe(13);
            });
            it('Dylai creu o fformat FFFFFF', () => {
                const lliw = Bydysawd.Lliw.oHex('ABCDEF');
                expect(lliw.r).toBe(171);
                expect(lliw.g).toBe(205);
                expect(lliw.b).toBe(239);
                expect(lliw.a).toBe(255);
            });
            it('Dylai creu o fformat #FFFFFF', () => {
                const lliw = Bydysawd.Lliw.oHex('#ABCDEF');
                expect(lliw.r).toBe(171);
                expect(lliw.g).toBe(205);
                expect(lliw.b).toBe(239);
                expect(lliw.a).toBe(255);
            });
            it('Dylai creu o fformat FFFFFFFF', () => {
                const lliw = Bydysawd.Lliw.oHex('ABCDEF12');
                expect(lliw.r).toBe(171);
                expect(lliw.g).toBe(205);
                expect(lliw.b).toBe(239);
                expect(lliw.a).toBe(18);
            });
            it('Dylai creu o fformat #FFFFFF', () => {
                const lliw = Bydysawd.Lliw.oHex('#ABCDEF12');
                expect(lliw.r).toBe(171);
                expect(lliw.g).toBe(205);
                expect(lliw.b).toBe(239);
                expect(lliw.a).toBe(18);
            });
        });
        describe("felRGBA", () => {
            it("Dylai dychweld llinyn gyda'r fformat rgba(r,g,b,a)", () => {
                const lliw = Bydysawd.Lliw.oRGBA(99, 0, 7, 123);
                expect(lliw.felRGBA()).toBe("rgba(99,0,7,123)");
            });
        });
    });
})(Bydysawd || (Bydysawd = {}));
//# sourceMappingURL=app.js.map