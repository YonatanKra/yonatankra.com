function buildArray(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
}

function buildArray2(n) {
    const arr = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        arr[i] = (i);
    }
}


function test(cb, n, name) {
    console.time(name);
    for (let i = 0; i < n; i++) {
        cb();
    }
    console.timeEnd(name);
}

function testArrays() {
    setTimeout(() => {
        test(() => buildArray(1000), 20000, 'Allocate All');
        setTimeout(() => {
            test(() => buildArray2(1000), 20000, 'Allocate All');
        }, 1000);
    }, 1000);
}


