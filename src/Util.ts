export function simpleCloneDeep<T = any>(data: T): T {
    if (!data) return data;

    if (Array.isArray(data)) {
        return <T><any>data.map(v => simpleCloneDeep(v));
    } else if (typeof data == "object") {
        data = {...data};
        Object.keys(data).forEach(k => {
            if (!Array.isArray(data[k]) && typeof data != "object") return;

            data[k] = simpleCloneDeep(data[k]);
        });
    }

    return data;
}

export function isEmpty(obj: object | any[]) {
    if (!obj) return true;

    if (Array.isArray(obj)) return obj.length == 0;

    for (const _ in obj) {
        return false;
    }

    return true;
}
