"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Assuming you have a Select component

// Define the form schema using Zod
const formSchema = z.object({
  productName: z.string().min(1, {
    message: "Product name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  boughtAt: z.string().min(1, {
    message: "Bought date is required.",
  }),
  category: z.enum(["furniture", "technology", "other"], {
    errorMap: () => ({ message: "Category is required." }),
  }),
  originalPrice: z.number().min(0, {
    message: "Original price must be a positive number.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function AddItemForm() {
  const form = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      boughtAt: "",
      category: "furniture",
      originalPrice: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the product.</FormDescription>
              <FormMessage>{errors.productName?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief description of the product.
              </FormDescription>
              <FormMessage>{errors.description?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="boughtAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bought Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Select bought date"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Specify the date when the product was bought.
              </FormDescription>
              <FormMessage>{errors.boughtAt?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormDescription>
                    Select the category of the product.
                  </FormDescription>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="technology">Hobbies</SelectItem>
                    <SelectItem value="technology">Fashion</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.category?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter original price"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the original price of the product.
              </FormDescription>
              <FormMessage>{errors.originalPrice?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
