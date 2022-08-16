import { useState } from 'react';
import clsx from 'clsx';



export default function BestSeller() {

    // "skin", "men", 'body', 'hair'
    const tabs = [
        {
            title: "skin",
            render: (props) => <div>skin</div>
        },
        {
            title: "men",
            render: (props) => <div>men</div>

        },
        {
            title: "body",
            render: (props) => <div>body</div>
        },
        {
            title: "hair",
            render: (props) => <div>hair</div>
        }
    ]

    const [currentActive, setCurrentActive] = useState(0);
    return (
        <>
            <section className="bestSeller bg-info py-5">
                <div className="container">
                    <div className="header text-center">
                        <h2 className="fs-3 best-head"><span className="best-span ">Best Sellers</span> of the week</h2>
                    </div>
                    <div className="bestSellerTabs d-flex align-items-center flex-column mt-4">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            {
                                tabs.map((t, i) => {
                                    return <li key={i} id={`${t.title}-${i}`} className="nav-item" role="presentation">
                                        <button onClick={() => setCurrentActive(i)} className={clsx({
                                            "nav-link": true,
                                            "active": i === currentActive
                                        })} id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target={`#${t.title}-${i}`} type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">{t.title}</button>
                                    </li>
                                })
                            }
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            {tabs.map((t, i) => {
                                if (i == currentActive) {
                                    return <t.render key={i}/>
                                }
                            })}
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}
