import React, { createContext, useState, useEffect } from 'react';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
    const [patient, setPatient] = useState(() => {
        const saved = localStorage.getItem('auramed_current_patient');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (patient) {
            localStorage.setItem('auramed_current_patient', JSON.stringify(patient));
        } else {
            localStorage.removeItem('auramed_current_patient');
        }
    }, [patient]);

    return (
        <PatientContext.Provider value={{ patient, setPatient }}>
            {children}
        </PatientContext.Provider>
    );
};
