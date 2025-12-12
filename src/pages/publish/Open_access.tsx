import React, { useEffect, useRef, useState } from "react";

/**
 * Exact replica of the Open Access page (from user screenshot).
 * - Single-file React + TypeScript component (no explicit JSX return type).
 * - Tailwind CSS utilities used for styling.
 * - Sticky left sidebar with nested links (exact names/order as in screenshot).
 * - Smooth scrolling to anchors; active link highlights with orange underline and light-blue bg.
 *
 * Usage: render <JournalOpenAccessExact /> in your app.
 */

type NavNode = {
  id: string;
  label: string;
  children?: NavNode[];
};

const SIDEBAR: NavNode[] = [
  { id: "introduction", label: "Introduction" },
  {
    id: "open-access-licences",
    label: "Open Access Licences",
    children: [
      { id: "user-rights", label: "User rights" },
      { id: "cc-by", label: "Creative Commons Attribution (CC BY)" },
      { id: "cc-by-nc", label: "Creative Commons Attribution-NonCommercial (CC BY-NC)" },
      { id: "cc-by-nc-nd", label: "Creative Commons Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)" },
    ],
  },
  {
    id: "apc",
    label: "Article Publishing Charge (APC)",
  },
  {
    id: "policies",
    label: "Policies",
    children: [
      { id: "best-price", label: "Best price promise" },
      { id: "open-access-agreements", label: "Open access agreements" },
      { id: "funding-arrangements", label: "Funding arrangements" },
      { id: "author-rights", label: "Author rights" },
      { id: "self-archiving", label: "Self-archiving" },
      { id: "embargo-period", label: "Embargo period" },
      { id: "responsible-sharing", label: "Responsible sharing" },
    ],
  },
  {
    id: "author-resources",
    label: "Author Resources and Support",
    children: [
      { id: "learn-more-about", label: "Learn more about" },
      { id: "contact-details", label: "Contact details" },
    ],
  },
];

export default function JournalOpenAccessExact() {
  const [activeId, setActiveId] = useState<string>("introduction");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // flatten ids for observing
  const collectIds = (nodes: NavNode[]) => {
    const out: string[] = [];
    for (const n of nodes) {
      out.push(n.id);
      if (n.children) out.push(...collectIds(n.children));
    }
    return out;
  };
  const allIds = collectIds(SIDEBAR);

  useEffect(() => {
    // Observe sections to change active sidebar item
    const options = { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).id;
          if (id) setActiveId(id);
        }
      });
    }, options);

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && observerRef.current) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [/* no deps */]);

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    if (history && history.replaceState) history.replaceState(null, "", `#${id}`);
  };

  // helper to render sidebar recursively
  const renderSidebar = (nodes: NavNode[], level = 0) => {
    return (
      <ul className={`${level > 0 ? "pl-4" : "pl-0"} space-y-1`}>
        {nodes.map((n) => {
          const isActive = activeId === n.id;
          return (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={scrollToId(n.id)}
                className={`block text-sm font-sans ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-700"} rounded-md px-3 py-2`}
                style={{ color: "#0b66c2", borderBottom: isActive ? "3px solid #ea7a2d" : "3px solid transparent" }}
              >
                {n.label}
              </a>
              {n.children && (
                <ul className="mt-1 space-y-1">
                  {n.children.map((c) => {
                    const cActive = activeId === c.id;
                    return (
                      <li key={c.id}>
                        <a
                          href={`#${c.id}`}
                          onClick={scrollToId(c.id)}
                          className={`block text-sm pl-6 font-sans ${cActive ? "bg-blue-50 text-blue-700" : "text-gray-700"} rounded-md px-3 py-2`}
                          style={{ color: "#0b66c2", borderBottom: cActive ? "3px solid #ea7a2d" : "3px solid transparent" }}
                        >
                          {c.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top bar with Compare journals */}
      <div className="w-full border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Compare journals"
          >
            <span>Compare journals</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-10">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block" aria-label="Open access information">
          <div className="sticky top-28">
            <div className="text-gray-600 mb-4 font-medium">Open access information</div>
            {renderSidebar(SIDEBAR)}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <article className="prose max-w-none">
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-32 mb-8">
              <h1 className="font-serif text-3xl text-gray-900 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Introduction
              </h1>
              <p className="font-sans text-base text-gray-700 mb-4">
                Internet of Things offers authors two choices to publish their research:
              </p>

              {/* Comparison Table */}
              <div className="rounded-md border overflow-hidden mb-4">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr>
                      <th className="w-1/2 bg-blue-100 text-left px-6 py-3 text-blue-800 font-semibold border">Open access</th>
                      <th className="w-1/2 bg-blue-100 text-left px-6 py-3 text-blue-800 font-semibold border">Subscription</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-6 align-top text-gray-700">
                        <p className="mb-3">
                          Also called gold open access. Articles are freely available to both subscribers and the wider public with permitted reuse.
                        </p>
                        <p className="text-sm text-gray-600">
                          An open access publication fee is payable by authors, or their institution or funder.
                        </p>
                      </td>
                      <td className="px-6 py-6 align-top text-gray-700">
                        <p className="mb-3">
                          Articles are made available to subscribers as well as developing countries and patient groups through our access programs.
                        </p>
                        <p className="text-sm text-gray-600">No open access publication fee.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="font-sans text-sm text-gray-600 mb-6">
                In accordance with funding body requirements, Elsevier offers alternative open access publishing options. Visit our open access page for full information.
                <br />
                Your publication choice will have no effect on the peer review process or acceptance of your submission.
              </p>
            </section>

            {/* Open Access Licences */}
            <section id="open-access-licences" className="scroll-mt-32 mb-8">
              <h2 className="font-serif text-2xl text-gray-900 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Open Access Licences
              </h2>

              <h3 id="user-rights" className="font-sans text-lg font-semibold text-gray-800 mb-2">
                User rights
              </h3>
              <p className="font-sans text-gray-700 mb-4">
                All articles published open access will be immediately and permanently free for everyone to read and download, copy and distribute. We offer authors a choice of user licenses, which define the permitted reuse of articles. We currently offer the following license(s) for this journal:
              </p>

              <h3 id="cc-by" className="font-serif text-xl text-gray-900 mt-6 mb-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Creative Commons Attribution (CC BY)
              </h3>
              <p className="font-sans text-gray-700 mb-4">
                Allows users to: distribute and copy the article; create extracts, abstracts, and other revised versions, adaptations or derivative works of or from an article (such as a translation); include in a collective work (such as an anthology); and text or data mine the article. These uses are permitted even for commercial purposes, provided the users give appropriate credit to the author(s) (with a link to the formal publication through the relevant DOI); includes a link to the license; indicates if changes were made; and does not represent the author(s) as endorsing the adaptation of the article or modify the article in such a way as to damage the authors' honor or reputation.
              </p>

              <h3 id="cc-by-nc" className="font-serif text-xl text-gray-900 mt-6 mb-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Creative Commons Attribution-NonCommercial (CC BY-NC)
              </h3>
              <p className="font-sans text-gray-700 mb-4">
                Allows users to: distribute and copy the article; create extracts, abstracts, and other revised versions, adaptations or derivative works of or from an article (such as a translation); include in a collective work (such as an anthology); and text or data mine the article. These uses are permitted only for non-commercial purposes, and provided the user gives appropriate credit to the author(s) (with a link to the formal publication through the relevant DOI); includes a link to the license; indicates if changes were made; and does not represent the author(s) as endorsing the adaptation of the article or modify the article in such a way as to damage the authors' honor or reputation.
              </p>

              <h3 id="cc-by-nc-nd" className="font-serif text-xl text-gray-900 mt-6 mb-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Creative Commons Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)
              </h3>
              <p className="font-sans text-gray-700 mb-4">
                Allows users to: distribute and copy the article; and include in a collective work (such as an anthology). These uses are permitted only for non-commercial purposes, and provided the user gives appropriate credit to the author(s) (with a link to the formal publication through the relevant DOI); provides a link to the license; and does not alter or modify the article.
              </p>

              <p className="font-sans text-sm text-gray-600 mt-4">
                If you need to comply with your funding body policy you can apply for a CC BY license after your manuscript is accepted for publication.
              </p>
            </section>

            {/* APC */}
            <section id="apc" className="scroll-mt-32 mb-8">
              <h2 className="font-serif text-2xl text-gray-900 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Article Publishing Charge (APC)
              </h2>

              <p className="font-sans text-gray-700 mb-4">
                To provide open access, this journal has a publication fee (Article Publishing Charge, APC) which needs to be met by the authors, or their institution or funders, for each article published open access. This ensures your article will be immediately and permanently free to access by everyone.
              </p>

              <div className="rounded-md border overflow-hidden mb-4">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-blue-100 px-6 py-3 text-left text-blue-800 font-semibold border">Article type</th>
                      <th className="bg-blue-100 px-6 py-3 text-left text-blue-800 font-semibold border">Article Publishing Charge (excl. taxes)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 border text-gray-700">All articles</td>
                      <td className="px-6 py-4 border text-gray-700">USD 3020</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Policies */}
            <section id="policies" className="scroll-mt-32 mb-8">
              <h2 className="font-serif text-2xl text-gray-900 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Policies
              </h2>

              <div className="font-sans text-gray-700 space-y-4">
                <div id="best-price">
                  <h4 className="font-semibold">Best price promise</h4>
                  <p className="text-sm">
                    Our Online Author Communication System (OACS) ensures you are offered the lowest possible Article Publishing Charge to publish an article in your chosen journal. During submission you will be presented with a personalized OA Article Publishing Charge based on your individual context (your country, institutional affiliation, and any society membership for example) as well as considering the journal involved.
                  </p>
                </div>

                <div id="open-access-agreements">
                  <h4 className="font-semibold mt-3">Open access agreements</h4>
                  <p className="text-sm">
                    Elsevier has reached open access agreements with an increasing number of institutions and university consortia around the world. Find out what this means for authors on our open access agreements page.
                  </p>
                </div>

                <div id="funding-arrangements">
                  <h4 className="font-semibold mt-3">Funding arrangements</h4>
                  <p className="text-sm">
                    Elsevier partners with funding bodies to provide guidance for authors on how to comply with funding body open access policies. Find out more on our funding arrangements page.
                  </p>
                </div>

                <div id="author-rights">
                  <h4 className="font-semibold mt-3">Author rights</h4>
                  <p className="text-sm">
                    For open access publishing this journal uses an exclusive licensing agreement. Authors will retain copyright alongside scholarly usage rights and Elsevier will be granted publishing and distribution rights.
                  </p>
                </div>

                <div id="self-archiving">
                  <h4 className="font-semibold mt-3">Self-archiving</h4>
                  <p className="text-sm">
                    Also called green open access. Authors can share their subscription research in a variety of ways. When publishing under the subscription model, an author can self-archive their accepted manuscript immediately and enable public access from their institution's repository after an embargo period. This is the version that has been accepted for publication and which typically includes author-incorporated changes suggested during submission, peer review and in editor-author communications.
                  </p>
                </div>

                <div id="embargo-period">
                  <h4 className="font-semibold mt-3">Embargo period</h4>
                  <p className="text-sm">
                    For subscription articles, an appropriate amount of time is needed for journals to deliver value to subscribing customers before a manuscript becomes available for free to the public. This is called an embargo period and it begins from the date the article is formally published online in its final and fully citable form.
                    <br />
                    This journal has an embargo period of 12 months.
                  </p>
                </div>

                <div id="responsible-sharing">
                  <h4 className="font-semibold mt-3">Responsible sharing</h4>
                  <p className="text-sm">Find out how you can share your research published in Elsevier journals.</p>
                </div>
              </div>
            </section>

            {/* Author Resources */}
            <section id="author-resources" className="scroll-mt-32 mb-8">
              <h2 className="font-serif text-2xl text-gray-900 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Author Resources and Support
              </h2>

              <div className="font-sans text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li id="learn-more-about">Benefits of publishing open access with Elsevier</li>
                  <li>Open access agreements</li>
                  <li>Funding arrangements</li>
                  <li>Open access license policy</li>
                  <li>Open access pricing policy</li>
                </ul>
              </div>
            </section>

            {/* Contact details */}
            <section id="contact-details" className="scroll-mt-32 mb-20">
              <h2 className="font-serif text-2xl text-gray-900 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Contact details
              </h2>

              <p className="font-sans text-sm text-gray-700">
                Frequently asked questions and answers are available in the Journal Article Publishing Support Centre. If you have any further questions, you can also chat with an agent using the chat box available on the site.
              </p>
            </section>
          </article>
        </main>
      </div>

      {/* Sidebar link hover underline and link color */}
      <style>{`
        aside a:hover { border-bottom: 3px solid #ea7a2d !important; }
        aside a { color: #0b66c2; text-decoration: none; }
      `}</style>
    </div>
  );
}
