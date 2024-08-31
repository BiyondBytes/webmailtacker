import { NextRequest, NextResponse } from 'next/server';
import { dataBasePrisma } from '../../../../prisma/databasePrisma';
import { cookies } from 'next/headers'
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const cookieStore = cookies()
        const token = cookieStore.get('token')?.value

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
                        data: {
                            logs: updatedLog
                        }
                    });
                } else {
                    await dataBasePrisma.tackingDetails.update({
                        where: { id: id as string },
                        data: {
                            ready: true
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error updating tracking details');
        }

        // Valid 1x1 transparent GIF data
        const pixelData = Buffer.from([
            0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0xf7, 0xff, 0xff, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);


        return new NextResponse(pixelData, {
            status: 200,
            headers: {
                'Content-Type': 'image/gif',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

        // const newHeaders = new Headers(request.headers)
        // // Add a new header
        // newHeaders.set('Content-Type', 'image/gif')
        // newHeaders.set('Cache-Control','no-cache, no-store, must-revalidate')
        // newHeaders.set('Pragma', 'no-cache')
        // newHeaders.set('Expires', '0')
        // // And produce a response with the new headers
        // return new NextResponse(pixelData, {
        //     status: 200,
        //     headers: newHeaders,
        // });

    } catch (error: any) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
