/// <reference path="./endid.ts" />

namespace Bydysawd {
    export class FfatriEndidau {
        static CreuArHap(nifer: number, isafswmX: number, isafswmY: number, uchafswmX: number, uchafswmY: number) : Endid[] {
            if (nifer < 1) return [];

            const endidau : Endid[] = [];
            for (let i=0 ; i<nifer ; i++) {
                let x: number;
                let y: number;
                while(true) {
                    const x = FfatriEndidau.NolIntArHap(isafswmX, uchafswmX);
                    const y = FfatriEndidau.NolIntArHap(isafswmY, uchafswmY);
                    const cyflymderX = FfatriEndidau.NolArHap(-10,10);
                    const cyflymderY = FfatriEndidau.NolArHap(-10,10);
                    const radiws = FfatriEndidau.NolIntArHap(1,20);
                    const cyfaint = (4/3)*Math.PI*Math.pow(radiws, 3); // V = 4/3 PI r^3
                    const dwysedd = 1;
                    const mas = dwysedd * cyfaint; //150; //(5.97237*Math.pow(10,24));
                    const endidNewydd = new Endid(x, y, cyflymderX, cyflymderY, radiws, mas, FfatriEndidau.NolLliwArHap());
                    if (endidau.every(e => !CanfodyddGwrthdrawiadau.YnGwrthdaro(e, endidNewydd))) {
                        endidau.push(endidNewydd);
                        break;
                    }
                }

            }
            return endidau;
        }

        private static NolLliwArHap() : Lliw {
            return Lliw.oRGB(FfatriEndidau.NolIntArHap(0, 255),
                             FfatriEndidau.NolIntArHap(0, 255),
                             FfatriEndidau.NolIntArHap(0, 255));
        }

        private static NolArHap(isaf: number, uchaf: number) : number {
            return (Math.random() * (uchaf - isaf)) + isaf;
        }

        private static NolIntArHap(isaf: number, uchaf: number) : number {
            const min = Math.ceil(isaf);
            const max = Math.floor(uchaf);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}
