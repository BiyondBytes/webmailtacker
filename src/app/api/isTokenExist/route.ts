import { NextRequest, NextResponse } from 'next/server';
import { dataBasePrisma } from '../../../../prisma/databasePrisma';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value || "";

        // Decode JWT token
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "jkldsjklfsdjkl");

        if (!decoded || typeof decoded === 'string') {
            throw new Error("Invalid token or token is expired. Please create a new tracker.");
        }

        // Cast decoded to JwtPayload to access the `id` property
        const data = await dataBasePrisma.tackingDetails.findFirst({
            where: { id: (decoded as JwtPayload).id as string },
        });

        if (!data) {
            throw new Error("Something went wrong");
        }

        const id = data.id;
        return NextResponse.json({ success: true, data: { isExist: true, id: id } }, { status: 200 });
    } catch (error: any) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
