import { Typography } from "antd";
import Card from "./Card";
import styles from "../../styles/Profile.module.css";

/**
 * Interface for About's props.
 */
export interface AboutProps {
    name: string;
    role: string;
    aboutMe: string;
}

/**
 * Renders the About component.
 * @param props Requires the following:
 *      - name: First and last name of the user.
 *      - role: Role/occupation of the user.
 *      - aboutMe: A paragraph describing the user as a React component/string.
 */
export function About(props: AboutProps): JSX.Element {
    return (
        <div>
            <div className={styles.name}>
                <Typography.Text>
                    <h3>
                        {props.name}
                    </h3>
                </Typography.Text>
            </div>
            <span className={styles.name}>
                <Typography.Text type="secondary">
                    {props.role}
                </Typography.Text>
            </span>
            <Card>{<div>{props.aboutMe}</div>}</Card>
        </div>
    );
}