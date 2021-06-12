import { Typography } from "antd";
import ChangeBioForm from "./ChangeBioForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangeJobForm from "./ChangeJobForm";
import styles from "../../styles/Profile.module.css";

/**
 * Renders the about component, which includes first and last name, job title
 * and bio. 
 */
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
            <ChangeBioForm/>
        </div>
    );
}