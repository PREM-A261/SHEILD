import React from 'react';
import './ui.css';

export function Card({ children, className = '', hoverable = false, ...props }) {
    return (
        <div className={`ui-card ${hoverable ? 'ui-card--hoverable' : ''} ${className}`} {...props}>
            {children}
        </div>
    );
}

export function StatCard({ icon, value, label, color = 'primary', mini }) {
    return (
        <div className={`stat-card stat-card--${color}`}>
            <div className="stat-card__header">
                <div className={`stat-card__icon stat-card__icon--${color}`}>{icon}</div>
                {mini && <div className="stat-card__mini">{mini}</div>}
            </div>
            <div className="stat-card__value">{value}</div>
            <div className="stat-card__label">{label}</div>
        </div>
    );
}

export function Badge({ children, variant = 'default', size = 'sm' }) {
    return <span className={`ui-badge ui-badge--${variant} ui-badge--${size}`}>{children}</span>;
}

export function RiskBadge({ level }) {
    const variant = level === 'Critical' ? 'critical' : level === 'High' ? 'high' : level === 'Moderate' ? 'moderate' : 'low';
    return <Badge variant={variant}>{level}</Badge>;
}

export function FilterPanel({ filters, values, onChange }) {
    return (
        <div className="filter-panel">
            {filters.map(f => (
                <div key={f.key} className="filter-panel__group">
                    <label className="filter-panel__label">{f.label}</label>
                    <select
                        className="filter-panel__select"
                        value={values[f.key] || ''}
                        onChange={(e) => onChange(f.key, e.target.value)}
                    >
                        <option value="">All</option>
                        {f.options.map(opt => (
                            <option key={opt.value || opt} value={opt.value || opt}>
                                {opt.label || opt}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}

export function PageHeader({ title, subtitle, actions }) {
    return (
        <div className="page-header">
            <div>
                <h1 className="page-header__title">{title}</h1>
                {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
            </div>
            {actions && <div className="page-header__actions">{actions}</div>}
        </div>
    );
}

export function ProgressBar({ value, color = '#3F51B5' }) {
    return (
        <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${value}%`, background: color }}></div>
        </div>
    );
}
