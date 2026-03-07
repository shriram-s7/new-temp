import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

const ResultPanel = ({ result, type }) => {
    if (!result) return null;

    const getStatusColor = (res) => {
        const val = (res.diagnosis || res.predicted_stage || res.class || res.prediction || '').toLowerCase();
        if (val.includes('healthy') || val.includes('low risk') || val.includes('normal')) return 'text-green-600';
        if (val.includes('high risk') || val.includes('pcos')) return 'text-red-600';
        return 'text-orange-600';
    };

    const getBgColor = (res) => {
        const val = (res.diagnosis || res.predicted_stage || res.class || res.prediction || '').toLowerCase();
        if (val.includes('healthy') || val.includes('low risk') || val.includes('normal')) return 'bg-green-50 border-green-200';
        if (val.includes('high risk') || val.includes('pcos')) return 'bg-red-50 border-red-200';
        return 'bg-orange-50 border-orange-200';
    };

    const formattedChartData = result.risk_timeline
        ? Object.entries(result.risk_timeline).map(([key, value]) => ({
            month: key,
            risk: value * 100
        }))
        : [];

    return (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mt-6">
            <div className={`p-6 border-b ${getBgColor(result)}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                        {(result.diagnosis || result.predicted_stage || result.class || result.prediction || '').toLowerCase().includes('healthy')
                            ? <CheckCircle className={getStatusColor(result)} size={24} />
                            : <AlertCircle className={getStatusColor(result)} size={24} />
                        }
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Analysis Complete</h2>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 items-end">
                    <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-100 flex-1">
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Primary Diagnosis</span>
                        <span className={`text-2xl font-bold ${getStatusColor(result)}`}>
                            {result.diagnosis || result.predicted_stage || result.class || result.prediction || 'Unknown'}
                        </span>
                    </div>
                    {(result.final_score !== undefined || result.confidence !== undefined || result.ovarian_volume !== undefined) && (
                        <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-100">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                {type === 'breast' ? 'Risk Score' : type === 'cervical' ? 'Confidence' : 'Ovarian Volume'}
                            </span>
                            <span className="text-2xl font-bold text-slate-800">
                                {result.final_score
                                    ? `${(result.final_score * 100).toFixed(1)}%`
                                    : result.confidence
                                        ? `${(result.confidence * 100).toFixed(1)}%`
                                        : `${result.ovarian_volume} ml`}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 space-y-6">
                {result.explanation && (
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">Clinical Explanation</h3>
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            {Array.isArray(result.explanation) ? (
                                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
                                    {result.explanation.map((item, idx) => <li key={idx}>{item}</li>)}
                                </ul>
                            ) : (
                                <p className="text-slate-700 text-sm">{result.explanation}</p>
                            )}
                        </div>
                    </div>
                )}

                {result.recommended_actions && (
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <ShieldAlert size={16} className="text-teal-600" />
                            Recommended Actions
                        </h3>
                        <div className="bg-teal-50/50 rounded-lg p-4 border border-teal-100">
                            <ul className="list-disc pl-5 space-y-1 text-teal-900 text-sm font-medium">
                                {result.recommended_actions.map((item, idx) => <li key={idx}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                )}

                {type === 'breast' && result.risk_timeline && (
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">Risk Timeline Forecast</h3>
                        <div className="h-64 mt-4 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={formattedChartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`${value}%`, 'Risk Probability']}
                                    />
                                    <Line type="monotone" dataKey="risk" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {result.heatmap_overlay && (
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">Heatmap Visualization</h3>
                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex justify-center p-2">
                            <img src={`data:image/jpeg;base64,${result.heatmap_overlay}`} alt="Heatmap" className="max-w-full h-auto rounded-lg shadow-sm" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultPanel;
