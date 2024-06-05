import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, Trash, View } from "lucide-react";
import { redirect } from "next/navigation";

async function getSnippets(userId: string) {
  const data = await prisma.snippet.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Snippets() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getSnippets(user.id);

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
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon">
                <View className="h-4 w-4" />
              </Button>

              <Button variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
