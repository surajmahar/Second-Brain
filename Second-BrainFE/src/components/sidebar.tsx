import { Logo } from "../icons/logo";
import { Twitter } from "../icons/twitter";
import { Youtubeicon } from "../icons/youtubeicon";
import { SidebarItem } from "./sidebarItem";

export function Sidebar (){
    return <div className="h-screen bg-white border-r w-72 position
     fixed l-0 t-0 pl-6">
        <div className=" flex text-2xl pt-8 items-center">
           <div className="pr-2 text-purple-600">
            <Logo/>
            </div>
            Second-Brain
        </div>
       <div className="pt-4 pl-4 ">
        <SidebarItem text="Twitter" icon={<Twitter/>} />
        <SidebarItem text="Youtube" icon={<Youtubeicon/>} />
       </div>
    </div>
}