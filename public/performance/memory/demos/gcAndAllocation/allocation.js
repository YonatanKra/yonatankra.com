function buildArray(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
}

function buildArray2(n) {
  const arr = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
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
  const arraySize = Number(document.getElementById("arraySize").value);
  const iterations = Number(document.getElementById("iterations").value);
  setTimeout(() => {
    test(() => buildArray(arraySize), iterations, "Allocate As We Go");
    setTimeout(() => {
      test(() => buildArray2(arraySize), iterations, "Pre Allocate");
    }, 1000);
  }, 1000);
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    release(object) {
        // set in the dequeue
        object.next = null;
        object.previous = this.last;

        // if we had a last free, set the last free's next as the new poolObject
        // otherwise, this is the first free!
        if (object.previous) {
            this.last.next = object;
        } else {
            this.first = object;
        }

        // set the new object as the last in the dequeue
        this.last = object;
    }

    pop() {
        const object = this.first;
        this.first = this.firest.next;
        object.next = object.previous = null;
        return object;
    }
}

class QueueObject {
    constructor() {
        this.next = null;
        this.previous = null;
    }
}

class ObjectPool {
  constructor(objectConstructor, objectReseter, initialSize = 5000) {
    this.objectConstructor = objectConstructor;
    this.objectReseter = objectReseter;
    this._pool = [];
    for (let i = 0; i < initialSize; i++) {
      this._addObjectToPool();
    }
  }

  _addObjectToPool() {
    const newObj = {
        alive: false,
        data: this.objectConstructor()
      };
    this._pool.push(newObj);
  }

  _allocate(object) {
    object.alive = true;
    return object;
  }

  getNew() {
    for (let i = 0; i < this._pool.length; i++) {
      if (this._pool[i].alive === false) {
        return this._allocate(this._pool[i]);
      }
    }
    this._addObjectToPool();
  }

  release(object) {
    object.alive = false;
  }
}
