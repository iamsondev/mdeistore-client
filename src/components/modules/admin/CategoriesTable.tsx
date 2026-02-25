"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/actions/admin.action";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CategoriesTable({ categories }: { categories: any[] }) {
  const [list, setList] = useState(categories);
  const router = useRouter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
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
        { method: "POST", body: formData },
      );
      const data = await res.json();
      if (data.success) {
        setNewImage(data.data.url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch {
      toast.error("Failed to upload image!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdd = async () => {
    if (!newName.trim()) return;
    if (!newImage) {
      toast.error("Please upload an image!");
      return;
    }
    const toastId = toast.loading("Adding...");
    const res = await createCategory(newName, newDesc, newImage);
    if (res?.error) {
      toast.error("Failed to add", { id: toastId });
      return;
    }
    toast.success("Category added!", { id: toastId });

    const newCategory = res.data?.data || res.data;
    if (newCategory) {
      setList((prev) => [...prev, newCategory]);
    }

    setNewName("");
    setNewDesc("");
    setNewImage("");
    setShowAdd(false);
  };

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || "");
  };

  const handleUpdate = async (id: string) => {
    const toastId = toast.loading("Updating...");
    const res = await updateCategory(id, editName, editDesc);
    if (res?.error) {
      toast.error("Failed to update", { id: toastId });
      return;
    }
    toast.success("Category updated!", { id: toastId });
    setList((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, name: editName, description: editDesc } : c,
      ),
    );
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    toast("Delete this category?", {
      action: {
        label: "Delete",
        onClick: async () => {
          const toastId = toast.loading("Deleting...");
          const res = await deleteCategory(id);
          if (res?.error) {
            toast.error("Failed to delete", { id: toastId });
            return;
          }
          toast.success("Category deleted!", { id: toastId });
          setList((prev) => prev.filter((c) => c.id !== id));
          router.refresh();
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowAdd(!showAdd)} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>

      {showAdd && (
        <div className="border rounded-xl p-4 flex flex-col gap-3 bg-muted/30">
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Category name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Description (optional)"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-3 items-center">
            {newImage ? (
              <div className="relative w-16 h-16 border rounded-lg overflow-hidden group">
                <Image
                  src={newImage}
                  alt="Category Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setNewImage("")}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="flex-1"
              />
            )}
            {isUploading && (
              <p className="text-sm text-blue-500 animate-pulse">
                Uploading...
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button size="sm" onClick={handleAdd} disabled={isUploading}>
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowAdd(false);
                setNewImage("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold">Image</th>
              <th className="text-left p-4 font-semibold">Name</th>
              <th className="text-left p-4 font-semibold">Description</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((cat) => (
              <tr
                key={cat.id}
                className="border-b last:border-b-0 hover:bg-muted/30"
              >
                <td className="p-4">
                  {cat.image && (
                    <div className="relative w-10 h-10 rounded-md overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </td>
                <td className="p-4">
                  {editingId === cat.id ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    cat.name
                  )}
                </td>
                <td className="p-4">
                  {editingId === cat.id ? (
                    <Input
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    cat.description || "-"
                  )}
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {editingId === cat.id ? (
                      <>
                        <Button
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdate(cat.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleEdit(cat)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleDelete(cat.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
