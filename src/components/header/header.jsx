import { Link, useLocation } from "react-router";

const Header = () => {
    const emailId = "adamsantheep18@gmail.com";

    let {pathname} = useLocation();
    console.log(pathname)
    
    const menuItems = [{name:"About", routeTo:"/about"},{name:"Work", routeTo:"/work"},{name:"Resume", routeTo:"https://drive.google.com/file/d/1bHpYvMI9c4hrXYd1MNAcc3qhvjpxTdkz/view?usp=sharing"}]
    return (
        <>
        <header className="flex max-md:flex-col max-md:items-center justify-between">
            <Link to={"mailto:adamsantheep18@gmail.com"} className="font-semibold">{emailId}</Link>
            <div className="flex max-md:mt-4 gap-4">{menuItems.map((item, key)=>
                <a key={key} className={`font-medium text-gray-600 ${pathname.includes(item.routeTo) && "text-gray-900 font-semibold"}`} target={item.name=="Resume" && "_blank"} href={item.routeTo}>{item.name}</a>
            )}</div>
        </header>
        </>
    )
}

export default Header;