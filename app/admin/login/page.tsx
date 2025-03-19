// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"

// export default function AdminLogin() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const router = useRouter()

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()

//     // This is a simple mock authentication
//     // In a real app, you would validate against a backend
//     if (username === "admin" && password === "password") {
//       router.push("/admin/dashboard")
//     } else {
//       setError("Invalid username or password")
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#660099] to-[#4d0073] p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl">Admin Login</CardTitle>
//           <CardDescription>Sign in to access the admin dashboard</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <Button type="submit" className="w-full bg-[#660099] hover:bg-[#4d0073]">
//               Sign In
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-gray-500">For demo: username "admin" password "password"</p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

