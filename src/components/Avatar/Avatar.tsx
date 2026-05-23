import { forwardRef, useState } from "react";
import type { HTMLAttributes } from "react";
import styles from "./Avatar.module.css";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual size. `sm` (24px) mirrors the Figma source at node `66:280918`.
   * `md` (32px) and `lg` (40px) extend the scale for use in headers, cards
   * and list rows.
   */
  size?: AvatarSize;
  /**
   * Image URL for the user's photo. When provided and `loggedIn` is true,
   * the avatar renders the photo. If the image fails to load, the
   * component falls back to initials (or the logged-out icon when no
   * `name` is supplied).
   */
  src?: string;
  /**
   * User's name. Used to derive the displayed initial and to populate the
   * `alt` text for the photo. Only the first character is shown — the
   * Figma master is single-letter to avoid overflow at 24px.
   */
  name?: string;
  /**
   * Whether the user is signed in. When `false`, a generic person icon is
   * rendered on a neutral background. Mirrors the `Logged in=No` axis of
   * the Figma master. Defaults to `true`.
   */
  loggedIn?: boolean;
  /**
   * Renders the selected ring (1px inset border in
   * `--color-brand-primary-subtle`). Mirrors the `State=Selected` axis of
   * the Figma master.
   */
  selected?: boolean;
  /**
   * Override the alt text on the photo. Defaults to `name` when supplied,
   * otherwise an empty string (decorative).
   */
  alt?: string;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

const initialOf = (name: string | undefined): string => {
  if (!name) return "";
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "";
};

const PersonIcon = () => (
  <svg
    className={styles.personIcon}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.418 0-8 2.91-8 6.5V22h16v-1.5c0-3.59-3.582-6.5-8-6.5Z"
      fill="currentColor"
    />
  </svg>
);

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  props,
  ref,
) {
  const {
    size = "sm",
    src,
    name,
    loggedIn = true,
    selected = false,
    alt,
    className,
    ...rest
  } = props;

  const [imgFailed, setImgFailed] = useState(false);
  const initial = initialOf(name);
  const showPhoto = loggedIn && Boolean(src) && !imgFailed;
  const showInitial = loggedIn && !showPhoto && initial.length > 0;
  const showPersonIcon = !loggedIn || (!showPhoto && !showInitial);

  return (
    <span
      {...rest}
      ref={ref}
      className={cx(
        styles.root,
        styles[`size_${size}`],
        selected && styles.selected,
        showPhoto ? styles.surface_photo : showInitial ? styles.surface_initial : styles.surface_neutral,
        className,
      )}
      data-selected={selected || undefined}
    >
      {showPhoto && (
        <img
          className={styles.photo}
          src={src}
          alt={alt ?? name ?? ""}
          onError={() => setImgFailed(true)}
          draggable={false}
        />
      )}
      {showInitial && (
        <span className={styles.initial} aria-hidden={Boolean(name)}>
          {initial}
        </span>
      )}
      {showPersonIcon && <PersonIcon />}
    </span>
  );
});
