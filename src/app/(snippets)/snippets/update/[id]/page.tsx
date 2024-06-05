import UpdateSnippetForm from "@/components/update-snippet-form";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(snippetId: string, userId: string) {
  const data = await prisma.snippet.findUnique({
    where: {
      id: snippetId,
      userId: userId,
    },
    select: {
      title: true,
      code: true,
    },
  });
  return data
}

export default async function UpdateSnippet({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(params.id, user.id)

  return(
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4 mb-10">
        <UpdateSnippetForm title={data?.title} code={data?.code} snippetId={params.id}/>
    </div>
  )
}
