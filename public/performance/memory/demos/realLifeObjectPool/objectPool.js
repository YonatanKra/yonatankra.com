(function () {
    class PoolObject {

        constructor(data) {
            this.data = data;
            this.nextFree = null;
            this.previousFree = null;
            this.free = true;
        }
    }

    class Pool {
        constructor(objCreator, objReseter, initialSize = 5000) {
            this._pool = [];
            this.objCreator = objCreator;
            this.objReseter = objReseter;
            for (let i = 0; i < initialSize; i++) {
                this.addNewObject(this.newPoolObject());
            }
        }

        addNewObject(obj) {
            this._pool.push(obj);
            this.release(obj);
            return obj;
        }

        release(poolObject) {
            // flag as free
            poolObject.free = true;

            // set in the dequeue
            poolObject.nextFree = null;
            poolObject.previousFree = this.lastFree;

            // if we had a last free, set the last free's next as the new poolObject
            // otherwise, this is the first free!
            if (poolObject.previousFree) {
                this.lastFree.nextFree = poolObject;
            } else {
                this.nextFree = poolObject;
            }

            // set the new object as the last in the dequeue
            this.lastFree = poolObject;

            // reset the object if needed
            this.objReseter(poolObject);
        }

        getFree() {
            // if we have a free one, get it - otherwise create it
            // if (!this.nextFree) {

            //     for (let i = 0; i < this._pool.length / 2; i++) {
            //         this.addNewObject(this.newPoolObject());
            //     }
            // }

            const freeObject = this.nextFree ? this.nextFree : this.addNewObject(this.newPoolObject());

            // flag as used
            freeObject.free = false;

            // the next free is the object's next free
            this.nextFree = freeObject.nextFree;

            // if there's nothing afterwards, the lastFree is null as well
            if (!this.nextFree) this.lastFree = null;

            // return the now not free object
            return freeObject;
        }

        newPoolObject() {
            const data = this.objCreator();
            return new PoolObject(data, this.lastFree, this.nextFree);
        }

        releaseAll() {
            this._pool.forEach(item => this.release(item));
        }
    }

    class Demo {
        constructor(someVariable = null) {
            this.counter = someVariable;
            for (let i = 0; i < DEMO_PROPERTIES; i++) {
                this[i] = i;
            }
        }

        demoMethod(val) {
            return val % 2;
        }

        demoMethod2(val) {
            return val * 2;
        }

        demoMethod3(val) {
            return val + 2;
        }

        demoMethod4(val) {
            return val - 2;
        }
    }

    let MAX_MESSAGES = 200;
    let DEMO_PROPERTIES = 150;
    const counters = {
        deletions: 0,
        additions: 0
    };

    const mockServer = new Worker("worker.js");
    mockServer.onmessage = function (e) {
        // console.debug('Data received from server');
        const input = e.data;
        handleInput(input);
    };

    let pool;
    let currState;
    let dataSet = {};
    let inputHandling = 0;

    function handleInput(input) {
        if (currState === 'Pool') {
            handleInputWithPool(input);
        } else if (currState === 'NoPool') {
            handleInputWithoutPool(input);
        }
        inputHandling++;
        if (inputHandling === 1) {
            // console.log('Finished filling up the dataSet for the first time');
            return;
        }

        counters.deletions += input.reduce((a,b) => a + (b.action ? 0 : 1), 0);
        counters.additions += input.reduce((a,b) => a + (b.action ? 1 : 0), 0);

        if (inputHandling === MAX_MESSAGES) {
            console.log(`Totals: ${JSON.stringify(counters)}`);
        }
    }

    function handleInputWithoutPool(input) {
        for (let i = 0; i < input.length; i++) {
            const id = input[i].payload.id;
            switch (input[i].action) {
                case 0:
                    // delete
                    delete dataSet[id];
                    break;
                case 1:
                    // create
                    dataSet[id] = new Demo(id);
                    break;
                case 2:
                    // TODO::update
                    break;
            }
        }
    }

    function handleInputWithPool(input) {
        let object;
        for (let i = 0; i < input.length; i++) {
            const id = input[i].payload.id;
            switch (input[i].action) {
                case 0:
                    // delete
                    object = dataSet[id];
                    delete dataSet[id];
                    if (object) {
                        pool.release(object); //TODO::expose the pool globally
                    }
                    break;
                case 1:
                    object = pool.getFree();
                    object.data.counter = i;
                    dataSet[id] = object;
                    break;
                case 2:
                    // TODO::update
                    break;
            }
        }
    }

    function createAndDestroy() {
        currState = 'NoPool';
        generalReset();
    }

    function createWithAPool() {
        currState = 'Pool';
        pool = new Pool(() => new Demo(null),
            (item) => {
                item.data.counter = null
            },
            5000);
        generalReset();
    }

    function generalReset() {
        const maxMessages = Number(document.getElementById('nIterations').value);
        const demoSize = Number(document.getElementById('demoSize').value);
        MAX_MESSAGES = maxMessages ? maxMessages : 200;
        DEMO_PROPERTIES = demoSize;
        counters.additions = counters.deletions = 0;
        inputHandling = 0;
        dataSet = {};
        if (pool) { 
            pool.releaseAll();
        }
        mockServer.postMessage({MAX_MESSAGES});
    }
    window.createAndDestroy = createAndDestroy;
    window.createWithAPool = createWithAPool;
})();




