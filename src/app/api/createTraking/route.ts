import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { dataBasePrisma } from '../../../../prisma/databasePrisma'; 
export async function POST(request: NextRequest) {
    console.log("helloworld", process.env.DATABASE_URL)
    try {
        const {email} = await request.json()
        if(!email){
            throw new Error("Email is required")
        }
        const SECRET_KEY = process.env.SECRET_KEY || "jkldsjklfsdjkl";
        const token = jwt.sign({email:email}, SECRET_KEY, {
            expiresIn: '2 days',
          });
        const val = await dataBasePrisma.tackingDetails.create({
            data: {
                email: email,
                token: token ,
            }
        })

        if(!val){
            throw new Error("Something went wrong")
        }
        cookies().set({
            name: 'token',
            value:token,
            httpOnly: true,
            path: '/',
        })
        return NextResponse.json(
            { success: true, message: "tracker created successful", data:{token:val.token,id:val.id} },
            { status: 200 }
        );


    } catch (error: any) {
        // Handle error here
        console.log(error)
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    }
}
