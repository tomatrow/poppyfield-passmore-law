Object.filter = (obj, predicate) =>
    Object.fromEntries(Object.entries(obj).filter(predicate))
Object.withKeys = (obj, keys) =>
    Object.filter(obj, ([key, value]) => keys.includes(key))
Object.combine = (...args) => Object.assign({}, ...args)
Object.mergeByKey = (dest, src, keys) =>
    Object.combine(dest, Object.withKeys(src, keys))
