import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                                <circle cx="16" cy="16" r="14" fill="#2563eb" opacity="0.15" />
                                <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z" fill="#93b4ff" />
                                <path d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 2.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 10.5c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08A7.23 7.23 0 0116 21z" fill="#93b4ff" />
                            </svg>
                            <span>Gender Equity Intelligence Platform</span>
                        </div>
                        <p className="footer-tagline">Identify inequality hotspots and empower communities</p>
                    </div>

                    <div className="footer-links-group">
                        <h4>Platform</h4>
                        <ul>
                            <li><Link to="/risk-map">Risk Map</Link></li>
                            <li><Link to="/data-insights">Data Insights</Link></li>
                            <li><Link to="/interventions">Interventions</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link to="/awareness">Awareness</Link></li>
                            <li><Link to="/data-sources">Data Sources</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Gender Equity Intelligence Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
