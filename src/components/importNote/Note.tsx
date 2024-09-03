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
import { ScrollText } from 'lucide-react';
import Link from 'next/link';

const Notes = () => {

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button className='gap-x-2'>important notes <ScrollText size={"16"} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>important notes</DialogTitle>
                    <DialogDescription>
                        <ul className='list-disc flex flex-col gap-y-1 my-2'>
                            <li>ready first how to use tracker code <Link href={"#tutorial"}>click here</Link> </li>
                            <li>if you create new tracking old one automatically delete </li>
                            <li>after sending mail with tracker don't open your send inbox mail because it will also count that opening because we don't do any mail automatically with you to save your privacy. </li>
                        </ul>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Notes
