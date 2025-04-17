import { Button } from "@/components/ui/button";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-10">
      <SignInButton>
        <Button>
          Sign In
        </Button>
      </SignInButton>
    </div>
  );
}
