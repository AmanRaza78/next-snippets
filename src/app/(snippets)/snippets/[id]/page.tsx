import CopyButton from "@/components/copy-button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getSnippet(snippetId: string, userId: string) {
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

  return data;
}

export default async function ({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getSnippet(params.id, user.id);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4 mb-10">
    <div className="flex justify-between items-center">
      <h1 className="text-primary text-2xl font-semibold tracking-tight">
        {data?.title}
      </h1>
      <CopyButton code={data?.code ?? ""}/>
    </div>

      <Separator className="my-4" />

      <Card className="p-4 w-fit h-fit bg-muted">
        <pre>
          <code>{data?.code}</code>
        </pre>
      </Card>
    </div>
  );
}
