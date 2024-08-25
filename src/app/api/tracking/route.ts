// app/api/tracking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import UAParser, { IResult, IBrowser, IOS } from 'ua-parser-js'; // Import types from ua-parser-js

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

        // Log email open with emailId, timestamp, IP, country, browser, and OS
        console.log(`Email with ID ${id} was opened at ${new Date().toISOString()} from IP ${ipv4}, country ${country}, using ${browser.name} ${browser.version} on ${os.name} ${os.version}`);

        // Transparent 1x1 GIF
        const gifData = Buffer.from(
            'R0lGODlhAQABAIABAP7+/v///yH5BAEKAAEALAAAAAABAAEAAAICRAEAOw==',
            'base64'
        );

        // return NextResponse.json(
        //     { success: true, message: "tracker created successfully", data: { id: ipv4, country, browser: `${browser.name} ${browser.version}`, os: `${os.name} ${os.version}` } },
        //     { status: 200 }
        // );

        return new NextResponse(gifData, {
            headers: {
                'Content-Type': 'image/gif',
                'Content-Length': '43',
            },
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
