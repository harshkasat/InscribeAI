import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { ChefHat, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

const formSchema = z.object({
  blog_name: z.string().min(1, "Blog name is required"),
  add_website_link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  target_audience: z.enum(["professional", "children", "general"]),
  desired_tone: z.enum(["friendly", "professional", "casual"]),
});

type FormData = z.infer<typeof formSchema>;

interface BlogCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BlogCreationDialog = ({ open, onOpenChange }: BlogCreationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blog_name: "",
      add_website_link: "",
      target_audience: "professional",
      desired_tone: "friendly",
    },
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "127.0.0.1:8000";

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/create_blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const result = await response.json();
        const blogId = result.blog_post?.id || "new"; // Fallback ID if not provided
        
        
        toast.success("Your blog has been created successfully!");
        
        onOpenChange(false);
        navigate(`/editor/${blogId}`);
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Blog
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
            >
              <ChefHat className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                We're cooking your blog! 👨‍🍳
              </h3>
              <p className="text-gray-600">
                Our AI is crafting something amazing for you...
              </p>
            </motion.div>
            
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="blog_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Name (Required)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your blog title..." {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="add_website_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Link (Required)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} required/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desired_tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Tone</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="friendly" id="friendly" />
                          <label htmlFor="friendly">Chlidren</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professional" id="professional" />
                          <label htmlFor="professional">Professional</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="casual" id="casual" />
                          <label htmlFor="casual">Casual</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desired_tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Tone</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="friendly" id="friendly" />
                          <label htmlFor="friendly">Friendly</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professional" id="professional" />
                          <label htmlFor="professional">Professional</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="casual" id="casual" />
                          <label htmlFor="casual">Casual</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Blog"
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogCreationDialog;