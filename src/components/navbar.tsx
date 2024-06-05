import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="flex justify-between items-center container">
        <Link href="/">
          <h1 className="font-bold text-3xl text-primary">Next Snippets</h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ModeToggle />

          {(await isAuthenticated()) ? (
            <div className="flex items-center gap-x-5">
              <Link href="/profile">
                <Button>Profile</Button>
              </Link>

              <Link href="/create">
                <Button>Create</Button>
              </Link>

              <Link href="/snippets">
                <Button>Snippets</Button>
              </Link>

              <LogoutLink>
                <Button>Logout</Button>
              </LogoutLink>
            </div>
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>Login</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
