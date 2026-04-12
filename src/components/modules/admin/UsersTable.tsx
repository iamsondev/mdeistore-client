"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { updateUserStatus, updateUserRole } from "@/actions/admin.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function UsersTable({ users }: { users: any[] }) {
  const router = useRouter();

  const handleStatusUpdate = async (id: string, status: string) => {
    const toastId = toast.loading("Updating...");
    const res = await updateUserStatus(id, status);
    if (res?.error) {
      toast.error("Failed to update", { id: toastId });
      return;
    }
    toast.success("Status updated!", { id: toastId });
    router.refresh();
  };

  const handleRoleUpdate = async (id: string, role: string) => {
    const toastId = toast.loading("Updating role...");
    const res = await updateUserRole(id, role);
    if (res?.error) {
      toast.error("Failed to update role", { id: toastId });
      return;
    }
    toast.success("Role updated!", { id: toastId });
    router.refresh();
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <select
                  className="text-sm border rounded px-2 py-1 bg-background"
                  defaultValue={user.role}
                  onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                  disabled={user.role === "ADMIN"}
                >
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="SELLER">SELLER</option>
                  <option value="MODERATOR">MODERATOR</option>
                  <option value="DELIVERY_AGENT">DELIVERY_AGENT</option>
                  <option value="ADMIN" disabled>ADMIN</option>
                </select>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <select
                  className="text-sm border rounded px-2 py-1 bg-background"
                  defaultValue={user.status}
                  onChange={(e) => handleStatusUpdate(user.id, e.target.value)}
                  disabled={user.role === "ADMIN"}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No users found.
        </div>
      )}
    </div>
  );
}
