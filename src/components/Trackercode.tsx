"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { useTrackingCode } from '@/tools/ContextProvider';

interface TrackercodeProps {
    trackercode: string;
    dialogState: boolean;
}
const Trackercode: React.FC<TrackercodeProps> = ({ trackercode = "", dialogState = false }) => {
    const { dailogData, setDailogData } = useTrackingCode()

    return (
        <Dialog open={dailogData} onOpenChange={setDailogData} >
            <DialogTrigger asChild>
                <Button className='gap-x-2'>copy code <Copy size={"16"} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tracking Code</DialogTitle>
                    <DialogDescription>
                        Copy this code and paste it into your Email
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="flex justify-center items-center border-2 border-dotted px-6 py-6 mx-auto">
                        <span>..........</span>
                        <Image
                            src={`/api/tracking?id=${trackercode}`}
                            alt="......"
                            width={10}
                            height={10}
                        />
                        <span>..........</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Trackercode
