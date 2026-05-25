import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { Avatar } from "../Avatar";
import type { AvatarProps } from "../Avatar";
import styles from "./GlobalHeader.module.css";

export interface GlobalHeaderProps extends HTMLAttributes<HTMLElement> {
  tabLabel?: ReactNode;
  productName?: string;
  logoHref?: string;
  onLogoClick?: () => void;
  onTrackpadClick?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onAvatarClick?: () => void;
  notificationDot?: boolean;
  currentUser?: AvatarProps;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  trackpadLabel?: string;
  notificationsLabel?: string;
  settingsLabel?: string;
  avatarLabel?: string;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

const GridIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="6" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    <circle cx="6" cy="18" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
    <circle cx="18" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

const BellIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 3a6 6 0 0 0-6 6v3.5L4.5 15a.75.75 0 0 0 .65 1.13h13.7A.75.75 0 0 0 19.5 15L18 12.5V9a6 6 0 0 0-6-6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M10 19a2 2 0 0 0 4 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.13.7.34 1 .6.3.27.55.59.73.94H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoMark = () => (
  <span className={styles.logoMark} aria-hidden="true">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M8.10925 0L9.58003 2.5301H7.0587L10.0003 7.46981L9.58003 9.99991H8.42442L4.11715 2.5301L4.64243 0H8.10925Z"
        fill="#ffffff"
      />
      <path
        d="M1.891 10L0.420221 7.4699H2.94155L0 2.53019L0.420221 0H1.57583L5.8831 7.4699L5.35782 10H1.891Z"
        fill="#ffffff"
      />
    </svg>
  </span>
);

const Wordmark = () => (
  <svg
    className={styles.wordmark}
    viewBox="0 0 77.8089 15.456"
    fill="none"
    aria-hidden="true"
  >
    <path d="M73.9209 12.24C71.3289 12.24 69.5529 10.384 69.5529 7.792C69.5529 4.992 71.3929 3.264 73.7609 3.264C76.1609 3.264 77.7609 4.944 77.8089 7.696V8.144H71.4409C71.5689 9.632 72.4969 10.64 73.9369 10.64C74.9129 10.64 75.6489 10.16 75.9369 9.312H77.7769C77.3449 11.136 75.9209 12.24 73.9209 12.24ZM71.5209 6.816H75.8569C75.6169 5.6 74.8649 4.864 73.7609 4.864C72.6409 4.864 71.8089 5.6 71.5209 6.816Z" fill="#5DB8FB" />
    <path d="M63.5354 15.456C61.1674 15.456 59.5354 14.304 59.5354 12.48H61.4234C61.4234 13.28 62.2714 13.92 63.5354 13.92C65.0394 13.92 65.8234 13.024 65.8234 11.744V10.544C65.2794 11.36 64.3354 11.872 63.1194 11.872C60.8474 11.872 59.2154 10.112 59.2154 7.584C59.2154 5.04 60.8474 3.264 63.1034 3.264C64.4314 3.264 65.5034 3.888 66.0314 4.832L66.1914 3.52H67.6954V11.744C67.6954 13.984 66.1114 15.456 63.5354 15.456ZM63.4874 10.288C64.8634 10.288 65.8234 9.168 65.8234 7.568C65.8234 5.968 64.8634 4.864 63.4874 4.864C62.1114 4.864 61.1674 5.968 61.1674 7.584C61.1674 9.184 62.1114 10.288 63.4874 10.288Z" fill="#5DB8FB" />
    <path d="M52.7045 12.24C50.4165 12.24 48.7685 10.384 48.7685 7.712C48.7685 5.088 50.3845 3.264 52.6405 3.264C53.8405 3.264 54.8325 3.76 55.4245 4.56V0H57.3125V12H55.7925L55.6165 10.496C55.1365 11.568 54.0805 12.24 52.7045 12.24ZM53.0565 10.64C54.4485 10.64 55.4245 9.424 55.4245 7.696C55.4245 6.016 54.4645 4.848 53.0885 4.848C51.6805 4.848 50.7045 6.032 50.7045 7.728C50.7045 9.44 51.6645 10.64 53.0565 10.64Z" fill="#5DB8FB" />
    <path d="M47.2273 12H39.2432V0.8H47.0833V2.528H41.1472V5.408H46.5233V7.088H41.1472V10.272H47.2273V12Z" fill="#5DB8FB" />
    <path d="M26.7007 12H24.7807V0.8H27.1487L30.6528 9.696L34.1407 0.8H36.5087V12H34.5888V3.408L31.2607 12H30.0288L26.7007 3.408V12Z" fill="#5DB8FB" />
    <path d="M17.9277 12H16.0077V0.8H20.7197C23.1037 0.8 24.4317 2.176 24.4317 4.224C24.4317 5.792 23.6477 6.96 22.2557 7.408L24.7037 12H22.5917L20.4157 7.696H17.9277V12ZM17.9277 5.984H20.6557C21.8557 5.984 22.4957 5.36 22.4957 4.224C22.4957 3.104 21.8557 2.528 20.6557 2.528H17.9277V5.984Z" fill="#5DB8FB" />
    <path d="M9.32441 12.24C5.91641 12.24 3.62841 9.872 3.62841 6.4C3.62841 2.928 5.91641 0.56 9.32441 0.56C12.1404 0.56 14.1244 2.144 14.5404 4.624H12.5404C12.1244 3.168 10.9244 2.336 9.32441 2.336C7.06041 2.336 5.59641 3.952 5.59641 6.4C5.59641 8.848 7.06041 10.464 9.32441 10.464C10.9244 10.464 12.1244 9.632 12.5404 8.176H14.5404C14.1244 10.656 12.1404 12.24 9.32441 12.24Z" fill="#5DB8FB" />
  </svg>
);

export const GlobalHeader = forwardRef<HTMLElement, GlobalHeaderProps>(
  function GlobalHeader(props, ref) {
    const {
      tabLabel = "Content",
      productName = "CRMEdge",
      logoHref,
      onLogoClick,
      onTrackpadClick,
      onNotificationsClick,
      onSettingsClick,
      onAvatarClick,
      notificationDot = true,
      currentUser,
      leftActions,
      rightActions,
      trackpadLabel = "App switcher",
      notificationsLabel = "Notifications",
      settingsLabel = "Settings",
      avatarLabel = "Account",
      className,
      "aria-label": ariaLabel = "Primary",
      ...rest
    } = props;

    const LogoContent = (
      <>
        <LogoMark />
        <Wordmark />
      </>
    );

    return (
      <header
        ref={ref}
        className={cx(styles.root, className)}
        aria-label={ariaLabel}
        {...rest}
      >
        <div className={styles.leftSet}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={trackpadLabel}
            onClick={onTrackpadClick}
          >
            <GridIcon />
          </button>

          {logoHref ? (
            <a
              href={logoHref}
              className={styles.logoSlot}
              onClick={onLogoClick}
              aria-label={`${productName} home`}
            >
              {LogoContent}
            </a>
          ) : (
            <span className={styles.logoSlot} aria-label={productName}>
              {LogoContent}
            </span>
          )}

          {tabLabel ? (
            <>
              <span className={styles.logoDivider} aria-hidden="true" />
              <span className={styles.tabLabel}>{tabLabel}</span>
            </>
          ) : null}

          {leftActions}
        </div>

        <div className={styles.rightSet}>
          {rightActions}

          {currentUser ? (
            onAvatarClick ? (
              <button
                type="button"
                className={styles.avatarBtn}
                aria-label={avatarLabel}
                onClick={onAvatarClick}
              >
                <Avatar size="sm" {...currentUser} />
              </button>
            ) : (
              <Avatar size="sm" {...currentUser} />
            )
          ) : null}

          <span className={styles.notificationWrap}>
            <button
              type="button"
              className={cx(styles.iconBtn, styles.iconBtnSm)}
              aria-label={notificationsLabel}
              onClick={onNotificationsClick}
            >
              <BellIcon />
            </button>
            {notificationDot ? (
              <span className={styles.notificationDot} aria-hidden="true" />
            ) : null}
          </span>

          <button
            type="button"
            className={cx(styles.iconBtn, styles.iconBtnSm)}
            aria-label={settingsLabel}
            onClick={onSettingsClick}
          >
            <SettingsIcon />
          </button>
        </div>
      </header>
    );
  },
);
