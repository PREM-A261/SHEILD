import React from 'react';
import datasetsData from '../../data/datasets';
import { Card, PageHeader, Badge } from '../../components/ui/Components';
import './DataSources.css';

function DataSources() {
    return (
        <div className="datasources-page">
            <div className="container">
                <PageHeader
                    title="Data Sources & Methodology"
                    subtitle="Our intelligence platform relies on transparent, verifiable datasets from recognized national and international authorities to compute gender risk scores."
                />

                <Card className="sources-container">
                    <div className="table-responsive">
                        <table className="sources-table">
                            <thead>
                                <tr>
                                    <th>Dataset Name</th>
                                    <th>Provider / Authority</th>
                                    <th>Data Type</th>
                                    <th>Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datasetsData.map(ds => (
                                    <tr key={ds.id}>
                                        <td>
                                            <div className="ds-name">{ds.name}</div>
                                            <div className="ds-desc">{ds.description}</div>
                                        </td>
                                        <td><span className="ds-provider">{ds.provider}</span></td>
                                        <td><Badge variant="default" size="sm">{ds.type}</Badge></td>
                                        <td className="ds-date">{new Date(ds.last_updated).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default DataSources;
