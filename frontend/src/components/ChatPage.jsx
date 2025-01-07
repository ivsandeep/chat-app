import { ChatState } from "../context/ChatProvider"
import ChatBox from "./ChatBox";
import MyChats from "./MyChats";
import SideDrawer from "./SideDrawer";





const ChatPage = () => {
    const {user}=ChatState();
    return (
        <div className=" w-[100%]">
            {user && <SideDrawer/>}
            <div className="flex gap-2 justify-evenly w-[100%] h-[91vh] p-[10px]">
                {user && <MyChats/>}
                {user && <ChatBox/>}
            </div>

        </div>
    )
}

export default ChatPage