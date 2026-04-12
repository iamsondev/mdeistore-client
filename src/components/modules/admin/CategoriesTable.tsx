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

import { AddCategoryForm } from "./AddCategoryForm";
import { AnimatePresence, motion } from "framer-motion";

export function CategoriesTable({ categories }: { categories: any[] }) {
  const [list, setList] = useState(categories);
  const router = useRouter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const handleAddSuccess = (newCategory: any) => {
    if (newCategory) {
      setList((prev) => [...prev, newCategory]);
      setShowAdd(false);
    }
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
    toast("Remove this taxonomy?", {
      description: "This will affect product classification.",
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
      cancel: { label: "Keep", onClick: () => {} },
    });
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
             <div className="h-6 w-1.5 bg-primary rounded-full" />
             Collection Schema
          </h2>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-4">
             Admin Oversight Panel
          </p>
        </div>
        {!showAdd && (
          <Button 
            onClick={() => setShowAdd(true)} 
            className="rounded-2xl h-11 px-6 font-bold shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showAdd && (
          <AddCategoryForm 
            onSuccess={handleAddSuccess} 
            onCancel={() => setShowAdd(false)} 
          />
        )}
      </AnimatePresence>

      <div className="border border-muted-foreground/10 rounded-[2rem] overflow-hidden bg-card/30 backdrop-blur-sm shadow-xl shadow-black/5">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-muted-foreground/10">
            <tr>
              <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Representation</th>
              <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Designation</th>
              <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Scope</th>
              <th className="text-right p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted-foreground/5">
            {list.map((cat) => (
              <motion.tr
                layout
                key={cat.id}
                className="group hover:bg-primary/[0.02] transition-colors"
              >
                <td className="p-6">
                  {cat.image && (
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </td>
                <td className="p-6">
                  {editingId === cat.id ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-10 bg-muted/50 border-none rounded-xl"
                    />
                  ) : (
                    <span className="font-bold text-base">{cat.name}</span>
                  )}
                </td>
                <td className="p-6 max-w-[300px]">
                  {editingId === cat.id ? (
                    <Input
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="h-10 bg-muted/50 border-none rounded-xl"
                    />
                  ) : (
                    <p className="text-muted-foreground line-clamp-1 italic text-xs">
                      {cat.description || "No description provided."}
                    </p>
                  )}
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-3">
                    {editingId === cat.id ? (
                      <>
                        <Button
                          size="sm"
                          className="h-10 w-10 rounded-xl"
                          onClick={() => handleUpdate(cat.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-10 w-10 rounded-xl"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => handleEdit(cat)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => handleDelete(cat.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="text-center py-32 space-y-4">
             <div className="inline-flex p-4 rounded-3xl bg-muted/50 text-muted-foreground italic">
                Empty Schema
             </div>
             <p className="text-sm font-medium text-muted-foreground/60">No taxonomies found in the current environment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

