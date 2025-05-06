import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types/blog";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blogId: string) => void;
}

const BlogCard = ({ blog, onEdit, onDelete }: BlogCardProps) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{blog.title}</CardTitle>
            <CardDescription>
              {blog.created_at}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end space-x-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onEdit(blog)}
          className="cursor-pointer"
          >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="cursor-pointer text-destructive hover:bg-destructive hover:text-destructive-foreground" 
          
            onClick={() => onDelete(blog.blog_id)}>
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;