
const ProjectCard = ({title,heading,desc,tags,media}) =>{

    return(
        <div className="bg-white flex flex-col gap-2 rounded-3xl p-8">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-xl font-semibold">{heading}</div>
            <div className="text-zinc-500 mt-2 mb-4">{desc}</div>
            <div className="flex gap-2 flex-wrap">{tags.map((item,key)=><div key={key} className="bg-[#3bcccc1a] px-3 py-1">{item}</div>)}</div>

            {media && <div className="border border-gray-100 mt-4 rounded-4xl">
                <div className="bg-[#f3f3f4] rounded-2xl p-4"><img className="hover:scale-105 transition-transform" src={media} /></div>
                </div>}
        </div>
    )
}

export default ProjectCard;