
import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';


export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const cookieStore = cookies();
        cookieStore.delete('token')
        
        return NextResponse.json({ success: true, message:"Logged out successfully" }, { status: 200 });
    } catch (error: any) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
