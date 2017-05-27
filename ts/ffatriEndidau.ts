/// <reference path="./endid.ts" />

namespace Bydysawd {
    export class FfatriEndidau {
        static CreuArHap(nifer: number, isafswmX: number, isafswmY: number, uchafswmX: number, uchafswmY: number) : Endid[] {
            if (nifer < 1) return [];

            const endidau : Endid[] = [];
            for (let i=0 ; i<nifer ; i++) {
                const x = FfatriEndidau.NolIntArHap(isafswmX, uchafswmX);
                const y = FfatriEndidau.NolIntArHap(isafswmY, uchafswmY);
                const cyflymderX = FfatriEndidau.NolArHap(-10,10);
                const cyflymderY = FfatriEndidau.NolArHap(-10,10);
                const radiws = 5;
                const mas = 150; //(5.97237*Math.pow(10,24));
                const pwynt = new Endid(x, y, cyflymderX, cyflymderY, radiws, mas, FfatriEndidau.NolLliwArHap());
                endidau.push(pwynt);
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
