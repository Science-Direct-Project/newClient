import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Header from "./components/Header";
import JournalBanner from "./components/JournalBanner";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import FeedbackButton from "./components/FeedbackButton";

// Home Page Sections
import AboutJournal from "./components/AboutJournal";
import PublishingOptions from "./components/PublishingOptions";
import Timeline from "./components/Timeline";
import EditorInChief from "./components/EditorInChief";
import ArticlesSection from "./components/ArticlesSection";
import MoreFromIoT from "./components/MoreFromIoT";
import CallsForPapers from "./components/CallsForPapers";
import OpenCalls from "./components/OpenCalls";
import SpecialIssues from "./components/SpecialIssues";

// Pages
import AimsAndScope from "./components/AimsAndScope";
import GuideForAuthors from "./pages/publish/guide_for_authors";
import SubmitArticle from "./pages/submit_article/submit_article";
import AllIssues from "./pages/all_issues/AllIssues";
import LatestIssue from "./pages/latest_issue/LatestIssue";

// Home Page as a separate component for cleaner structure
const HomePage = () => {
  return (
    <>
      {/* AboutJournal and PublishingOptions side-by-side */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <div className="w-full lg:w-3/4">
          <AboutJournal />
        </div>
        <div className="w-full lg:w-1/4">
          <PublishingOptions />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="w-full lg:w-3/4 flex flex-col gap-10">
          <Timeline />
          <EditorInChief />
          <ArticlesSection />
          <MoreFromIoT />
          <CallsForPapers />
          <OpenCalls />
          <SpecialIssues />
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* Fixed Feedback Button */}
      <FeedbackButton />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="bg-light-gray font-inter min-h-screen flex flex-col">
        {/* Persistent Layout */}
        <Header />
        <JournalBanner />
        <NavBar />

        {/* Page Content */}
        <main className="w-full mt-8 flex-grow">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Other Pages */}
            <Route path="/aims-and-scope" element={<AimsAndScope />} />
            <Route path="/all-issues" element={<AllIssues />} />
            <Route path="/latest-issue" element={<LatestIssue />} />
            <Route path="/publish/guide-for-authors" element={<GuideForAuthors />} />
            <Route path="/submit-article" element={<SubmitArticle />} />
            <Route path="/guide_for_authors" element={<GuideForAuthors />} />
          </Routes>
        </main>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
