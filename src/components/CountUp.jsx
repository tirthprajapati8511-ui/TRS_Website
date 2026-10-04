import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{reduce ? to : n}</span>;
}

// "6+" counts up its number and keeps the suffix; anything that doesn't start
// with a number (like "24/7") is shown as it is.
export default function StatValue({ value }) {
  const text = String(value ?? "").trim();
  const match = text.match(/^(\d+)(\D*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <CountUp to={Number(match[1])} />
      {match[2]}
    </>
  );
}
