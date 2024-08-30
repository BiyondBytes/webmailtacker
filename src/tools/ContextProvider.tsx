"use client"
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import React from 'react';

// Define the shape of the context
interface TrackingCodeContextType {
    dailogData: boolean;
    setDailogData: Dispatch<SetStateAction<boolean>>;
}

// Create a context with a default value that matches the interface
const TrackingCodeContext = createContext<TrackingCodeContextType>({
    dailogData: false,
    setDailogData: () => {}, // A no-op function as a placeholder
});

const ContextProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [dailogData, setDailogData] = useState(false);

    return (
        <TrackingCodeContext.Provider value={{ dailogData, setDailogData }}>
            {children}
        </TrackingCodeContext.Provider>
    );
}

export default ContextProvider;

export const useTrackingCode = () => useContext(TrackingCodeContext);
