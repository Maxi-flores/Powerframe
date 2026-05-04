import React, { useState } from "react";

export default function WebSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const mockResults = [
    { title: "React Documentation", url: "react.dev", snippet: "The library for web and native user interfaces" },
    { title: "Vite - Next Generation Frontend Tooling", url: "vitejs.dev", snippet: "Get ready for a development environment that can finally catch up with you" },
    { title: "MDN Web Docs", url: "developer.mozilla.org", snippet: "Resources for developers, by developers" },
    { title: "Stack Overflow", url: "stackoverflow.com", snippet: "Where developers learn, share, & build careers" },
    { title: "GitHub", url: "github.com", snippet: "Where the world builds software" },
  ];

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const filtered = mockResults.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.snippet.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.length > 0 ? filtered : mockResults.slice(0, 3));
      setSearching(false);
    }, 500);
  }

  const quickLinks = [
    { name: "Google", icon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" },
    { name: "GitHub", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
    { name: "Stack Overflow", icon: "M4 17v2h16v-2M4 11l7.07-7.07a2 2 0 012.83 0L20 10M7 17h10" },
    { name: "NPM", icon: "M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-8 12H8V8h4v8zm6 0h-4V8h4v8z" },
    { name: "MDN", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { name: "DevDocs", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  ];

  return (
    <div className="p-6 lg:p-8 text-white min-h-full overflow-y-auto">
      {/* Hero Search Section */}
      <div className="text-center py-12 lg:py-20">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center shadow-glow-violet">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Web Search</h1>
        <p className="text-white/60 mb-8">Search the web from your dashboard</p>

        <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search anything..."
              className="input w-full pl-12 py-4 text-base"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="btn-neon px-8 py-4"
            disabled={searching}
          >
            {searching ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              "Search"
            )}
          </button>
        </form>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-sm text-white/50 mb-4">
            {results.length} results for "<span className="text-neon-violet">{query}</span>"
          </h3>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className="glass-card p-5 hover:shadow-glow-subtle transition-all cursor-pointer">
                <span className="text-xs text-neon-green mb-1 block">{r.url}</span>
                <h4 className="text-lg text-neon-blue hover:underline mb-2">{r.title}</h4>
                <p className="text-sm text-white/70">{r.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-center text-lg font-semibold mb-5">Quick Links</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {quickLinks.map(link => (
            <button
              key={link.name}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
              </svg>
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
