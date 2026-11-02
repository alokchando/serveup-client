
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  SiInstagram as Instagram,
  SiFacebook as Facebook,
  SiGithub as Github,
} from "@icons-pack/react-simple-icons";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Upcoming Events", href: "/upcoming-events" },
    { label: "About Us", href: "/about" },
  ],
  community: [
    { label: "Become a Volunteer", href: "/volunteer" },
    { label: "Create an Event", href: "/create-event" },
    { label: "Our Community", href: "/community" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "GitHub", href: "https://github.com", Icon: Github },
];

export default function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-6">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
                <Heart className="h-5 w-5 fill-white" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Serve<span className="text-sky-500">Up</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Connecting passionate people with meaningful opportunities.
              Together, we can build a stronger and more caring community.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 font-semibold">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-sky-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 font-semibold">Get Involved</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-sky-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 font-semibold">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-sky-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} ServeUp. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Made with
            <Heart className="h-3 w-3 fill-sky-500 text-sky-500" />
            for the community
          </p>
        </div>

      </div>
    </footer>
  );
}
