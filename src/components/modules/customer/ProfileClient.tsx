"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function ProfileClient({ user }: { user: any }) {
  const [name, setName] = useState(user?.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating...");
    try {
      await authClient.updateUser({ name });
      toast.success("Profile updated!", { id: toastId });
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      toast.error("Failed to update", { id: toastId });
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-muted-foreground">Name</span>
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-8 w-40"
              />
              <Button size="sm" onClick={handleUpdate}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span className="font-medium">{user?.name}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-between border-b pb-3">
          <span className="text-muted-foreground">Email</span>
          <span className="font-medium">{user?.email}</span>
        </div>
        <div className="flex justify-between border-b pb-3">
          <span className="text-muted-foreground">Role</span>
          <span className="font-medium capitalize">
            {user?.role?.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
