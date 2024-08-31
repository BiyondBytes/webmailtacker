import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { dataBasePrisma } from '../../../../prisma/databasePrisma'; 
import UAParser, { IDevice, IBrowser, IOS } from 'ua-parser-js'; // Import types

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        if (!email) {
            throw new Error("Email is required");
        }

        // Extract the user-agent string from the request headers
        const userAgent: string = request.headers.get('user-agent') || '';
        
        // Use UAParser to parse the user-agent string
        const parser: UAParser = new UAParser(userAgent);
        const device = parser.getDevice().type;
        let ready = false; 
        if(device !== "mobile") ready = true;
        // Create tracking details with device information
        const val = await dataBasePrisma.tackingDetails.create({
            data: {
                email: email,
                ready:ready,
            }
        });

        const SECRET_KEY = process.env.SECRET_KEY || "jkldsjklfsdjkl";
        const token = jwt.sign({ id: val.id }, SECRET_KEY, {
            expiresIn: '2 days',
        });

        if (!val) {
            throw new Error("Something went wrong");
        }

        const expires = new Date();
        expires.setDate(expires.getDate() + 2);
        cookies().set({
            name: 'token',
            value: token,
            httpOnly: true,
            path: '/',
            expires: expires,
        });

        return NextResponse.json(
            { success: true, message: "Tracker created successfully", data: { token: val.token, id: val.id } },
            { status: 200 }
        );

    } catch (error: any) {
        // Handle error here
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
