"use client";

import { useState } from "react";
import Image from "next/image";
import { profile } from "@/content/profile";

/**
 * Profile photo with an initials fallback. Stays a client component only
 * because `onError` (a function prop) requires one; the fallback markup is
 * plain and renders identically whether or not JavaScript ever runs — if
 * the image fails to load with JS disabled, the browser's own broken-image
 * `alt` text still communicates who this is.
 */
export function ProfilePhoto() {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <span
        role="img"
        aria-label={profile.photoAlt}
        className="flex h-32 w-32 items-center justify-center rounded-full border border-border bg-surface font-mono text-2xl font-semibold text-accent-cyan sm:h-40 sm:w-40 sm:text-3xl"
      >
        {profile.initials}
      </span>
    );
  }

  return (
    <Image
      src={profile.photoUrl}
      alt={profile.photoAlt}
      width={320}
      height={320}
      loading="eager"
      className="h-32 w-32 rounded-full border border-border object-cover sm:h-40 sm:w-40"
      onError={() => setImageFailed(true)}
    />
  );
}
