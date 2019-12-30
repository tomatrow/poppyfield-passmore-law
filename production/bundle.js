(function () {
    'use strict';

    const Context = {
        rootUrl: "https://www.passmorelaw.com",
        name: "Passmore Law",
        telephone: "+17607242103",
        priceRange: "$$$",
        email: "dan@passmorelaw.com",
        address: {
            "@type": "PostalAddress",
            streetAddress: "630 Alta Vista Dr., Suite 106",
            addressLocality: "Vista",
            addressRegion: "CA",
            postalCode: "92084",
            addressCountry: "US"
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 33.204334,
            longitude: -117.235403
        }
    };

    Context.people = [
        {
            name: "Dan E. Passmore",
            email: "dan@passmorelaw.com",
            jobTitle: "Attorney at Law",
            telephone: "+17607242103",
            slug: "daniel-passmore",
            image:
                "https://assets.website-files.com/5da0c01c8f22b6755ec575f9/5da1678f20ae1b58d12d7351_dan-passmore-attorney-law-vista-california-business-p-800.png"
        },
        {
            name: "Sonya Dannels",
            email: "sonya@passmorelaw.com",
            jobTitle: "Office Manager",
            telephone: "+17607242103",
            slug: "sonya",
            image:
                "https://assets.website-files.com/5da0c01c8f22b6755ec575f9/5dfb3e365b1818672bb70f67_sonya-paralegal-passmore-law-vista-california-assistant-probate.png"
        },
        {
            name: "Nancy Osborne",
            email: "nancy@passmorelaw.com",
            jobTitle: "Staff Accountant",
            telephone: "+17607242103",
            slug: "nancy-osbourne",
            image:
                "https://assets.website-files.com/5da0c01c8f22b6755ec575f9/5dc131e241558a2a70951dfa_nancy-osbourne-profile-picture-passmore-law-vista-california.png"
        }
    ];

    Context.services = [
        {
            name: "IRS Representation",
            slug: "irs-representation-in-vista-ca",
            contact: "daniel-passmore",
            descriptions: {
                short:
                    "Passmore Law in Vista, CA will be your personal tax advocate with the IRS.",
                long:
                    "You don't want anything less than the most experienced and professional legal representation possible during an audit. Our experience at Passmore Law with both federal and state agencies lets us provide you with the best approach possible for navigating your way through an audit. We are ready to answer any and all questions from the IRS- enabling you to rest assured that your finances are being well protected and represented."
            }
        },
        {
            name: "Business Entity Formation and Structuring",
            slug: "business-entity-formation-and-structruring-vista-ca",
            contact: "daniel-passmore",
            descriptions: {
                short:
                    "Deciding on a business entity can be a daunting task. Meet with us at Passmore law to discuss what entity type you should form for your business.",
                long:
                    "Leveraging the right business entity is one of the most important steps in harnessing the full financial potential of your business. Whether you are just starting your business or you are growing and need to restructure, Passmore Law can both give you personalized guidance and do the heavy lifting of the entity formation itself. Don't rely on a google search or an online service to make such an important decision. Contact us today to set up a free initial consultation."
            }
        },
        {
            name: "Financial and Retirement Planning",
            slug: "financial-and-retirement-planning-in-vista-ca",
            contact: "daniel-passmore",
            descriptions: {
                short:
                    "Passmore Law's goal is to provide you with the best financial and tax guidance possible, so that you can secure financial freedom for your retirement.",
                long:
                    "Our goal at Passmore Law is to help North San Diego County residents know that their business and personal financials are well managed and providing as much yield and tax benefits as possible. We want to make sure that your portfolio and assets are set up to give you the most tax benefits and breaks, so you can be at peace with your finances. This can be a tough decision making process, but we are here to help you every step of the way."
            }
        },
        {
            name: "Tax Management Services",
            slug: "tax-management",
            contact: "daniel-passmore",
            descriptions: {
                short:
                    "We give crucial guidance to San Diego County residents regarding their personal and business taxes.",
                long:
                    "Our goal is to walk each of our clients through a fully personalized tax and financial strategy that minimizes your liabilities and in-turn, maximizes your ROI across the board. Our experience and knowledge, as well as our constant monitoring of Federal and State Tax Laws allow us to give you the most advantageous and secure tax strategies as possible. Contact us today for a free initial consultation."
            }
        },
        {
            name: "Bookkeeping and Accounting",
            slug: "bookkeeping-accounting-services-in-vista-ca",
            contact: "nancy-osbourne",
            descriptions: {
                short:
                    "Passmore Law in Vista, California offers accurate and professional bookkeeping and accounting services for entities of any size.",
                long:
                    "Passmore Law proudly offers premium bookkeeping services for any needing accurate and professional record keeping. Because our office is centered on leveraging the best practices to save you on taxes and potential liabilities, you can be sure that our bookkeeping services will follow suit. From start-ups to established enterprises, businesses rely on accurate and insightful financial information to maintain profitability and capitalize on new opportunities. Passmore Law’s accounting services steer you closer to these goals with accurate record-keeping and reporting as well as support on financial issues such as initial accounting system setup, cost-containment, tax planning, investments, and employee benefit and profit-sharing plans."
            }
        },
        {
            name: "Estate and Trust Planning (Probate)",
            slug: "estate-trust-planning-probate-in-vista-ca",
            contact: "daniel-passmore",
            descriptions: {
                short:
                    "Estate and Trust planning is crucial to making sure one's family and loved ones will be taken care of exactly how you see fit. Passmore Law can also can help you every step of the way through the difficult Probate process.",
                long:
                    "Everyone will leave behind some form of estate- are you wondering what will happen to yours? Make sure that your family and loved ones are well taken care of now, so that you can rest assured for the future. Our office is highly experienced and can navigate a portfolio and assets of any degree, making sure that you are leveraging your resources in the best way possible."
            }
        }
    ];

    var Utility = {
        id(arg) {
            return `${Context.rootUrl}/#${arg}`
        },
        idObject(arg) {
            return {
                "@id": this.id(arg)
            }
        }
    };

    Object.filter = (obj, predicate) =>
        Object.fromEntries(Object.entries(obj).filter(predicate));
    Object.withKeys = (obj, keys) =>
        Object.filter(obj, ([key, value]) => keys.includes(key));
    Object.combine = (...args) => Object.assign({}, ...args);
    Object.mergeByKey = (dest, src, keys) =>
        Object.combine(dest, Object.withKeys(src, keys));

    /*
    So, config should be _raw data_ while properties
    on the object itself will control the generated output.
    */
    class Thing {
        constructor(config) {
            this.config = config;
            this.visibleProps = this.constructor.validProps;
        }
        set config(newValue) {
            this._config = newValue;
        }
        get config() {
            return this._config
        }
        set visibleProps(newValue) {
            if (!newValue.every(val => this.constructor.validProps.includes(val)))
                throw new Error(`Invalid props '${newValue}'`)
            this._visibleProps = newValue;
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
            super(config);
            this.visibleProps = ["name", "jobTitle", "image"];
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
            const { item } = this.config;
            return Object.combine(super.generate(), {
                itemOffered: item.generate()
            })
        }
    }

    class Service extends Thing {
        constructor(config) {
            super(config);
            this.visibleProps = ["@id", "name"];
            this.descriptionType = this.constructor.descriptionTypes.NONE;
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
            const types = this.constructor.descriptionTypes;

            const additional = {};
            if (this.descriptionType !== this.constructor.descriptionTypes.NONE)
                additional.description = this.config.descriptions[
                    this.descriptionType
                ];
            return Object.combine(super.generate(), additional)
        }
    }

    class Organization {
        constructor(config) {
            this.config = config;
            this.type = "Organization";

            this.useFooter = true;

            this.base = Object.combine({
                "@type": "LegalService",
                "@id": `${Context.rootUrl}/#organization`,
                additionalType: "AccountingService",
                url: Context.rootUrl
                // TODO: Should I put a price range?
            });
            this.header = Object.combine(
                {
                    image: Utility.idObject("logo"),
                    logo: Utility.idObject("logo"),
                    hasOfferCatalog: Utility.idObject("services")
                },
                Object.withKeys(Context, ["name"])
            );
            this.footer = Object.combine(
                {
                    // openingHoursSpecification // TODO: Not in markup
                },
                Object.withKeys(Context, ["telephone", "address", "geo", "email"])
            );
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
            super(config);
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
            this.type = "WebSite";
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
            this.config = config || {};
        }
        generate() {
            const { title, path } = this.config;
            return Object.combine({
                "@type": "WebPage",
                "@id": `${Context.rootUrl}/${path}`,
                inLanguage: "en-US",
                isPartOf: Utility.idObject("website"),
                about: Utility.idObject("organization"),
                name: `${title} | ${Context.name}`
            })
        }
        static get type() {
            return "WebPage"
        }
    }

    class ItemList extends Thing {
        constructor(config) {
            super(config);
        }
        static get type() {
            return "ItemList"
        }
        static get validProps() {
            return ["@id"]
        }
        generate() {
            const { items } = this.config;
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

    class Graph {
        constructor(config) {
            this.config = config;
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
            ].concat(Context.people.map(config => new Person(config)));
        }
        construct() {
            const { preTransform, postTransform } = this.config;

            // Constructing the graph
            let pieces;
            if (preTransform) pieces = this.pieces.map(preTransform);

            let graph = pieces.map(piece => piece.generate());
            if (postTransform) graph = postTransform(graph);

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
                        piece.config = { title, path };
                        break
                }
                if (additionalPreTransform) return additionalPreTransform(piece)
                return piece
            },
            postTransform
        })
    ];

    const createTeamPage = slug => {
        const { name } = Context.people.find(item => item.slug === slug);
        return createSimplePage(name, `team/${slug}`, piece => {
            if (piece.constructor.type !== "Person") return piece
            if (piece.config.slug !== slug) return piece
            piece.visibleProps = Person.validProps;
            return piece
        })
    };

    const createServicePage = slug => {
        const { name, contact } = Context.services.find(
            service => service.slug === slug
        );

        return createSimplePage(name, `service/${slug}`, piece => {
            if (!["Person", "OfferCatalog"].includes(piece.constructor.type))
                return piece

            if (piece.config["@id"] === Utility.id("services")) {
                // give specified service the long description
                const service = piece.config.items
                    .map(offer => offer.config.item)
                    .find(service => service.config.slug === slug);
                service.descriptionType = Service.descriptionTypes.LONG;
            }
            if (piece.config.slug === contact) {
                // add email and phone to the contact specified by contactSlug
                piece.visibleProps.push("email", "telephone");
            }

            return piece
        })
    };

    // construct individual pages
    const rawPages = [
        // simple pages
        createSimplePage("", "home"),
        createSimplePage("About Us", "about-us"),
        createSimplePage(
            "Free Legal Consultation",
            "free-consultation-business-attorney-vista",
            piece => {
                switch (piece.constructor.type) {
                    case "Organization":
                        piece.useFooter = false;
                        delete piece.config.employees;
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
                    );
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
    ];
    const pages = Object.fromEntries(rawPages);

    // Now we shall inject things into the page
    function injectSchema(pathname) {
        // see if we have schema from that path
        const graph = pages[pathname];
        if (!graph) {
            console.log("No schema for this page.");
            return
        } else {
            console.log("Injecting schema");
        }

        // generate the proper schema
        const jsonLd = graph.generate();

        // insert the structured data
        const script = document.createElement("script");
        script.id = "poppyfield-json-ld";
        script.type = "application/ld+json";
        script.innerHTML = JSON.stringify(jsonLd);
        document.head.append(script);
    }

    // Actual injection
    injectSchema(window.location.pathname);

}());
