import { Link } from "react-router-dom";

export default function NavigationBar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/blog-list">Blogs</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
