/// <reference path="../cynhyrchyddGaussian.ts" />
/// <reference path="../types/jasmine/index.d.ts" />

namespace Bydysawd {
    describe("CynhyrchyddGaussian", () => {
        describe("nol", () => {
            const cymedr = 10;
            const gwyriadSafonol = 5;
            const rhifau : number[] = [];
            // Cynhyrchu 10000 o rifau ar gyfer profi
            for (let i=1 ; i<=10000 ; i++) {
                rhifau.push(CynhyrchyddGaussian.nol(cymedr, gwyriadSafonol));
            }
            const cyfartaledd = rhifau.reduce( (cyfanswm, x) => cyfanswm+x, 0) / rhifau.length;

            it("Dylai dychweld rhifau gyda cyfartaledd agos i'r cymedr a rhoddwyd", () => {
                expect(Math.abs(cyfartaledd-cymedr)).toBeLessThan(1.0);
            });

            it("Dylai gwyriad safonol rhifau cynhyrchwyd fod yn agos i'r un a rhoddwyd", () => {
                const amrywiant = rhifau
                    .map(x => Math.pow(x-cyfartaledd, 2))
                    .reduce( (cyfanswm, x) => cyfanswm+x, 0)
                    / rhifau.length;
                const gwyriad = Math.sqrt(amrywiant);
                expect(Math.abs(gwyriad-gwyriadSafonol)).toBeLessThan(1.0);
            });
        });

        describe("nolAmrediadInt", () => {
            const rhifau : number[] = [];
            const cychwyn = 5;
            const gorffen = 15;
            const canol = (cychwyn+gorffen)/2;
            // Cynhyrchu 10000 o rifau ar gyfer profi
            for (let i=1 ; i<=10000 ; i++) {
                rhifau.push(CynhyrchyddGaussian.nolAmrediadInt(cychwyn, gorffen));
            }
            const cyfartaledd = rhifau.reduce( (cyfanswm, x) => cyfanswm+x, 0) / rhifau.length;

            it("Dylai fod bob rhif yn int", () =>{
                expect(rhifau.every(n => n === Math.floor(n))).toBe(true);
            });

            it("Dylai bob rhif fod oddifewn yr amrediad", () => {
                expect(rhifau.every(n => n >= cychwyn && n <= gorffen)).toBe(true);
            });

            it("Dylai'r cyfartalled fod yn agos i canol yr amrediad", () => {
                expect(Math.abs(cyfartaledd-canol)).toBeLessThan(1.0);
            });
        });
    });
}