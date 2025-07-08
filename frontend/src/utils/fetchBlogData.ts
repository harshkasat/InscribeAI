type Blog = { blog_id: number; title: string };
type BlogRow = { id: string; blogName: string; status: string };

export async function fetchBackendBlogs() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/db_operation/list_blogs/", {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json();
    if (data.blogs && Array.isArray(data.blogs)) {
      const backendBlogs = data.blogs.map((b: Blog) => ({
        id: `#10${b.blog_id}`,
        blogName: b.title,
        status: "Pending"
      }));
      return backendBlogs;
    } else {
      return [];
    }

  } catch (err) {
    console.error("Error fetching backend blogs:", err);
    return [];
  }
}
