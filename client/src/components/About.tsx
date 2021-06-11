import { Typography } from "antd";
import ChangeBioForm from "./ChangeBioForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangeJobForm from "./ChangeJobForm";
import styles from "../../styles/Profile.module.css";

/**
 * Interface for About's props.
 */
export interface AboutProps {
    firstName: string;
    lastName: string;
    role: string;
    aboutMe: string;
}

export function About(): JSX.Element {

    return (
        <div>
            <div className={styles.name}>
                <Typography.Text>
                    <ChangeNameForm/>
                </Typography.Text>
            </div>
            <span className={styles.name}>
                <ChangeJobForm/>
            </span>
        </div>
    );
}