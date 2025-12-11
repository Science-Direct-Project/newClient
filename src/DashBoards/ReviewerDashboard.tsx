// // // import React, { useEffect, useState } from "react";
// // // import { reviewService } from "../services/reviewService";
// // // import ReviewCard from "../components/ReviewCard";

// // // export default function ReviewerDashboard() {
// // //   const [assignments, setAssignments] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     (async () => {
// // //       try {
// // //         const res = await reviewService.getMyReviews();
// // //         setAssignments(res.data.data.assignments || []);
// // //       } catch (err) {
// // //         console.error(err);
// // //         alert("Failed to load assignments");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     })();
// // //   }, []);

// // //   if (loading) return <div className="p-6 text-center">Loading assignments...</div>;

// // //   return (
// // //     <div className="mx-auto max-w-5xl p-6">
// // //       <h2 className="mb-6 text-2xl font-bold">My Review Assignments</h2>

// // //       {assignments.length === 0 ? (
// // //         <div className="text-center text-gray-600">No review assignments yet.</div>
// // //       ) : (
// // //         <div className="grid grid-cols-1 gap-4">
// // //           {assignments.map((assign) => (
// // //             <ReviewCard key={assign._id} assignment={assign} />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }



// // import React, { useEffect, useState } from "react";
// // import { reviewService } from "../services/reviewService";
// // import ReviewCard from "../components/ReviewCard";
// // import { Search, BarChart3 } from "lucide-react";

// // export default function ReviewerDashboard() {
// //   const [assignments, setAssignments] = useState([]);
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const [search, setSearch] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("");

// //   useEffect(() => {
// //     loadDashboardData();
// //   }, [statusFilter]);

// //   const loadDashboardData = async () => {
// //     try {
// //       const [assignRes, statsRes] = await Promise.all([
// //         reviewService.getMyReviews({ status: statusFilter }),
// //         reviewService.getStatistics(),
// //       ]);

// //       setAssignments(assignRes.data.data.assignments || []);
// //       setStats(statsRes.data.data.statistics);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to load dashboard");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // FILTERED LIST (search + status)
// //   const filteredAssignments = assignments.filter((a) =>
// //     a.manuscript.title.toLowerCase().includes(search.toLowerCase())
// //   );

// //   if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

// //   return (
// //     <div className="mx-auto max-w-5xl space-y-8 p-6">

// //       {/* -------------------------- */}
// //       {/*       STATS SECTION        */}
// //       {/* -------------------------- */}
// //       <div>
// //         <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
// //           <BarChart3 size={22} /> Reviewer Dashboard
// //         </h2>

// //         {stats && (
// //           <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
// //             <StatCard label="Total Assignments" value={stats.totalAssignments} color="blue" />
// //             <StatCard label="Pending" value={stats.pendingAssignments} color="yellow" />
// //             <StatCard label="Completed" value={stats.completedAssignments} color="green" />
// //             <StatCard label="Acceptance Rate" value={`${stats.acceptanceRate.toFixed(1)}%`} color="purple" />
// //             <StatCard label="Avg Score" value={stats.averageScore.toFixed(2)} color="indigo" />
// //             <StatCard label="Avg Response Time" value={`${stats.averageResponseTime.toFixed(1)} days`} color="red" />
// //           </div>
// //         )}
// //       </div>

// //       {/* -------------------------- */}
// //       {/*   SEARCH + FILTER BAR      */}
// //       {/* -------------------------- */}
// //       <div className="flex flex-col items-center justify-between gap-3 md:flex-row">

// //         {/* Search */}
// //         <div className="relative w-full md:w-1/2">
// //           <Search className="absolute left-2 top-2.5 text-gray-500" size={18} />
// //           <input
// //             type="text"
// //             placeholder="Search manuscript title..."
// //             className="w-full rounded border py-2 pl-8 pr-3"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>

// //         {/* Status Filter */}
// //         <select
// //           value={statusFilter}
// //           onChange={(e) => setStatusFilter(e.target.value)}
// //           className="rounded border px-3 py-2"
// //         >
// //           <option value="">All Status</option>
// //           <option value="pending">Pending</option>
// //           <option value="accepted">Accepted</option>
// //           <option value="completed">Completed</option>
// //         </select>
// //       </div>

// //       {/* -------------------------- */}
// //       {/*     ASSIGNMENTS LIST       */}
// //       {/* -------------------------- */}
// //       <div>
// //         <h3 className="mb-4 text-xl font-semibold">My Review Assignments</h3>

// //         {filteredAssignments.length === 0 ? (
// //           <div className="text-center text-gray-600">No assignments found.</div>
// //         ) : (
// //           <div className="grid grid-cols-1 gap-4">
// //             {filteredAssignments.map((assign) => (
// //               <ReviewCard key={assign._id} assignment={assign} />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // ---------------------------------------------------
// // // STAT CARD COMPONENT
// // // ---------------------------------------------------
// // function StatCard({ label, value, color }) {
// //   const colors = {
// //     blue: "bg-blue-100 text-blue-700",
// //     yellow: "bg-yellow-100 text-yellow-700",
// //     green: "bg-green-100 text-green-700",
// //     purple: "bg-purple-100 text-purple-700",
// //     indigo: "bg-indigo-100 text-indigo-700",
// //     red: "bg-red-100 text-red-700",
// //   };

// //   return (
// //     <div className={`rounded-lg p-4 shadow-sm border ${colors[color]}`}>
// //       <p className="text-sm font-medium">{label}</p>
// //       <h3 className="mt-1 text-xl font-bold">{value}</h3>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import { reviewService } from "../services/reviewService";
// import ReviewCard from "../components/ReviewCard";
// import { Search, BarChart3 } from "lucide-react";

// export default function ReviewerDashboard() {
//   const [assignments, setAssignments] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   useEffect(() => {
//     loadDashboardData();
//   }, [statusFilter]);

//   const loadDashboardData = async () => {
//     try {
//       const mappedStatus =
//         statusFilter === "awaiting" ? "accepted" :
//         statusFilter === "submitted" ? "completed" :
//         statusFilter === "pending" ? "pending" : "";

//       const [assignRes, statsRes] = await Promise.all([
//         reviewService.getMyReviews({ status: mappedStatus }),
//         reviewService.getStatistics(),
//       ]);

//       setAssignments(assignRes.data.data.assignments || []);
//       setStats(statsRes.data.data.statistics);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredAssignments = assignments.filter((a) =>
//     a.manuscript.title.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

//   return (
//     <div className="mx-auto max-w-5xl space-y-8 p-6">

//       {/* Dashboard Title */}
//       <div>
//         <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
//           <BarChart3 size={22} /> Reviewer Dashboard
//         </h2>

//         {stats && (
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
//             <StatCard label="Total Assignments" value={stats.totalAssignments} color="blue" />
//             <StatCard label="Awaiting Review" value={stats.pendingAssignments} color="yellow" />
//             <StatCard label="Review Submitted" value={stats.completedAssignments} color="green" />
//             <StatCard label="Acceptance Rate" value={`${stats.acceptanceRate.toFixed(1)}%`} color="purple" />
//             <StatCard label="Avg Score" value={stats.averageScore.toFixed(2)} color="indigo" />
//             <StatCard label="Avg Response Time" value={`${stats.averageResponseTime.toFixed(1)} days`} color="red" />
//           </div>
//         )}
//       </div>

//       {/* Search + Status Filter */}
//       <div className="flex flex-col items-center justify-between gap-3 md:flex-row">

//         {/* Search Box */}
//         <div className="relative w-full md:w-1/2">
//           <Search className="absolute left-2 top-2.5 text-gray-500" size={18} />
//           <input
//             type="text"
//             placeholder="Search manuscript title..."
//             className="w-full rounded border py-2 pl-8 pr-3"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* FILTER */}
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="rounded border px-3 py-2"
//         >
//           <option value="">All Status</option>
//           <option value="awaiting">Awaiting Review</option>
//           <option value="submitted">Review Submitted</option>
//         </select>
//       </div>

//       {/* Assignment List */}
//       <div>
//         <h3 className="mb-4 text-xl font-semibold">My Review Assignments</h3>

//         {filteredAssignments.length === 0 ? (
//           <div className="text-center text-gray-600">No assignments found.</div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4">
//             {filteredAssignments.map((assign) => (
//               <ReviewCard key={assign._id} assignment={assign} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Stat Card Component
// function StatCard({ label, value, color }) {
//   const colors = {
//     blue: "bg-blue-100 text-blue-700",
//     yellow: "bg-yellow-100 text-yellow-700",
//     green: "bg-green-100 text-green-700",
//     purple: "bg-purple-100 text-purple-700",
//     indigo: "bg-indigo-100 text-indigo-700",
//     red: "bg-red-100 text-red-700",
//   };

//   return (
//     <div className={`rounded-lg p-4 shadow-sm border ${colors[color]}`}>
//       <p className="text-sm font-medium">{label}</p>
//       <h3 className="mt-1 text-xl font-bold">{value}</h3>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { reviewService } from "../services/reviewService";
// import ReviewCard from "../components/ReviewCard";
// import { Search, BarChart3 } from "lucide-react";

// export default function ReviewerDashboard() {
//   const [assignments, setAssignments] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   useEffect(() => {
//     loadDashboardData();
//   }, [statusFilter]);

//   const loadDashboardData = async () => {
//     try {
//       const mappedStatus =
//         statusFilter === "awaiting"
//           ? "accepted"
//           : statusFilter === "submitted"
//           ? "completed"
//           : "";

//       const [assignRes, statsRes] = await Promise.all([
//         reviewService.getMyReviews({ status: mappedStatus }),
//         reviewService.getStatistics(),
//       ]);

//       const fetchedAssignments = assignRes.data.data.assignments || [];
//       setAssignments(fetchedAssignments);

//       const backendStats = statsRes.data.data.statistics;

//       // 🟢 FIX: Recalculate correct values based on real reviewer states
//       const awaiting = fetchedAssignments.filter((a) => a.status === "accepted").length;
//       const submitted = fetchedAssignments.filter((a) => a.status === "completed").length;

//       setStats({
//         ...backendStats,
//         awaitingReview: awaiting,
//         submittedReview: submitted,
//         averageScore: backendStats.averageScore || 0,
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredAssignments = assignments.filter((a) =>
//     a.manuscript.title.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

//   return (
//     <div className="mx-auto max-w-5xl space-y-8 p-6">

//       {/* Dashboard Title */}
//       <div>
//         <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
//           <BarChart3 size={22} /> Reviewer Dashboard
//         </h2>

//         {stats && (
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
//             <StatCard label="Total Assignments" value={stats.totalAssignments} color="blue" />
//             <StatCard label="Awaiting Review" value={stats.awaitingReview} color="yellow" />
//             <StatCard label="Review Submitted" value={stats.submittedReview} color="green" />
//             <StatCard
//               label="Acceptance Rate"
//               value={`${stats.acceptanceRate.toFixed(1)}%`}
//               color="purple"
//             />
//             <StatCard
//               label="Avg Score"
//               value={stats.averageScore.toFixed(2)}
//               color="indigo"
//             />
//           </div>
//         )}
//       </div>

//       {/* Search + Status Filter */}
//       <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
//         <div className="relative w-full md:w-1/2">
//           <Search className="absolute left-2 top-2.5 text-gray-500" size={18} />
//           <input
//             type="text"
//             placeholder="Search manuscript title..."
//             className="w-full rounded border py-2 pl-8 pr-3"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="rounded border px-3 py-2"
//         >
//           <option value="">All Status</option>
//           <option value="awaiting">Awaiting Review</option>
//           <option value="submitted">Review Submitted</option>
//         </select>
//       </div>

//       {/* Assignment List */}
//       <div>
//         <h3 className="mb-4 text-xl font-semibold">My Review Assignments</h3>

//         {filteredAssignments.length === 0 ? (
//           <div className="text-center text-gray-600">No assignments found.</div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4">
//             {filteredAssignments.map((assign) => (
//               <ReviewCard key={assign._id} assignment={assign} />
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// function StatCard({ label, value, color }) {
//   const colors = {
//     blue: "bg-blue-100 text-blue-700",
//     yellow: "bg-yellow-100 text-yellow-700",
//     green: "bg-green-100 text-green-700",
//     purple: "bg-purple-100 text-purple-700",
//     indigo: "bg-indigo-100 text-indigo-700",
//   };

//   return (
//     <div className={`rounded-lg p-4 shadow-sm border ${colors[color]}`}>
//       <p className="text-sm font-medium">{label}</p>
//       <h3 className="mt-1 text-xl font-bold">{value}</h3>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { reviewService } from "../services/reviewService";
import ReviewCard from "../components/ReviewCard";
import { Search, BarChart3 } from "lucide-react";

export default function ReviewerDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, [statusFilter]);

  const loadDashboardData = async () => {
    try {
      const mappedStatus =
        statusFilter === "awaiting"
          ? "accepted"
          : statusFilter === "submitted"
          ? "completed"
          : "";

      const [assignRes, statsRes] = await Promise.all([
        reviewService.getMyReviews({ status: mappedStatus }),
        reviewService.getStatistics(),
      ]);

      const fetchedAssignments = assignRes.data.data.assignments || [];
      setAssignments(fetchedAssignments);

      const backendStats = statsRes.data.data.statistics;

      // --------------------------------------------
      // ⭐ FRONTEND-CALCULATED STATS (NO BACKEND EDIT)
      // --------------------------------------------

      const submittedReviews = fetchedAssignments.filter(
        (a) => a.status === "completed"
      );

      // Avg Score
      const avgScore =
        submittedReviews.length > 0
          ? (
              submittedReviews.reduce(
                (sum, a) => sum + (a.review?.overallScore || 0),
                0
              ) / submittedReviews.length
            ).toFixed(2)
          : "N/A";

      // Fastest Review Time (in hours)
      const fastestReview =
        submittedReviews.length > 0
          ? Math.min(
              ...submittedReviews.map(
                (a) =>
                  (new Date(a.review.submittedDate) -
                    new Date(a.createdAt)) /
                  (1000 * 60 * 60)
              )
            ).toFixed(1)
          : "N/A";

      // Score Distribution
      const distribution = {};
      submittedReviews.forEach((a) => {
        const rec = a.review?.recommendation || "unknown";
        distribution[rec] = (distribution[rec] || 0) + 1;
      });

      // Most Reviewed Domain
      const domainCount = {};
      submittedReviews.forEach((a) => {
        const domain = a.manuscript?.domain || "Unknown";
        domainCount[domain] = (domainCount[domain] || 0) + 1;
      });

      const topDomain =
        Object.keys(domainCount).length > 0
          ? Object.entries(domainCount).sort((a, b) => b[1] - a[1])[0][0]
          : "N/A";

      setStats({
        ...backendStats,
        awaitingReview: fetchedAssignments.filter((a) => a.status === "accepted").length,
        submittedReview: submittedReviews.length,
        frontendAvgScore: avgScore,
        fastestReview,
        scoreDistribution: distribution,
        topDomain,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter((a) =>
    a.manuscript.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      {/* Dashboard Title */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <BarChart3 size={22} /> Reviewer Dashboard
        </h2>

        {stats && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Total Assignments" value={stats.totalAssignments} color="blue" />
            <StatCard label="Awaiting Review" value={stats.awaitingReview} color="yellow" />
            <StatCard label="Reviews Submitted" value={stats.submittedReview} color="green" />

            <StatCard label="Avg Score" value={stats.frontendAvgScore} color="indigo" />
            <StatCard label="Fastest Review (hrs)" value={stats.fastestReview} color="orange" />
            <StatCard label="Top Domain Reviewed" value={stats.topDomain} color="purple" />
          </div>
        )}
      </div>

      {/* Score Distribution */}
      {stats && (
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-3 text-lg font-semibold">Score / Recommendation Summary</h3>

          {Object.keys(stats.scoreDistribution).length === 0 ? (
            <p className="text-sm text-gray-600">No reviews submitted yet</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(stats.scoreDistribution).map(([rec, count]) => (
                <div key={rec} className="flex justify-between rounded bg-gray-50 px-3 py-2">
                  <span className="capitalize">{rec.replace("_", " ")}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search + Filters */}
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-2 top-2.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search manuscript title..."
            className="w-full rounded border py-2 pl-8 pr-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="awaiting">Awaiting Review</option>
          <option value="submitted">Review Submitted</option>
        </select>
      </div>

      {/* Review Assignment Cards */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">My Review Assignments</h3>

        {filteredAssignments.length === 0 ? (
          <div className="text-center text-gray-600">No assignments found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAssignments.map((assign) => (
              <ReviewCard key={assign._id} assignment={assign} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    green: "bg-green-50 text-green-700 border-green-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-300",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${colors[color]}`}>
      <p className="text-sm opacity-70">{label}</p>
      <h3 className="mt-1 text-2xl font-bold">{value}</h3>
    </div>
  );
}
