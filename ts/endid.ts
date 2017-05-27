/// <reference path="./fector.ts" />
/// <reference path="./lliw.ts" />

namespace Bydysawd {
    export class Endid {
        readonly lleoliad : Fector2D;
        readonly cyflymder : Fector2D;

        constructor(x: number,
                    y: number,
                    cyflymderX: number,
                    cyflymderY: number,
                    readonly radiws: number,
                    readonly mas: number,
                    readonly lliw: Lliw) {
            this.lleoliad = new Fector2D(x, y);
            this.cyflymder = new Fector2D(cyflymderX, cyflymderY);
        }

        gydaCyflymder(cyflymder : Fector2D) : Endid {
            return new Endid(this.lleoliad.x, this.lleoliad.y, cyflymder.x, cyflymder.y, this.radiws, this.mas, this.lliw);
        }

        gydaLleoliad(lleoliad : Fector2D) : Endid {
            return new Endid(lleoliad.x, lleoliad.y, this.cyflymder.x, this.cyflymder.y, this.radiws, this.mas, this.lliw);
        }

        gydaLliw(lliw : Lliw) : Endid {
            return new Endid(this.lleoliad.x, this.lleoliad.y, this.cyflymder.x, this.cyflymder.y, this.radiws, this.mas, lliw);
        }
    }
}