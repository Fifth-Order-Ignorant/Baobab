import MessageFeed from "../src/components/MessageFeed";
import { SendMessage } from "../src/components/SendMessage";
import { Typography } from "antd";
import sampleMessages from "../src/constants/SampleMessageList";

/**
 * Renders the feed page.
 */
export default function Feed(): JSX.Element{
    return(
        <div style={{backgroundColor: "#f0f0f0"}}>
            <Typography>
                <h2>Feed</h2>
            </Typography>
            <SendMessage author={"W. F. Wumbo"} />
            <MessageFeed onLoad={async() => {return sampleMessages}} initMessages={sampleMessages} />
        </div>
    )
}
