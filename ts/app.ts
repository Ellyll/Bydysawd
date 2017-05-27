/// <reference path="./ffatriEndidau.ts" />
/// <reference path="./canfodyddGwrthdrawiadau.ts" />
/// <reference path="./lluniadu.ts" />

namespace Bydysawd {
    export class App {
        cychwyn() {
            const canvas = <HTMLCanvasElement>document.getElementById("canvas");
            const context = canvas.getContext("2d");
            const lliniadydd = new Lliniadydd(context);

            let endidauCychwyn = FfatriEndidau.CreuArHap(10, 0, 0, 500, 500);

            let amserHen = performance.now();
            let niferFframiau = 0;
            const lluniadu = (amserRwan, amserHen, endidau) => {
                niferFframiau++;
                let gwahaniaeth = amserRwan - amserHen;

                while (gwahaniaeth > 128) {
                    const eiliadau = 128/1000;
                    endidau = diweddaru(context, endidau,eiliadau);
                    gwahaniaeth = gwahaniaeth - 128;
                }
                endidau = diweddaru(context, endidau,gwahaniaeth/1000);

                context.clearRect(0, 0, canvas.width, canvas.height);
                lliniadydd.LluniaduEndidau(endidau);
                //if (niferFframiau % 1000 === 0) console.log(`Nifer fframiau: ${niferFframiau}`, endidau.map(e => e.cyflymder.toString()));
                if (endidau.length > 0) {
                    const amserDiwethaf = amserRwan;
                    window.requestAnimationFrame((rwan) => lluniadu(rwan, amserDiwethaf, endidau));
                } else {
                    console.log("Wedi gorffen");
                }                
            };            

            window.requestAnimationFrame((rwan) => lluniadu(rwan, performance.now(), endidauCychwyn));
        }
    }

    function diweddaru(context : CanvasRenderingContext2D, endidauGwreiddiol : Endid[], eiliadau : number) : Endid[] {
        let endidau : Endid[] = Disgyrchiant.gweithreduDisgyrchiant(endidauGwreiddiol, eiliadau);

        endidau = endidau
            // Symdu
            .map( e => {
                const lleoliadNewydd = e.lleoliad.ychwanegu(e.cyflymder.lluosi(eiliadau))

                if (endidau.every(e2 => e2 === e ? true : lleoliadNewydd.pellterI(e2.lleoliad) >= 1)) {
                     return e.gydaLleoliad(lleoliadNewydd);
                }
                return e;
            })
            // Gwaredu endidau sydd allan o ffiniau
            .filter(e => e.lleoliad.x >= 0 && e.lleoliad.x < context.canvas.width && e.lleoliad.y >= 0 && e.lleoliad.y < context.canvas.height);

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

        return endidau;
    }

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
}
