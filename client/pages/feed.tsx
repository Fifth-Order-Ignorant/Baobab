import MessageFeed from "../src/components/MessageFeed";
import { SendMessage } from "../src/components/SendMessage";
import { Typography } from "antd";
import sampleMessages from "../src/constants/SampleMessageList";
import { MessagePaginationRequest, MessageRequest } from "baobab-common";
import axios from 'axios';

/**
 * Renders the feed page.
 */
export default function Feed(): JSX.Element{

    const getMessages = async () => {
        const res = await axios.get('/api/message/pagination', {start: 0, end: 5});
        console.log(res.data);
        return res.data;
    }

    const sendMessage = async (content: string) => {
        const mr: MessageRequest = {content: content, parentID: -1};
        await axios.post('/api/message/create', mr);
        console.log(mr.content);
    }

    return(
        <div style={{backgroundColor: "#f0f0f0"}}>
            <Typography>
                <h2>Feed</h2>
            </Typography>
            <SendMessage author={"W. F. Wumbo"} sendMessage={sendMessage} />
            <MessageFeed onLoad={getMessages} initMessages={sampleMessages} />
        </div>
    )
}
