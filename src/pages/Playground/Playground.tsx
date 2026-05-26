import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { Search } from "../../components/Search";
import { Divider } from "../../components/Divider";
import { StatusBadge } from "../../components/StatusBadge";
import { Pagination } from "../../components/Pagination";
import { GlobalHeader } from "../../components/GlobalHeader";
import { SideNav } from "../../components/SideNav";
import {
  TableContainer,
  Table,
  TableColGroup,
  TableCol,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableSelectionCell,
  TwoLineCell,
} from "../../components/Table";
import styles from "./Playground.module.css";

/*
 * Playground — page-level composition that demonstrates the Content list
 * view from Figma frame `2754:3249` on the 🎮 Playground page.
 * Built almost entirely from the design-system components in `src/components/`.
 * The few bits still rendered inline (the filter dropdown chips and the
 * row-level Edit / Duplicate links and footer) are NOT yet part of the DS —
 * see the list in `Playground.stories.tsx` for what needs to land next.
 */

type RowStatus = "published" | "scheduled" | "draft";

interface Row {
  id: string;
  title: string;
  url: string;
  status: RowStatus;
  type: string;
  updated: string;
  schedule: string;
  by: string;
  author: string;
  created: string;
  /** Primary SEO tag shown as a neutral pill. */
  seoTag: string;
  /** Count of additional tags shown as a "+N" neutral pill. */
  seoTagOverflow: number;
}

const PAGE_1_ROWS: Row[] = [
  {
    id: "r1",
    title: "Honoring Those Who Served: Franchises that Support…",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere…",
    status: "published",
    type: "Blog",
    updated: "Oct 20, 2023",
    schedule: "Oct 23, 2023",
    by: "Krisha M.",
    author: "J. K. Thompsons",
    created: "Oct 23, 2023",
    seoTag: "Entrepreneur",
    seoTagOverflow: 4,
  },
  {
    id: "r2",
    title: "Empowering Local Communities: Initiatives by Fran…",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere…",
    status: "scheduled",
    type: "Article",
    updated: "Oct 24, 2023",
    schedule: "Oct 28, 2023",
    by: "Alex R.",
    author: "M. L. Davidson",
    created: "Oct 24, 2023",
    seoTag: "Community",
    seoTagOverflow: 5,
  },
  {
    id: "r3",
    title: "Innovations in Fast Food: How Franchises are Ad…",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere…",
    status: "published",
    type: "News",
    updated: "Oct 24, 2023",
    schedule: "NA",
    by: "Sam L.",
    author: "K. J. Brown",
    created: "Oct 25, 2023",
    seoTag: "Industry",
    seoTagOverflow: 3,
  },
  {
    id: "r4",
    title: "Sustainable Practices: The Future of Franchise Bu…",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere…",
    status: "scheduled",
    type: "Article",
    updated: "Oct 24, 2023",
    schedule: "Oct 28, 2023",
    by: "Jordan K.",
    author: "R. A. Smith",
    created: "Oct 26, 2023",
    seoTag: "Sustainability",
    seoTagOverflow: 4,
  },
  {
    id: "r5",
    title: "Franchise Success Stories: Inspiring Journeys fro…",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere…",
    status: "published",
    type: "Case Study",
    updated: "Oct 24, 2023",
    schedule: "NA",
    by: "Lisa E.",
    author: "D. E. Johnson",
    created: "Oct 27, 2023",
    seoTag: "Motivation",
    seoTagOverflow: 6,
  },
  {
    id: "r6",
    title: "Breaking Barriers: Diversity in Franchise Ownership",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere…",
    status: "draft",
    type: "Editorial",
    updated: "Oct 24, 2023",
    schedule: "NA",
    by: "Jordan K.",
    author: "A. B. Davis",
    created: "Oct 28, 2023",
    seoTag: "Diversity",
    seoTagOverflow: 5,
  },
  {
    id: "r7",
    title: "Breaking Barriers: Diversity in Franchise Ownership",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere…",
    status: "draft",
    type: "Editorial",
    updated: "Oct 24, 2023",
    schedule: "NA",
    by: "Jordan K.",
    author: "A. B. Davis",
    created: "Oct 28, 2023",
    seoTag: "Diversity",
    seoTagOverflow: 5,
  },
];

const PAGE_2_ROWS: Row[] = [
  {
    id: "p2r1",
    title: "Top 10 Franchise Models Reshaping the Retail Land…",
    url: "self-44367503.hubspotpagebuilder.com/top-10-franchise-models-reshaping-retail…",
    status: "published",
    type: "Article",
    updated: "Nov 01, 2023",
    schedule: "NA",
    by: "Marcus T.",
    author: "P. H. Nguyen",
    created: "Oct 30, 2023",
    seoTag: "Retail",
    seoTagOverflow: 3,
  },
  {
    id: "p2r2",
    title: "Digital Transformation in Franchise Operations: A…",
    url: "self-44367503.hubspotpagebuilder.com/digital-transformation-franchise-operati…",
    status: "draft",
    type: "Whitepaper",
    updated: "Nov 02, 2023",
    schedule: "NA",
    by: "Priya V.",
    author: "C. L. Watkins",
    created: "Nov 01, 2023",
    seoTag: "Technology",
    seoTagOverflow: 7,
  },
  {
    id: "p2r3",
    title: "Customer Loyalty Programs That Drive Repeat Busin…",
    url: "self-44367503.hubspotpagebuilder.com/customer-loyalty-programs-repeat-busine…",
    status: "published",
    type: "Blog",
    updated: "Nov 03, 2023",
    schedule: "NA",
    by: "Lisa E.",
    author: "T. R. Patel",
    created: "Nov 02, 2023",
    seoTag: "Loyalty",
    seoTagOverflow: 4,
  },
  {
    id: "p2r4",
    title: "Franchise Financing 101: What Every Owner Should…",
    url: "self-44367503.hubspotpagebuilder.com/franchise-financing-101-what-every-owne…",
    status: "scheduled",
    type: "Guide",
    updated: "Nov 04, 2023",
    schedule: "Nov 10, 2023",
    by: "Krisha M.",
    author: "O. B. Harris",
    created: "Nov 03, 2023",
    seoTag: "Finance",
    seoTagOverflow: 2,
  },
  {
    id: "p2r5",
    title: "How AI is Changing the Way Franchises Hire and…",
    url: "self-44367503.hubspotpagebuilder.com/ai-changing-franchise-hiring-training…",
    status: "draft",
    type: "News",
    updated: "Nov 05, 2023",
    schedule: "NA",
    by: "Sam L.",
    author: "F. M. Clark",
    created: "Nov 04, 2023",
    seoTag: "AI",
    seoTagOverflow: 6,
  },
  {
    id: "p2r6",
    title: "Green Franchising: Sustainability Strategies That…",
    url: "self-44367503.hubspotpagebuilder.com/green-franchising-sustainability-strateg…",
    status: "published",
    type: "Editorial",
    updated: "Nov 06, 2023",
    schedule: "NA",
    by: "Jordan K.",
    author: "S. N. Robinson",
    created: "Nov 05, 2023",
    seoTag: "Sustainability",
    seoTagOverflow: 5,
  },
  {
    id: "p2r7",
    title: "Multi-Unit Ownership: Pros, Cons, and Growth Str…",
    url: "self-44367503.hubspotpagebuilder.com/multi-unit-ownership-pros-cons-strategy…",
    status: "scheduled",
    type: "Case Study",
    updated: "Nov 07, 2023",
    schedule: "Nov 14, 2023",
    by: "Alex R.",
    author: "L. A. Torres",
    created: "Nov 06, 2023",
    seoTag: "Growth",
    seoTagOverflow: 3,
  },
];

const PAGE_3_ROWS: Row[] = [
  {
    id: "p3r1",
    title: "The Rise of Ghost Kitchens in the Franchise World…",
    url: "self-44367503.hubspotpagebuilder.com/rise-ghost-kitchens-franchise-world…",
    status: "published",
    type: "Blog",
    updated: "Nov 08, 2023",
    schedule: "NA",
    by: "Marcus T.",
    author: "B. J. Evans",
    created: "Nov 07, 2023",
    seoTag: "FoodTech",
    seoTagOverflow: 4,
  },
  {
    id: "p3r2",
    title: "Franchise Disclosure Documents: A Beginner's Gui…",
    url: "self-44367503.hubspotpagebuilder.com/franchise-disclosure-documents-beginne…",
    status: "draft",
    type: "Guide",
    updated: "Nov 09, 2023",
    schedule: "NA",
    by: "Priya V.",
    author: "W. C. Morales",
    created: "Nov 08, 2023",
    seoTag: "Legal",
    seoTagOverflow: 2,
  },
  {
    id: "p3r3",
    title: "Social Media Marketing for Franchise Locations: B…",
    url: "self-44367503.hubspotpagebuilder.com/social-media-marketing-franchise-locati…",
    status: "published",
    type: "Article",
    updated: "Nov 10, 2023",
    schedule: "NA",
    by: "Lisa E.",
    author: "I. D. Stewart",
    created: "Nov 09, 2023",
    seoTag: "Marketing",
    seoTagOverflow: 8,
  },
  {
    id: "p3r4",
    title: "International Expansion: How Brands Go Global thr…",
    url: "self-44367503.hubspotpagebuilder.com/international-expansion-brands-go-global…",
    status: "scheduled",
    type: "Whitepaper",
    updated: "Nov 11, 2023",
    schedule: "Nov 18, 2023",
    by: "Krisha M.",
    author: "Y. R. Flores",
    created: "Nov 10, 2023",
    seoTag: "Global",
    seoTagOverflow: 5,
  },
  {
    id: "p3r5",
    title: "Training and Onboarding Best Practices for Franch…",
    url: "self-44367503.hubspotpagebuilder.com/training-onboarding-best-practices-franc…",
    status: "published",
    type: "Case Study",
    updated: "Nov 12, 2023",
    schedule: "NA",
    by: "Sam L.",
    author: "C. P. Bennett",
    created: "Nov 11, 2023",
    seoTag: "Operations",
    seoTagOverflow: 3,
  },
  {
    id: "p3r6",
    title: "Supply Chain Resilience: Lessons from Top Franch…",
    url: "self-44367503.hubspotpagebuilder.com/supply-chain-resilience-lessons-top-fran…",
    status: "draft",
    type: "News",
    updated: "Nov 13, 2023",
    schedule: "NA",
    by: "Jordan K.",
    author: "M. T. Cooper",
    created: "Nov 12, 2023",
    seoTag: "Logistics",
    seoTagOverflow: 6,
  },
  {
    id: "p3r7",
    title: "Franchise Trends to Watch in 2024: What Experts…",
    url: "self-44367503.hubspotpagebuilder.com/franchise-trends-watch-2024-experts-say…",
    status: "published",
    type: "Editorial",
    updated: "Nov 14, 2023",
    schedule: "NA",
    by: "Alex R.",
    author: "H. G. Ward",
    created: "Nov 13, 2023",
    seoTag: "Trends",
    seoTagOverflow: 7,
  },
];

const PAGE_ROWS: Record<number, Row[]> = {
  1: PAGE_1_ROWS,
  2: PAGE_2_ROWS,
  3: PAGE_3_ROWS,
};

const badgeFor = (status: RowStatus): ReactNode => {
  if (status === "published") {
    return (
      <StatusBadge color="green" icon={<CheckIcon />}>
        Published
      </StatusBadge>
    );
  }
  if (status === "scheduled") {
    return (
      <StatusBadge color="yellow" icon={<ClockIcon />}>
        Scheduled
      </StatusBadge>
    );
  }
  return (
    <StatusBadge color="neutral" icon={<PencilIcon />}>
      Draft
    </StatusBadge>
  );
};

export const Playground = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sideNavItems = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "content", label: "Content", icon: <FolderIcon /> },
    { id: "media", label: "Media", icon: <ImageIcon /> },
    { id: "ideas", label: "Ideas", icon: <BulbIcon /> },
    { id: "settings", label: "Settings", icon: <GearIcon /> },
  ];

  const rows = PAGE_ROWS[page] ?? PAGE_1_ROWS;

  const allChecked = selected.size === rows.length;
  const someChecked = selected.size > 0 && !allChecked;

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(rows.map((r) => r.id)) : new Set());
  };

  const toggleRow = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div className={styles.page}>
      <GlobalHeader
        tabLabel="Content"
        notificationDot
        currentUser={{
          name: "Hannah Park",
          src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2.4&w=128&h=128&q=80",
          loggedIn: true,
        }}
      />

      <div className={styles.body}>
        <SideNav
          items={sideNavItems}
          selectedId="content"
          expanded={false}
          /* Force the sidenav to fill the full body height (header → footer)
           * so the right-edge stroke runs top to bottom. SideNav's own CSS
           * uses `height: 100%`, but percentage-height needs a parent with
           * a definite height — flex-defined heights resolve to auto in
           * some layouts. `align-self: stretch` falls back to the cross-
           * axis size, and `height: auto` clears the percentage rule that
           * would otherwise collapse to content-height. */
          style={{ height: "auto", alignSelf: "stretch" }}
        />

        <div className={styles.mainColumn}>
          <main className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Playground</h1>
            <div className={styles.pageHeaderActions}>
              <Button variant="secondary" size="medium">
                Generate Content
              </Button>
              <Button variant="primary" size="medium">
                Create
              </Button>
            </div>
          </div>

          <div className={styles.filterRow}>
            <div className={styles.filterLeft}>
              <div className={styles.searchWrap}>
                <Search
                  size="sm"
                  fullWidth
                  placeholder="Search by content name, type, status..."
                  aria-label="Search content"
                />
              </div>
              <Divider orientation="vertical" />
              <FilterPill label="Content Type" />
              <FilterPill label="Publish Status" />
              <FilterPill label="+4" />
            </div>
            <Button variant="neutral" size="medium">
              More Filters
            </Button>
          </div>

          <TableContainer maxWidth="100%" className={styles.tableContainer}>
            <Table density="md" className={styles.wideTable}>
              <TableColGroup>
                <TableCol width={48} />
                <TableCol width={394} />
                <TableCol width={170} />
                <TableCol width={170} />
                <TableCol width={170} />
                <TableCol width={170} />
                <TableCol width={180} />
                <TableCol width={170} />
                <TableCol width={200} />
                <TableCol width={220} />
              </TableColGroup>
              <TableHead>
                <TableRow header>
                  <TableSelectionCell
                    header
                    checked={allChecked}
                    indeterminate={someChecked}
                    onChange={toggleAll}
                  />
                  <TableHeaderCell>Content title</TableHeaderCell>
                  <TableHeaderCell>Content Status</TableHeaderCell>
                  <TableHeaderCell>Content Type</TableHeaderCell>
                  <TableHeaderCell>Updated Date</TableHeaderCell>
                  <TableHeaderCell>Schedule Date</TableHeaderCell>
                  <TableHeaderCell>Updated By</TableHeaderCell>
                  <TableHeaderCell>Created Date</TableHeaderCell>
                  <TableHeaderCell>SEO Tags</TableHeaderCell>
                  <TableHeaderCell className={styles.stickyActionsHead}>
                    Actions
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} selected={selected.has(r.id)}>
                    <TableSelectionCell
                      checked={selected.has(r.id)}
                      onChange={(c) => toggleRow(r.id, c)}
                      aria-label={`Select ${r.title}`}
                    />
                    <TableCell type="text">
                      <TwoLineCell
                        title={r.title}
                        subtitle={r.url}
                        subtitleVariant="link"
                      />
                    </TableCell>
                    <TableCell type="badge">{badgeFor(r.status)}</TableCell>
                    <TableCell type="text">{r.type}</TableCell>
                    <TableCell type="date">{r.updated}</TableCell>
                    <TableCell type="date">{r.schedule}</TableCell>
                    <TableCell type="text">{r.by}</TableCell>
                    <TableCell type="date">{r.created}</TableCell>
                    <TableCell type="badge">
                      <div className={styles.seoTags}>
                        <StatusBadge
                          color="neutral"
                          className={styles.tagBadge}
                        >
                          {r.seoTag}
                        </StatusBadge>
                        <StatusBadge
                          color="neutral"
                          className={styles.tagBadge}
                        >
                          {r.seoTagOverflow}+
                        </StatusBadge>
                      </div>
                    </TableCell>
                    <TableCell
                      type="buttons"
                      className={styles.stickyActions}
                    >
                      <div className={styles.rowActions}>
                        <Button variant="neutral" size="small">
                          Edit
                        </Button>
                        <Button variant="tertiary" size="small">
                          Duplicate
                        </Button>
                        <IconButton
                          variant="text"
                          tone="secondary"
                          size="sm"
                          aria-label={`More actions for ${r.title}`}
                          icon={<KebabVerticalIcon />}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className={styles.paginationWrap}>
            <Pagination
              totalPages={3}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
          </main>

          <footer className={styles.footer}>
            © 2023 CRMEdge.io All rights reserved
          </footer>
        </div>
      </div>
    </div>
  );
};

/* ---------- Inline filter pill (not yet a DS component) ----------
 * Mirrors Figma node 2754:3260 (Content Type / Publish Status / +N).
 * Background --color-secondary-neutral-50, border --color-border-default,
 * radius 20px, Inter Medium 12 / 16 (line-height 1.33). No chevron.
 */
const FilterPill = ({ label }: { label: string }) => (
  <button type="button" className={styles.filterPill}>
    {label}
  </button>
);

/* ---------- Inline icons ---------- */
const ico = (d: string, size = 18) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const HomeIcon = () => ico("M3 12l9-9 9 9M5 10v10h14V10");
const FolderIcon = () => ico(
  "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
);
const ImageIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);
const BulbIcon = () =>
  ico("M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c1 1 2 2 2 4h4c0-2 1-3 2-4a7 7 0 0 0-4-12z");
const GearIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const CheckIcon = () => ico("M5 12l5 5L20 7", 12);
const ClockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const PencilIcon = () =>
  ico("M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4z", 12);

/* Vertical kebab — three dots stacked. Mirrors the Figma
 * `kabab-horizontal` asset rotated 90° in the Actions IconButton. */
const KebabVerticalIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="10" cy="4" r="1.6" />
    <circle cx="10" cy="10" r="1.6" />
    <circle cx="10" cy="16" r="1.6" />
  </svg>
);
