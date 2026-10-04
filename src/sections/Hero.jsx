import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";
import { assetUrl } from "../lib/assetUrl";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  const { hero } = useContent();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Content loads async: the very first render can briefly show the
  // default hero.image (before content.json is fetched), and if that one
  // 404s, the broken-image flag must not stick once the real saved image
  // arrives. Tracking the src alongside the flag — and resetting both
  // together during render when the src changes — avoids that instead of
  // an effect that fires a render behind.
  const [imageState, setImageState] = useState({ src: hero.image, ok: true });
  if (imageState.src !== hero.image) {
    setImageState({ src: hero.image, ok: true });
  }
  const imageOk = imageState.ok;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy text-on-navy">
      {/* Campus photograph. Falls back to a plain navy panel + faint
          blueprint grid until public/brand/hero-campus.jpg is supplied. */}
      {hero.image && imageOk && (
        <motion.img
          src={assetUrl(hero.image)}
          alt={hero.imageAlt}
          onError={() => setImageState((s) => ({ ...s, ok: false }))}
          style={{ y: imageY }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {!(hero.image && imageOk) && (
        <div className="absolute inset-0 bg-grid-faint opacity-[0.08]" />
      )}

      {/* Readable, restrained overlay — a gradient anchored to the left/
          bottom where the text sits, not a flat wash across the photo. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/55 to-navy-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />

      <Container className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
        {hero.quote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden sm:block absolute top-6 right-0 max-w-[210px] text-right text-[13px] italic leading-snug text-white/60"
          >
            “{hero.quote}”
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-2 mono-label text-[11px] text-white/70"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent-dim animate-ping-slow" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent-dim" />
          </span>
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mt-4 max-w-xl font-display font-semibold text-[32px] sm:text-[52px] lg:text-[58px] leading-[1.04] tracking-[-0.01em] text-white"
        >
          {hero.headline}
          <br />
          <span className="shimmer-text">{hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-4 sm:mt-5 max-w-md text-[14px] sm:text-[15px] leading-relaxed text-white/80"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3"
        >
          <Button href={hero.ctaPrimaryHref} variant="primary">
            {hero.ctaPrimaryLabel}
          </Button>
          <Button href={hero.ctaSecondaryHref} variant="onImage" icon={false}>
            {hero.ctaSecondaryLabel}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-7 sm:mt-10 flex items-center gap-2 text-[12.5px] sm:text-[13px] text-white/70"
        >
          <MapPin size={15} strokeWidth={2} className="shrink-0 text-accent-dim" />
          <span>
            {hero.locationLine1} <span className="mx-1 opacity-50">·</span> {hero.locationLine2}
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
