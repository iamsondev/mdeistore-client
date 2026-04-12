"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  UploadCloud, 
  Check, 
  X, 
  FolderPlus, 
  Info, 
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import { createCategory } from "@/actions/admin.action";
import { toast } from "sonner";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function AddCategoryForm({ onSuccess, onCancel }: { onSuccess: (newCat: any) => void, onCancel: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setImage(data.data.url);
        toast.success("Icon uploaded successfully!");
      }
    } catch {
      toast.error("Cloud upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    if (!image) {
      toast.error("Please provide a category icon/image");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating category...");
    
    try {
      const res = await createCategory(name, description, image);
      if (res?.error) {
        toast.error(res.error.message || "Failed to create", { id: toastId });
        return;
      }
      
      toast.success("Category created successfully!", { id: toastId });
      onSuccess(res.data?.data || res.data);
      
      // Reset
      setName("");
      setDescription("");
      setImage("");
    } catch {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border-none shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
        <CardHeader className="bg-muted/30 border-b pb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <FolderPlus className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold">New Taxonomy</CardTitle>
          </div>
          <CardDescription>Classify your products with a new category</CardDescription>
        </CardHeader>

        <CardContent className="pt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Hand: Inputs */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1 flex items-center gap-2">
                  <Info className="h-3.5 w-3.5 text-primary" /> Category Name
                </label>
                <Input
                  placeholder="e.g. Antibiotics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 bg-muted/50 border-none rounded-xl focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Context/Description</label>
                <Textarea
                  placeholder="Briefly describe what goes in here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] bg-muted/50 border-none rounded-2xl resize-none"
                />
              </div>
            </div>

            {/* Right Hand: Image Upload */}
            <div className="space-y-4">
               <label className="text-sm font-bold ml-1 flex items-center gap-2">
                  <ImageIcon className="h-3.5 w-3.5 text-primary" /> Visual Icon
               </label>
               
               <AnimatePresence mode="wait">
                  {image ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative aspect-square rounded-3xl overflow-hidden border-2 border-primary/20 bg-muted group shadow-lg"
                    >
                      <Image src={image} alt="Icon preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={() => setImage("")}
                           className="bg-white/20 backdrop-blur-md rounded-full p-2 hover:bg-white/40 border border-white/20"
                         >
                            <X className="h-5 w-5 text-white" />
                         </button>
                      </div>
                    </motion.div>
                  ) : (
                    <label className="relative flex flex-col items-center justify-center aspect-square border-2 border-dashed border-muted-foreground/20 rounded-3xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                        <UploadCloud className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold mt-2">Upload Icon</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        {isUploading && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                    </label>
                  )}
               </AnimatePresence>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
             <Button 
               onClick={handleSubmit} 
               disabled={isSubmitting || isUploading}
               className="flex-1 h-14 rounded-2xl text-md font-black shadow-xl shadow-primary/10 transition-all hover:scale-[1.02]"
             >
               {isSubmitting ? "Finalizing..." : "Create Category"}
               {!isSubmitting && <CheckCircle2 className="ml-2 h-5 w-5" />}
             </Button>
             <Button 
               variant="outline" 
               onClick={onCancel}
               className="h-14 px-6 rounded-2xl border-none bg-muted/50 hover:bg-muted font-bold"
             >
               Cancel
             </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
