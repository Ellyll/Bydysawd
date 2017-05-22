/// <reference path="../fector.ts" />
/// <reference path="../types/jasmine/index.d.ts" />
/* <reference path="../../bower_components/jasmine-core/lib/jasmine-core/jasmine.js" /> */

namespace Bydysawd {
    describe("Fector2D", () => {
        describe("Properties", () => {
            const fector2D = new Fector2D(3.1, 4.7);

            it("Dylai cynnwys x", () => { expect(fector2D.x).toBe(3.1); });
            it("Dylai cynnwys y", () => { expect(fector2D.y).toBe(4.7); });
            it("Dylai cynnwys [0]", () => { expect(fector2D[0]).toBe(3.1); });
            it("Dylai cynnwys [1]", () => { expect(fector2D[1]).toBe(4.7); });
            it("Dylai cynnwys length o 2", () => { expect(fector2D.length).toBe(2) });
        });

        describe("Methods", () => {
            it("Dylai cynnwys dot", () => {
                const gwir : number = new Fector2D(3, 4).dot(new Fector2D(5, 6));
                const disgwyl : number = (3*5)+(4*6);
                expect(gwir).toBe(disgwyl);
            });

            it("Dylai cynnwys lluosi", () => {
                const gwir = new Fector2D(3,4).lluosi(2);
                expect(gwir.x).toBe(6);
                expect(gwir.y).toBe(8);
            });

            it("Dylai cynnwys rhannu", () => {
                const gwir = new Fector2D(6,8).rhannu(2);
                expect(gwir.x).toBe(3);
                expect(gwir.y).toBe(4);
            });

            it("Dylai cynnwys ychwagenu", () => {
                const gwir = new Fector2D(6,8).ychwanegu(new Fector2D(3,4));
                expect(gwir.x).toBe(9);
                expect(gwir.y).toBe(12);
            });

            it("Dylai cynnwys tynnu", () => {
                const gwir = new Fector2D(6,8).tynnu(new Fector2D(2,3));
                expect(gwir.x).toBe(4);
                expect(gwir.y).toBe(5);
            });

            it("Dylai cynnwys maint", () => {
                const gwir : number = new Fector2D(6,8).maint();
                const disgwyl : number = Math.sqrt(6*6+8*8);
                expect(gwir).toBe(disgwyl);
            });

            it("Dylai cynnwys maintSgwar", () => {
                const gwir : number = new Fector2D(6,8).maintSgwar();
                const disgwyl : number = 6*6+8*8;
                expect(gwir).toBe(disgwyl);
            });

            it("Dylai cynnwys pellterI", () => {
                const gwir : number = new Fector2D(6,8).pellterI(new Fector2D(9,10));
                const disgwyl : number = Math.sqrt(3*3+2*2);
                expect(gwir).toBe(disgwyl);
            });

            it("Dylai cynnwys pellterSgwarI", () => {
                const gwir : number = new Fector2D(6,8).pellterSgwarI(new Fector2D(9,10));
                const disgwyl : number = 3*3+2*2;
                expect(gwir).toBe(disgwyl);
            });

            it("Dylai cynnwys uned", () => {
                // I gyfrifo uned mae angen rhannu'r gwerthoedd gyda'r maint
                const fector = new Fector2D(6,8);
                const gwir : Fector2D = fector.uned();
                const maint = fector.maint();
                const disgwylX = 6 / maint;
                const disgwylY = 8 / maint;
                expect(gwir.x).toBe(disgwylX);
                expect(gwir.y).toBe(disgwylY);
            });

            it("Dylai cynnwys map", () => {
                const gwir : Fector2D = new Fector2D(6,8).map(n => n+3);
                expect(gwir.x).toBe(9);
                expect(gwir.y).toBe(11);                
            });

        });

    });
}