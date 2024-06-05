"use client";
import { updateUserProfile } from "@/app/action";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import SubmitButton from "./submit-button";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";

const initialState = {
  message: "",
};

export default function ProfileUpdateForm({
  firstname,
  lastname,
}: {
  firstname: string | undefined | null;
  lastname: string | undefined | null;
}) {
  const [state, formAction] = useFormState(updateUserProfile, initialState);

  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: "Succesfull!!",
        description: state.message,
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <h1 className="text-3xl text-primary font-bold tracking-tight">
        Profile
      </h1>
      <p className="text-muted-foreground">
        You can update your first name and last name
      </p>

      <Separator className="my-4" />

      <Label className="text-lg" htmlFor="firstname">
        First Name:
      </Label>
      <Input
        name="firstname"
        id="firstname"
        defaultValue={firstname ?? ""}
        required
      />
      <p className="text-muted-foreground text-sm mt-2">
        This is your public display name. It can be your real name or a
        pseudonym.
      </p>

      <Separator className="my-4" />

      <Label className="text-lg" htmlFor="lastname">
        Last Name:
      </Label>
      <Input
        name="lastname"
        id="lastname"
        defaultValue={lastname ?? ""}
        required
      />
      <p className="text-muted-foreground text-sm mt-2">
        This is your last name. It can be your real name or a pseudonym.
      </p>

      <div className="w-full mt-4">
        <SubmitButton text="Update"/>
      </div>
    </form>
  );
}
