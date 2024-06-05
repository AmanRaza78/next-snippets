import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="block font-medium text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create and Save Your Code Snippets with Next Snippets
          </h1>
        </div>

        <div className="max-w-3xl text-center mx-auto">
          <p className="text-lg text-gray-400">
            Create, Save and Manage your code snippets with ease. 
          </p>
        </div>
        <div className="text-center">
          <LoginLink>
            <Button className="shadow-lg">Get Started</Button>
          </LoginLink>
        </div>
      </div>
    </div>
  );
}
