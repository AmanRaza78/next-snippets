import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Navbar(){
    return(
        <nav className="border-b bg-background h-[10vh] flex items-center">
            <div className="flex justify-between items-center container">
                <Link href="/">
                    <h1 className="font-bold text-3xl text-primary">Next Snippets</h1>
                </Link>

                <div className="flex items-center gap-x-5">
                    <ModeToggle/>
                </div>
            </div>
        </nav>
    )
}