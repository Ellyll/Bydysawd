/// <reference path="../canfodyddGwrthdrawiadau.ts" />

namespace Bydysawd {
    describe("CanfodyddGwrthdrawiadau", () => {
        describe("YnGwrthdaro", () => {
            it("Dylai dychweld gwir os yw targed yn agosach na 1", () => {
                const f1 = new Endid(2, 2, 0, 0, 1, "FFFFFF");
                const f2 = new Endid(2, 2.5, 0, 0, 1, "FFFFFF");
                const gwir = CanfodyddGwrthdrawiadau.YnGwrthdaro(f1, f2);
                expect(gwir).toBeTruthy();
            });

            it("Dylai dychweld anwir os yw targed yn union 1", () => {
                const f1 = new Endid(2, 2, 0, 0, 1, "FFFFFF");
                const f2 = new Endid(2, 3, 0, 0, 1, "FFFFFF");
                const gwir = CanfodyddGwrthdrawiadau.YnGwrthdaro(f1, f2);
                expect(gwir).toBeFalsy();
            });

            it("Dylai dychweld anwir os yw targed bellach 1", () => {
                const f1 = new Endid(2, 2, 0, 0, 1, "FFFFFF");
                const f2 = new Endid(4, 4, 0, 0, 1, "FFFFFF");
                const gwir = CanfodyddGwrthdrawiadau.YnGwrthdaro(f1, f2);
                expect(gwir).toBeFalsy();
            });
        });
        
    });
}