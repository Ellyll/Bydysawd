/// <reference path="./endid.ts" />
namespace Bydysawd {
    export class Lliniadydd {
        private _context : CanvasRenderingContext2D;

        constructor(context: CanvasRenderingContext2D) {
            this._context = context;
        }

        LluniaduEndidau(endidau : Endid[]) : void {
            endidau.forEach(pwynt => this.LluniaduEndid(pwynt));
        }

        LluniaduEndid(endid : Endid) : void {
            const ctx = this._context;
            //ctx.strokeStyle = "#FFF";
            //ctx.fillStyle = "#FFF";
            ctx.fillStyle = endid.lliw.felRGBA();
            ctx.beginPath();
            ctx.arc(endid.lleoliad.x, endid.lleoliad.y, endid.radiws, 0, Math.PI*2.0, false);
            ctx.fill();
            //ctx.fillRect(endid.lleoliad.x, endid.lleoliad.y, 1, 1);
        }
    }
}