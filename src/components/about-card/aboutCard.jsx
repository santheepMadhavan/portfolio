import profileImage from "/favIcon.svg";
const AboutCard = () => {
    return (
        <div className="bg-white md:sticky md:top-4 w-full md:w-[250px] lg:w-[280px] xl:w-[315px] border flex flex-col border-gray-200 h-fit min-h-[450px] rounded-3xl">
            <div className="bg-gradient-to-br relative from-green-100 via-yellow-100 to-orange-100 rounded-t-3xl w-full h-[132px]">
                <div className="absolute -bottom-10 left-8 size-20 border-2 border-white bg-gray-100 rounded-full">
                    <img className="object-contain" src={profileImage} />
                </div>
            </div>
            <div className="text-2xl mt-16 px-8 mb-1 font-bold">
                Hi, I'm Santheep
            </div>
            <div className="gap-1 flex px-8">
                <span>📍</span>
                <span className="text-gray-400">Chennai, Tamilnadu</span>
            </div>
            <div className="text-gray-600 flex flex-col gap-2 mt-8 px-8">
                <p>I'm a product designer at GlobalLogic. Currently building UX designs and coding them to enhance learning experiences</p>
                <p>Passionate about Learning Science, Product Management, Design & Development, and AI.</p>
            </div>
            <div className="flex p-8 gap-4">
                <a href="mailto:adamsantheep18@gmail.com" target="_blank" className="size-12 bg-gray-100 flex justify-center items-center cursor-pointer rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>

                </a>
                <a href="https://www.linkedin.com/in/santheep17/" target="_blank" className="size-12 bg-gray-100 flex justify-center items-center cursor-pointer rounded-full">
                    <svg fill="#242424" height="100px" width="100px" className="size-5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_801_"> <path id="XMLID_802_" d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z"></path> <path id="XMLID_803_" d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"></path> <path id="XMLID_804_" d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z"></path> </g> </g></svg>
                </a>
            </div>
        </div>
    )
}

export default AboutCard;