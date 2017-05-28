namespace Bydysawd {
    export class CynhyrchyddGaussian {
        private static spare: number;
        private static isSpareReady : boolean = false;

        static nol(mean: number, stdDev: number) : number {
            // Defnyddio https://en.wikipedia.org/wiki/Marsaglia_polar_method

            if (CynhyrchyddGaussian.isSpareReady) {
                CynhyrchyddGaussian.isSpareReady = false;
                return CynhyrchyddGaussian.spare * stdDev + mean;
            } else {
                let u: number;
                let v: number;
                let s: number;
                do {
                    u = Math.random() * 2 - 1;
                    v = Math.random() * 2 - 1;
                    s = u * u + v * v;
                } while (s >= 1 || s == 0);
                let mul = Math.sqrt(-2.0 * Math.log(s) / s);
                CynhyrchyddGaussian.spare = v * mul;
                CynhyrchyddGaussian.isSpareReady = true;
                return mean + stdDev * u * mul;
            }
        }

        static nolAmrediadInt(cychwyn: number, gorffen: number) : number {            
            const canol = (cychwyn+gorffen)/2;
            const gwyriadSafonol = (gorffen-cychwyn)/2;
            let n = cychwyn -1;
            do {
                n = CynhyrchyddGaussian.nol(canol, gwyriadSafonol);
            } while (n < cychwyn || n > gorffen)
            
            return Math.round(n);
        }
    }
}