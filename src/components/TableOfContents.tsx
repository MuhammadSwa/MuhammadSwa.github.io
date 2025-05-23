import { createSignal, onMount, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  maxLevel?: number;
  showNumbers?: boolean;
  collapsible?: boolean;
  title?: string;
}

export function TableOfContents(props: TableOfContentsProps) {
  const [tocItems, setTocItems] = createSignal<TocItem[]>([]);
  const [activeId, setActiveId] = createSignal<string>("");
  const [isCollapsed, setIsCollapsed] = createSignal(false);
  const [isSticky, setIsSticky] = createSignal(false);

  const maxLevel = props.maxLevel || 3;
  const showNumbers = props.showNumbers ?? true;
  const collapsible = props.collapsible ?? true;
  const title = props.title || "Table of Contents";

  let observerRef: IntersectionObserver | null = null;
  let tocRef: HTMLElement | undefined;

  onMount(() => {
    // Generate table of contents
    generateToc();

    // Set up intersection observer for active section tracking
    setupIntersectionObserver();

    // Set up scroll listener for sticky behavior
    setupScrollListener();
  });

  onCleanup(() => {
    if (observerRef) {
      observerRef.disconnect();
    }
    if (!isServer) {
      window.removeEventListener("scroll", handleScroll);
    }
  });

  const generateToc = () => {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const items: TocItem[] = [];

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level <= maxLevel) {
        // Create ID if it doesn't exist
        if (!heading.id) {
          heading.id = heading.textContent
            ?.toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-") || "";
        }

        items.push({
          id: heading.id,
          text: heading.textContent || "",
          level: level,
        });
      }
    });

    setTocItems(items);
  };

  const setupIntersectionObserver = () => {
    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    observerRef = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    headingElements.forEach((heading) => {
      if (heading.id) {
        observerRef?.observe(heading);
      }
    });
  };

  const handleScroll = () => {
    if (tocRef) {
      const rect = tocRef.getBoundingClientRect();
      setIsSticky(rect.top <= 20);
    }
  };

  const setupScrollListener = () => {
    window.addEventListener("scroll", handleScroll);
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const getIndentClass = (level: number) => {
    const indentMap: Record<number, string> = {
      1: "pl-0",
      2: "pl-4",
      3: "pl-8",
      4: "pl-12",
      5: "pl-16",
      6: "pl-20",
    };
    return indentMap[level] || "pl-0";
  };

  const getNumbering = (index: number, level: number) => {
    if (!showNumbers) return "";

    // Simple numbering - you can enhance this for nested numbering
    return `${index + 1}.`;
  };

  return (
    <div class={`table-of-contents ${props.className || ""}`}>
      {tocItems().length > 0 && (
        <nav
          ref={tocRef}
          class={`bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all duration-300 ${isSticky() ? "shadow-lg" : "shadow-sm"
            }`}
        >
          {/* Header */}
          <div class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-slate-600 dark:text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <h3 class="font-semibold text-slate-900 dark:text-white text-sm">
                {title}
              </h3>
              <span class="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs">
                {tocItems().length}
              </span>
            </div>

            {collapsible && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed())}
                class="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                aria-label={isCollapsed() ? "Expand table of contents" : "Collapse table of contents"}
              >
                <svg
                  class={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isCollapsed() ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Content */}
          <div class={`transition-all duration-300 overflow-hidden ${isCollapsed() ? "max-h-0" : "max-h-screen"
            }`}>
            <div class="p-4 max-h-96 overflow-y-auto">
              <ul class="space-y-1">
                {tocItems().map((item, index) => (
                  <li class={getIndentClass(item.level)}>
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      class={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 group flex items-start space-x-2 ${activeId() === item.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                      {showNumbers && (
                        <span class={`text-xs font-mono mt-0.5 min-w-[1.5rem] ${activeId() === item.id
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-400 dark:text-slate-500"
                          }`}>
                          {getNumbering(index, item.level)}
                        </span>
                      )}
                      <span class="leading-relaxed break-words">
                        {item.text}
                      </span>

                      {/* Active indicator */}
                      {activeId() === item.id && (
                        <div class="ml-auto">
                          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        </div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress indicator */}
            <div class="px-4 pb-4">
              <div class="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${((tocItems().findIndex(item => item.id === activeId()) + 1) / tocItems().length) * 100}%`
                  }}
                />
              </div>
              <div class="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Progress</span>
                <span>
                  {Math.round(((tocItems().findIndex(item => item.id === activeId()) + 1) / tocItems().length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
