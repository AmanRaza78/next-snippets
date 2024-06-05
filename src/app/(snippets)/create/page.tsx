import CreateSnippetForm from "@/components/create-snippet-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateSnippet() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <CreateSnippetForm />
    </div>
  );
}
