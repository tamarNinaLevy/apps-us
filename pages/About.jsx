import { makeLorem } from "../services/util.service.js"

export function About() {

    const aboutPageHeader = 'About us'
    const content = makeLorem(100)

    return <section className="about flex column align-center">
        <h1 className="about-header">{aboutPageHeader}</h1>
        <div className="about-txt">{content}</div>
    </section>
}
