"use client"
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import SubmitButton from "./submit-button";
import { Textarea } from "./ui/textarea";
import { createCodeSnippet } from "@/app/action";

export default function CreateSnippetForm() {
  return (
    <form action={createCodeSnippet}>
      <h1 className="text-3xl text-primary font-bold tracking-tight">
        Create Code Snippet
      </h1>
      <p className="text-muted-foreground">You need to give title and code.</p>

      <Separator className="my-4" />

      <Label className="text-lg" htmlFor="title">
        Title
      </Label>
      <Input
        type="text"
        name="title"
        id="title"
        required
        placeholder="Title..."
      />
      <p className="text-muted-foreground text-sm mt-2">
        Title for your code snippet
      </p>

      <Separator className="my-4" />

      <Label className="text-lg" htmlFor="code">
        Code
      </Label>
      <Textarea
        placeholder="Paste your code here..."
        name="code"
        id="code"
        required
        className="h-[40vh]"
      />
      <p className="text-muted-foreground text-sm mt-2">
        Paste your code.
      </p>

      <div className="w-full mt-4">
        <SubmitButton text="Create"/>
      </div>
    </form>
  );
}
