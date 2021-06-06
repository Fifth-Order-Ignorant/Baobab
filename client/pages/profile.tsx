import { About } from "../src/components/About";

/**
 * Renders the profile page.
 */
export default function Profile(): JSX.Element {
    return (
        <div>
            <About name={"Hello World"} role={"Entrepeneur"} aboutMe={"I like to read!"}/>
        </div>
    );
}