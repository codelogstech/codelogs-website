"use client";

import { useEffect, useState } from "react";

function formatIst(d: Date) {
  const istMs = d.getTime() + (330 + d.getTimezoneOffset()) * 60000;
  const ist = new Date(istMs);
  const hh = String(ist.getHours()).padStart(2, "0");
  const mm = String(ist.getMinutes()).padStart(2, "0");
  const ss = String(ist.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss} IST`;
}

export default function Clock() {
  const [value, setValue] = useState("--:--:-- IST");

  useEffect(() => {
    setValue(formatIst(new Date()));
    const id = window.setInterval(() => setValue(formatIst(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="kbd" id="clock">
      {value}
    </span>
  );
}
