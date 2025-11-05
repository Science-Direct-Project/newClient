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
  const [activeSection, setActiveSection] = useState<string>('abstract');
  
  // Ref for the main scrolling container (the <main> element)
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Ref for the IntersectionObserver instance
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Data for the sidebar navigation, structured into groups
  const navGroups: NavGroup[] = [
    {
      groupTitle: 'Article Outline',
      links: [
        { id: 'abstract', title: 'Abstract' },
        { id: 'keywords', title: 'Keywords' },
        { id: 'introduction', title: '1. Introduction' },
      ]
    },
    {
      groupTitle: 'Core Research',
      links: [
        { id: 'related-work', title: '2. Related work' },
        { id: 'conceptual-model', title: '3. Conceptual model and hypotheses' },
        { id: 'methodology', title: '4. Methodology' },
        { id: 'results', title: '5. Results' },
        { id: 'discussion', title: '6. Discussion' },
        { id: 'conclusion', title: '7. Conclusion and limitations' },
      ]
    },
    {
      groupTitle: 'Declarations & Extras',
      links: [
        { id: 'cr-author-statement', title: 'CRediT authorship contribution' },
        { id: 'declaration', title: 'Declaration of Competing Interest' },
        { id: 'acknowledgment', title: 'Acknowledgment' },
        { id: 'references', title: 'References' },
      ]
    }
  ];

  // Data for the main content area, including subsections
  const contentSections: ContentSection[] = [
    { id: 'abstract', title: 'Abstract' },
    { id: 'keywords', title: 'Keywords' },
    { id: 'introduction', title: '1. Introduction' },
    { 
      id: 'related-work', 
      title: '2. Related work', 
      subsections: [
        { id: 'related-work-sub1', title: '2.1. First related work' },
        { id: 'related-work-sub2', title: '2.2. Second related work' },
      ] 
    },
    { 
      id: 'conceptual-model', 
      title: '3. Conceptual model and hypotheses development', 
      subsections: [
        { id: 'conceptual-model-sub1', title: '3.1. Conceptual model' },
        { id: 'conceptual-model-sub2', title: '3.2. Hypotheses development' },
        { id: 'conceptual-model-sub3', title: '3.3. Third hypothesis' },
      ] 
    },
    { id: 'methodology', title: '4. Methodology' },
    { id: 'results', title: '5. Results' },
    { id: 'discussion', title: '6. Discussion' },
    { id: 'conclusion', title: '7. Conclusion and limitations' },
    { id: 'cr-author-statement', title: 'CRediT authorship contribution statement' },
    { id: 'declaration', title: 'Declaration of Competing Interest' },
    { id: 'acknowledgment', title: 'Acknowledgment' },
    { id: 'references', title: 'References' },
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
    // Main container
    <div className="flex flex-col md:flex-row font-sans bg-white min-h-screen">
      
      {/* Sidebar Navigation */}
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
                className="text-sm font-bold text-blue-700 hover:underline mb-3 block"
              >
                {group.groupTitle}
              </a>
              <ul className="space-y-2 list-disc pl-5">
                {group.links.map(link => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className={`text-sm transition-all duration-200 ${
                        activeSection === link.id
                          ? 'text-blue-700 font-semibold'
                          : 'text-blue-600 hover:text-blue-700'
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

      {/* Main Content Area */}
      <main 
        ref={mainContentRef} 
        className="flex-1 md:h-screen md:overflow-y-auto scroll-smooth"
      >
        {/* Top action buttons */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-12 py-4 flex justify-end gap-4 z-10">
          <button className="px-6 py-2 text-blue-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
            Print Guide as PDF
          </button>
          <button className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded hover:bg-blue-50 transition-colors text-sm font-medium">
            Compare journals ↗
          </button>
        </div>

        {/* Content sections with margins */}
        <div className="px-16 py-12">
          {contentSections.map(item => (
            // Each Main Content Section
            <section 
              key={item.id} 
              id={item.id} 
              className="mb-16 scroll-mt-20"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-300">
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
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
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
  );
}