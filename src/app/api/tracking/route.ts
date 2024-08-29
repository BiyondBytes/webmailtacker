import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import UAParser, { IResult, IBrowser, IOS } from 'ua-parser-js';
import { dataBasePrisma } from '../../../../prisma/databasePrisma';

// Function to extract the IPv4 address from the IPv6-mapped format
function extractIPv4(ip: string): string {
    if (ip.startsWith('::ffff:')) {
        return ip.split(':').pop() || '0.0.0.0';
    }
    return ip;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const EmailId = searchParams.get('email_id') || "";
        const userId = searchParams.get('user_id') || "";

        // Attempt to retrieve the client's real IP address
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = forwardedFor ? forwardedFor.split(',')[0].trim() : request.headers.get('x-real-ip');
        const ip = realIp || '0.0.0.0';
        const ipv4 = extractIPv4(ip);
        
        // Fetch country information using ipinfo.io
        let country = 'Unknown';
        try {
            const response = await axios.get(`https://ipinfo.io/${ipv4}/json?token=2586ea5d7aac0a`);
            country = response.data.country || 'Unknown';
        } catch (error) {
            console.error('Error fetching IP info:', error);
        }

        // Get user-agent details for browser and OS information using UAParser
        const userAgentString = request.headers.get('user-agent') || '';
        const parser: IResult = new UAParser(userAgentString).getResult();
        const browser: IBrowser = parser.browser;
        const os: IOS = parser.os;
        const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const browserDetails = `${browser.name} ${browser.version}`;
        console.log(`Email with ID ${id} was opened at ${time} from IP ${ipv4}, country ${country}, using ${browserDetails}  on ${os.name} ${os.version} and emailId ${
            EmailId}`);


        try {
            const data = await dataBasePrisma.tackingDetails.findUnique({
                where: { id: id as string },
            });

            if (data) {
                await dataBasePrisma.log.create({
                    data: { trackingDetailsId: id as string, browser: browserDetails as string, os: os.name as string, country: country, time: time,ipv4: ipv4,userId: userId,mailId:EmailId },
                });
            }
        } catch (error) {
            console.error('Error updating tracking details:', error);
        }

        const pixelData = Buffer.from([
            0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0xf7, 0xff,
            0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);
    
        return new NextResponse(pixelData, {
            status: 200,
            headers: {
                'Content-Type': 'image/gif',
                'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevent caching
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
