import { AuthLayout } from "@/components/AuthLayout";
import { NavBar } from "@/components/NavBar";
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AuthLayout>
            <SignUpForm />
          </AuthLayout>
        </div>
      </div>
    </div>
  );
}
