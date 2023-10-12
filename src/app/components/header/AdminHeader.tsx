"use client"
import { useState } from "react";
import './header.css'

interface EmailProps {
    email: string;
}

const AdminHeader = ({ email }: EmailProps) => {
    const [Toggle, showMenu] = useState(false)


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
                            <a href="/admin/addproduct" className="nav-link">
                                <span className='nav-title'>Product</span>
                            </a>
                        </li>
                        <li className="nav-item" style={{width:'max-content'}}>
                            <a href="#" className="nav-link">
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
