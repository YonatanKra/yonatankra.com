
const actions = {
    0: 'DELETE',
    1: 'CREATE',
    2: 'UPDATE'
};

const ids = [];

class Message {
    constructor(action = 3, payload = {}) {
        this.action = action;
        this.payload = payload;
    }
}

function setMessagePayload(message, id) {
    message.payload.id = id ? id : Math.round(Math.random() * new Date().getTime());
}

function getExistingID() {
    return ids[Math.floor(Math.random()*(ids.length - 1))];
}

function generateInput() {
    const action = messages === 1 ? 1 : Math.random() < .49 ? 1 : 0;
    const message = new Message(action);
    switch (action) {
        case 0:
            //TODO::add the pool as global
            setMessagePayload(message, getExistingID());
            entitiesCount--;
            break;
        case 1:
            setMessagePayload(message);
            ids.push(message.payload.id);
            entitiesCount++;
            break;
        case 2:
            setMessagePayload(message);
            break;
    }
    return message;
}

let MAX_MESSAGES = 100;
const UPDATED_PER_MESSAGE = 1000;
const FIRST_ENTITIES_BULK = 5000;
let messages = Infinity;
let entitiesCount = 0;

setInterval(() => {
    if (messages >= MAX_MESSAGES) return;
    messages++;
    const pushUpdate = new Array(messages === 1 ? FIRST_ENTITIES_BULK : UPDATED_PER_MESSAGE).fill(0).map(i => generateInput());
    postMessage(pushUpdate);
}, 200);

onmessage = function(e) {
    if (messages < MAX_MESSAGES) {
        console.log('Worker: Message from main script ignored');
        return;
    }
    MAX_MESSAGES = (e.data && e.data.MAX_MESSAGES) ? e.data.MAX_MESSAGES : 0;
    console.log('Worker: Message received from main script');
    entitiesCount = 0;
    messages = 0;
};
