/// <reference path="./ffatriEndidau.ts" />
/// <reference path="./canfodyddGwrthdrawiadau.ts" />
/// <reference path="./lluniadu.ts" />

namespace Bydysawd {
    export class App {
        cychwyn() {
            const canvas = <HTMLCanvasElement>document.getElementById("canvas");
            const context = canvas.getContext("2d");
            const lliniadydd = new Lliniadydd(context);

            let endidau = FfatriEndidau.CreuArHap(200, 0, 0, 500, 500);
                            //.map(e => new Endid(e.lleoliad.x, e.lleoliad.y, e.cyflymder.x, e.cyflymder.y, "FFFFFF"))

            let amserHen = performance.now();
            let niferFframiau = 0;
            const lluniadu = (amser => {
                niferFframiau++;
                const gwahaniaeth = amser - amserHen;
                const eiliadau = gwahaniaeth/1000;

                endidau = gweithreduDisgyrchiant(endidau, eiliadau);

                endidau = endidau
                    // Symdu
                    .map( e => {
                        const lleoliadNewydd = e.lleoliad.ychwanegu(e.cyflymder.lluosi(eiliadau))
                        //return e.gydaLleoliad(lleoliadNewydd);
                        const x = e.lleoliad.x + (e.cyflymder.x * eiliadau);
                        const y = e.lleoliad.y + (e.cyflymder.y * eiliadau);

                        if (endidau.every(e2 => {
                            if (e2 === e) return true;
                            return (lleoliadNewydd.pellterI(e2.lleoliad) >= 1);
                        })) {
                            return e.gydaLleoliad(lleoliadNewydd); //new Endid(x, y, e.cyflymder.x, e.cyflymder.y, e.lliw);
                        }
                        return e;
                    })
                    // Gwaredu o endidau sydd allan o ffiniau
                    .filter(e => e.lleoliad.x >= 0 && e.lleoliad.x < canvas.width && e.lleoliad.y >= 0 && e.lleoliad.y < canvas.height);

                for (let i=0 ; i<endidau.length-1 ; i++) {
                    const e1 = endidau[i];
                    for (let j=i+1 ; j<endidau.length ; j++) {                
                        const e2 = endidau[j];
                        if (CanfodyddGwrthdrawiadau.YnGwrthdaro(e1,e2)) {
                            endidau[i] = e1.gydaLliw("FF0000");
                            endidau[j] = e2.gydaLliw("FFFF00");
                            const endidauArOlGwrthdaro = gwrthdaro(endidau[i], endidau[j]);
                            endidau[i] = endidauArOlGwrthdaro[0];
                            endidau[j] = endidauArOlGwrthdaro[1];
                        }

                    }
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                lliniadydd.LluniaduEndidau(endidau);
                if (niferFframiau % 100 === 0) console.log(`Nifer fframiau: ${niferFframiau}`);
                amserHen = amser;
                if (endidau.length > 0) {
                    window.requestAnimationFrame(lluniadu);
                } else {
                    console.log("Wedi gorffen");
                }                
            });            

            window.requestAnimationFrame(lluniadu);

            function gwrthdaro(e1 : Endid, e2 : Endid) : Endid[] {
                const m1 = e1.mas;
                const m2 = e2.mas;

                // Crewyd o 2-dimensional elastic collision - http://vobarian.com/collisions/2dcollisions2.pdf

                // 1
                const n = new Fector2D(e2.lleoliad.x - e1.lleoliad.x, e2.lleoliad.y - e1.lleoliad.y); // normal vector
                const magN = Math.sqrt(n[0]*n[0] + n[1]*n[1]); // magnitude of n
                const un = new Fector2D(n[0]/magN, n[1]/magN); // find unit vector of n by dividing by magnitude of n
                const ut = new Fector2D(-un[1], un[0]); // unit tangent vector

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
                const v1nAfter = ((v1n*(m1-m2))+(2*m2*v2n))/(m1+m2);
                const v2nAfter = ((v2n*(m2-m1))+(2*m1*v1n))/(m1+m2);

                // 6 - Convert the scalar normal and tangential velocities into vector
                const v1nAfterFector = un.lluosi(v1nAfter);
                const v1tAfterFector = un.lluosi(v1tAfter);
                const v2nAfterFector = un.lluosi(v2nAfter);
                const v2tAfterFector = un.lluosi(v2tAfter);

                // 7 - Find the final velocity vectors by adding the normal and tangential components
                const v1After = v1nAfterFector.ychwanegu(v1tAfterFector);
                const v2After = v2nAfterFector.ychwanegu(v2tAfterFector);

                // Creu pwyntiau newydd
                const e1a = new Endid(e1.lleoliad.x, e1.lleoliad.y, v1After.x, v1After.y, e1.mas, e1.lliw);
                const e2a = new Endid(e2.lleoliad.x, e2.lleoliad.y, v2After.x, v2After.y, e2.mas, e2.lliw);
                return [ e1a, e2a ];
            }

            function nolCyflymiad(e1 : Endid, e2 : Endid, eiliadau : number) : Fector2D {
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

            function gweithreduDisgyrchiant(endidau : Endid[], eiliadau : number) : Endid[] {
                const cyflymderIsaf = -10.0;
                const cyflymderUchaf = 10.0;

                // Disgyrchiant
                const endidauNewydd : Endid[] = endidau.slice();
                for (let i=0 ; i<endidauNewydd.length ; i++) {
                    for (let j=i+1 ; j<endidauNewydd.length ; j++) {
                        const e1 = endidauNewydd[i];
                        const e2 = endidauNewydd[j];

                        const cyflymiadP1 = nolCyflymiad(e1, e2, eiliadau);
                        const cyflymiadP2 = nolCyflymiad(e2, e1, eiliadau);

                        const cyflymderE1 = e1.cyflymder
                                                .ychwanegu(cyflymiadP1)
                                                .map(n => clampio(n, cyflymderIsaf, cyflymderUchaf));
                        const cyflymderE2 = e2.cyflymder
                                                .ychwanegu(cyflymiadP2)
                                                .map(n => clampio(n, cyflymderIsaf, cyflymderUchaf));
                        endidauNewydd[i] = e1.gydaCyflymder(cyflymderE1);
                        endidauNewydd[j] = e2.gydaCyflymder(cyflymderE2);
                        //endidauNewydd[i] = new Endid(e1.lleoliad.x, e1.lleoliad.y, e1.cyflymder.x + cyflymiadP1.x, e1.cyflymder.y + cyflymiadP1.y, e1.lliw);
                        //endidauNewydd[j] = new Endid(e2.lleoliad.x, e2.lleoliad.y, e2.cyflymder.x + cyflymiadP2.x, e2.cyflymder.y + cyflymiadP2.y, e2.lliw);
                    }
                }

                return endidauNewydd;
            }

            function clampio(n : number, isaf : number, uchaf : number) : number {
                return n < isaf ? isaf : (n > uchaf ? uchaf : n);
            }
        }
    }
}
