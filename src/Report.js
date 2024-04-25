import React from 'react';
import './Report.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';


const Report = () => {

    return (
        <div className="report-container">
            <h1>Report Page</h1><br /><br />
            <div className="report-section">
                <h2>Audio Analysis</h2>
                <p>How Happy are you with Potter, Ginny?</p>
            </div>
            <div className="report-section">
                <h2>Text Analysis</h2>
                {/* Insert the rotated bar charts here */}
                <div className="graph-container">
                    <div className="bar-graph rotated">
                        <BarChart
                            xAxis={[
                                {
                                    id: 'barCategories',
                                    data: ['Openness', 'Conscientiousness', 'Extroversion', 'Agreeableness', 'Neuroticism'],
                                    scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                    data: [2, 5, 3, 7, 1],
                                },
                                {
                                    data: [5, 2, 2, 7, 6],
                                }
                            ]}
                            width={1300}
                            height={700}
                            sx={{
                               "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                    fontFamily: "'Montserrat', sans-serif",
                                },
                              }}
                        />
                    </div>
                </div>
                <div className="legend">
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#28acac' }}></div>
                        <div className="legend-label">Your Personality</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#4094f4' }}></div>
                        <div className="legend-label">General Average</div>
                    </div>
                </div>
            </div>
            <div className="report-section">
                <h2>Video Analysis: Gaze</h2><br></br><br></br><br></br>
                <div className="graph-container">
                    <div className="pie-chart">
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'series A' },
                                        { id: 1, value: 15, label: 'series B' },
                                        { id: 2, value: 20, label: 'series C' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={400}
                        />
                    </div>
                    <div className="pie-chart">
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'series A' },
                                        { id: 1, value: 15, label: 'series B' },
                                        { id: 2, value: 20, label: 'series C' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={400}
                        />
                    </div>
                </div>
            </div>
            <div className="report-section">
                <h2>Video Analysis: Emotion</h2>
                <div className="graph-container">
                    <div className="bar-graph">
                        <BarChart
                            xAxis={[
                                {
                                    id: 'barCategories',
                                    data: ['bar A', 'bar B', 'bar C', 'bar D', 'bar E', 'bar F', 'bar G'],
                                    scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                    data: [2, 5, 3, 2, 3 ,1, 9],
                                },
                                {
                                    data: [5, 4, 1, 7, 5, 3, 3],
                                }
                            ]}
                            width={1300}
                            height={700}
                            sx={{
                               "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                    fontFamily: "'Montserrat', sans-serif",
                                },
                              }}
                        />
                    </div>
                </div>
                <div className="legend">
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#28acac' }}></div>
                        <div className="legend-label">Your Emotions</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#4094f4' }}></div>
                        <div className="legend-label">General Average</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;
