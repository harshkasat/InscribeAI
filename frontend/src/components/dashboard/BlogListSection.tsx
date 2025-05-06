import { useEffect, useState } from "react";
import { Blog } from "@/types/blog";
import BlogCard from "./BlogCard";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { getEmailFromLocalStorage } from "@/utils/getUserEmailFromLocalStorage";
import { useNavigate } from "react-router";



const BlogListSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/v1/db_operation/list_blogs/?user_email=${getEmailFromLocalStorage() || "example.com"}`
        );
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data['blogs']); // assumes API returns an array of blogs

        // setBlogs(data); // assumes API returns an array of blogs
        setLoading(false);
      } catch (err) {
        toast("Error loading blogs", {
          description: (err as Error).message,
        });
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading blogs...</p>
      </div>
    );
  }
  const handleEdit = (blog: Blog) => {
    navigate(`/editor/${blog.blog_id}`);
    // toast("Edit Blog", {
    //   description: `Editing "${blog.title}" (ID: ${blog.blog_id})`,
    // });
  };

  const handleDelete = (blogId: string) => {
    useEffect(() => {
          const fetchBlogs = async () => {
            try {
              const res = await fetch(
                `http://127.0.0.1:8000/api/v1/db_operation/check_credits/?user_email=${getEmailFromLocalStorage()}&blog_id=${blogId}`
              );
              if (!res.ok) throw new Error("Failed to fetch blogs");
              // const data = await res.json();
              toast("Delete Blog", {
                description: `Deleting blog with ID: ${blogId}`,
              });
      
              // setBlogs(data); // assumes API returns an array of blogs
              setLoading(false);
            } catch (err) {
              toast("Error loading blogs", {
                description: (err as Error).message,
              });
            }
          };
      
          fetchBlogs();
        }, []);

  };

  const confirmDelete = () => {
    if (blogToDelete) {
      const blogTitle = blogs.find(b => b.blog_id === blogToDelete)?.title;
      setBlogs(blogs.filter(blog => blog.blog_id !== blogToDelete));
      setDeleteDialogOpen(false);
      setBlogToDelete(null);

      toast("Blog Deleted", {
        description: `"${blogTitle}" has been successfully deleted.`,
      });
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <Input
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map(blog => (
            <BlogCard
              key={blog.blog_id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-muted/40 rounded-lg">
            <p className="text-xl font-medium text-muted-foreground">No blogs found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogListSection;
