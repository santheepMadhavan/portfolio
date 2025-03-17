import Card from "../card/card";
import hiking from "/hiking.jpg";
import cooking from "/cooking.jpg";
import movie from "/movie.jpg";
import react from "/react.svg";
import figma from "/figma.svg";
import spring from "/spring.svg";
import github from "/github.svg";
import notion from "/notion.svg";
import miro from "/miro.svg";

const About = () => {

    const aboutMe = {
        heading: "My Story", body: [`I’m Santheep, a Senior Software Engineer and Product Designer at GlobalLogic, currently working remotely. I'm a passionate and collaborative problem-solver who thrives on designing seamless user experiences and coding them into functional, responsive interfaces.`,
            `With over 5 years of experience in software development and UX design, I’ve worked on LXP and Assessment platforms, creating intuitive design systems and applications for the Ed-Tech and enterprise industries.`,
            `As a designer and developer, I’m detail-oriented, always eager to learn, and open to new challenges. I value collaboration and clear communication, having worked alongside cross-functional teams in Product, Engineering, and Marketing to bring ideas to life.`,
            ``,]
    }
    const areaOfInterest = { heading: "Areas of interest", body: [`Frontend Development, UX/UI Design, Ed-Tech Domain, Product Strategy & Management, AI`] }
    const contact = { heading: "Contact me", link: [{ name: "LinkedIn", routeTo: "https://www.linkedin.com/in/santheep17/" }, { name: "Email", routeTo: "mailto:adamsantheep18@gmail.com" }] }
    const processLover = { heading: "Design Thinker", body: [`Passionate about crafting intuitive, user-centered designs that enhance overall experiences, from wireframes to high-fidelity prototypes.`] }
    const dataDriven = { heading: "Web Developer", body: [`Proficient in coding designs using React, bridging the gap between design and development to create responsive, functional interfaces.`] }
    const designAdvocate = { heading: "Product & Domain Expert", body: [`Well-versed in Learning Experience Platforms (LXP) and product management, I bring a deep understanding of user needs and market trends to drive impactful product decisions.`] }
    const stack = { heading: "Stack", stack: [{ title: "Figma", desc: "Design", img: figma }, { title: "Notion", desc: "Documentation", img: notion }, { title: "Miro", desc: "Product", img: miro }, { title: "React", desc: "Web Development", img: react }, { title: "Spring", desc: "API Development", img: spring }, { title: "GitHub", desc: "Project Tracking", img: github },] }


    return (
        <>
            <div className="py-8 flex max-md:flex-col gap-8 justify-between">
                <div className="md:w-1/2 flex flex-col gap-4">
                    <div className="text-2xl font-bold">About me</div>
                    <Card heading={aboutMe.heading} profile={true} body={aboutMe.body} />
                    <Card heading={areaOfInterest.heading} body={areaOfInterest.body} />
                    <Card heading={contact.heading} link={contact.link} />
                </div>
                <div className="md:w-1/2 flex flex-col gap-4">
                    <div className="text-2xl font-bold">What I do</div>
                    <Card heading={processLover.heading} body={processLover.body} />
                    <Card heading={dataDriven.heading} body={dataDriven.body} />
                    <Card heading={designAdvocate.heading} body={designAdvocate.body} />
                    <Card heading={stack.heading} stack={stack.stack} />
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div className="text-2xl font-bold">When not designing… </div>
                <div className="flex flex-wrap gap-4">
                    <div className="w-[250px] 2xl:w-[285px] rounded-2xl relative overflow-hidden h-[340px]">
                        <img className="object-contain hover:scale-110 transition-transform duration-300" src={hiking} />
                        <div className="px-4 absolute top-4 left-4 py-2 rounded-full bg-white font-medium">Hiking</div>
                    </div>
                    <div className=" w-[250px] 2xl:w-[285px] rounded-2xl relative overflow-hidden h-[340px]">
                        <img className="object-contain hover:scale-110 transition-transform duration-300" src={cooking} />
                        <div className="px-4 absolute top-4 left-4 py-2 rounded-full bg-white font-medium">Cooking</div>
                    </div>
                    <div className="w-[250px] 2xl:w-[285px] rounded-2xl relative overflow-hidden h-[340px]">
                        <img className="object-contain hover:scale-110 transition-transform duration-300" src={movie} />
                        <div className="px-4 absolute top-4 left-4 py-2 rounded-full bg-white font-medium">Cinephile</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default About;