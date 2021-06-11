import MessageFeed from "../src/components/MessageFeed";
import { SendMessage } from "../src/components/SendMessage";
import { Typography } from "antd";
import sampleMessages from "../src/constants/SampleMessageList";
import { MessagePaginationRequest, MessageRequest } from "baobab-common";
import axios from 'axios';
import { Row, Col } from 'antd';
import styles from "../styles/Message.module.css";

/**
 * Renders the feed page.
 */
export default function Feed(): JSX.Element{

    // declare variables for pagination
    let i: number = 0;
    let c: number = 5;

    const getMessages = async () => {
        console.log({start: c * i, end: c * (i + 1)});
        const res = await axios.post('/api/message/pagination', {start: c * i, end: c * (i + 1)});
        const newMessages = res.data;
        if (newMessages.length !== 0){
            i++;
        }
        return newMessages;
    }

    const sendMessage = async (content: string) => {
        const mr: MessageRequest = {content: content, parentID: -1};
        await axios.post('/api/message/create', mr);
        console.log(mr.content);
    }

    return(
        <div className={styles.feed}>
            <Row type="flex" justify="center" align="middle">
                <Col span={16}>
                <Typography>
                    <h2>Feed</h2>
                </Typography>
                <SendMessage author={"W. F. Wumbo"} sendMessage={sendMessage} />
                <MessageFeed onLoad={getMessages} />
                </Col>
            </Row>
        </div>
    )
}
