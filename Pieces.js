import "./Extensions.js"
import Context from "./Context.js"
import Utility from "./Utility.js"
/*
So, config should be _raw data_ while properties
on the object itself will control the generated output.
*/
class Thing {
    constructor(config) {
        this.config = config
        this.visibleProps = this.constructor.validProps
    }
    set config(newValue) {
        this._config = newValue
    }
    get config() {
        return this._config
    }
    set visibleProps(newValue) {
        if (!newValue.every(val => this.constructor.validProps.includes(val)))
            throw new Error(`Invalid props '${newValue}'`)
        this._visibleProps = newValue
    }
    get visibleProps() {
        return this._visibleProps
    }
    static get type() {
        return "thing"
    }
    static get validProps() {
        return []
    }
    generate() {
        return Object.mergeByKey(
            {
                "@type": this.constructor.type
            },
            this.config,
            this.visibleProps
        )
    }
}

class Person extends Thing {
    constructor(config) {
        super(config)
        this.visibleProps = ["name", "jobTitle", "image"]
    }
    static get validProps() {
        return ["name", "jobTitle", "email", "telephone", "image"]
    }
    static get type() {
        return "Person"
    }
    generate() {
        return Object.combine(super.generate(), {
            "@id": Utility.id(this.config.slug)
        })
    }
}

class Offer extends Thing {
    static get validProps() {
        return []
    }
    static get type() {
        return "Offer"
    }
    generate() {
        const { item } = this.config
        return Object.combine(super.generate(), {
            itemOffered: item.generate()
        })
    }
}

class Service extends Thing {
    constructor(config) {
        super(config)
        this.visibleProps = ["@id", "name"]
        this.descriptionType = this.constructor.descriptionTypes.NONE
    }
    static get validProps() {
        return ["@id", "name", "description"]
    }
    static get type() {
        return "Service"
    }
    static get descriptionTypes() {
        return { SHORT: "short", LONG: "long", NONE: "none" }
    }
    generate() {
        const types = this.constructor.descriptionTypes

        const additional = {}
        if (this.descriptionType !== this.constructor.descriptionTypes.NONE)
            additional.description = this.config.descriptions[
                this.descriptionType
            ]
        return Object.combine(super.generate(), additional)
    }
}

class Organization {
    constructor(config) {
        this.config = config
        this.type = "Organization"

        this.useFooter = true

        this.base = Object.combine({
            "@type": "LegalService",
            "@id": `${Context.rootUrl}/#organization`,
            additionalType: "AccountingService",
            url: Context.rootUrl
            // TODO: Should I put a price range?
        })
        this.header = Object.combine(
            {
                image: Utility.idObject("logo"),
                logo: Utility.idObject("logo"),
                hasOfferCatalog: Utility.idObject("services")
            },
            Object.withKeys(Context, ["name"])
        )
        this.footer = Object.combine(
            {
                // openingHoursSpecification // TODO: Not in markup
            },
            Object.withKeys(Context, ["telephone", "address", "geo", "email"])
        )
    }
    static get type() {
        return "Organization"
    }
    generate() {
        return Object.combine(this.base, this.header, this.footer, this.config)
    }
}

class ImageObject extends Thing {
    constructor(config) {
        super(config)
    }
    static get type() {
        return "ImageObject"
    }
    static get validProps() {
        return ["@id", "url"]
    }
}

class WebSite {
    static get type() {
        return "WebSite"
    }
    constructor() {
        this.type = "WebSite"
    }
    generate() {
        return {
            "@type": "WebSite",
            "@id": `${Context.rootUrl}/#website`,
            url: `${Context.rootUrl}/`,
            name: Context.name,
            publisher: Utility.idObject("organization")
        }
    }
}

class WebPage {
    constructor(config) {
        this.config = config || {}
    }
    generate() {
        const { title, path, description } = this.config
        const base = {
            "@type": "WebPage",
            "@id": `${Context.rootUrl}/${path}`,
            inLanguage: "en-US",
            isPartOf: Utility.idObject("website"),
            about: Utility.idObject("organization"),
            name: `${title} | ${Context.name}`
        }
        let desc = {}
        if (description) desc = { description }
        return Object.combine(base, desc)
    }
    static get type() {
        return "WebPage"
    }
}

class ItemList extends Thing {
    constructor(config) {
        super(config)
    }
    static get type() {
        return "ItemList"
    }
    static get validProps() {
        return ["@id"]
    }
    generate() {
        const { items } = this.config
        return Object.combine(super.generate(), {
            itemListElement: items.map(item => ({
                "@type": "ListItem",
                item: item.generate()
            }))
        })
    }
}

class OfferCatalog extends ItemList {
    static get type() {
        return "OfferCatalog"
    }
    static get validProps() {
        return ["@id", "name"]
    }
}

export {
    Thing,
    Person,
    Offer,
    Service,
    Organization,
    WebSite,
    WebPage,
    ItemList,
    OfferCatalog,
    ImageObject
}
