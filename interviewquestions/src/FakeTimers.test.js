
const { FakeTimer} = require('./FakeTimers');

describe('fake timers test', () => { 
    it('basic test', () => {
        const fakeTimer = new FakeTimer()
        fakeTimer.install()
        
        const logs = []
        const log = (arg) => {
           logs.push([Date.now(), arg])
        }
        
        setTimeout(() => log('A'), 100)
        // log 'A' at 100
        
        const b = setTimeout(() => log('B'), 110)
        clearTimeout(b)
        // b is set but cleared
        setTimeout(() => log('C'), 200)
        fakeTimer.tick()
        fakeTimer.uninstall()
        expect(logs).toEqual([[100, 'A'], [200, 'C']])
    });

    it('second test', () => {
        const fakeTimer = new FakeTimer()
        fakeTimer.install()

        const logs = []
        const log = (arg) => {
            logs.push([Date.now(), arg])
        }

        setTimeout(() => {
            setTimeout(() => {
                setTimeout(() => {
                    log('A')
                }, 100)
            }, 100)
        }, 100)

        const b = setTimeout(() => log('B'), 300)
        setTimeout(() => {
            setTimeout(() => {
                clearTimeout(b)
            }, 40)
        }, 250)

        fakeTimer.tick()
        fakeTimer.uninstall()
        expect(logs).toEqual([[300, 'A']])
    });

    it('third test', () => {
        const fakeTimer = new FakeTimer()
        fakeTimer.install()
        
        const logs = []
        const log = (arg) => {
           logs.push([Date.now(), arg])
        }
        
        const a = setTimeout(() => {
          log('A')
        }, 100)
        
        setTimeout(() => {
          clearTimeout(a)
        }, 240)
        
        fakeTimer.tick()
        fakeTimer.uninstall()
        expect(logs).toEqual([[100, 'A']])
    });

    it('monkeypatching test', () => {
        const fakeTimer = new FakeTimer()
        const originalClearTimeout = clearTimeout;
        const originalSetTimeout = setTimeout;
         expect(globalThis.clearTimeout).toBe(originalClearTimeout)
         expect(globalThis.setTimeout).toBe(originalSetTimeout)
        fakeTimer.install()
        expect(clearTimeout).not.toBe(originalClearTimeout);
        expect(setTimeout).not.toBe(originalSetTimeout)
        fakeTimer.uninstall()
        expect(clearTimeout).toBe(originalClearTimeout)
        expect(setTimeout).toBe(originalSetTimeout)
    });
 });