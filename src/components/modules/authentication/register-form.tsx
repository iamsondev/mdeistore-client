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
import { Mail, KeyRound, User, UserPlus, Fingerprint, Camera, Loader2, X } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8, "at least 8 character needed"),
  email: z.string().email(),
  role: z.string().min(1, "Please select a role"),
  image: z.string().optional(),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER" as "CUSTOMER" | "SELLER" | "ADMIN" | "MODERATOR" | "DELIVERY_AGENT",
      image: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = formSchema.safeParse(value);
        if (!result.success) {
          return result.error.flatten().fieldErrors;
        }
      },
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("creating user");
      try {
        const { data, error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          role: value.role,
          image: value.image,
        } as any);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("User created successfully! Please verify your email.", {
          id: toastId,
        });
        router.push("/login");
      } catch (err) {
        toast.error("Something Went Wrong, please try again", { id: toastId });
      }
    },
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=1c96f8bc1bac0aa693019fe816afdafc`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        form.setFieldValue("image", data.data.url);
        toast.success("Profile photo uploaded!");
      } else {
        toast.error("Photo upload failed!");
      }
    } catch (err) {
      toast.error("Error uploading photo!");
    } finally {
      setIsUploading(false);
    }
  };

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

  const fillRandomDemo = () => {
    const rdn = Math.floor(Math.random() * 1000);
    form.setFieldValue("name", `Test User ${rdn}`);
    form.setFieldValue("email", `test${rdn}@example.com`);
    form.setFieldValue("password", "12345678");
    form.setFieldValue("role", "CUSTOMER");
    toast.success("Filled with random test data");
  };

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-xl shadow-primary/5" {...props}>
      <CardHeader className="space-y-2 text-center pb-6">
        <div className="flex justify-center mb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
        <CardDescription className="text-base">
          Join Medistore today for personalized healthcare
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={fillRandomDemo} className="text-xs text-muted-foreground hover:text-primary">
            <Fingerprint className="h-3 w-3 mr-1" /> Autofill Demo Data
          </Button>
        </div>

        <form
          id="register-form"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            <form.Field name="name">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="space-y-2">
                    <FieldLabel htmlFor={field.name} className="font-semibold">Full Name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        id={field.name}
                        placeholder="John Doe"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="pl-10 h-12 rounded-xl bg-muted/20"
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} className="text-sm text-destructive" />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="image">
              {(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="font-semibold text-sm">Profile Photo (Optional)</FieldLabel>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="relative h-16 w-16 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                      {field.state.value ? (
                        <>
                          <img src={field.state.value} alt="Profile" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => field.handleChange("")}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <X className="h-5 w-5 text-white" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          {isUploading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          ) : (
                            <Camera className="h-6 w-6" />
                          )}
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        title=""
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-foreground">
                        {isUploading ? "Uploading..." : field.state.value ? "Photo Uploaded" : "Choose Profile Picture"}
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight">
                        JPG, PNG or WEBP. Max 5MB.
                      </p>
                    </div>
                  </div>
                </Field>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => {
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
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="space-y-2">
                    <FieldLabel htmlFor={field.name} className="font-semibold">Password</FieldLabel>
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
            </form.Field>

            <form.Field name="role">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-2 pt-2">
                    <FieldLabel className="font-semibold">I want to register as a:</FieldLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {["CUSTOMER", "SELLER", "DELIVERY_AGENT"].map((r) => (
                        <label key={r} className={`flex flex-col items-center justify-center gap-1 p-2 border rounded-xl cursor-pointer transition-all ${field.state.value === r ? "border-primary bg-primary/10 font-bold" : "hover:bg-muted font-medium"}`}>
                          <input
                            type="radio"
                            value={r}
                            checked={field.state.value === r}
                            onChange={() => field.handleChange(r)}
                            className="sr-only"
                          />
                          <span className="text-xs text-center leading-tight">
                            {r === "DELIVERY_AGENT" ? "DELIVERY" : r}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {["MODERATOR", "ADMIN"].map((r) => (
                        <label key={r} className={`flex flex-col items-center justify-center gap-1 p-2 border rounded-xl cursor-pointer transition-all ${field.state.value === r ? "border-primary bg-primary/10 font-bold" : "hover:bg-muted font-medium"}`}>
                          <input
                            type="radio"
                            value={r}
                            checked={field.state.value === r}
                            onChange={() => field.handleChange(r)}
                            className="sr-only"
                          />
                          <span className="text-xs text-center leading-tight">{r}</span>
                        </label>
                      ))}
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} className="text-sm text-destructive" />}
                  </Field>
                );
              }}
            </form.Field>
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
        <Button form="register-form" type="submit" className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
          Register Account
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
