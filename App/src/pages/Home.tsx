import { Link } from "react-router";

export default function Home() {
    return (
        <div>
            <h1>Home page in progress...</h1>
            <p>See our catalog there!</p>
            <Link to="/products">
                <button>Catalog</button>
            </Link>
        </div>
    )
}