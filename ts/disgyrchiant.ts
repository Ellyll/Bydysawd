namespace Bydysawd {
    export class Disgyrchiant {
        static gweithreduDisgyrchiant(endidau : Endid[], eiliadau : number) : Endid[] {
            const cyflymderIsaf = -10.0;
            const cyflymderUchaf = 10.0;

            // Disgyrchiant
            const endidauNewydd : Endid[] = endidau.slice();
            for (let i=0 ; i<endidauNewydd.length ; i++) {
                for (let j=i+1 ; j<endidauNewydd.length ; j++) {
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
                    //endidauNewydd[i] = new Endid(e1.lleoliad.x, e1.lleoliad.y, e1.cyflymder.x + cyflymiadP1.x, e1.cyflymder.y + cyflymiadP1.y, e1.lliw);
                    //endidauNewydd[j] = new Endid(e2.lleoliad.x, e2.lleoliad.y, e2.cyflymder.x + cyflymiadP2.x, e2.cyflymder.y + cyflymiadP2.y, e2.lliw);
                }
            }

            return endidauNewydd;
        }

        private static nolCyflymiad(e1 : Endid, e2 : Endid, eiliadau : number) : Fector2D {
            const addaswrG = 100000000000; //10000000000;
            const G = 6.67408*Math.pow(10,-11) * addaswrG;
            const a = (m2, rSgwar) => G*m2/rSgwar;
            //const a = (m2, r) => G*m2/(r*r);
            //const f = (m1,m2,r) => G*m1*m2/(r*r);
            // F=G*m1*m2/(r*r) F=ma, a=F/m, a = G*m2/(r*r)
            // mEarth = 5.97237×10^24 kg
            // rEarth = 6371 km
            const pellter = e2.lleoliad.tynnu(e1.lleoliad);                
            const rSgwar = pellter.maintSgwar();
            const m = e2.mas; //100000000;
            const maintCyflymiad = a(m, rSgwar)*eiliadau;
            const uned = pellter.uned();
            const cyflymiad = uned.lluosi(maintCyflymiad);

            return cyflymiad;
        }

        private static clampio(n : number, isaf : number, uchaf : number) : number {
            return n < isaf ? isaf : (n > uchaf ? uchaf : n);
        }
    }
}