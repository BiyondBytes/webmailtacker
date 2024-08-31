import { NextRequest, NextResponse } from 'next/server';
import { dataBasePrisma } from '../../../../prisma/databasePrisma';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

        const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        try {
            const data = await dataBasePrisma.tackingDetails.findUnique({
                where: { id: id as string },
            });

            if (data?.id && !token) {
                if (data.ready) {
                    const updatedLog = [...data.logs, time];
                    await dataBasePrisma.tackingDetails.update({
                        where: { id: id as string },
                        data: { logs: updatedLog }
                    });
                } else {
                    await dataBasePrisma.tackingDetails.update({
                        where: { id: id as string },
                        data: { ready: true }
                    });
                }
            }
        } catch (error) {
            console.error('Error updating tracking details:', error);
        }

        // Valid 1x1 transparent GIF data
        const gifData = Buffer.from(
            'R0lGODlhAQABAIABAP7+/v///yH5BAEKAAEALAAAAAABAAEAAAICRAEAOw==',
            'base64'
        );
    
        return new NextResponse(gifData, {
            status: 200,
            headers: {
                'Content-Type': 'gifData',
                'Content-Length': '43',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

    } catch (error: any) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
