(function (d, w) {
    class Singleton {
        static _singleton;
        constructor() {
            if (!Singleton._singleton) {
                Singleton._singleton = this;
            }
            return Singleton._singleton;
        }
    }


    let singleton;
    const Singleton1 = () => { }
    function createSingleton1() {
        if (!singleton) {
            singleton = new Singleton1();
        }
        return singleton;
    }

    w.Singleton = Singleton;
    w.Singleton1 = createSingleton1;

})(document, window);