"use client"
import { useState } from "react";
import './header.css'

const Header = () => {
    const [Toggle, showMenu] = useState(false)


    return (
        <header className="header">
            <nav className="nav container">
                <a href="/" className="nav-logo">Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
                <div className={Toggle ? "nav-menu show-menu" : "nav-menu"}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                <span className='nav-title'>Home</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/shop" className="nav-link">
                                <span className='nav-title'>Shop</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/contact" className="nav-link">
                                <span className='nav-title'>Contact</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/history" className="nav-link">
                                <span className='nav-title'>History</span>
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

export default Header;
