"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

const NavBar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>
      </nav>
      <ul>
        <Link href="/">Home</Link>

        <Link href="/" onClick={() => posthog.capture("nav_events_clicked")}>Events</Link>

        <Link href="/" onClick={() => posthog.capture("nav_create_event_clicked")}>Create Event</Link>
      </ul>
    </header>
  );
};

export default NavBar;
