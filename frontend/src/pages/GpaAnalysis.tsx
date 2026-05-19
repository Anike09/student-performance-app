import React, { useState } from 'react';

const GpaAnalysis: React.FC = () => {
    const [scores, setScores] = useState<number[]>([72, 68, 80, 75]);
    const [units, setUnits] = useState<number[]>([3, 4, 3, 2]);
    const [result, setResult] = useState<{ gpa: number; totalPoints: number; totalUnits: number } | null>(null);

    const calculateGpa = () => {
        const totalUnits = units.reduce((sum, value) => sum + value, 0);
        const totalPoints = scores.reduce((sum, score, index) => sum + (score * units[index]), 0);
        const gpa = totalUnits === 0 ? 0 : parseFloat((totalPoints / totalUnits / 20).toFixed(2));
        setResult({ gpa, totalPoints, totalUnits });
    };

    return (
        <div className="page gpa-page">
            <h1>GPA Analysis</h1>
            <p>Enter your recent course scores and credit units to see a GPA estimate.</p>
            <div className="analysis-grid">
                <div className="form-group">
                    <label>Scores</label>
                    <input
                        type="text"
                        value={scores.join(', ')}
                        onChange={(event) => setScores(event.target.value.split(',').map((value) => Number(value.trim()) || 0))}
                        placeholder="72, 68, 80, 75"
                    />
                </div>
                <div className="form-group">
                    <label>Units</label>
                    <input
                        type="text"
                        value={units.join(', ')}
                        onChange={(event) => setUnits(event.target.value.split(',').map((value) => Number(value.trim()) || 0))}
                        placeholder="3, 4, 3, 2"
                    />
                </div>
            </div>
            <button className="button" onClick={calculateGpa}>
                Calculate GPA
            </button>
            {result && (
                <div className="page-section">
                    <h2>Results</h2>
                    <p>Estimated GPA: <strong>{result.gpa}</strong></p>
                    <p>Total Units: {result.totalUnits}</p>
                    <p>Total Points: {result.totalPoints}</p>
                </div>
            )}
        </div>
    );
};

export default GpaAnalysis;
