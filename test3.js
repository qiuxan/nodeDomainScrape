class AsyncOnlyObject {
    constructor() {
    }
    async init() {
        this.someField = await this.calculateStuff();
    }

    async calculateStuff() {
        return 5;
    }
}

async function newAsync_AsyncOnlyObject() {
    return await new AsyncOnlyObject().init();
}

newAsync_AsyncOnlyObject().then(console.log);
// output: AsyncOnlyObject {someField: 5}