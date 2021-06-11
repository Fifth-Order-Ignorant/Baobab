import { Typography } from "antd";
import ChangeBio from "./ChangeBio";
import ChangeName from "./ChangeName";
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
                    <ChangeName name={props.name}/>
                </Typography.Text>
            </div>
            <span className={styles.name}>
                <Typography.Text type="secondary">
                    {props.role}
                </Typography.Text>
            </span>
            <ChangeBio bio={props.aboutMe}/>
        </div>
    );
}