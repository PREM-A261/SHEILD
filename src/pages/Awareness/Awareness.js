import React, { useState } from 'react';
import articlesData, { articleCategories } from '../../data/articles';
import { Card, PageHeader } from '../../components/ui/Components';
import './Awareness.css';

function Awareness() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredArticles = activeCategory === 'All'
        ? articlesData
        : articlesData.filter(a => a.category === activeCategory);

    return (
        <div className="awareness-page">
            <div className="container">
                <PageHeader
                    title="Community Awareness Resources"
                    subtitle="Educational articles, legal guides, and community empowerment materials."
                />

                <div className="category-tabs">
                    <button
                        className={`tab-btn ${activeCategory === 'All' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('All')}
                    >
                        All Resources
                    </button>
                    {articleCategories.map(cat => (
                        <button
                            key={cat}
                            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="articles-grid">
                    {filteredArticles.map(article => (
                        <Card key={article.id} hoverable className="article-card">
                            <div className="article-cat">{article.category}</div>
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>

                            <div className="article-meta">
                                <span className="a-audience">Target: {article.target_audience}</span>
                                <span className="a-date">{new Date(article.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            </div>

                            <div className="article-action">
                                <a href="#read" className="read-link">Read Full Article &rarr;</a>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Awareness;
