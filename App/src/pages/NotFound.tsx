import { useLocation, Link } from "react-router";

export default function NotFound() {
    const path = useLocation();

    return (
        <div>
            <h1>404</h1>
            <h3>Page with url {path.pathname} non-availeble...</h3>
            <Link to="/home">
                <button>Return</button>
            </Link>
        </div>
    )
}