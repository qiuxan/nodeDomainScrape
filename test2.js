class myClass {
    constructor() {

    }

    init(callback) {
        // do something async and call the callback:
        callback.bind(this)();
    }
}