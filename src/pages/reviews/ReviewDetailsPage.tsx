// // // // import React, { useEffect, useState } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import { reviewService } from "../../services/reviewService";

// // // // export default function ReviewDetailsPage() {
// // // //   const { reviewId } = useParams();
// // // //   const [review, setReview] = useState(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     (async () => {
// // // //       try {
// // // //         const res = await reviewService.getReviewDetails(reviewId);
// // // //         setReview(res.data.data.review);
// // // //       } catch (err) {
// // // //         alert("Failed to load review details");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     })();
// // // //   }, [reviewId]);

// // // //   if (loading) return <div className="p-6 text-center">Loading...</div>;
// // // //   if (!review) return <div className="p-6 text-center">Review not found!</div>;

// // // //   return (
// // // //     <div className="mx-auto max-w-3xl p-6">
// // // //       <h2 className="mb-4 text-2xl font-bold">Review Details</h2>

// // // //       <div className="space-y-4">
// // // //         <p><strong>Overall Score:</strong> {review.overallScore}</p>
// // // //         <p><strong>Recommendation:</strong> {review.recommendation}</p>

// // // //         <div>
// // // //           <h3 className="mb-1 font-semibold">Scores</h3>
// // // //           <pre className="rounded bg-gray-100 p-3">
// // // //             {JSON.stringify(review.scores, null, 2)}
// // // //           </pre>
// // // //         </div>

// // // //         <div>
// // // //           <h3 className="mb-1 font-semibold">Comments to Author</h3>
// // // //           <p className="rounded bg-gray-50 p-3">{review.commentsToAuthor}</p>
// // // //         </div>

// // // //         {review.commentsToEditor && (
// // // //           <div>
// // // //             <h3 className="mb-1 font-semibold">Comments to Editor</h3>
// // // //             <p className="rounded bg-gray-50 p-3">{review.commentsToEditor}</p>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // import React, { useEffect, useState } from "react";
// // // import { useParams, Link } from "react-router-dom";
// // // import { reviewService } from "../../services/reviewService";

// // // export default function ReviewDetailsPage() {
// // //   const { reviewId } = useParams();
// // //   const [review, setReview] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     (async () => {
// // //       try {
// // //         const res = await reviewService.getReviewDetails(reviewId);
// // //         setReview(res.data.data.review);
// // //       } catch (err) {
// // //         alert("Failed to load review details");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     })();
// // //   }, [reviewId]);

// // //   if (loading) return <div className="p-6 text-center">Loading...</div>;
// // //   if (!review) return <div className="p-6 text-center">Review not found!</div>;

// // //   return (
// // //     <div className="mx-auto max-w-3xl p-6">
// // //       <div className="mb-6 flex items-center justify-between">
// // //         <h2 className="text-2xl font-bold">Review Details</h2>

// // //         {/* Show edit button only if review is NOT submitted */}
// // //         {review.status !== "submitted" && (
// // //           <Link
// // //             to={`/reviews/${review._id}/edit`}
// // //             className="rounded bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700"
// // //           >
// // //             Edit Review
// // //           </Link>
// // //         )}
// // //       </div>

// // //       <div className="space-y-6">

// // //         {/* Summary Card */}
// // //         <div className="rounded-lg border bg-white p-4 shadow">
// // //           <p className="mb-1 text-gray-700">
// // //             <strong>Overall Score:</strong> {review.overallScore}
// // //           </p>
// // //           <p className="text-gray-700">
// // //             <strong>Recommendation:</strong> {review.recommendation}
// // //           </p>
// // //         </div>

// // //         {/* Scores Card */}
// // //         <div className="rounded-lg border bg-white p-4 shadow">
// // //           <h3 className="mb-2 text-lg font-semibold">Scores</h3>
// // //           <div className="grid grid-cols-2 gap-2 text-sm">
// // //             {Object.entries(review.scores).map(([key, value]) => (
// // //               <div key={key} className="flex justify-between border-b py-1">
// // //                 <span className="capitalize text-gray-600">{key}</span>
// // //                 <span className="font-semibold">{value}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Comments to Author */}
// // //         <div className="rounded-lg border bg-white p-4 shadow">
// // //           <h3 className="mb-2 text-lg font-semibold">Comments to Author</h3>
// // //           <p className="whitespace-pre-wrap text-gray-700">{review.commentsToAuthor}</p>
// // //         </div>

// // //         {/* Comments to Editor */}
// // //         {review.commentsToEditor && (
// // //           <div className="rounded-lg border bg-white p-4 shadow">
// // //             <h3 className="mb-2 text-lg font-semibold">Comments to Editor</h3>
// // //             <p className="whitespace-pre-wrap text-gray-700">{review.commentsToEditor}</p>
// // //           </div>
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import React, { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import { reviewService } from "../../services/reviewService";
// // import { ArrowLeft, FileEdit, Star } from "lucide-react";

// // export default function ReviewDetailsPage() {
// //   const { reviewId } = useParams();
// //   const [review, setReview] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const res = await reviewService.getReviewDetails(reviewId);
// //         setReview(res.data.data.review);
// //       } catch (err) {
// //         alert("Failed to load review details");
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, [reviewId]);

// //   if (loading) return <div className="p-6 text-center">Loading...</div>;
// //   if (!review) return <div className="p-6 text-center">Review not found!</div>;

// //   return (
// //     <div className="mx-auto max-w-3xl p-6">

// //       {/* Header Section */}
// //       <div className="mb-6 flex items-center justify-between">
// //         <div className="flex items-center gap-3">
// //           <ArrowLeft size={20} className="cursor-pointer text-gray-600 hover:text-black" onClick={() => history.back()} />
// //           <h2 className="text-2xl font-bold">Review Details</h2>
// //         </div>

// //         {/* Edit allowed only if NOT submitted */}
// //         {review.status !== "submitted" && (
// //           <Link
// //             to={`/reviews/${review._id}/edit`}
// //             className="flex items-center gap-2 rounded bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700"
// //           >
// //             <FileEdit size={16} />
// //             Edit Review
// //           </Link>
// //         )}
// //       </div>

// //       <div className="space-y-6">

// //         {/* Summary Card */}
// //         <div className="rounded-xl border bg-white p-5 shadow-sm">
// //           <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
// //             <Star size={18} className="text-yellow-500" />
// //             Summary
// //           </h3>
// //           <p className="mb-1 text-gray-700">
// //             <strong>Overall Score:</strong> {review.overallScore}/5
// //           </p>
// //           <p className="text-gray-700">
// //             <strong>Recommendation:</strong>{" "}
// //             <span
// //               className={`font-semibold ${
// //                 review.recommendation === "accept"
// //                   ? "text-green-600"
// //                   : review.recommendation.includes("revision")
// //                   ? "text-yellow-600"
// //                   : "text-red-600"
// //               }`}
// //             >
// //               {review.recommendation.replace("_", " ")}
// //             </span>
// //           </p>
// //         </div>

// //         {/* Scores Section */}
// //         <div className="rounded-xl border bg-white p-5 shadow-sm">
// //           <h3 className="mb-3 text-lg font-semibold">Scores</h3>
// //           <div className="grid grid-cols-2 gap-2 text-sm">
// //             {Object.entries(review.scores).map(([key, value]) => (
// //               <div
// //                 key={key}
// //                 className="flex items-center justify-between border-b py-1 text-gray-700"
// //               >
// //                 <span className="capitalize">{key}</span>
// //                 <span className="font-semibold">{value}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Comments to Author */}
// //         <div className="rounded-xl border bg-white p-5 shadow-sm">
// //           <h3 className="mb-3 text-lg font-semibold">Comments to Author</h3>
// //           <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
// //             {review.commentsToAuthor}
// //           </p>
// //         </div>

// //         {/* Comments to Editor (optional) */}
// //         {review.commentsToEditor && (
// //           <div className="rounded-xl border bg-white p-5 shadow-sm">
// //             <h3 className="mb-3 text-lg font-semibold">Comments to Editor</h3>
// //             <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
// //               {review.commentsToEditor}
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { reviewService } from "../../services/reviewService";
// import { ArrowLeft, FileEdit, Star } from "lucide-react";

// export default function ReviewDetailsPage() {
//   const { reviewId } = useParams();
//   const [review, setReview] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await reviewService.getReviewDetails(reviewId);
//         setReview(res.data.data.review);
//       } catch (err) {
//         alert("Failed to load review details");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [reviewId]);

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (!review) return <div className="p-6 text-center">Review not found!</div>;

//   return (
//     <div className="mx-auto max-w-3xl p-6">
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <ArrowLeft
//             size={20}
//             className="cursor-pointer text-gray-600 hover:text-black"
//             onClick={() => history.back()}
//           />
//           <h2 className="text-2xl font-bold">Review Details</h2>
//         </div>

//         {review.status !== "submitted" && (
//           <Link
//             to={`/reviews/${review._id}/edit`}
//             className="flex items-center gap-2 rounded bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700"
//           >
//             <FileEdit size={16} />
//             Edit Review
//           </Link>
//         )}
//       </div>

//       <div className="space-y-6">
//         {/* Summary */}
//         <div className="rounded-xl border bg-white p-5 shadow-sm">
//           <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
//             <Star size={18} className="text-yellow-500" />
//             Summary
//           </h3>

//           <p className="mb-1 text-gray-700">
//             <strong>Overall Score:</strong> {review.overallScore}/5
//           </p>

//           <p className="text-gray-700">
//             <strong>Recommendation:</strong>{" "}
//             <span
//               className={`font-semibold ${
//                 review.recommendation === "accept"
//                   ? "text-green-600"
//                   : review.recommendation.includes("revision")
//                   ? "text-yellow-600"
//                   : "text-red-600"
//               }`}
//             >
//               {review.recommendation.replace("_", " ")}
//             </span>
//           </p>
//         </div>

//         {/* Scores - NEW Improved table */}
//         <div className="rounded-xl border bg-white p-5 shadow-sm">
//           <h3 className="mb-3 text-lg font-semibold">Scores</h3>

//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b text-left text-gray-500">
//                 <th className="pb-2">Criteria</th>
//                 <th className="pb-2 text-right">Score</th>
//               </tr>
//             </thead>

//             <tbody>
//               {Object.entries(review.scores).map(([key, value]) => (
//                 <tr
//                   key={key}
//                   className="border-b transition last:border-0 hover:bg-gray-50"
//                 >
//                   <td className="py-2 capitalize text-gray-700">{key}</td>
//                   <td className="py-2 text-right">
//                     <span
//                       className={`inline-block rounded-full px-3 py-1 text-xs font-semibold 
//                         ${
//                           value >= 4
//                             ? "bg-green-100 text-green-700"
//                             : value === 3
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-red-100 text-red-700"
//                         }
//                       `}
//                     >
//                       {value} / 5
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Comments to Author */}
//         <div className="rounded-xl border bg-white p-5 shadow-sm">
//           <h3 className="mb-3 text-lg font-semibold">Comments to Author</h3>
//           <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
//             {review.commentsToAuthor}
//           </p>
//         </div>

//         {/* Comments to Editor */}
//         {review.commentsToEditor && (
//           <div className="rounded-xl border bg-white p-5 shadow-sm">
//             <h3 className="mb-3 text-lg font-semibold">Comments to Editor</h3>
//             <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
//               {review.commentsToEditor}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { reviewService } from "../../services/reviewService";
import { ArrowLeft, FileEdit, Star } from "lucide-react";

export default function ReviewDetailsPage() {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await reviewService.getReviewDetails(reviewId);
        setReview(res.data.data.review);
      } catch (err) {
        alert("Failed to load review details");
      } finally {
        setLoading(false);
      }
    })();
  }, [reviewId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!review) return <div className="p-6 text-center">Review not found!</div>;

  return (
    <div className="mx-auto max-w-3xl p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ArrowLeft
            size={20}
            className="cursor-pointer text-gray-600 hover:text-black"
            onClick={() => history.back()}
          />
          <h2 className="text-2xl font-bold">Review Details</h2>
        </div>

        {/* Edit only if NOT submitted */}
        {review.status !== "submitted" && (
          <Link
            to={`/reviews/${review._id}/edit`}
            className="flex items-center gap-2 rounded bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700"
          >
            <FileEdit size={16} />
            Edit Review
          </Link>
        )}
      </div>

      <div className="space-y-6">

        {/* Summary */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Star size={18} className="text-yellow-500" />
            Summary
          </h3>

          <p className="mb-1 text-gray-700">
            <strong>Overall Score:</strong> {review.overallScore}/5
          </p>

          <p className="text-gray-700">
            <strong>Recommendation:</strong>{" "}
            <span
              className={`font-semibold ${
                review.recommendation === "accept"
                  ? "text-green-600"
                  : review.recommendation.includes("revision")
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {review.recommendation.replace("_", " ")}
            </span>
          </p>
        </div>

        {/* Scores Table */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Score Breakdown</h3>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-gray-100 text-left text-gray-600">
                <th className="px-3 py-2 font-medium">Criteria</th>
                <th className="px-3 py-2 text-right font-medium">Score (out of 5)</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(review.scores).map(([key, value], idx) => (
                <tr
                  key={key}
                  className={`border-b hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-3 py-2 capitalize text-gray-700">{key}</td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-800">
                    {value}/5
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comments to Author */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Comments to Author</h3>
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {review.commentsToAuthor}
          </p>
        </div>

        {/* Comments to Editor */}
        {review.commentsToEditor && (
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Comments to Editor</h3>
            <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
              {review.commentsToEditor}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
