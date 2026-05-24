import { Link } from "react-router";

export default function About() {
    return (
        <div>
            <h1>Who we are?</h1>
            <h3>Inforamition about company</h3>
            <p>Wanna buy our products?</p>
            <Link to="/products">
                <button>Catalog</button>
            </Link>
        </div>
    )
}