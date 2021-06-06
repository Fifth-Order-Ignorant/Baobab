import MessageFeed from "../src/components/MessageFeed";
import { Typography } from "antd";

/**
 * Renders the feed page.
 */
export default function Feed(): JSX.Element{
    return(
        <div style={{backgroundColor: "#f0f0f0"}}>
            <Typography>
                <h2>Feed</h2>
            </Typography>
            <MessageFeed />
        </div>
    )
}
