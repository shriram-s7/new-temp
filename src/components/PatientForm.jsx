import React, { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';
import { CheckCircle2 } from 'lucide-react';

const PatientForm = () => {
    const { patient, setPatient } = useContext(PatientContext);

    const currentPatient = patient || { name: '', age: '', phone: '', patientId: '' };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...currentPatient, [name]: value });
    };

    const isLoaded = currentPatient.name && currentPatient.patientId && currentPatient.age && currentPatient.phone;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 gap-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-6 bg-teal-500 rounded-full"></div>
                    Patient Information
                </h3>
                {isLoaded && (
                    <div className="flex items-center gap-2 text-sm font-medium text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
                        <CheckCircle2 size={16} className="text-teal-600" />
                        Patient Loaded: {currentPatient.name} | ID: {currentPatient.patientId}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Patient ID *</label>
                    <input
                        type="text"
                        name="patientId"
                        value={currentPatient.patientId}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                        placeholder="e.g. P10452"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={currentPatient.name}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                        placeholder="e.g. Jane Doe"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Age *</label>
                    <input
                        type="number"
                        name="age"
                        value={currentPatient.age}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                        placeholder="e.g. 45"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Phone Number *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={currentPatient.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                        placeholder="e.g. 555-0102"
                    />
                </div>
            </div>
        </div>
    );
};

export default PatientForm;
