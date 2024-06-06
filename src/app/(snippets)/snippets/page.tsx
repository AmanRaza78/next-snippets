import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, Trash, View } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getSnippets(userId: string, searchParams: string) {
  const [count, data] = await prisma.$transaction([
    prisma.snippet.count({
      where: {
        userId: userId,
      },
    }),
    prisma.snippet.findMany({
      take: 10,
      skip: searchParams ? (Number(searchParams) - 1) * 10 : 0,
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { count, data };
}

async function deleteSnippet(formData: FormData) {
  "use server";
  const snippetId = formData.get("snippetId") as string;

  await prisma.snippet.delete({
    where: {
      id: snippetId,
    },
  });
  revalidatePath("/snippets");
}

export default async function Snippets({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const { count, data } = await getSnippets(user.id, searchParams.page);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <div className="flex flex-col gap-y-4">
        {data.map((item) => (
          <Card
            className="flex justify-between items-center p-4 gap-x-4"
            key={item.id}
          >
            <div>
              <h2 className="font-semibold text-primary text-xl">
                {item.title}
              </h2>
              <p className="text-muted-foreground">
                {" "}
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                }).format(new Date(item.createdAt))}
              </p>
            </div>

            <div className="flex gap-x-4">
              <Link href={`/snippets/update/${item.id}`}>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>

              <Link href={`/snippets/${item.id}`}>
                <Button variant="outline" size="icon">
                  <View className="h-4 w-4" />
                </Button>
              </Link>

              <form action={deleteSnippet}>
                <input type="hidden" name="snippetId" value={item.id} />
                <Button variant="destructive" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        ))}
        <Pagination totalPages={Math.ceil(count / 10)} />
      </div>
    </div>
  );
}
