import Context from "./Context.js"
import Utility from "./Utility.js"
import {
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
} from "./Pieces.js"

class Graph {
    constructor(config) {
        this.config = config
        this.pieces = [
            new Organization({
                employees: Context.people.map(person =>
                    Utility.idObject(person.slug)
                ),
                priceRange: "$$$"
            }),
            new WebSite(),
            new WebPage(),
            new OfferCatalog({
                "@id": Utility.id("services"),
                name: "Financial Law Services",
                items: Context.services.map(
                    config =>
                        new Offer({
                            item: new Service(config)
                        })
                )
            }),
            new ImageObject({
                "@id": Utility.id("logo"),
                url:
                    "https://assets.website-files.com/5da0c01c8f22b6755ec575f9/5da1678f20ae1b58d12d7351_dan-passmore-attorney-law-vista-california-business-p-800.png"
            })
        ].concat(Context.people.map(config => new Person(config)))
    }
    construct() {
        const { preTransform, postTransform } = this.config

        // Constructing the graph
        let pieces
        if (preTransform) pieces = this.pieces.map(preTransform)

        let graph = pieces.map(piece => piece.generate())
        if (postTransform) graph = postTransform(graph)

        return graph
    }
    generate() {
        return {
            "@context": "https://schema.org",
            "@graph": this.construct()
        }
    }
}

const createSimplePage = (
    title,
    path,
    additionalPreTransform,
    postTransform
) => [
    `/${path}`,
    new Graph({
        preTransform(piece) {
            switch (piece.constructor.type) {
                case "WebPage":
                    piece.config = { title, path }
                    break
            }
            if (additionalPreTransform) return additionalPreTransform(piece)
            return piece
        },
        postTransform
    })
]

const createTeamPage = slug => {
    const { name } = Context.people.find(item => item.slug === slug)
    return createSimplePage(name, `team/${slug}`, piece => {
        if (piece.constructor.type !== "Person") return piece
        if (piece.config.slug !== slug) return piece
        piece.visibleProps = Person.validProps
        return piece
    })
}

const createServicePage = slug => {
    const { name, contact } = Context.services.find(
        service => service.slug === slug
    )

    return createSimplePage(name, `services/${slug}`, piece => {
        if (!["Person", "OfferCatalog"].includes(piece.constructor.type))
            return piece

        if (piece.config["@id"] === Utility.id("services")) {
            // give specified service the long description
            const service = piece.config.items
                .map(offer => offer.config.item)
                .find(service => service.config.slug === slug)
            service.descriptionType = Service.descriptionTypes.LONG
        }
        if (piece.config.slug === contact) {
            // add email and phone to the contact specified by contactSlug
            piece.visibleProps.push("email", "telephone")
        }

        return piece
    })
}

// construct individual pages
const rawPages = [
    // simple pages
    createSimplePage("Home", "home"),
    createSimplePage("About Us", "about-us"),
    createSimplePage(
        "Free Legal Consultation",
        "free-consultation-business-attorney-vista",
        piece => {
            switch (piece.constructor.type) {
                case "Organization":
                    piece.useFooter = false
                    delete piece.config.employees
                    break
                case "Person":
                    piece
                    break
            }
            return piece
        },
        generatedGraph => {
            return generatedGraph.filter(piece => piece["@type"] !== "Person")
        }
    ),
    createSimplePage("Local Legal Services", "services", piece => {
        // give all services the short description
        if (
            piece.constructor.type === "OfferCatalog" &&
            piece.config["@id"] === Utility.id("services")
        )
            piece.config.items
                .map(offer => offer.config.item)
                .forEach(
                    service =>
                        (service.descriptionType =
                            Service.descriptionTypes.LONG)
                )
        return piece
    }),

    // team
    createTeamPage("daniel-passmore"),
    createTeamPage("sonya"),
    createTeamPage("nancy-osbourne"),

    // services
    createServicePage("irs-representation-in-vista-ca"),
    createServicePage("business-entity-formation-and-structruring-vista-ca"),
    createServicePage("financial-and-retirement-planning-in-vista-ca"),
    createServicePage("tax-management"),
    createServicePage("bookkeeping-accounting-services-in-vista-ca"),
    createServicePage("estate-trust-planning-probate-in-vista-ca")
]
const pages = Object.fromEntries(rawPages)

// Now we shall inject things into the page
function injectSchema(pathname) {
    // see if we have schema from that path
    const graph = pages[pathname]
    if (!graph) {
        console.log("No schema for this page.")
        return
    } else {
        console.log("Injecting schema")
    }

    // generate the proper schema
    const jsonLd = graph.generate()

    // insert the structured data
    const script = document.createElement("script")
    script.id = "poppyfield-json-ld"
    script.type = "application/ld+json"
    script.innerHTML = JSON.stringify(jsonLd)
    document.head.append(script)
}

// Actual injection
injectSchema(window.location.pathname)
