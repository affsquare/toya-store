import Link from 'next/link';
import Store from './store';
export default function Shop() {
    return (
        <>
            <div className="container mt-4">
                <div className="shop d-flex align-items-center">
                    <Link href="/">Home</Link>
                    <span className='mx-2 d-flex align-items-center'>
                        <i className="fa-solid fa-greater-than"></i>
                    </span>
                    <span>Shop</span>
                </div>
                <h3 className='h1 fw-bold mt-2'>Shop</h3>
                
                {/* Store Components */}
                <Store />

            </div>
        </>
    )
}
