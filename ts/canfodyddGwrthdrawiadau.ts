/// <reference path="./endid.ts" />

namespace Bydysawd {
    export class CanfodyddGwrthdrawiadau {

        static YnGwrthdaro(endid : Endid, targed : Endid | Endid[]) : boolean {
            const targedau : Endid[] = targed instanceof(Endid) ? [targed] : targed;

            return targedau.some(t => t !== endid && CanfodyddGwrthdrawiadau.NolPellterRhwngEndidiau(endid, t) < 1);
        }

        private static NolPellterRhwngEndidiau(endidA : Endid, endidB : Endid) : number {
            return Math.sqrt(Math.pow(endidB.lleoliad.x - endidA.lleoliad.x, 2) +
                             Math.pow(endidB.lleoliad.y - endidA.lleoliad.y, 2));
        }
    }
}