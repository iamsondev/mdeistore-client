"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, User, Mail, Image as ImageIcon, CheckCircle2, Star, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const containerRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".anim-item", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      
      gsap.from(".profile-card", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await authClient.updateUser({
        name: formData.name,
        image: formData.image,
      });
      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div ref={containerRef} className="container mx-auto py-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center anim-item">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Edit Your <span className="text-primary">Profile</span></h1>
          <p className="text-muted-foreground italic">Keep your medical records and account info up to date.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Card */}
          <div className="profile-card lg:col-span-1">
            <div className="bg-card border rounded-3xl p-8 sticky top-28 shadow-xl shadow-primary/5">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20 bg-muted flex items-center justify-center ring-8 ring-primary/5">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full shadow-lg">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{formData.name || "Your Name"}</h3>
                <p className="text-sm text-muted-foreground mb-6">{session.user.email}</p>
                
                <div className="w-full pt-6 border-t space-y-4">
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Account Status</span>
                      <span className="text-green-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Active
                      </span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Role</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-bold uppercase tracking-wider">
                         {(session.user as any).role || "User"}
                      </span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-2 space-y-6">
             <form ref={formRef} onSubmit={handleSubmit} className="bg-card border rounded-3xl p-8 md:p-10 shadow-sm transition-all hover:shadow-md anim-item">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-bold flex items-center gap-2">
                       <User className="h-4 w-4 text-primary" /> Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="h-12 rounded-xl border-2 focus-visible:ring-primary/20 bg-muted/30"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold flex items-center gap-2">
                       <Mail className="h-4 w-4 text-primary" /> Email Address
                    </Label>
                    <Input
                      id="email"
                      value={session.user.email}
                      disabled
                      className="h-12 rounded-xl border-2 bg-muted opacity-60 cursor-not-allowed"
                    />
                    <p className="text-[10px] text-muted-foreground px-1 italic">Email cannot be changed for security reasons.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-sm font-bold flex items-center gap-2">
                       <ImageIcon className="h-4 w-4 text-primary" /> Profile Image URL
                    </Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/photo.jpg"
                      className="h-12 rounded-xl border-2 focus-visible:ring-primary/20 bg-muted/30"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="pt-6">
                    <Button 
                      disabled={isUpdating} 
                      className="w-full h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Saving Changes...
                        </>
                      ) : (
                        "Save Profile Changes"
                      )}
                    </Button>
                  </div>
                </div>
             </form>

             <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 anim-item">
                <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                   <HelpCircle className="h-4 w-4" /> Need Help?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                   If you are having trouble updating your information or want to delete your account, 
                   please contact our support team at <span className="text-primary font-bold">support@medistore.com</span>
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
