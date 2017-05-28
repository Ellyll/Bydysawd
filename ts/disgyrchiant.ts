namespace Bydysawd {
    export class Disgyrchiant {
        static gweithreduDisgyrchiant(endidau : Endid[], eiliadau : number) : Endid[] {
            const cyflymderIsaf = -30.0;
            const cyflymderUchaf = 30.0;

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
                }
            }

            return endidauNewydd;
        }

        private static nolCyflymiad(e1 : Endid, e2 : Endid, eiliadau : number) : Fector2D {
            const cefndirol = 0.001;
            const addaswrG = 10000000000;
            const G = 6.67408*Math.pow(10,-11) * addaswrG;
            const pellter = e2.lleoliad.tynnu(e1.lleoliad);                
            const rSgwar = pellter.maintSgwar();
            const m = e2.mas;
            const maintCyflymiad = cefndirol+(G*m/(rSgwar))*eiliadau;

            const uned = pellter.uned();
            const cyflymiad = uned.lluosi(maintCyflymiad);

            return cyflymiad;
        }

        private static clampio(n : number, isaf : number, uchaf : number) : number {
            return n < isaf ? isaf : (n > uchaf ? uchaf : n);
        }
    }
}