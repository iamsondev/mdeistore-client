"use client";

import { createMedicine } from "@/actions/medicine.action";
import { generateAIDescriptionAction } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Info, 
  DollarSign, 
  Layers, 
  UploadCloud, 
  X, 
  CheckCircle2,
  Factory,
  Tag
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
}

const medicineSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  image: z.string().url("Must be a valid URL"),
  categoryId: z.string().min(1, "Category is required"),
});

export function AddMedicineFormClient({ categories }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      manufacturer: "",
      image: "",
      categoryId: "",
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Publishing medicine...");
      try {
        const res = await createMedicine(value);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Medicine published successfully!", { id: toastId });
        form.reset();
      } catch (err) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
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
        },
      );

      const data = await res.json();

      if (data.success) {
        field.handleChange(data.data.url);
        toast.success("Product image uploaded!");
      }
    } catch (error) {
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const [isGenerating, setIsGenerating] = useState(false);
  const handleGenerateDescription = async (field: any, nameValue: string, categoryId: string) => {
    if (!nameValue) {
      toast.error("Please enter a medicine name first!");
      return;
    }
    setIsGenerating(true);
    const toastId = toast.loading("AI is generating description...");
    try {
      const selectedCategory = categories.find(c => c.id === categoryId);
      const res = await generateAIDescriptionAction(nameValue, selectedCategory?.name || "");
      
      if (res?.data?.success) {
        field.handleChange(res.data.data);
        toast.success("Description generated beautifully!", { id: toastId });
      } else {
        toast.error(res?.error?.message || "Failed to generate.", { id: toastId });
      }
    } catch(err) {
      toast.error("AI service error. Please try again.", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-primary/10 text-primary">
            <Package className="h-8 w-8" />
          </div>
          Inventory Marketplace
        </h1>
        <p className="text-muted-foreground font-medium">
          Create a professional listing for your pharmaceutical products
        </p>
      </div>

      <form
        id="medicine-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Core Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b bg-muted/30 pb-6">
              <div className="flex items-center gap-2 mb-1">
                 <Info className="h-4 w-4 text-primary" />
                 <CardTitle className="text-lg font-bold">General Information</CardTitle>
              </div>
              <CardDescription>Essential identification details for the product</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <FieldGroup className="grid gap-6">
                <form.Field name="name">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid} className="space-y-2">
                        <FieldLabel className="text-sm font-bold ml-1">Commercial Name</FieldLabel>
                        <div className="relative">
                          <Input
                            className="bg-muted/50 border-none h-12 px-4 rounded-xl focus-visible:ring-2 focus-visible:ring-primary transition-all"
                            placeholder="e.g. Panadol Extra Strength"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </div>
                        {isInvalid && <FieldError className="text-xs font-bold text-rose-500 ml-1" errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </form.Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <form.Field name="manufacturer">
                    {(field) => (
                      <Field className="space-y-2">
                        <FieldLabel className="text-sm font-bold ml-1 flex items-center gap-2">
                          <Factory className="h-3.5 w-3.5" /> Manufacturer
                        </FieldLabel>
                        <Input
                          className="bg-muted/50 border-none h-12 px-4 rounded-xl"
                          placeholder="e.g. GlaxoSmithKline"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </Field>
                    )}
                  </form.Field>

                  <form.Field name="categoryId">
                    {(field) => (
                      <Field className="space-y-2">
                        <FieldLabel className="text-sm font-bold ml-1 flex items-center gap-2">
                          <Tag className="h-3.5 w-3.5" /> Category
                        </FieldLabel>
                        <select
                          className="w-full bg-muted/50 border-none h-12 px-4 rounded-xl text-sm focus:ring-2 focus:ring-primary appearance-none transition-all cursor-pointer"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </Field>
                    )}
                  </form.Field>
                </div>

                <form.Field name="description">
                  {(field) => (
                    <Field className="space-y-2 relative">
                      <div className="flex items-center justify-between">
                         <FieldLabel className="text-sm font-bold ml-1">Clinical Description</FieldLabel>
                         <button 
                           type="button" 
                           disabled={isGenerating}
                           onClick={() => handleGenerateDescription(field, form.state.values.name, form.state.values.categoryId)}
                           className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors border border-indigo-200"
                         >
                           {isGenerating ? "Generating..." : "✨ AI Generate"}
                         </button>
                      </div>
                      <Textarea
                        className="bg-muted/50 border-none min-h-[120px] p-4 rounded-2xl resize-none"
                        placeholder="Detailed indications, dosage instructions, and usage warnings..."
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                </form.Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden">
             <CardHeader className="border-b bg-muted/30 pb-6">
                <div className="flex items-center gap-2 mb-1">
                   <DollarSign className="h-4 w-4 text-primary" />
                   <CardTitle className="text-lg font-bold">Pricing & Inventory</CardTitle>
                </div>
                <CardDescription>Configure costs and stock availability</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 flex flex-col md:flex-row gap-6">
                  <form.Field name="price">
                    {(field) => (
                      <Field className="flex-1 space-y-2">
                        <FieldLabel className="text-sm font-bold ml-1">Unit Price (৳)</FieldLabel>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors text-lg">৳</div>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="bg-muted/50 border-none h-14 pl-12 rounded-2xl text-lg font-black"
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                          />
                        </div>
                      </Field>
                    )}
                  </form.Field>

                  <form.Field name="stock">
                    {(field) => (
                      <Field className="flex-1 space-y-2">
                        <FieldLabel className="text-sm font-bold ml-1">Bulk Stock</FieldLabel>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                             <Layers className="h-5 w-5" />
                          </div>
                          <Input
                            type="number"
                            className="bg-muted/50 border-none h-14 pl-12 rounded-2xl text-lg font-black"
                            placeholder="Quantity"
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                          />
                        </div>
                      </Field>
                    )}
                  </form.Field>
              </CardContent>
          </Card>
        </div>

        {/* Right Column: Visuals & Submission */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden h-fit">
             <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="text-md font-extrabold flex items-center gap-2">
                   <UploadCloud className="h-4 w-4 text-primary" />
                   Product Image
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                 <form.Field name="image">
                    {(field) => (
                      <div className="space-y-4">
                        <AnimatePresence mode="wait">
                          {field.state.value ? (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="relative aspect-square w-full rounded-[1.5rem] overflow-hidden border-2 border-primary/20 bg-muted group shadow-2xl"
                            >
                              <Image
                                src={field.state.value}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  onClick={() => field.handleChange("")}
                                  className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/40 transition-all border border-white/30"
                                >
                                  <X className="h-6 w-6 text-white" />
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <label className="relative flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-muted-foreground/20 rounded-[1.5rem] hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group overflow-hidden">
                               <div className="flex flex-col items-center gap-2 text-center p-6">
                                  <div className="p-4 rounded-2xl bg-muted group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                                    <UploadCloud className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                                  </div>
                                  <p className="text-sm font-bold text-foreground">Upload Visual</p>
                                  <p className="text-[10px] text-muted-foreground">PNG, JPG up to 5MB</p>
                               </div>
                               <input
                                 type="file"
                                 className="hidden"
                                 accept="image/*"
                                 onChange={(e) => handleImageUpload(e, field)}
                                 disabled={isUploading}
                               />
                               {isUploading && (
                                 <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-2 text-primary">
                                       <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                       <span className="text-[10px] font-black uppercase tracking-tighter">Uploading...</span>
                                    </div>
                                 </div>
                               )}
                            </label>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                 </form.Field>
              </CardContent>
          </Card>

          <div className="p-2 space-y-4">
             <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <p className="text-xs font-medium text-emerald-800">
                  Your listing will be reviewed by our moderation team before appearing in the public catalog.
                </p>
             </div>

             <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
               {([canSubmit, isSubmitting]) => (
                 <Button 
                   type="submit" 
                   disabled={!canSubmit || isSubmitting}
                   className="w-full h-16 rounded-[1.5rem] text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                 >
                   {isSubmitting ? "Processing..." : "Publish Product"}
                 </Button>
               )}
             </form.Subscribe>
          </div>
        </div>
      </form>
    </div>
  );
}

