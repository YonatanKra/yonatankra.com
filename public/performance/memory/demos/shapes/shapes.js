(function shapesOverloading() {
    function multiShapes(x, y, z, t) {
        a = {};
        if (x) {
            a.x = x;
        }
        if (y) {
            a.y = y;
        }
        if (z) {
            a.z = z;
        }
        if (t) {
            a.t = t;
        }
        a.stam = 1;
        a.stomp = 2;
        return a;
    }

    function oneShape(x, y, z, t) {
        a = {};

        a.x = x ? x : undefined;
        a.y = y ? y : undefined;
        a.z = z ? z : undefined;
        a.t = t ? t : undefined;
        a.stam = 1;
        a.stomp = 2;
        return a;
    }

    function test(name, times, cb) {
        console.log(`Started ${name} test`);
        const start = performance.now();
        for (let i = 0; i < times; i++) {
            cb(i % 2, i % 5, i % 9, i%3);
        }
        const total = performance.now() - start;
        console.log(`Finsied ${name} test in: ${total / 1000} seconds`);
    }

    const n = 10000000;

    document.getElementById('oneShape').addEventListener('click', () => {
        test('One Shape', n, oneShape);
    });

    document.getElementById('multiShapes').addEventListener('click', () => {
        test('Multi Shapes', n, multiShapes);
    });
})();
