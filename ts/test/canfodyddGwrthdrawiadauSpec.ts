/// <reference path="../canfodyddGwrthdrawiadau.ts" />

namespace Bydysawd {
    describe("CanfodyddGwrthdrawiadau", () => {
        describe("YnGwrthdaro", () => {
            it("Dylai dychweld gwir os yw cyfanswm y ddau radiws yn mwy na'r pellter", () => {
                const radiws1 = 7;
                const radiws2 = 5;
                const e1 = new Endid("e1", 2, 2, 0, 0, radiws1, 1, Lliw.oHex("FFFFFF"));
                const e2 = new Endid("e2", 2, 2+radiws1, 0, 0, radiws2, 1, Lliw.oHex("FFFFFF"));
                const gwerth = CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwerth).toBe(true);
            });

            it("Dylai dychweld gwir os yw cyfanswm y ddau radiws yn hafal i'r pellter", () => {
                const radiws1 = 7;
                const radiws2 = 5;
                const e1 = new Endid("e1", 2, 2, 0, 0, radiws1, 1, Lliw.oHex("FFFFFF"));
                const e2 = new Endid("e2", 2, 2+(radiws1+radiws2), 0, 0, radiws2, 1, Lliw.oHex("FFFFFF"));
                const gwerth = CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwerth).toBe(true);
            });

            it("Dylai dychweld anwir os yw cyfanswm y ddau radiws yn llai na'r pellter", () => {
                const radiws1 = 7;
                const radiws2 = 5;
                const e1 = new Endid("e1", 2, 2, 0, 0, radiws1, 1, Lliw.oHex("FFFFFF"));
                const e2 = new Endid("e2", 2, 2+(radiws1+radiws2)+1, 0, 0, radiws2, 1, Lliw.oHex("FFFFFF"));
                const gwerth = CanfodyddGwrthdrawiadau.YnGwrthdaro(e1, e2);
                expect(gwerth).toBe(false);
            });
        });
        
    });
}