"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  words = [],
  typeSpeed = 70,
  deleteSpeed = 40,
  pause = 1600,
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? word.slice(0, text.length - 1)
              : word.slice(0, text.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span>
      {text}
      <span className="animate-blink">_</span>
    </span>
  );
}
