import { SignupForm } from "@/components/modules/authentication/register-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden z-0">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-secondary/10 blur-3xl -z-10" />
      
      <div className="w-full max-w-md z-10">
        <SignupForm />
      </div>
    </div>
  );
}
