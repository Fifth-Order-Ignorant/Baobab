import { MessageList } from "../src/components/MessageList";
import sampleMessages from "../src/constants/SampleMessageList";
import { Typography } from "antd";

/**
 * Renders the MessageFeed page.
 */
export default function MessageFeed(): JSX.Element{
    return(
        <div style={{backgroundColor: "#f0f0f0"}}>
            <Typography>
                <h2>Feed</h2>
            </Typography>
            <MessageList messagePropsList={sampleMessages} />
        </div>
    )
}
