import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Download, FileText, BarChart3, Package, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BlogCreationDialog from "@/components/BlogGeneratorForm";
import { useAuth } from "@clerk/clerk-react";
import Loading from "./Loading";
import { useAuthBootstrap } from "@/utils/useAuthBootstrap";
import { fetchBackendBlogs } from "@/utils/fetchBlogData";


type Blog = {
  id: string;
  blogName: string;
  status: string;
};

const blogData: Blog[] = []

const sidebarItems = [
  // { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Blogs", active: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Package, label: "Templates", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const Dashboard = () => {
  // Ensure fetchBlogData returns an array or use a default empty array
  // const _fetchBlogData = blogData
  const [blogs, setBlogs] = useState<Blog[]>(blogData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  useAuthBootstrap();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      const newBlogs = await fetchBackendBlogs();
      setBlogs(newBlogs);
    };

    fetchBlogs();

    if (!isSignedIn) {
      navigate('/');
    }
  }, []);


  if (!isLoaded) {
    return <Loading />;
  }


  const handleEdit = (id: string) => {
    console.log(`Edit blog ${id}`);
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleDownload = (id: string) => {
    console.log(`Download blog ${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 border-green-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-70 bg-gradient-to-b from-blue-600 to-purple-700 text-white p-6 shadow-2xl"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">BlogCraft</h1>
          <p className="text-blue-100 text-sm">AI Blog Generator</p>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  item.active 
                    ? 'bg-white/20 border-l-4 border-white' 
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <Button
                className="outline-none bg-transparent border-none shadow-none text-white p-0 hover:bg-transparent">
                  <Link
                  className="text-white no-underline text-base" to="/coming-soon">{item.label}</Link>
                </Button>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-auto pt-8">
          <Button 
            asChild
            variant="outline" 
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog Management
            </h1>
            <p className="text-gray-600 mt-2">{blogs.length} blogs found</p>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Create New Blog
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{blogs.length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {blogs.filter(blog => blog.status === "Published").length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {blogs.filter(blog => blog.status === "Draft").length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {blogs.filter(blog => blog.status === "Pending").length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Table */}
        {blogs.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-xl font-semibold text-gray-800">All Blogs</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-100">
                        <TableHead className="w-24 font-semibold text-gray-700">ID</TableHead>
                        <TableHead className="font-semibold text-gray-700">Blog Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Status</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      { blogs.map((blog, index) => (
                        <motion.tr
                          key={blog.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border-b border-gray-100 hover:shadow-md cursor-pointer"
                        >
                          <TableCell className="font-bold text-blue-600 py-4">
                            {blog.id}
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {blog.blogName}
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge 
                              variant="secondary"
                              className={`${getStatusColor(blog.status)} border font-medium px-3 py-1`}
                            >
                              {blog.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(blog.id)}
                                className="h-9 w-9 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownload(blog.id)}
                                className="h-9 w-9 hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(blog.id)}
                                className="h-9 w-9 hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center mt-8 text-sm text-gray-600"
            >
              <div className="font-medium">Showing 1-{blogs.length} of {blogs.length}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="border-gray-200">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200">
                  2
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200">
                  Next
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <BlogCreationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </div>
  );
};

export default Dashboard;