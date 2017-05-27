/// <reference path="./endid.ts" />

namespace Bydysawd {
    export class CanfodyddGwrthdrawiadau {

        static YnGwrthdaro(endid : Endid, targed : Endid) : boolean {
            const pellter = endid.lleoliad.pellterI(targed.lleoliad);

            return (endid.radiws + targed.radiws) > pellter;
        }
    }
}