import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "../../firebase";
import { getRiskColor, getRiskBg } from '../../data/regions';
import { Card, RiskBadge, ProgressBar } from '../../components/ui/Components';
import './RegionAnalysis.css';

const db = getFirestore(app);

const Indicator = ({ label, value, subtext, highlight }) => (
    <div className={`indicator-box ${highlight ? 'highlight' : ''}`}>
        <span className="ind-label">{label}</span>
        <span className={`ind-value ${highlight ? 'text-primary' : ''}`}>{value}</span>
        {subtext && <span className="ind-subtext">{subtext}</span>}
    </div>
);

function RegionAnalysis() {
    const { id } = useParams();
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function fetchRegion() {
            try {
                const snapshot = await getDocs(
                    query(collection(db, "districts"), where("region_id", "==", parseInt(id)))
                );
                if (snapshot.empty) {
                    setNotFound(true);
                } else {
                    setRegion({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
                }
            } catch (err) {
                console.error("Error fetching region:", err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }
        fetchRegion();
    }, [id]);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>⏳ Loading region data...</p>
        </div>
    );

    if (notFound) return <Navigate to="/risk-map" replace />;

    // Safe fallbacks for missing fields
    const femaleBirths = region.female_births ?? 0;
    const maleBirths = region.male_births ?? 0;
    const totalBirths = femaleBirths + maleBirths;
    const femaleLiteracy = region.female_literacy ?? 0;
    const maleLiteracy = region.male_literacy ?? 0;
    const girlDropout = region.girl_dropout_rate ?? 0;
    const femaleLaborPct = region.female_labor_participation ?? 0;
    const childMarriage = region.child_marriage_rate ?? 0;

    return (
        <div className="region-analysis-page">
            <div className="container">
                <div className="page-header">
                    <div>
                        <div className="breadcrumb">
                            <Link to="/risk-map">Risk Map</Link> / <span>{region.district_name}</span>
                        </div>
                        <h1 className="page-header__title">{region.district_name} District</h1>
                        <p className="page-header__subtitle">
                            {region.state_name} • Population: {region.population?.toLocaleString() ?? 'N/A'}
                        </p>
                    </div>
                    <div className="page-header__actions">
                        <div className="score-badge" style={{
                            background: getRiskBg(region.risk_level),
                            borderColor: getRiskColor(region.risk_level),
                            color: getRiskColor(region.risk_level)
                        }}>
                            <span className="score-val">{region.gender_risk_score}</span>
                            <span className="score-lbl">Risk Score</span>
                        </div>
                        <RiskBadge level={region.risk_level} />
                    </div>
                </div>

                <div className="analysis-grid">
                    <div className="analysis-main">

                        {/* Birth & Demographics */}
                        <Card className="analysis-section">
                            <h3>Birth & Demographics</h3>
                            <p className="section-desc">
                                Analysis of birth registrations{region.birth_year ? ` for ${region.birth_year}` : ''}
                            </p>
                            <div className="metrics-grid">
                                <Indicator
                                    label="Sex Ratio at Birth"
                                    value={region.sex_ratio?.toFixed(0) ?? 'N/A'}
                                    subtext="Females per 1000 Males"
                                    highlight={region.sex_ratio < 900}
                                />
                                <Indicator label="Female Births" value={femaleBirths ? femaleBirths.toLocaleString() : 'N/A'} />
                                <Indicator label="Male Births" value={maleBirths ? maleBirths.toLocaleString() : 'N/A'} />
                            </div>

                            {totalBirths > 0 ? (
                                <div className="compare-bar mt-4">
                                    <div className="c-labels">
                                        <span>Female ({Math.round(femaleBirths / totalBirths * 100)}%)</span>
                                        <span>Male ({Math.round(maleBirths / totalBirths * 100)}%)</span>
                                    </div>
                                    <div className="c-track">
                                        <div className="c-fill female" style={{ width: `${(femaleBirths / totalBirths) * 100}%` }}></div>
                                        <div className="c-fill male" style={{ width: `${(maleBirths / totalBirths) * 100}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <p className="section-desc mt-4" style={{ color: '#999' }}>Birth breakdown data not available.</p>
                            )}
                        </Card>

                        {/* Education */}
                        <Card className="analysis-section">
                            <h3>Education & Schooling</h3>
                            <p className="section-desc">Literacy rates and dropout statistics across genders</p>
                            <div className="metrics-grid mb-4">
                                <Indicator label="Female Literacy" value={`${femaleLiteracy}%`} highlight={femaleLiteracy < 60} />
                                <Indicator label="Male Literacy" value={maleLiteracy ? `${maleLiteracy}%` : 'N/A'} />
                                <Indicator label="Literacy Gap" value={maleLiteracy ? `${(maleLiteracy - femaleLiteracy).toFixed(1)}%` : 'N/A'} />
                            </div>
                            <div className="metrics-grid">
                                <Indicator label="Girl Dropout Rate" value={girlDropout ? `${girlDropout}%` : 'N/A'} highlight={girlDropout > 15} />
                                <Indicator label="Boy Dropout Rate" value={region.boy_dropout_rate ? `${region.boy_dropout_rate}%` : 'N/A'} />
                            </div>
                        </Card>

                        {/* Economic */}
                        <Card className="analysis-section">
                            <h3>Economic Participation</h3>
                            <p className="section-desc">Workforce engagement and financial independence</p>
                            <div className="metrics-grid mb-4">
                                <Indicator label="Female Labor Force" value={`${femaleLaborPct}%`} highlight={femaleLaborPct < 25} />
                                <Indicator label="Male Labor Force" value={region.male_labor_participation ? `${region.male_labor_participation}%` : 'N/A'} />
                            </div>
                            <div className="metrics-grid">
                                <Indicator label="Women SHGs" value={region.women_shg ?? 'N/A'} subtext="Active self-help groups" />
                                <Indicator label="Women-Owned Biz" value={region.women_owned_business_pct ? `${region.women_owned_business_pct}%` : 'N/A'} />
                            </div>
                        </Card>

                        {/* Social & Safety */}
                        <Card className="analysis-section">
                            <h3>Social Health & Safety</h3>
                            <p className="section-desc">Community well-being and protection metrics</p>
                            <div className="metrics-grid mb-4">
                                <Indicator label="Child Marriage Rate" value={childMarriage ? `${childMarriage}%` : 'N/A'} highlight={childMarriage > 10} />
                                <Indicator label="Maternal Health Index" value={region.maternal_health_index ? `${region.maternal_health_index}/100` : 'N/A'} />
                                <Indicator label="Girl Nutrition Index" value={region.girl_nutrition_index ? `${region.girl_nutrition_index}/100` : 'N/A'} />
                            </div>
                            <div className="metrics-grid safety-grid">
                                <Indicator label="Crimes Against Women" value={region.crimes_against_women ?? 'N/A'} />
                                <Indicator label="Domestic Violence Reports" value={region.domestic_violence ?? 'N/A'} />
                                <Indicator label="Trafficking Cases" value={region.trafficking_cases ?? 'N/A'} highlight={(region.trafficking_cases ?? 0) > 5} />
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="analysis-sidebar">
                        <Card className="summary-card">
                            <h3>Risk Assessment</h3>
                            <div className="risk-summary mt-4">
                                <div className="summary-row">
                                    <span className="s-label">Primary Risk Factor</span>
                                    <span className="s-value text-critical">{region.primary_risk_factor ?? 'N/A'}</span>
                                </div>

                                <h4 className="mt-6 mb-2">Contributing Factors</h4>

                                <div className="factor-item">
                                    <div className="f-head">
                                        <span>Education Deficit</span>
                                        <span>{girlDropout > 20 ? 'High' : 'Medium'}</span>
                                    </div>
                                    <ProgressBar
                                        value={girlDropout * 2.5}
                                        color={girlDropout > 20 ? 'var(--risk-critical)' : 'var(--risk-moderate)'}
                                    />
                                </div>

                                <div className="factor-item mt-3">
                                    <div className="f-head">
                                        <span>Economic Gap</span>
                                        <span>{femaleLaborPct < 20 ? 'High' : 'Low'}</span>
                                    </div>
                                    <ProgressBar
                                        value={100 - femaleLaborPct}
                                        color={femaleLaborPct < 20 ? 'var(--risk-critical)' : 'var(--color-primary)'}
                                    />
                                </div>

                                <div className="factor-item mt-3">
                                    <div className="f-head">
                                        <span>Social Vulnerability</span>
                                        <span>{childMarriage > 30 ? 'High' : 'Medium'}</span>
                                    </div>
                                    <ProgressBar
                                        value={childMarriage * 2}
                                        color={childMarriage > 30 ? 'var(--risk-critical)' : 'var(--risk-moderate)'}
                                    />
                                </div>
                            </div>

                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegionAnalysis;