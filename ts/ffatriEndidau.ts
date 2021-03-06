﻿/// <reference path="./endid.ts" />

namespace Bydysawd {
    export class FfatriEndidau {
        private static _rhifNesaf = 1;

        static CreuArHap(nifer: number, isafswmX: number, isafswmY: number, uchafswmX: number, uchafswmY: number, endidauPresenol : Endid[] = []) : Endid[] {
            if (nifer < 1) return [];

            const canol = new Fector2D((isafswmX+uchafswmX)/2, (isafswmY+uchafswmY)/2);

            const endidau : Endid[] = endidauPresenol.slice();
            for (let i=0 ; i<nifer ; i++) {
                let x: number;
                let y: number;
                while(true) {
                    const ad = `e${FfatriEndidau._rhifNesaf}`;
                    FfatriEndidau._rhifNesaf++;
                    const x = FfatriEndidau.NolIntArHap(isafswmX, uchafswmX);
                    const y = FfatriEndidau.NolIntArHap(isafswmY, uchafswmY);
                    const unedAtYCanol = canol.tynnu(new Fector2D(x,y)).uned();
                    const cyflymder = unedAtYCanol.lluosi(FfatriEndidau.NolArHap(0, 10));
                    const cyflymderX = cyflymder.x; //FfatriEndidau.NolArHap(-10,10);
                    const cyflymderY = cyflymder.y; // FfatriEndidau.NolArHap(-10,10);
                    const radiws = CynhyrchyddGaussian.nolAmrediadInt(1,15); //FfatriEndidau.NolIntArHap(1,15);
                    const cyfaint = (4/3)*Math.PI*Math.pow(radiws, 3); // V = 4/3 PI r^3
                    const dwysedd = 5514; // y ddear yn 5514 kg/m^3
                    const mas = dwysedd * cyfaint; //150; //(5.97237*Math.pow(10,24));                    
                    const endidNewydd = new Endid(ad, x, y, cyflymderX, cyflymderY, radiws, mas, FfatriEndidau.NolLliwArHap());
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
