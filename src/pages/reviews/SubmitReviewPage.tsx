// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { reviewService } from "../../services/reviewService";
// import ScoreInput from "../../components/ScoreInput";

// export default function SubmitReviewPage() {
//   const { manuscriptId, reviewId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);

//   const [scores, setScores] = useState({
//     originality: 3,
//     methodology: 3,
//     contribution: 3,
//     clarity: 3,
//     references: 3,
//   });

//   const [commentsToAuthor, setCommentsToAuthor] = useState("");
//   const [commentsToEditor, setCommentsToEditor] = useState("");
//   const [confidentialComments, setConfidentialComments] = useState("");
//   const [recommendation, setRecommendation] = useState("minor_revisions");

//   useEffect(() => {
//     if (reviewId) {
//       // edit mode
//       (async () => {
//         try {
//           const res = await reviewService.getReviewDetails(reviewId);
//           const r = res.data.data.review;

//           setScores(r.scores);
//           setCommentsToAuthor(r.commentsToAuthor || "");
//           setCommentsToEditor(r.commentsToEditor || "");
//           setConfidentialComments(r.confidentialComments || "");
//           setRecommendation(r.recommendation);
//         } catch (err) {
//           alert("Failed to load review!");
//         } finally {
//           setLoading(false);
//         }
//       })();
//     } else {
//       setLoading(false); // submit mode
//     }
//   }, [reviewId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       scores,
//       commentsToAuthor,
//       commentsToEditor,
//       confidentialComments,
//       recommendation,
//     };

//     try {
//       if (manuscriptId) {
//         await reviewService.submitReview(manuscriptId, payload);
//         alert("Review submitted!");
//       } else {
//         await reviewService.updateReview(reviewId, payload);
//         alert("Review updated!");
//       }

//       navigate("/reviewer-dashboard");
//     } catch (err) {
//       alert(err?.response?.data?.message || "Something went wrong!");
//     }
//   };

//   if (loading) return <div className="p-6 text-center">Loading review...</div>;

//   return (
//     <div className="mx-auto max-w-3xl p-6">
//       <h2 className="mb-4 text-2xl font-bold">
//         {reviewId ? "Edit Your Review" : "Submit Review"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Score Inputs */}
//         {Object.keys(scores).map((key) => (
//           <ScoreInput
//             key={key}
//             label={key}
//             value={scores[key]}
//             onChange={(v) => setScores({ ...scores, [key]: v })}
//           />
//         ))}

//         <textarea
//           placeholder="Comments to Author (required)"
//           className="w-full rounded border p-2"
//           rows="5"
//           required
//           value={commentsToAuthor}
//           onChange={(e) => setCommentsToAuthor(e.target.value)}
//         />

//         <textarea
//           placeholder="Comments to Editor (optional)"
//           className="w-full rounded border p-2"
//           rows="3"
//           value={commentsToEditor}
//           onChange={(e) => setCommentsToEditor(e.target.value)}
//         />

//         <textarea
//           placeholder="Confidential Comments (editor-only)"
//           className="w-full rounded border p-2"
//           rows="3"
//           value={confidentialComments}
//           onChange={(e) => setConfidentialComments(e.target.value)}
//         />

//         <select
//           className="w-full rounded border p-2"
//           value={recommendation}
//           onChange={(e) => setRecommendation(e.target.value)}
//         >
//           <option value="accept">Accept</option>
//           <option value="minor_revisions">Minor Revisions</option>
//           <option value="major_revisions">Major Revisions</option>
//           <option value="reject">Reject</option>
//         </select>

//         <button className="rounded bg-blue-600 px-4 py-2 text-white">
//           {reviewId ? "Update Review" : "Submit Review"}
//         </button>
//       </form>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { reviewService } from "../../services/reviewService";
// import ScoreInput from "../../components/ScoreInput";

// export default function SubmitReviewPage() {
//   const { manuscriptId, reviewId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);

//   const [scores, setScores] = useState({
//     originality: 3,
//     methodology: 3,
//     contribution: 3,
//     clarity: 3,
//     references: 3,
//   });

//   const [commentsToAuthor, setCommentsToAuthor] = useState("");
//   const [commentsToEditor, setCommentsToEditor] = useState("");
//   const [confidentialComments, setConfidentialComments] = useState("");
//   const [recommendation, setRecommendation] = useState("minor_revisions");

//   // ------------------------------------
//   // LOAD REVIEW IN EDIT MODE
//   // ------------------------------------
//   useEffect(() => {
//     if (reviewId) {
//       (async () => {
//         try {
//           const res = await reviewService.getReviewDetails(reviewId);
//           const r = res.data.data.review;

//           setScores(r.scores || scores);
//           setCommentsToAuthor(r.commentsToAuthor || "");
//           setCommentsToEditor(r.commentsToEditor || "");
//           setConfidentialComments(r.confidentialComments || "");
//           setRecommendation(r.recommendation || "minor_revisions");
//         } catch (err) {
//           alert("Failed to load review!");
//         } finally {
//           setLoading(false);
//         }
//       })();
//     } else {
//       setLoading(false);
//     }
//   }, [reviewId]);

//   // ------------------------------------
//   // SUBMIT / UPDATE REVIEW LOGIC
//   // ------------------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       scores,
//       commentsToAuthor,
//       commentsToEditor,
//       confidentialComments,
//       recommendation,
//     };

//     try {
//       if (reviewId) {
//         // EDIT MODE
//         await reviewService.updateReview(reviewId, payload);
//         alert("Review updated!");
//       } else {
//         // FIRST SUBMISSION
//         await reviewService.submitReview(manuscriptId, payload);
//         alert("Review submitted!");
//       }

//       navigate("/reviewer-dashboard");
//     } catch (err) {
//       alert(err?.response?.data?.message || "Something went wrong!");
//     }
//   };

//   if (loading) return <div className="p-6 text-center">Loading review...</div>;

//   return (
//     <div className="mx-auto max-w-3xl p-6">
//       <h2 className="mb-4 text-2xl font-bold">
//         {reviewId ? "Edit Your Review" : "Submit Review"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Score Inputs */}
//         {Object.keys(scores).map((key) => (
//           <ScoreInput
//             key={key}
//             label={key}
//             value={scores[key]}
//             onChange={(v) => setScores({ ...scores, [key]: v })}
//           />
//         ))}

//         <textarea
//           placeholder="Comments to Author (required)"
//           className="w-full rounded border p-2"
//           rows="5"
//           required
//           value={commentsToAuthor}
//           onChange={(e) => setCommentsToAuthor(e.target.value)}
//         />

//         <textarea
//           placeholder="Comments to Editor (optional)"
//           className="w-full rounded border p-2"
//           rows="3"
//           value={commentsToEditor}
//           onChange={(e) => setCommentsToEditor(e.target.value)}
//         />

//         <textarea
//           placeholder="Confidential Comments (editor-only)"
//           className="w-full rounded border p-2"
//           rows="3"
//           value={confidentialComments}
//           onChange={(e) => setConfidentialComments(e.target.value)}
//         />

//         <select
//           className="w-full rounded border p-2"
//           value={recommendation}
//           onChange={(e) => setRecommendation(e.target.value)}
//         >
//           <option value="accept">Accept</option>
//           <option value="minor_revisions">Minor Revisions</option>
//           <option value="major_revisions">Major Revisions</option>
//           <option value="reject">Reject</option>
//         </select>

//         <button className="rounded bg-blue-600 px-4 py-2 text-white">
//           {reviewId ? "Update Review" : "Submit Review"}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reviewService } from "../../services/reviewService";
import ScoreInput from "../../components/ScoreInput";

export default function SubmitReviewPage() {
  const { manuscriptId, reviewId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [scores, setScores] = useState({
    originality: 3,
    methodology: 3,
    contribution: 3,
    clarity: 3,
    references: 3,
  });

  const [commentsToAuthor, setCommentsToAuthor] = useState("");
  const [commentsToEditor, setCommentsToEditor] = useState("");
  const [confidentialComments, setConfidentialComments] = useState("");
  const [recommendation, setRecommendation] = useState("minor_revisions");

  // ---------------------------------------------------
  // LOAD REVIEW IF EDIT MODE
  // ---------------------------------------------------
  useEffect(() => {
    if (!reviewId) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await reviewService.getReviewDetails(reviewId);
        const r = res.data.data.review;

        setScores(r.scores || {});
        setCommentsToAuthor(r.commentsToAuthor || "");
        setCommentsToEditor(r.commentsToEditor || "");
        setConfidentialComments(r.confidentialComments || "");
        setRecommendation(r.recommendation || "minor_revisions");
      } catch (err) {
        alert("Failed to load review!");
      } finally {
        setLoading(false);
      }
    })();
  }, [reviewId]);

  // ---------------------------------------------------
  // SUBMIT OR UPDATE REVIEW
  // ---------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      scores,
      commentsToAuthor,
      commentsToEditor,
      confidentialComments,
      recommendation,
    };

    try {
      if (reviewId) {
        // EDIT MODE (PUT)
        await reviewService.updateReview(reviewId, payload);
        alert("Review updated!");
      } else {
        // FIRST TIME SUBMISSION (POST)
        await reviewService.submitReview(manuscriptId, payload);
        alert("Review submitted!");
      }

      navigate("/reviewer-dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong!");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading review...</div>;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="mb-4 text-2xl font-bold">
        {reviewId ? "Edit Your Review" : "Submit Review"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Scores */}
        {Object.keys(scores).map((key) => (
          <ScoreInput
            key={key}
            label={key}
            value={scores[key]}
            onChange={(v) => setScores({ ...scores, [key]: v })}
          />
        ))}

        <textarea
          placeholder="Comments to Author (required)"
          className="w-full rounded border p-2"
          rows="5"
          required
          value={commentsToAuthor}
          onChange={(e) => setCommentsToAuthor(e.target.value)}
        />

        <textarea
          placeholder="Comments to Editor (optional)"
          className="w-full rounded border p-2"
          rows="3"
          value={commentsToEditor}
          onChange={(e) => setCommentsToEditor(e.target.value)}
        />

        <textarea
          placeholder="Confidential Comments (editor-only)"
          className="w-full rounded border p-2"
          rows="3"
          value={confidentialComments}
          onChange={(e) => setConfidentialComments(e.target.value)}
        />

        <select
          className="w-full rounded border p-2"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
        >
          <option value="accept">Accept</option>
          <option value="minor_revisions">Minor Revisions</option>
          <option value="major_revisions">Major Revisions</option>
          <option value="reject">Reject</option>
        </select>

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          type="submit"
        >
          {reviewId ? "Update Review" : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
