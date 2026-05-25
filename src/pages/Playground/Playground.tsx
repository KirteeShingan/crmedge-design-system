import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "../../components/Button";
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
}

const ROWS: Row[] = [
  {
    id: "r1",
    title: "Honoring Those Who Served: Franchises that Support…",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere…",
    status: "published",
    type: "Blog",
    updated: "Oct 20, 2023",
    schedule: "Oct 23, 2023",
    by: "Krisha M.",
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
  },
];

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

  const allChecked = selected.size === ROWS.length;
  const someChecked = selected.size > 0 && !allChecked;

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(ROWS.map((r) => r.id)) : new Set());
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
        <SideNav items={sideNavItems} selectedId="content" expanded={false} />

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
              <Search
                size="md"
                placeholder="Search by content name, type, status..."
                aria-label="Search content"
              />
              <Divider orientation="vertical" />
              <FilterChip label="Content Type" />
              <FilterChip label="Publish Status" />
              <FilterChip label="More Filters" />
            </div>
            <Button variant="tertiary" size="medium" iconRight={<ChevronDown />}>
              Actions
            </Button>
          </div>

          <TableContainer maxWidth="100%" className={styles.tableContainer}>
            <Table density="md">
              <TableColGroup>
                <TableCol width={48} />
                <TableCol width="minmax(280px, 1.6fr)" />
                <TableCol width={140} />
                <TableCol width={140} />
                <TableCol width={130} />
                <TableCol width={130} />
                <TableCol width={120} />
                <TableCol width={150} />
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
                  <TableHeaderCell align="center" className={styles.stickyActionsHead}>
                    Actions
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ROWS.map((r) => (
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
                    <TableCell
                      type="buttons"
                      align="center"
                      className={styles.stickyActions}
                    >
                      <div className={styles.rowActions}>
                        <button type="button" className={styles.rowAction}>
                          Edit
                        </button>
                        <button type="button" className={styles.rowAction}>
                          Duplicate
                        </button>
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
      </div>

      <footer className={styles.footer}>
        © 2023 CRMEdge.io All rights reserved
      </footer>
    </div>
  );
};

/* ---------- Inline filter chip (not yet a DS component) ---------- */
const FilterChip = ({ label }: { label: string }) => (
  <button type="button" className={styles.filterChip}>
    <span>{label}</span>
    <ChevronDown />
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

const ChevronDown = () => ico("M6 9l6 6 6-6", 16);
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
