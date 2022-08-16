import Link  from 'next/link';

export default function FooterNav() {
    return (
        <>
        <nav className="navbar navbar-expand-lg text-dark pt-3">
                <div className="container p-0">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item px-3 fw-bold">
                                <Link className="nav-link" href="/">Home</Link>
                            </li>
                            <li className="nav-item px-3 fw-bold">
                                <Link className="nav-link" href="/aboutUs">About Us</Link>
                            </li>
                            <li className="nav-item px-3 fw-bold">
                                <Link className="nav-link" href="/contactUs">Contact Us</Link>
                            </li>
                            
                            <li className="nav-item px-3 fw-bold">
                                <Link className="nav-link" href="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item px-3 fw-bold">
                                <Link className="nav-link" href="/askToya">Ask Toya</Link>
                            </li>
                            <li className="nav-item px-3 fw-bold">
                                <Link className="nav-link" href="/faq">FAQ</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
