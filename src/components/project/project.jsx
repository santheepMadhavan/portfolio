import { useParams, useNavigate } from "react-router";
import hotstarPrototype from "/hotstarPrototype.svg";
import hotstarVideo from "/hotstarVideo.mov";
import { useEffect } from "react";


const Project = () => {

    let navigate = useNavigate();
    useEffect(()=>{
        document.getElementById(projectDetails.title).scrollIntoView({behavior:"instant", block:"center"})
    },[])
    let { title } = useParams();

    const proposedSolution = () => {
        return (
            <>
                <p>The "Playlist" feature allows users to create a sequence of their favorite serials. Instead of manually switching between serials, the playlist will automatically play the next available episode from their selected shows, mimicking the traditional TV experience where serials are broadcast one after another.</p>
                <p className="font-semibold mt-4 mb-2">Key Benefits</p>
                <ul className="list-disc space-y-1 px-4">
                    <li><span className="font-medium">Ease of Use:</span> Reduces the need for repetitive navigation.</li>
                    <li><span className="font-medium">Time-Saving:</span> Allows continuous playback of serials without interruption.</li>
                    <li><span className="font-medium">User Comfort:</span> Provides a familiar experience for users accustomed to TV channels, enhancing their transition to OTT platforms.</li>
                </ul>

                <p className="font-semibold mt-12 mb-2">Target Audience</p>
                <ul className="list-disc space-y-1 px-4">
                    <li><span className="font-medium">Primary: </span> Elderly users transitioning from traditional TV channels to Disney+ Hotstar.</li>
                    <li><span className="font-medium">Secondary: </span> Users who prefer uninterrupted, sequential viewing of serials.</li>
                </ul>
            </>
        )
    }

    const featureOverview = () => {
        return (
            <div className="flex flex-col gap-8">
                <div>
                    <p className="font-semibold mb-2">Create a Playlist</p>
                    <ul className="list-disc px-4">
                        <li>Users can select multiple serials they wish to watch and add them to a playlist.</li>
                        <li>The playlist can be customized with serial order and priority.</li>
                    </ul>
                </div>
                <div>
                    <p className="font-semibold mb-2">Auto-Play in Sequence</p>
                    <ul className="list-disc px-4">
                        <li>Once the playlist starts, episodes from different serials play one after another.</li>
                        <li>The next available episode from each serial is played in the order set by the user.</li>
                    </ul>
                </div>
                <div>
                    <p className="font-semibold mb-2">Playlist Management</p>
                    <ul className="list-disc px-4">
                        <li>Users can easily edit, delete, or reorder their playlist.</li>
                        <li>Option to enable or disable automatic episode skipping in case of missed episodes.</li>
                    </ul>
                </div>
            </div>
        )
    }

    const prototypeDesign = () => {
        return (
            <div className="space-y-6">
                <p>To bring this idea to life, I recreated the entire Disney+ Hotstar UI and designed a prototype showcasing the Playlist feature. Every component was built from scratch, closely following Disney+ Hotstar's design patterns to ensure consistency with their brand experience.</p>
                <img src={hotstarPrototype} />
            </div>
        )
    }

    const projects = [
        {
            title: "Disney+ Hotstar",
            heading: "Simplifying Disney+ Hotstar for Elderly Users with a Playlist Feature",
            subHeadings: ["Objective", "Problem Statement", "Proposed Solution", "Feature Overview", "Prototype Design", "Outcome"],
            content: [
                { name: "Objective", body: `Enhance the user experience for elderly viewers transitioning from traditional TV channels to OTT platforms by introducing a "Playlist" feature that simplifies their daily viewing of serials.` },
                { name: "Problem Statement", body: `Many elderly users are accustomed to watching 8-10 serials daily, which are aired in sequence on TV channels. On Disney+ Hotstar, while they can access these serials, the current design requires them to manually navigate back to the homepage, search for the next serial, and select "Watch today's episode" after each episode finishes. This manual interaction is tedious, especially for elderly users who may struggle with navigating digital platforms.` },
                { name: "Proposed Solution", body: proposedSolution() },
                { name: "Feature Overview", body: featureOverview() },
                { name: "Prototype Design", body: prototypeDesign() },
                { name: "Outcome", body: `The Playlist feature bridges a critical gap for elderly users who are transitioning from traditional TV to OTT platforms. By reducing the complexity of manual navigation and mimicking the sequential TV viewing experience, this feature provides a seamless, familiar experience, ultimately enhancing user satisfaction and engagement.` },
            ],
            desc: `This case study explores how a simple playlist feature can make Disney+ Hotstar more accessible and user-friendly for elderly viewers, improving their overall streaming experience.`,
            tags: ["UX Case Study", "UX/UI Design", "Accessibility"],
            next: { title: "Globallogic Learning Experience", routeTo: "" }
        },
        { title: "Globallogic Learning Experience", heading: "Revamped Learning Experience Platform to Boost Engagement and Usability", desc: `I revamped the LXP to improve both Learner and Admin experiences, enhancing layouts, accessibility, and navigation. This resulted in a 30% increase in user engagement and a 22% rise in logins.`, tags: ["UX Research", "UX/UI Design", "Frontend Development"], media: { image: "", routeTo: "" } },
        { title: "Interview Copilot", heading: "AI-Powered Tool to Revolutionize Technical Interviews and Recruitment", desc: `Interview Copilot uses AI to help interviewers and talent acquisition teams conduct high-level technical interviews with precision. It simplifies the recruitment process by evaluating candidates accurately and efficiently.`, tags: ["Problem Solving", "Product Design", "Frontend Development"], media: { image: "", routeTo: "" } },
    ]

    const projectDetails = projects.filter(item => {
        if (item.title == title) {
            return item;
        }
    })[0];

    console.log(projectDetails);
    

    const sidebarNavigation = () => {
        return (
            <div className="bg-white hidden w-[250px] h-fit sticky top-4 md:flex flex-col gap-4 rounded-2xl border border-gray-200 p-8">
                <div onClick={() => navigate("/work")} className="p-3 cursor-pointer rounded-full border w-fit border-gray-100 shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="font-medium cursor-pointer text-lg" onClick={()=>(document.getElementById(projectDetails.title).scrollIntoView({behavior:"smooth", block:"center"}))}>{projectDetails.title}</div>
                <div className="flex flex-col gap-2">{projectDetails.subHeadings.map((item, key) => <span key={key} onClick={()=>scrollTo(document.getElementById(key).scrollIntoView({behavior:"smooth"}))} className="text-zinc-500 hover:text-zinc-800 cursor-pointer">{item}</span>)}</div>
                <div className="h-px w-full bg-gradient-to-l from-[#f5f5f5] via-gray-100 to-[#f5f5f5]"></div>
                <div className="font-medium">Next: {projectDetails.next.title}</div>
            </div>
        )
    }
    return (
        <div className="flex max-md:flex-col py-8 gap-4">
            {sidebarNavigation()}
            <div className="flex-1 flex gap-4 flex-col">
                <div id={projectDetails.title} className="bg-white flex flex-col gap-8 rounded-2xl border border-gray-200 p-8">
                    <video className="rounded-2xl border border-gray-100" src={hotstarVideo} loop autoPlay="true" muted />
                    <div className="flex flex-col gap-3 rounded-2xl">
                        <div className="text-3xl font-semibold">{projectDetails.title}</div>
                        <div className="text-slate-600 text-lg">{projectDetails.desc}</div>
                    </div>
                </div>

                {projectDetails.content.map((item, key) => {
                    return (
                        <div key={key} id={key} className="bg-white flex flex-col gap-4 rounded-2xl border border-gray-200 p-8">
                            <div className="text-xl text-slate-800 font-semibold">{item.name}</div>
                            <div className="text-slate-600">{item.body}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Project;