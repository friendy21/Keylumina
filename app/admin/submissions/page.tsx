// import { getSubmissions } from "@/app/actions/form-actions"

// export default async function SubmissionsPage() {
//   const submissions = await getSubmissions()

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Form Submissions</h1>

//       {submissions.length === 0 ? (
//         <p className="text-gray-500">No submissions yet.</p>
//       ) : (
//         <div className="grid gap-6">
//           {submissions.map((submission, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow">
//               <div className="flex justify-between items-start mb-2">
//                 <h2 className="text-xl font-semibold">
//                   {submission.subject || submission.socialPlatform || "WhatsApp Request"}
//                 </h2>
//                 <span className="text-sm text-gray-500">{new Date(submission.submittedAt).toLocaleString()}</span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p>
//                     <strong>Name:</strong> {submission.name}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {submission.email}
//                   </p>
//                   {submission.whatsapp && (
//                     <p>
//                       <strong>WhatsApp:</strong> {submission.whatsapp}
//                     </p>
//                   )}
//                   {submission.socialPlatform && (
//                     <p>
//                       <strong>Platform:</strong> {submission.socialPlatform}
//                     </p>
//                   )}
//                   {submission.promoCode && (
//                     <p>
//                       <strong>Promo Code:</strong> {submission.promoCode}
//                     </p>
//                   )}
//                 </div>

//                 {submission.message && (
//                   <div>
//                     <p>
//                       <strong>Message:</strong>
//                     </p>
//                     <p className="whitespace-pre-wrap">{submission.message}</p>
//                   </div>
//                 )}
//               </div>

//               <p className="mt-4 text-sm text-gray-500">
//                 <strong>Target Email:</strong> {submission.targetEmail}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

