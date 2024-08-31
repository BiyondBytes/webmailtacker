"use client"
import React, { useEffect, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import axios from 'axios';


interface TrackingInfoProps {
    refresh: boolean;
}
const TrackingInfo: React.FC<TrackingInfoProps> = ({ refresh }) => {
    const [logs, setLogs] = useState<Array<string>>([])
    const [ready, setReady] = useState<boolean>(false)
    useEffect(() => {
        // Fetch logs from the API
        const fetchLogs = async () => {
            try {
                const response = await axios.get('/api/getLogs');
                if (response.data.success) {
                    setLogs(response.data.data.logs || []); // Access logs correctly
                    setReady(response.data.data.ready || false);
                }

            } catch (error) {
                console.log(error);
            }

        };
        fetchLogs();

    }, [refresh]);
    const isLogEmpty = logs.length === 0;

    return (
        <ScrollArea className={`h-72 w-full rounded-md border ${isLogEmpty && "relative"}`}>
           {isLogEmpty?<p className={`${isLogEmpty && "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center m-auto text-center"}`}>Waiting for {ready?"email opening.....":"adding tracker on mail !Please refresh after adding 😎"}</p>: <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Opening time logs.........</h4>
                {logs.map((tag, index) => (
                    <React.Fragment key={index}>
                        <div className="text-sm">
                            opened at {tag}
                        </div>
                        <Separator className="my-2" />
                    </React.Fragment>
                ))}
            </div>}
        </ScrollArea>
    )
}

export default TrackingInfo
