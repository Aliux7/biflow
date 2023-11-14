"use client"
import { useEffect, useState } from "react";
import './header.css'
import { useRouter } from 'next/navigation'

const AdminHeader = () => {
    const [Toggle, showMenu] = useState(false)
    const router = useRouter();

    const emailProp = typeof window !== 'undefined' ? localStorage.getItem("email") : null;
    const email = emailProp ? emailProp : "Default Email";

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login')
    };
    
    useEffect(() => {
        if (email === "Default Email") {
            router.push('/login');
        }
    }, [email, router]);

    return (
        <header className="header">
            <nav className="nav container">
                <a href="/" className="nav-logo">Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
                <div className={Toggle ? "nav-menu show-menu" : "nav-menu"}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="/admin/order" className="nav-link">
                                <span className='nav-title'>Order</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/history" className="nav-link">
                                <span className='nav-title'>History</span>
                            </a>
                        </li>
                        <li className="nav-item" style={{width:'max-content'}}>
                            <a href="#" className="nav-link" onClick={handleLogout}>
                                <span className='nav-title'>{email}</span>
                            </a>
                        </li>
                    </ul>
                    {Toggle === true && (
                        <i className="uil uil-times nav-close" onClick={() => showMenu(!Toggle)}></i>
                    )}
                </div>
                
                {Toggle === false && (
                    <div className="nav-toggle" onClick={() => showMenu(!Toggle)}>
                        <i className="uil uil-apps"></i>
                    </div>
                )}
            </nav> 
        </header>
    );
};

export default AdminHeader;
