import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET(){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || user===null || !user.id){
        throw new Error("Something went wrong");
    }

    const dbuser = await prisma.user.findUnique({
        where:{
            id: user.id
        }
    })

    if(!dbuser){
        await prisma.user.create({
            data:{
                id:user.id,
                firstname: user.given_name ?? "",
                lastname: user.family_name ?? "",
                email: user.email ?? ""
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000")
}