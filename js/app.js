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
/// <reference path="./fector.ts" />
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
        static CreuArHap(nifer, isafswmX, isafswmY, uchafswmX, uchafswmY) {
            if (nifer < 1)
                return [];
            const endidau = [];
            for (let i = 0; i < nifer; i++) {
                const x = FfatriEndidau.NolIntArHap(isafswmX, uchafswmX);
                const y = FfatriEndidau.NolIntArHap(isafswmY, uchafswmY);
                const cyflymderX = FfatriEndidau.NolArHap(-10, 10);
                const cyflymderY = FfatriEndidau.NolArHap(-10, 10);
                const radiws = 5;
                const mas = 150; //(5.97237*Math.pow(10,24));
                const pwynt = new Bydysawd.Endid(x, y, cyflymderX, cyflymderY, radiws, mas, 'FFFFFF');
                endidau.push(pwynt);
            }
            return endidau;
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
            return (endid.radiws + targed.radiws) > pellter;
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
            ctx.fillStyle = "#" + endid.lliw;
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
            const endidauCychwyn = Bydysawd.FfatriEndidau.CreuArHap(10, 0, 0, canvas.width - 1, canvas.height - 1);
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
        endidau = endidau
            .map(e => {
            const lleoliadNewydd = e.lleoliad.ychwanegu(e.cyflymder.lluosi(eiliadau));
            if (endidau.every(e2 => e2 === e ? true : lleoliadNewydd.pellterI(e2.lleoliad) >= 1)) {
                return e.gydaLleoliad(lleoliadNewydd);
            }
            return e;
        })
            .filter(e => e.lleoliad.x >= 0 && e.lleoliad.x < context.canvas.width && e.lleoliad.y >= 0 && e.lleoliad.y < context.canvas.height);
        for (let i = 0; i < endidau.length - 1; i++) {
            const e1 = endidau[i];
            for (let j = i + 1; j < endidau.length; j++) {
                const e2 = endidau[j];
                if (Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2)) {
                    endidau[i] = e1.gydaLliw("FF0000");
                    endidau[j] = e2.gydaLliw("FFFF00");
                    const endidauArOlGwrthdaro = gwrthdaro(endidau[i], endidau[j]);
                    endidau[i] = endidauArOlGwrthdaro[0];
                    endidau[j] = endidauArOlGwrthdaro[1];
                }
            }
        }
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
            const cefndirol = 0.02;
            const addaswrG = 100000000000;
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
                const e1 = new Bydysawd.Endid(2, 2, 0, 0, radiws1, 1, "FFFFFF");
                const e2 = new Bydysawd.Endid(2, 2 + radiws1, 0, 0, radiws2, 1, "FFFFFF");
                const gwir = Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwir).toBeTruthy();
            });
            it("Dylai dychweld anwir os yw cyfanswm y ddau radiws yn hafal i'r pellter", () => {
                const radiws1 = 7;
                const radiws2 = 5;
                const e1 = new Bydysawd.Endid(2, 2, 0, 0, radiws1, 1, "FFFFFF");
                const e2 = new Bydysawd.Endid(2, 2 + (radiws1 + radiws2), 0, 0, radiws2, 1, "FFFFFF");
                const gwir = Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwir).toBeFalsy();
            });
            it("Dylai dychweld anwir os yw cyfanswm y ddau radiws yn llai na'r pellter", () => {
                const radiws1 = 7;
                const radiws2 = 5;
                const e1 = new Bydysawd.Endid(2, 2, 0, 0, radiws1, 1, "FFFFFF");
                const e2 = new Bydysawd.Endid(2, 2 + (radiws1 + radiws2) + 1, 0, 0, radiws2, 1, "FFFFFF");
                const gwir = Bydysawd.CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwir).toBeFalsy();
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
//# sourceMappingURL=app.js.map