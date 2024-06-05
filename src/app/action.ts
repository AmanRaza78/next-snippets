"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function updateUserProfile(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstname: firstname,
      lastname: lastname,
    },
  });

  return { message: "Succesfully updated the user profile" };
}


export async function createCodeSnippet(formData:FormData){
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if(!user){
    return redirect("/api/auth/login")
  }

  const code = formData.get("code") as string;
  const title = formData.get("title") as string

  await prisma.snippet.create({
    data:{
      title: title ?? "",
      code: code ?? "",
      userId: user.id
    }
  })

  return redirect("/snippets")

}

export async function updateCodeSnippet(formData:FormData){
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if(!user){
    return redirect("/api/auth/login")
  }
  
  const code = formData.get("code") as string;
  const title = formData.get("title") as string;
  const snippetId = formData.get("snippetId") as string


  await prisma.snippet.update({
    where:{
      id: snippetId,
      userId: user.id
    },
    data:{
      title:title,
      code: code
    }
  })
  return redirect("/snippets")

}
