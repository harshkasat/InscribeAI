import React from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowUpRight } from "lucide-react"
import { useNavigate } from "react-router";
import { getEmailFromLocalStorage } from "@/utils/getUserEmailFromLocalStorage";

interface BlogGeneratorFormProps {
  type: "website" | "youtube"
  title: string
  subtitle: string
  percentage: string
  onClose: () => void
}

interface BlogRequestBody {
  add_website_link: string[]
  blog_name: string
  desired_tone: string
  target_audience: string
  email: string
}

export function BlogGeneratorForm({ type, title, subtitle, percentage, onClose }: BlogGeneratorFormProps) {
  const [tone, setTone] = React.useState('professional');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const requestBody: BlogRequestBody = {
      add_website_link: [formData.get('url') as string],
      blog_name: formData.get('blogTitle') as string,
      desired_tone: tone,
      target_audience: formData.get('targetAudience') as string,
      email: getEmailFromLocalStorage() || "example.com",
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/db_operation/create_blog/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      const data = await response.json();
      const blogID = data.user_details.blog_id || data['user_details']['blog_id'];

      if (!blogID){
        console.error('No Blog ID received from the API response.');
        return;
      }
      navigate(`/editor/${blogID}`);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-green-400 via-green-500 to-teal-500 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-3xl font-bold mb-4">{subtitle}</p>
        <div className="flex items-center space-x-2 mb-4">
          <ArrowUpRight className="h-5 w-5" />
          <span className="font-medium">{percentage}</span>
          <span className="text-green-100">More engagement than static blog</span>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="blogTitle">Blog Title</Label>
            <Input name="blogTitle" id="blogTitle" placeholder="Enter your blog title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">{type === "website" ? "Website URL" : "YouTube URL"}</Label>
            <Input
              name="url"
              id="url"
              placeholder={type === "website" ? "https://example.com" : "https://youtube.com/watch?v=..."}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Textarea
              name="targetAudience"
              id="targetAudience"
              placeholder="Describe your target audience"
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Desired Tone</Label>
            <RadioGroup value={tone} onValueChange={setTone}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional">Professional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casual" id="casual" />
                <Label htmlFor="casual">Casual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="friendly" id="friendly" />
                <Label htmlFor="friendly">Friendly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="authoritative" id="authoritative" />
                <Label htmlFor="authoritative">Authoritative</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Generate Blog
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
