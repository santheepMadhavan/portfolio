import AboutCard from "../about-card/aboutCard";
import ProjectCard from "../project-card/projectCard";
import { useNavigate } from "react-router";
import hotstarThumbnail from "/hotstarThumbnail.png";

const Work = () =>{

    let navigate = useNavigate();

    const proposedSolution = ()=>{
        return(
           <>
            <p>The "Playlist" feature allows users to create a sequence of their favorite serials. Instead of manually switching between serials, the playlist will automatically play the next available episode from their selected shows, mimicking the traditional TV experience where serials are broadcast one after another.</p>
            <p className="font-semibold">Key Benefits</p>
            <ul className="list-decimal px-4">
                <li><span className="font-medium">Ease of Use:</span> Reduces the need for repetitive navigation.</li>
                <li><span className="font-medium">Time-Saving:</span> Allows continuous playback of serials without interruption.</li>
                <li><span className="font-medium">User Comfort:</span> Provides a familiar experience for users accustomed to TV channels, enhancing their transition to OTT platforms.</li>
            </ul>

            <p className="font-semibold">Target Audience</p>
            <ul className="list-decimal px-4">
                <li><span className="font-medium">Primary: </span> Elderly users transitioning from traditional TV channels to Disney+ Hotstar.</li>
                <li><span className="font-medium">Secondary: </span> Users who prefer uninterrupted, sequential viewing of serials.</li>
            </ul>
           </>
        )
    }

    const featureOverview = ()=>{
        return(
           <div className="flex flex-col gap-2">
            <p className="font-semibold">Create a Playlist</p>
            <ul className="list-decimal px-4">
                <li>Users can select multiple serials they wish to watch and add them to a playlist.</li>
                <li>The playlist can be customized with serial order and priority.</li>
            </ul>
            <p className="font-semibold">Auto-Play in Sequence</p>
            <ul className="list-decimal px-4">
                <li>Once the playlist starts, episodes from different serials play one after another.</li>
                <li>The next available episode from each serial is played in the order set by the user.</li>
            </ul>
            <p className="font-semibold">Playlist Management</p>
            <ul className="list-decimal px-4">
                <li>Users can easily edit, delete, or reorder their playlist.</li>
                <li>Option to enable or disable automatic episode skipping in case of missed episodes.</li>
            </ul>
           </div>
        )
    }

    const prototypeDesign = () =>{
        return(
            <div>
                <p>To bring this idea to life, I recreated the entire Disney+ Hotstar UI and designed a prototype showcasing the Playlist feature. Every component was built from scratch, closely following Disney+ Hotstar's design patterns to ensure consistency with their brand experience.</p>
                <img src={hotstarPrototype}/>
            </div>
        )
    }

    const projects = [
        {
            title:"Disney+ Hotstar",
            heading:"Simplifying Disney+ Hotstar for Elderly Users with a Playlist Feature",
            subHeadings:["Objective", "Problem Statement", "Proposed Solution", "Feature Overview", "Prototype Design","Outcome"],
            content:[
                {name:"Objective", body:`Enhance the user experience for elderly viewers transitioning from traditional TV channels to OTT platforms by introducing a "Playlist" feature that simplifies their daily viewing of serials.`},
                {name:"Problem Statement", body:`Many elderly users are accustomed to watching 8-10 serials daily, which are aired in sequence on TV channels. On Disney+ Hotstar, while they can access these serials, the current design requires them to manually navigate back to the homepage, search for the next serial, and select "Watch today's episode" after each episode finishes. This manual interaction is tedious, especially for elderly users who may struggle with navigating digital platforms.`},
                {name:"Proposed Solution", body:proposedSolution()},
                {name:"Feature Overview", body:featureOverview()},
                {name:"Outcome", body:`The Playlist feature bridges a critical gap for elderly users who are transitioning from traditional TV to OTT platforms. By reducing the complexity of manual navigation and mimicking the sequential TV viewing experience, this feature provides a seamless, familiar experience, ultimately enhancing user satisfaction and engagement.`},


            ],
            desc:`This case study explores how a simple playlist feature can make Disney+ Hotstar more accessible and user-friendly for elderly viewers, improving their overall streaming experience.`,
            tags:["UX Case Study","UX/UI Design","Accessibility"],
            media:hotstarThumbnail
        },
        {title:"Globallogic Learning Experience",heading:"Revamped Learning Experience Platform to Boost Engagement and Usability",desc:`I revamped the LXP to improve both Learner and Admin experiences, enhancing layouts, accessibility, and navigation. This resulted in a 30% increase in user engagement and a 22% rise in logins.`,tags:["UX Research","UX/UI Design","Frontend Development"],media:""},
        {title:"Interview Copilot",heading:"AI-Powered Tool to Revolutionize Technical Interviews and Recruitment",desc:`Interview Copilot uses AI to help interviewers and talent acquisition teams conduct high-level technical interviews with precision. It simplifies the recruitment process by evaluating candidates accurately and efficiently.`,tags:["Problem Solving","Product Design","Frontend Development"],media:""},
    ]

    const descriptionCard = () =>{
        return(
            <div className="border border-[#9c8f6d80] bg-[#fffbf5]  text-[#5b4610] rounded-2xl p-6">
                <ul className="list-disc flex flex-col gap-3 px-4 list-outside">
                    <li>Specialized in designing LXP and Assessment platforms, with expertise in creating scalable design systems across web and mobile.</li>
                    <li>Skilled in coding designs using React, bridging the gap between design and development to ensure high-quality, responsive user interfaces.</li>
                    <li>Focused on creating intuitive, clean interfaces, drawing inspiration from industry best practices to enhance usability and deliver seamless user experiences.</li>
                </ul>
            </div>
        )
    }

    return (
        <div className="py-8 mt-4 gap-8 flex max-md:flex-col">
        <AboutCard />
        <div className="flex flex-1  flex-col gap-4">
            <div className="text-2xl font-bold">Selected Works</div>
            {descriptionCard()}
            {projects.map((project,key)=><div key={key} onClick={()=> project.media && navigate(`/work/${projects[key].title}`)}><ProjectCard  {...project} /></div>)}
        </div>
        </div>
    )
}

export default Work;