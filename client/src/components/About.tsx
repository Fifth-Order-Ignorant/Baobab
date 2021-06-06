import { Typography } from "antd";

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
 *      - aboutMe: A paragraph describing the user.
 */
export function About(props: AboutProps): JSX.Element {
    return (
        <div>
        </div>
    );
}