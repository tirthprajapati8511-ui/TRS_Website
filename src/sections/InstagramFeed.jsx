import { ArrowUpRight } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { Instagram } from "../components/SocialIcons";
import { useContent } from "../lib/ContentContext";

// Instagram's own profile embed: it always shows the account's latest posts,
// so nothing here needs updating by hand.
export default function InstagramFeed() {
  const { instagram } = useContent();
  const username = (instagram.username ?? "").trim().replace(/^@/, "");
  if (!instagram.show || !/^[A-Za-z0-9._]+$/.test(username)) return null;

  const profileUrl = `https://www.instagram.com/${username}/`;

  return (
    <section className="bg-bg py-10 sm:py-14 lg:py-20 print:hidden">
      <Container>
        <SectionHeader title={instagram.heading} />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-start">
          <Reveal className="lg:col-span-2">
            <p className="max-w-md text-[14.5px] leading-relaxed text-ink-dim">{instagram.description}</p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Instagram size={16} />@{username}
              <ArrowUpRight size={14} />
            </a>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3">
            <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-lg border border-line bg-bg-elevated lg:mx-0">
              <div className="absolute inset-0 flex items-center justify-center text-[13px] text-ink-faint">
                Loading latest posts&hellip;
              </div>
              <iframe
                title={`Latest posts from @${username} on Instagram`}
                src={`${profileUrl}embed/`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative block h-[430px] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
