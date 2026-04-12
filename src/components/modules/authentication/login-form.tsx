"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import { Mail, KeyRound, ShieldAlert, Store, User, Truck, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(8, "at least 8 character needed"),
  email: z.string().email(),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in user successfully");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("user logged in successfully", { id: toastId });
        const session = await authClient.getSession();
        const role = (session?.data?.user as any)?.role;

        if (role === "ADMIN") {
          router.push("/admin-dashboard");
        } else if (role === "SELLER") {
          router.push("/seller-dashboard");
        } else if (role === "MODERATOR") {
          router.push("/moderator-dashboard");
        } else if (role === "DELIVERY_AGENT") {
          router.push("/delivery-dashboard");
        } else {
          router.push("/");
        }
      } catch (err) {
        toast.error("Something Went Wrong, please try again", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      // Relative path — resolves against client baseURL (same domain).
      // State cookie stays on client domain → no cross-domain state_mismatch.
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message ?? "Google sign-in failed. Please try again.");
    }
  };

  const fillDemo = (role: 'ADMIN' | 'SELLER' | 'CUSTOMER' | 'MODERATOR' | 'DELIVERY_AGENT') => {
    let email = "";
    let password = "password1234";

    if (role === "ADMIN") {
      email = "boss3@gmail.com";
      password = "boss123456";
    } else if (role === "MODERATOR") {
      email = "moderator@gmail.com";
    } else if (role === "SELLER") {
      email = "seller@gmail.com";
    } else if (role === "DELIVERY_AGENT") {
      email = "agent@gmail.com";
    } else if (role === "CUSTOMER") {
      email = "customer@gmail.com";
    }

    form.setFieldValue("email", email);
    form.setFieldValue("password", password);
    toast.success(`Filled ${role} demo credentials`);
  };

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-xl shadow-primary/5" {...props}>
      <CardHeader className="space-y-2 text-center pb-6">
        <div className="flex justify-center mb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
        <CardDescription className="text-base">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Demo Credentials Section */}
        <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center justify-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            Quick Demo Access
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => fillDemo('ADMIN')} className="text-xs border-primary/20 hover:bg-primary/5 hover:text-primary px-2">
              <ShieldAlert className="h-3 w-3 mr-1" /> Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => fillDemo('MODERATOR')} className="text-xs border-primary/20 hover:bg-primary/5 hover:text-primary px-2">
              <ShieldCheck className="h-3 w-3 mr-1" /> Mod
            </Button>
            <Button variant="outline" size="sm" onClick={() => fillDemo('SELLER')} className="text-xs border-primary/20 hover:bg-primary/5 hover:text-primary px-2">
              <Store className="h-3 w-3 mr-1" /> Seller
            </Button>
            <Button variant="outline" size="sm" onClick={() => fillDemo('DELIVERY_AGENT')} className="text-xs border-primary/20 hover:bg-primary/5 hover:text-primary px-2">
              <Truck className="h-3 w-3 mr-1" /> Agent
            </Button>
            <Button variant="outline" size="sm" onClick={() => fillDemo('CUSTOMER')} className="text-xs border-primary/20 hover:bg-primary/5 hover:text-primary px-2">
              <User className="h-3 w-3 mr-1" /> User
            </Button>
          </div>
        </div>

        <form
          id="login-form"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-2">
                    <FieldLabel htmlFor={field.name} className="font-semibold">Email Address</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        id={field.name}
                        placeholder="john.doe@example.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="pl-10 h-12 rounded-xl bg-muted/20"
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} className="text-sm text-destructive" />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="space-y-2">
                    <div className="flex justify-between items-center">
                      <FieldLabel htmlFor={field.name} className="font-semibold">Password</FieldLabel>
                      <Link href="#" className="text-sm text-primary font-medium hover:underline">Forgot password?</Link>
                    </div>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        id={field.name}
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="pl-10 h-12 rounded-xl bg-muted/20"
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} className="text-sm text-destructive" />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button onClick={handleGoogleLogin} variant="outline" type="button" className="h-11 rounded-xl bg-card hover:bg-muted/50 border-input w-full">
            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
            </svg>
            Continue with Google
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 mt-2">
        <Button form="login-form" type="submit" className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
          Sign In
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Register here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
