function buildSquare(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!arr[i]) {
                arr[i] = [];
            }
            arr[i][j] = i * j;
        }
    }
    return arr;
}

//first N optimisation that actualy dont work
function buildSquare1(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (!arr[i]) {
                arr[i] = [];
            }
            if (!arr[j]) {
                arr[j] = [];
            }
            arr[i][j] = i * j;
            arr[j][i] = i * j;
        }
    }
    return arr;
}

// alocation optimization that helps
function buildSquareAlloc(n) {
    const arr = new Array(n).fill([]);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            arr[i][j] = i * j;
        }
    }
    return arr;
}

// N optimisation is also working now
function buildSquareAllocN(n) {
    const arr = new Array(n).fill([]);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            arr[i][j] = i * j;
            arr[j][i] = i * j;
        }
    }
    return arr;
}

function testSquares() {
    setTimeout(() => {
        console.time("s1");
        buildSquare(1000);
        console.timeEnd("s1");
        setTimeout(() => {
            console.time("s2");
            buildSquare1(1000);
            console.timeEnd("s2");
            setTimeout(() => {
                console.time("s3");
                buildSquareAlloc(1000);
                console.timeEnd("s3");
                setTimeout(() => {
                    console.time("s4");
                    buildSquareAllocN(1000);
                    console.timeEnd("s4");
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);
}