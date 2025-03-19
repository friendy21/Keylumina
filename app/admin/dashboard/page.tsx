// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Switch } from "@/components/ui/switch"
// import { Home, Palette, Layers, Settings, Users, BookOpen, LogOut } from "lucide-react"

// export default function AdminDashboard() {
//   const [primaryColor, setPrimaryColor] = useState("#660099")
//   const [secondaryColor, setSecondaryColor] = useState("#FBCF41")
//   const [sections, setSections] = useState([
//     { id: 1, name: "Hero", enabled: true },
//     { id: 2, name: "Beginner's Base", enabled: true },
//     { id: 3, name: "Featured Courses", enabled: true },
//     { id: 4, name: "Testimonials", enabled: false },
//     { id: 5, name: "Instructors", enabled: false },
//     { id: 6, name: "Call to Action", enabled: true },
//   ])

//   const toggleSection = (id: number) => {
//     setSections(sections.map((section) => (section.id === id ? { ...section, enabled: !section.enabled } : section)))
//   }

//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-[#660099] text-white p-4 flex flex-col">
//         <div className="text-xl font-bold mb-8 mt-4">Admin Dashboard</div>

//         <nav className="space-y-2 flex-1">
//           <Link href="/admin/dashboard" className="flex items-center space-x-2 bg-white/10 p-2 rounded">
//             <Home className="h-5 w-5" />
//             <span>Dashboard</span>
//           </Link>
//           <Link href="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-white/10">
//             <Palette className="h-5 w-5" />
//             <span>Appearance</span>
//           </Link>
//           <Link href="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-white/10">
//             <Layers className="h-5 w-5" />
//             <span>Sections</span>
//           </Link>
//           <Link href="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-white/10">
//             <BookOpen className="h-5 w-5" />
//             <span>Courses</span>
//           </Link>
//           <Link href="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-white/10">
//             <Users className="h-5 w-5" />
//             <span>Users</span>
//           </Link>
//           <Link href="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-white/10">
//             <Settings className="h-5 w-5" />
//             <span>Settings</span>
//           </Link>
//         </nav>

//         <div className="pt-4 mt-auto">
//           <Separator className="my-4 bg-white/20" />
//           <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-white/10">
//             <LogOut className="h-5 w-5" />
//             <span>Logout</span>
//           </Link>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-8 bg-gray-50">
//         <h1 className="text-2xl font-bold mb-6">Website Customization</h1>

//         <Tabs defaultValue="appearance">
//           <TabsList className="mb-6">
//             <TabsTrigger value="appearance">Appearance</TabsTrigger>
//             <TabsTrigger value="sections">Sections</TabsTrigger>
//             <TabsTrigger value="content">Content</TabsTrigger>
//           </TabsList>

//           <TabsContent value="appearance">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Color Scheme</CardTitle>
//                 <CardDescription>Customize the colors used throughout the website</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="primaryColor">Primary Color</Label>
//                     <div className="flex space-x-2">
//                       <Input id="primaryColor" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
//                       <input
//                         type="color"
//                         value={primaryColor}
//                         onChange={(e) => setPrimaryColor(e.target.value)}
//                         className="w-10 h-10 p-1 rounded border"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="secondaryColor">Secondary Color</Label>
//                     <div className="flex space-x-2">
//                       <Input
//                         id="secondaryColor"
//                         value={secondaryColor}
//                         onChange={(e) => setSecondaryColor(e.target.value)}
//                       />
//                       <input
//                         type="color"
//                         value={secondaryColor}
//                         onChange={(e) => setSecondaryColor(e.target.value)}
//                         className="w-10 h-10 p-1 rounded border"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   <h3 className="text-lg font-medium mb-2">Preview</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div
//                       className="h-20 rounded flex items-center justify-center text-white font-bold"
//                       style={{ backgroundColor: primaryColor }}
//                     >
//                       Primary Color
//                     </div>
//                     <div
//                       className="h-20 rounded flex items-center justify-center font-bold"
//                       style={{ backgroundColor: secondaryColor, color: primaryColor }}
//                     >
//                       Secondary Color
//                     </div>
//                   </div>
//                 </div>

//                 <Button className="mt-4">Save Changes</Button>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="sections">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Manage Sections</CardTitle>
//                 <CardDescription>Enable or disable sections on the homepage</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {sections.map((section) => (
//                     <div key={section.id} className="flex items-center justify-between py-2">
//                       <div>
//                         <h3 className="font-medium">{section.name}</h3>
//                         <p className="text-sm text-gray-500">
//                           {section.enabled ? "Visible on homepage" : "Hidden from homepage"}
//                         </p>
//                       </div>
//                       <Switch checked={section.enabled} onCheckedChange={() => toggleSection(section.id)} />
//                     </div>
//                   ))}
//                 </div>

//                 <Separator className="my-6" />

//                 <div>
//                   <h3 className="font-medium mb-2">Add New Section</h3>
//                   <div className="flex space-x-2">
//                     <Input placeholder="Section name" />
//                     <Button>Add</Button>
//                   </div>
//                 </div>

//                 <Button className="mt-6">Save Changes</Button>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="content">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Content Management</CardTitle>
//                 <CardDescription>Edit website content and courses</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-500 mb-4">
//                   This section allows you to manage all content on the website including courses, instructors, and
//                   testimonials.
//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
//                     <BookOpen className="h-8 w-8 mb-2" />
//                     <span>Manage Courses</span>
//                   </Button>

//                   <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
//                     <Users className="h-8 w-8 mb-2" />
//                     <span>Manage Instructors</span>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }

