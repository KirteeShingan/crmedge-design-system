import type { CSSProperties } from "react";
import styles from "./Playground.module.css";

/*
 * POC reference page. 1:1 visual replica of Figma frame 2654:2557 on page
 * '🎮 Playground (Fixed)'. No reusable components — placeholder until real
 * Checkbox, Badge, Table, Pagination, Avatar Group, Side NavBar, Global
 * Header, Filter Dropdown, Search Field, Tooltip, and Footer components ship.
 */

const ROWS = [
  {
    title: "Tesla fine print says it may sue Cybertruck resellers for $5...",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere...",
    status: "published" as const,
    type: "Blog",
    updated: "Oct 20, 2023",
    schedule: "NA",
    by: "Krisha M.",
  },
  {
    title: "Forget The New MacBook Pro, Apple Has Something Better...",
    url: "https://www.forbes.com/sites/ewanspence/2023/11/12/apple-macbook-pro-...",
    status: "published" as const,
    type: "News",
    updated: "Oct 29, 2023",
    schedule: "NA",
    by: "John Doe",
  },
  {
    title: "iPad mini 7 Experience",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere...",
    status: "scheduled" as const,
    type: "Web Experience",
    updated: "Oct 20, 2023",
    schedule: "Oct 23, 2023",
    by: "Jayesh Red",
  },
  {
    title: "Honouring Those Who Served: Franchises that Support...",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere...",
    status: "draft" as const,
    type: "Blog",
    updated: "Oct 20, 2023",
    schedule: "NA",
    by: "John Doe",
  },
  {
    title: "Architects woods + dangaran to camouflage modern 'moccas...",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere...",
    status: "draft" as const,
    type: "App Experience",
    updated: "Oct 20, 2023",
    schedule: "NA",
    by: "Nancy D.",
  },
  {
    title: "Product of the Week: Modern Geometric Area Rug",
    url: "self-44367503.hubspotpagebuilder.com/these-gen-z-employees-have-discovere...",
    status: "draft" as const,
    type: "News",
    updated: "Oct 20, 2023",
    schedule: "NA",
    by: "John Doe",
  },
];

const StatusBadge = ({ status }: { status: "published" | "scheduled" | "draft" }) => {
  if (status === "published") {
    return (
      <span className={`${styles.badge} ${styles.badgePublished}`}>
        PUBLISHED
        <CheckIcon />
      </span>
    );
  }
  if (status === "scheduled") {
    return (
      <span className={`${styles.badge} ${styles.badgeScheduled}`}>
        SCHEDULED
        <ClockIcon />
      </span>
    );
  }
  return (
    <span className={`${styles.badge} ${styles.badgeDraft}`}>
      DRAFT
      <PencilIcon />
    </span>
  );
};

const sx = (s: CSSProperties): CSSProperties => s;

export const Playground = () => {
  return (
    <div className={styles.page}>
      {/* Global Header */}
      <div className={styles.globalHeader}>
        <div className={styles.waffle} aria-label="App switcher">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className={styles.brand}>
          <span className={styles.brandLogo}>C</span>
          <span className={styles.brandWordmark}>
            CRM<em>Edge</em>
            <span className={styles.brandSection}>| Content</span>
          </span>
        </div>
        <div className={styles.headerSpacer} />
        <div className={styles.headerActions}>
          <button className={styles.headerIconBtn} aria-label="Settings">
            <GearIcon />
          </button>
          <button
            className={`${styles.headerIconBtn} ${styles.bellDot}`}
            aria-label="Notifications"
          >
            <BellIcon />
          </button>
          <div className={styles.avatarGroup} aria-label="Team">
            <span
              className={styles.avatarPhoto}
              style={sx({ backgroundImage: "url(https://i.pravatar.cc/56?img=12)" })}
            />
            <span className={styles.avatarInitial}>H</span>
            <span
              className={styles.avatarPhoto}
              style={sx({ backgroundImage: "url(https://i.pravatar.cc/56?img=33)" })}
            />
            <span className={styles.avatarOverflow}>+3</span>
          </div>
          <span className={styles.avatarUser} style={sx({ width: 28, height: 28, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center" })}>
            <UserIcon />
          </span>
          <span className={styles.chevDown}>
            <ChevronDown />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Side Nav */}
        <div className={styles.sideNav}>
          <span className={styles.sideNavItem}><HomeIcon /></span>
          <span className={`${styles.sideNavItem} ${styles.sideNavItemActive}`}>
            <FolderIcon />
          </span>
          <span className={styles.sideNavItem}><ImageIcon /></span>
          <span className={styles.sideNavItem}><BulbIcon /></span>
          <span className={styles.sideNavItem}><GearIcon /></span>
        </div>

        {/* Main */}
        <div className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Playground</h1>
            <div className={styles.pageHeaderActions}>
              <button className={`${styles.btn} ${styles.btnOutlined}`}>
                Generate Content
              </button>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>
                Create
              </button>
            </div>
          </div>

          <div className={styles.filterRow}>
            <div className={styles.filterLeft}>
              <div className={styles.search}>
                <SearchIcon />
                <input placeholder="Search by content name, type, status..." readOnly />
              </div>
              <button className={styles.filterChip}>
                Content Type <ChevronDown />
              </button>
              <button className={styles.filterChip}>
                Publish Status <ChevronDown />
              </button>
              <button className={styles.filterChip}>
                More Filters <ChevronDown />
              </button>
            </div>
            <button className={`${styles.btn} ${styles.btnGhost}`}>Actions</button>
          </div>

          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span><span className={styles.checkbox} /></span>
              <span>Content title</span>
              <span>Content Status</span>
              <span>Content Type</span>
              <span>Updated Date</span>
              <span>Schedule Date</span>
              <span>Updated By</span>
            </div>
            {ROWS.map((r, i) => (
              <div key={i}>
                <div className={styles.divider} />
                <div className={styles.tableRow}>
                  <span><span className={styles.checkbox} /></span>
                  <div className={styles.cellTitle}>
                    <strong>{r.title}</strong>
                    <span>{r.url}</span>
                  </div>
                  <span><StatusBadge status={r.status} /></span>
                  <span>{r.type}</span>
                  <span>{r.updated}</span>
                  <span>{r.schedule}</span>
                  <span>{r.by}</span>
                </div>
              </div>
            ))}
            <div className={styles.divider} />
            <div className={styles.scrollbar} />
          </div>

          <div className={styles.pagination}>
            <button className={styles.pageBtn}>Prev</button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>© 2023 CRMEdge.io All rights reserved</div>

      {/* Tooltip (POC: visible) */}
      <div className={styles.tooltip} role="tooltip">
        <div className={styles.tooltipArrow} />
        <div className={styles.tooltipHead}>
          <strong>Tooltip Heading</strong>
          <CloseIcon />
        </div>
        <div className={styles.tooltipBody}>Tooltip body</div>
        <div className={styles.tooltipActions}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Try it Out</button>
          <button
            className={styles.btn}
            style={sx({ background: "transparent", color: "var(--color-text-default)" })}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Inline icons ---------------- */
const ico = (d: string, size = 18) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const GearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const BellIcon = () => ico("M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0");
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
  </svg>
);
const ChevronDown = () => ico("M6 9l6 6 6-6", 16);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const HomeIcon = () => ico("M3 12l9-9 9 9M5 10v10h14V10");
const FolderIcon = () => ico("M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z");
const ImageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);
const BulbIcon = () => ico("M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c1 1 2 2 2 4h4c0-2 1-3 2-4a7 7 0 0 0-4-12z");
const CheckIcon = () => ico("M5 12l5 5L20 7", 12);
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const PencilIcon = () => ico("M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4z", 12);
const CloseIcon = () => ico("M6 6l12 12M6 18 18 6", 14);
