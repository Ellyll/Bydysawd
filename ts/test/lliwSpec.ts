/// <reference path="../lliw.ts" />
/// <reference path="../types/jasmine/index.d.ts" />

namespace Bydysawd {
    describe("Lliw", () => {
        describe("Pryd yn creu o RGBA", () => {
            it("Dylai creu gyda chydrannau cywir", () => {
                const lliw = Lliw.oRGBA(1, 2, 3, 4);

                expect(lliw.r).toBe(1);
                expect(lliw.g).toBe(2);
                expect(lliw.b).toBe(3);
                expect(lliw.a).toBe(4);
            });

            it("Dylai llechio gyda chydrannau < 0", () => {
                expect(() => Lliw.oRGBA(-1, 0, 0, 0)).toThrowError("Cydran r annilys: -1");
                expect(() => Lliw.oRGBA(0, -1, 0, 0)).toThrowError("Cydran g annilys: -1");
                expect(() => Lliw.oRGBA(0, 0, -1, 0)).toThrowError("Cydran b annilys: -1");
                expect(() => Lliw.oRGBA(0, 0, 0, -1)).toThrowError("Cydran a annilys: -1");
            });

            it("Dylai llechio gyda chydrannau > 255", () => {
                expect(() => Lliw.oRGBA(256, 0, 0, 0)).toThrowError("Cydran r annilys: 256");
                expect(() => Lliw.oRGBA(0, 256, 0, 0)).toThrowError("Cydran g annilys: 256");
                expect(() => Lliw.oRGBA(0, 0, 256, 0)).toThrowError("Cydran b annilys: 256");
                expect(() => Lliw.oRGBA(0, 0, 0, 256)).toThrowError("Cydran a annilys: 256");
            });
        });

        describe("Pryd yn creu o RGB", () => {
            it("Dylai creu gyda chydrannau cywir", () => {
                const lliw = Lliw.oRGB(1, 2, 3);

                expect(lliw.r).toBe(1);
                expect(lliw.g).toBe(2);
                expect(lliw.b).toBe(3);
                expect(lliw.a).toBe(255);
            });

            it("Dylai llechio gyda chydrannau < 0", () => {
                expect(() => Lliw.oRGB(-1, 0, 0)).toThrowError("Cydran r annilys: -1");
                expect(() => Lliw.oRGB(0, -1, 0)).toThrowError("Cydran g annilys: -1");
                expect(() => Lliw.oRGB(0, 0, -1)).toThrowError("Cydran b annilys: -1");
            });

            it("Dylai llechio gyda chydrannau > 255", () => {
                expect(() => Lliw.oRGB(256, 0, 0)).toThrowError("Cydran r annilys: 256");
                expect(() => Lliw.oRGB(0, 256, 0)).toThrowError("Cydran g annilys: 256");
                expect(() => Lliw.oRGB(0, 0, 256)).toThrowError("Cydran b annilys: 256");
            });
        });

        describe("Pryd yn creu o hex", () => {
            it('Dylai creu o fformat FFF', () => {
                const lliw = Lliw.oHex('ABC');

                expect(lliw.r).toBe(10);
                expect(lliw.g).toBe(11);
                expect(lliw.b).toBe(12);
                expect(lliw.a).toBe(255);
            });

            it('Dylai creu o fformat #FFF', () => {
                const lliw = Lliw.oHex('#ABC');

                expect(lliw.r).toBe(10);
                expect(lliw.g).toBe(11);
                expect(lliw.b).toBe(12);
                expect(lliw.a).toBe(255);
            });

            it('Dylai creu o fformat FFFF', () => {
                const lliw = Lliw.oHex('ABCD');

                expect(lliw.r).toBe(10);
                expect(lliw.g).toBe(11);
                expect(lliw.b).toBe(12);
                expect(lliw.a).toBe(13);
            });

            it('Dylai creu o fformat #FFFF', () => {
                const lliw = Lliw.oHex('#ABCD');

                expect(lliw.r).toBe(10);
                expect(lliw.g).toBe(11);
                expect(lliw.b).toBe(12);
                expect(lliw.a).toBe(13);
            });

            it('Dylai creu o fformat FFFFFF', () => {
                const lliw = Lliw.oHex('ABCDEF');

                expect(lliw.r).toBe(171);
                expect(lliw.g).toBe(205);
                expect(lliw.b).toBe(239);
                expect(lliw.a).toBe(255);
            });

            it('Dylai creu o fformat #FFFFFF', () => {
                const lliw = Lliw.oHex('#ABCDEF');

                expect(lliw.r).toBe(171);
                expect(lliw.g).toBe(205);
                expect(lliw.b).toBe(239);
                expect(lliw.a).toBe(255);
            });

            it('Dylai creu o fformat FFFFFFFF', () => {
                const lliw = Lliw.oHex('ABCDEF12');

                expect(lliw.r).toBe(171);
                expect(lliw.g).toBe(205);
                expect(lliw.b).toBe(239);
                expect(lliw.a).toBe(18);
            });

            it('Dylai creu o fformat #FFFFFF', () => {
                const lliw = Lliw.oHex('#ABCDEF12');

                expect(lliw.r).toBe(171);
                expect(lliw.g).toBe(205);
                expect(lliw.b).toBe(239);
                expect(lliw.a).toBe(18);
            });

        });

        describe("felRGBA", () => {
            it("Dylai dychweld llinyn gyda'r fformat rgba(r,g,b,a)", () => {
                const lliw = Lliw.oRGBA(99,0,7,123);

                expect(lliw.felRGBA()).toBe("rgba(99,0,7,123)");
            });
        });
    });
}