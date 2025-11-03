import React from 'react';
import Header from './components/Header';
import JournalBanner from './components/JournalBanner';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AboutJournal from './components/AboutJournal';
import PublishingOptions from './components/PublishingOptions';
import Timeline from './components/Timeline';
import EditorInChief from './components/EditorInChief';
import ArticlesSection from './components/ArticlesSection';
import MoreFromIoT from './components/MoreFromIoT';
import CallsForPapers from './components/CallsForPapers';
import OpenCalls from './components/OpenCalls';
import SpecialIssues from './components/SpecialIssues';
import Sidebar from './components/Sidebar';
import FeedbackButton from './components/FeedbackButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AimsAndScope from './components/AimsAndScope';

function App() {
  return (
    <Router>
      <div className="bg-light-gray font-inter">
        <Header />
        <JournalBanner />
        <NavBar />

        <main className="container mx-auto px-4 mt-8">
          <Routes>
            <Route path="/aims-and-scope" element={<AimsAndScope />} />
            <Route path="/" element={
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
                  {/* Fixed Feedback Button */}
                  <FeedbackButton />
                </div>
              </>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
