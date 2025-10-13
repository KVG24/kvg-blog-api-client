import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div>
            <h1>Oh no, this page doesn't exist!</h1>
            <Link to="/">Home</Link>
        </div>
    );
}
