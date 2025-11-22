import React, { useState, useEffect, useRef } from 'react';

// --- Type Definitions ---

/**
 * Represents a single link in the navigation sidebar.
 */
interface NavLink {
  id: string;
  title: string;
}

/**
 * Represents a group of navigation links in the sidebar.
 */
interface NavGroup {
  groupTitle: string;
  links: NavLink[];
}

/**
 * Represents a subsection within a main content section.
 */
interface Subsection {
  id: string;
  title: string;
}

/**
 * Represents a main content section, which can optionally have subsections.
 */
interface ContentSection {
  id: string;
  title: string;
  subsections?: Subsection[];
}

// --- Component ---

/**
 * Main application component that renders the two-column article layout.
 * It features a sticky navigation sidebar and a scrollable main content area.
 *
 * - The sidebar links allow smooth scrolling to content sections.
 * - The active sidebar link is highlighted based on the visible content section,
 * now supporting nested subsections.
 */
export default function guide_for_author() {
  // State to keep track of the currently active section
  const [activeSection, setActiveSection] = useState<string>('guide-authors');
  
  // Ref for the main scrolling container (the <main> element)
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Ref for the IntersectionObserver instance
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Data for the sidebar navigation, structured into groups
  const navGroups: NavGroup[] = [
    {
      groupTitle: 'About the journal',
      links: [
        { id: 'aims-scope', title: 'Aims and scope' },
        { id: 'peer-review', title: 'Peer review' },
        { id: 'open-access', title: 'Open access' },
      ]
    },
    {
      groupTitle: 'Ethics and policies',
      links: [
        { id: 'ethics-publishing', title: 'Ethics in publishing' },
        { id: 'submission-declaration', title: 'Submission declaration' },
        { id: 'authorship', title: 'Authorship' },
        { id: 'changes-authorship', title: 'Changes to authorship' },
        { id: 'competing-interests', title: 'Declaration of competing interests' },
        { id: 'funding-sources', title: 'Funding sources' },
        { id: 'ai-use', title: 'Declaration of generative AI use' },
        { id: 'preprints', title: 'Preprints' },
        { id: 'inclusive-language', title: 'Use of inclusive language' },
        { id: 'sex-gender-analyses', title: 'Reporting sex- and gender-based analyses' },
        { id: 'jurisdictional-claims', title: 'Jurisdictional claims' },
      ]
    },
    {
      groupTitle: 'Writing and formatting',
      links: [
        { id: 'file-format', title: 'File format' },
        { id: 'latex', title: 'LaTeX' },
        { id: 'title-page', title: 'Title page' },
        { id: 'abstract', title: 'Abstract' },
        { id: 'keywords', title: 'Keywords' },
        { id: 'highlights', title: 'Highlights' },
        { id: 'graphical-abstract', title: 'Graphical abstract' },
        { id: 'units-classifications', title: 'Units, classifications codes and nomenclature' },
        { id: 'math-formulae', title: 'Math formulae' },
        { id: 'tables', title: 'Tables' },
        { id: 'figures-images', title: 'Figures, images and artwork' },
        { id: 'ai-figures', title: 'Generative AI and Figures, images and artwork' },
        { id: 'supplementary-material', title: 'Supplementary material' },
        { id: 'video', title: 'Video' },
      ]
    },
    {
      groupTitle: 'Research data',
      links: [
        { id: 'research-data', title: 'Research data' },
        { id: 'data-linking', title: 'Data linking' },
        { id: 'research-elements', title: 'Research Elements' },
        { id: 'co-submission', title: 'Co-submission of related data, methods or protocols' },
      ]
    },
    {
      groupTitle: 'Article structure',
      links: [
        { id: 'article-structure', title: 'Article structure' },
        { id: 'references', title: 'References' },
      ]
    },
    {
      groupTitle: 'Submitting your manuscript',
      links: [
        { id: 'submission-checklist', title: 'Submission checklist' },
        { id: 'submit-online', title: 'Submit online' },
       
      ]
    },
    {
      groupTitle: 'After receiving a final decision',
      links: [
        
        { id: 'article-transfer', title: 'Article Transfer Service' },
        { id: 'publishing-agreement', title: 'Publishing agreement' },
        { id: 'license-options', title: 'License options' },
        { id: 'permission-copyrighted', title: 'Permission for copyrighted works' },
        { id: 'proof-correction', title: 'Proof correction' },
        { id: 'offprints', title: 'Offprints' },
        { id: 'responsible-sharing', title: 'Responsible sharing' },
      ]
    },
    {
      groupTitle: 'Resources for authors',
      links: [
        { id: 'elsevier-academy', title: 'Elsevier Researcher Academy' },
        { id: 'language-editing', title: 'Language and editing services' },
        { id: 'getting-help', title: 'Getting help and support' },
        { id: 'author-support', title: 'Author support' },
      ]
    }
  ];

  // Data for the main content area, including subsections
  const contentSections: ContentSection[] = [
    { id: 'guide-authors', title: 'Guide for authors' },
    { id: 'about-journal', title: 'About the journal' },
    { id: 'aims-scope', title: 'Aims and scope' },
    { id: 'peer-review', title: 'Peer review' },
    { id: 'open-access', title: 'Open access' },
    { id: 'ethics-publishing', title: 'Ethics in publishing' },
    { id: 'submission-declaration', title: 'Submission declaration' },
    { id: 'authorship', title: 'Authorship' },
    { id: 'changes-authorship', title: 'Changes to authorship' },
    { id: 'competing-interests', title: 'Declaration of competing interests' },
    { id: 'funding-sources', title: 'Funding sources' },
    { id: 'ai-use', title: 'Declaration of generative AI use' },
    { id: 'preprints', title: 'Preprints' },
    { id: 'inclusive-language', title: 'Use of inclusive language' },
    { id: 'sex-gender-analyses', title: 'Reporting sex- and gender-based analyses' },
    { id: 'jurisdictional-claims', title: 'Jurisdictional claims' },
    { id: 'file-format', title: 'File format' },
    { id: 'latex', title: 'LaTeX' },
    { id: 'title-page', title: 'Title page' },
    { id: 'abstract', title: 'Abstract' },
    { id: 'keywords', title: 'Keywords' },
    { id: 'highlights', title: 'Highlights' },
    { id: 'graphical-abstract', title: 'Graphical abstract' },
    { id: 'units-classifications', title: 'Units, classifications codes and nomenclature' },
    { id: 'math-formulae', title: 'Math formulae' },
    { id: 'tables', title: 'Tables' },
    { id: 'figures-images', title: 'Figures, images and artwork' },
    { id: 'ai-figures', title: 'Generative AI and Figures, images and artwork' },
    { id: 'supplementary-material', title: 'Supplementary material' },
    { id: 'video', title: 'Video' },
    { id: 'research-data', title: 'Research data' },
    { id: 'data-linking', title: 'Data linking' },
    { id: 'research-elements', title: 'Research Elements' },
    { id: 'co-submission', title: 'Co-submission of related data, methods or protocols' },
    { id: 'article-structure', title: 'Article structure' },
    { id: 'references', title: 'References' },
    { id: 'submission-checklist', title: 'Submission checklist' },
    { id: 'submit-online', title: 'Submit online' },
    { id: 'after-decision', title: 'After receiving a final decision' },
    { id: 'article-transfer', title: 'Article Transfer Service' },
    { id: 'publishing-agreement', title: 'Publishing agreement' },
    { id: 'license-options', title: 'License options' },
    { id: 'permission-copyrighted', title: 'Permission for copyrighted works' },
    { id: 'proof-correction', title: 'Proof correction' },
    { id: 'offprints', title: 'Offprints' },
    { id: 'responsible-sharing', title: 'Responsible sharing' },
    { id: 'elsevier-academy', title: 'Elsevier Researcher Academy' },
    { id: 'language-editing', title: 'Language and editing services' },
    { id: 'getting-help', title: 'Getting help and support' },
    { id: 'author-support', title: 'Author support' },
  ];

  /**
   * Sets up the IntersectionObserver to watch all content sections.
   * This effect runs once on component mount.
   */
  useEffect(() => {
    const mainEl = mainContentRef.current;
    if (!mainEl) return;

    // 1. Get all section IDs in document order (main sections and subsections)
    const sectionIds: string[] = [];
    contentSections.forEach(item => {
      sectionIds.push(item.id);
      if (item.subsections) {
        item.subsections.forEach(subItem => {
          sectionIds.push(subItem.id);
        });
      }
    });

    // 2. Set up observer
    // This set stores all sections currently in the "trigger zone" (top 20% of viewport)
    const intersectingSections = new Set<string>();

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          intersectingSections.add(entry.target.id);
        } else {
          intersectingSections.delete(entry.target.id);
        }
      });

      // Find the topmost intersecting section by checking IDs in document order
      for (const id of sectionIds) {
        if (intersectingSections.has(id)) {
          setActiveSection(id);
          break; // Stop at the first (highest) one
        }
      }
    };

    // Observer options:
    // root: The main content ref is the scrollable container.
    // rootMargin: Triggers when a section is in the top 20% of the container.
    const options: IntersectionObserverInit = {
      root: mainEl,
      rootMargin: '0px 0px -80% 0px', // -80% bottom margin
      threshold: 0
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    // 3. Observe all <section> elements
    const sections = Array.from(mainEl.querySelectorAll('section'));
    
    sections.forEach(section => {
      if (section) observerRef.current?.observe(section);
    });

    // Cleanup function: disconnect the observer
    return () => {
      sections.forEach(section => {
        if (section && observerRef.current) {
          observerRef.current.unobserve(section);
        }
      });
      intersectingSections.clear();
    };
  }, []); // contentSections is stable, so empty dependency array is fine.

  /**
   * Handles smooth scrolling to a specific section.
   * @param {string} id - The ID of the section to scroll to.
   */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use modern scrollIntoView with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Aligns the top of the element to the top of the container
      });
    }
  };

  /**
   * A component to render placeholder content for each section.
   */
  const PlaceholderContent = (): React.ReactElement => (
    <div className="space-y-5 text-gray-700 leading-relaxed">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    </div>
  );

  return (
    // Main container with flex and margins on all sides
    <div className="flex font-sans bg-white min-h-screen mb-8 mr-32 ml-32 gap-12">
      
      {/* Left Sidebar Navigation */}
      <nav className="w-full md:w-80 bg-gray-100 p-8 md:sticky md:top-0 md:h-screen md:overflow-y-auto border-b md:border-b-0 md:border-r border-gray-300 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Guide for authors</h1>
        <div className="space-y-6">
          {navGroups.map(group => (
            <div key={group.groupTitle}>
              <a
                href={`#${group.links[0].id}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection(group.links[0].id);
                }}
                className="text-sm font-bold text-blue-700 mb-3 block transition-all duration-200 no-underline hover:underline hover:decoration-orange-500 hover:decoration-2 hover:underline-offset-4"
              >
                {group.groupTitle}
              </a>
              <ul className="space-y-0 list-disc pl-5 marker:text-blue-400">
                {group.links.map(link => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className={`text-sm transition-all duration-200 no-underline ${
                        activeSection === link.id
                          ? 'text-blue-700 font-semibold hover:underline hover:decoration-orange-500 hover:decoration-2 hover:underline-offset-4'
                          : 'text-blue-600 hover:underline hover:decoration-orange-500 hover:decoration-2 hover:underline-offset-4'
                      }`}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col text-sm">
        {/* Top action buttons */}
        <div className="sticky top-0 bg-white border-b border-gray-200 pl-20 pr-8 py-4 flex justify-end gap-4 z-10">
          <button className="px-6 py-2 text-blue-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
            Print Guide as PDF
          </button>
          <button className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded hover:bg-blue-50 transition-colors text-sm font-medium">
            Compare journals ↗
          </button>
        </div>

        {/* Main Content Area */}
        <main 
          ref={mainContentRef} 
          className="flex-1 md:h-screen md:overflow-y-auto scroll-smooth"
        >
          {/* Content sections with margins bottom, left and right */}
          <div className="pl-20 pr-8 pt-16 pb-12">
            {contentSections.map(item => (
              // Each Main Content Section
              <section 
                key={item.id} 
                id={item.id} 
                className="mb-16 scroll-mt-20"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {item.title}
                </h2>
                <PlaceholderContent />

                {/* Render Subsections if they exist */}
                {item.subsections && (
                  <div className="space-y-12 mt-12">
                    {item.subsections.map(subItem => (
                      <section
                        key={subItem.id}
                        id={subItem.id}
                        className="scroll-mt-20"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {subItem.title}
                        </h3>
                        <PlaceholderContent />
                      </section>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}