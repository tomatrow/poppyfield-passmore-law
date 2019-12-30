import Context from "./Context.js"
export default {
    id(arg) {
        return `${Context.rootUrl}/#${arg}`
    },
    idObject(arg) {
        return {
            "@id": this.id(arg)
        }
    }
}
