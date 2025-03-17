import profileImage from "/profile.svg";
const Card = ({ heading, body, link, stack, profile }) => {
    return (
        <div className="bg-white border p-6 flex flex-col gap-4 border-gray-100 rounded-xl">
            <div className="font-semibold text-lg">{heading}</div>
            {profile &&
                    <div className="bg-gray-100 relative overflow-hidden size-16 rounded-full">
                        <img src={profileImage} className="w-full transition-transform absolute top-1/2 left-1/2 -translate-1/2 hover:scale-105 h-full object-contain "/>
                    </div>
            }
            {(body || link) && <div className={`text-gray-700 flex ${body && "flex-col"} ${link && "flex-row"} gap-2`}>
                {body && body.map((text, key) => <p key={key}>{text}</p>)}
                {link && link.map((link, key) => <a className="border-r border-gray-200 hover:underline pr-2 last:border-none" key={key} target="_blank" href={link.routeTo}>{link.name}</a>)}
            </div>}
            {stack &&
                <div className="flex max-lg:flex-col gap-y-6 flex-wrap">
                    {stack.map((item, key) => {
                        return (
                            <div key={key} className="flex items-center w-full lg:w-1/2 gap-4">
                                <div className="size-10 overflow-hidden rounded-full">
                                    <img src={item.img} className={`object-contain`} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-gray-600">{item.desc}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>}
        </div>
    )
}

export default Card;