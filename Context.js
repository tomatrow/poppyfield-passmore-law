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
}

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
]

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
]

export default Context
