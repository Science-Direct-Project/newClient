// // // src/components/review/ReviewCard.jsx
// // import React from "react";
// // import { Link } from "react-router-dom";

// // export default function ReviewCard({ assignment }) {
// //   const { manuscript, status, _id, review } = assignment;

// //   return (
// //     <div className="rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md">
// //       <h2 className="mb-2 text-xl font-semibold">{manuscript?.title}</h2>

// //       <p className="mb-1 text-sm text-gray-600">
// //         <strong>Author:</strong> {manuscript?.correspondingAuthor?.firstName}{" "}
// //         {manuscript?.correspondingAuthor?.lastName}
// //       </p>

// //       <p className="mb-1 text-sm text-gray-600">
// //         <strong>Status:</strong> {status}
// //       </p>

// //       <p className="text-xs text-gray-500">Assigned On: {new Date(assignment.createdAt).toLocaleDateString()}</p>

// //       <div className="mt-4">
// //         {status === "accepted" && !review && (
// //           <Link
// //             to={`/reviews/${manuscript._id}/submit`}
// //             className="rounded bg-blue-600 px-4 py-2 text-white"
// //           >
// //             Review Now
// //           </Link>
// //         )}

// //         {review && review.status !== "submitted" && (
// //           <Link
// //             to={`/reviews/${review._id}/edit`}
// //             className="rounded bg-yellow-500 px-4 py-2 text-white"
// //           >
// //             Edit Review
// //           </Link>
// //         )}

// //         {review && review.status === "submitted" && (
// //           <Link
// //             to={`/reviews/${review._id}`}
// //             className="rounded bg-green-600 px-4 py-2 text-white"
// //           >
// //             View Review
// //           </Link>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }




// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // export default function ReviewCard({ assignment }) {
// //   const { manuscript, status, review } = assignment;
// //   const navigate = useNavigate();

// //   const [showModal, setShowModal] = useState(false);

// //   const handleEditRequest = () => {
// //     setShowModal(true);
// //   };

// //   const confirmEdit = () => {
// //     setShowModal(false);
// //     navigate(`/reviews/${review._id}/edit`);
// //   };

// //   return (
// //     <>
// //       <div className="rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md">
// //         <h2 className="mb-2 text-xl font-semibold">{manuscript?.title}</h2>

// //         <p className="mb-1 text-sm text-gray-600">
// //           <strong>Author:</strong> {manuscript?.correspondingAuthor?.firstName}{" "}
// //           {manuscript?.correspondingAuthor?.lastName}
// //         </p>

// //         <p className="mb-1 text-sm text-gray-600">
// //           <strong>Status:</strong> {status}
// //         </p>

// //         <p className="text-xs text-gray-500">
// //           Assigned On: {new Date(assignment.createdAt).toLocaleDateString()}
// //         </p>

// //         <div className="mt-4">

// //           {/* 1️⃣ No review yet → Review Now */}
// //           {status === "accepted" && !review && (
// //             <Link
// //               to={`/reviews/${manuscript._id}/submit`}
// //               className="rounded bg-blue-600 px-4 py-2 text-white"
// //             >
// //               Review Now
// //             </Link>
// //           )}

// //           {/* 2️⃣ Review exists & is NOT submitted → Continue Editing */}
// //           {review && review.status !== "submitted" && (
// //             <Link
// //               to={`/reviews/${review._id}/edit`}
// //               className="rounded bg-yellow-600 px-4 py-2 text-white"
// //             >
// //               Continue Editing
// //             </Link>
// //           )}

// //           {/* 3️⃣ Review is submitted → Ask confirmation before editing */}
// //           {review && review.status === "submitted" && (
// //             <button
// //               onClick={handleEditRequest}
// //               className="rounded bg-purple-600 px-4 py-2 text-white"
// //             >
// //               Edit Review
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* 🔥 CONFIRMATION MODAL */}
// //       {showModal && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
// //             <h3 className="mb-4 text-lg font-semibold">Edit Submitted Review?</h3>
// //             <p className="mb-4 text-sm text-gray-600">
// //               This review is already submitted.  
// //               Editing should only be done after informing the editor.  
// //               Are you sure you want to continue?
// //             </p>

// //             <div className="mt-4 flex justify-center gap-3">
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 className="rounded bg-gray-400 px-4 py-2 text-white"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 onClick={confirmEdit}
// //                 className="rounded bg-purple-600 px-4 py-2 text-white"
// //               >
// //                 Yes, Edit
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function ReviewCard({ assignment }) {
//   const { manuscript, status, review } = assignment;
//   const navigate = useNavigate();

//   const [showModal, setShowModal] = useState(false);

//   const handleEditRequest = () => {
//     setShowModal(true);
//   };

//   const confirmEdit = () => {
//     setShowModal(false);
//     navigate(`/reviews/${review._id}/edit`);
//   };

//   return (
//     <>
//       <div className="rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md">
//         <h2 className="mb-2 text-xl font-semibold">{manuscript?.title}</h2>

//         <p className="mb-1 text-sm text-gray-600">
//           <strong>Author:</strong> {manuscript?.correspondingAuthor?.firstName}{" "}
//           {manuscript?.correspondingAuthor?.lastName}
//         </p>

//         <p className="mb-1 text-sm text-gray-600">
//           <strong>Status:</strong> {status}
//         </p>

//         <p className="text-xs text-gray-500">
//           Assigned On: {new Date(assignment.createdAt).toLocaleDateString()}
//         </p>

//         <div className="mt-4 flex flex-col gap-2">

//           {/* 1️⃣ No review yet → Review Now */}
//           {status === "accepted" && !review && (
//             <Link
//               to={`/reviews/${manuscript._id}/submit`}
//               className="rounded bg-blue-600 px-4 py-2 text-center text-white"
//             >
//               Review Now
//             </Link>
//           )}

//           {/* 2️⃣ Review exists & NOT submitted → Continue Editing */}
//           {review && review.status !== "submitted" && (
//             <Link
//               to={`/reviews/${review._id}/edit`}
//               className="rounded bg-yellow-600 px-4 py-2 text-center text-white"
//             >
//               Continue Editing
//             </Link>
//           )}

//           {/* 3️⃣ Review is submitted → VIEW + EDIT options */}
//           {review && review.status === "submitted" && (
//             <>
//               {/* View Review Button */}
//               <Link
//                 to={`/reviews/${review._id}`}
//                 className="rounded bg-green-600 px-4 py-2 text-center text-white"
//               >
//                 View Review
//               </Link>

//               {/* Edit Review Button with modal */}
//               <button
//                 onClick={handleEditRequest}
//                 className="rounded bg-purple-600 px-4 py-2 text-white"
//               >
//                 Edit Review
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* 🔥 CONFIRMATION MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
//             <h3 className="mb-4 text-lg font-semibold">Edit Submitted Review?</h3>

//             <p className="mb-4 text-sm text-gray-600">
//               This review has already been submitted.  
//               Editing should be done only after notifying the editor.  
//               Are you sure you want to continue?
//             </p>

//             <div className="mt-4 flex justify-center gap-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="rounded bg-gray-400 px-4 py-2 text-white"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={confirmEdit}
//                 className="rounded bg-purple-600 px-4 py-2 text-white"
//               >
//                 Yes, Edit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function ReviewCard({ assignment }) {
//   const { manuscript, status, review } = assignment;
//   const navigate = useNavigate();

//   const isSubmitted = review?.status === "submitted";
//   const isInProgress = review && review.status !== "submitted";

//   return (
//     <div className="rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md">
//       <h2 className="mb-2 text-xl font-semibold">{manuscript?.title}</h2>

//       <p className="mb-1 text-sm text-gray-600">
//         <strong>Status:</strong>{" "}
//         {status === "completed"
//           ? "Review Submitted"
//           : status === "accepted"
//           ? "Awaiting Review"
//           : status}
//       </p>

//       <div className="mt-4">
//         {/* CASE 1: accepted and no review → allow submission */}
//         {status === "accepted" && !review && (
//           <Link
//             to={`/reviews/${manuscript._id}/submit`}
//             className="rounded bg-blue-600 px-4 py-2 text-white"
//           >
//             Review Now
//           </Link>
//         )}

//         {/* CASE 2: review exists but NOT submitted → editing */}
//         {isInProgress && (
//           <Link
//             to={`/reviews/${review._id}/edit`}
//             className="rounded bg-yellow-600 px-4 py-2 text-white"
//           >
//             Continue Editing
//           </Link>
//         )}

//         {/* CASE 3: review submitted → View + Edit */}
//         {isSubmitted && (
//           <>
//             <Link
//               to={`/reviews/${review._id}`}
//               className="mr-2 rounded bg-green-600 px-4 py-2 text-white"
//             >
//               View Review
//             </Link>

//             <button
//               onClick={() =>
//                 navigate(`/reviews/${review._id}/edit`)
//               }
//               className="rounded bg-purple-600 px-4 py-2 text-white"
//             >
//               Edit Review
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, FileSignature } from "lucide-react";

export default function ReviewCard({ assignment }) {
  const { manuscript, status, review } = assignment;

  const isSubmitted = review?.status === "submitted";
  const isInProgress = review && review.status !== "submitted";

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Title */}
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        {manuscript?.title}
      </h2>

      {/* Status Badge */}
      <div className="mb-3">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium 
            ${
              status === "completed"
                ? "bg-green-100 text-green-700"
                : status === "accepted"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }
          `}
        >
          {status === "completed"
            ? "Review Submitted"
            : status === "accepted"
            ? "Awaiting Review"
            : status}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col gap-3">

        {/* Case 1: New review */}
        {status === "accepted" && !review && (
          <Link
            to={`/reviews/${manuscript._id}/submit`}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <FileSignature size={18} />
            Review Now
          </Link>
        )}

        {/* Case 2: Editing in progress */}
        {isInProgress && (
          <Link
            to={`/reviews/${review._id}/edit`}
            className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
          >
            <Pencil size={18} />
            Continue Editing
          </Link>
        )}

        {/* Case 3: Submitted review */}
        {isSubmitted && (
          <>
            <Link
              to={`/reviews/${review._id}`}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            >
              <Eye size={18} />
              View Review
            </Link>

            <p className="mt-2 text-[11px] leading-snug text-gray-500">
              ⭐ <strong>Note:</strong> This review has been submitted.<br />
              Further changes can only be made by the{" "}
              <strong>Editor-in-Chief</strong> or <strong>Admin</strong>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
