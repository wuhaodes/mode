/**
 * auth: wuhaodes
 * 发布订阅模式
*/

(function (d, w) {

    // 外部不可调用
    function subscribe(type, fns = [], once = false) {
        if (!type || !fns.length) {
            return console.error('type or fn error about on function');
        }
        const { handlers = [], name = type } = this.events[type] || {};

        for (let i = 0; i < fns.length; i++) {
            const fn = fns[i];
            if (typeof fn != "function") {
                continue;
            }
            handlers.push({ once, fn });
        }
        this.events[type] = { handlers, name };
    }

    const center = {
        events: {},
        // 触发
        emit(type, params = {}) {
            if (!type) {
                return;
            }

            const { handlers = [] } = this.events[type] || {};
            if (!handlers.length) {
                return;
            }

            for (let l = handlers.length - 1; l >= 0; l--) {
                const { fn, once = false } = handlers[l] || {};

                if (once) {
                    fn(params);
                    handlers.splice(l, 1);
                    continue;
                }

                fn(params);
            }

        },
        // 多次
        on(type, ...fns) {
            subscribe.call(this, type, fns);
        },
        // 一次
        once(type, ...fns) {
            subscribe.call(this, type, fns, true);
        },
        // 关闭或移除
        off(type, ...fns) {
            if (!type) {
                return this.events = {};
            }
            if (!fns || !fns.length) {
                return delete this.events[type]
            }

            const { handlers = [], name = type } = this.events[type] || {};

            if (!handlers.length) {
                return;
            }

            fns.forEach(fn => {
                const handlerIdx = handlers.findIndex(v => v.fn === fn);
                if (handlerIdx >= 0) {
                    handlers.splice(handlerIdx, 1);
                }
            })

            this.events[type] = { handlers, name };

        },
    }
    w.center = center;
})(document, window);