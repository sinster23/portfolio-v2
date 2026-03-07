"use client";

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ── EmailJS config — set these in your .env.local ──────────────────────────
// NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

// ── Rate limit config ───────────────────────────────────────────────────────
const RATE_LIMIT_KEY      = "contact_submissions";
const MAX_SUBMISSIONS     = 3;        // max sends per window
const WINDOW_MS           = 60 * 60 * 1000; // 1 hour window

/**
 * Returns { allowed: bool, remaining: number, resetInMs: number }
 * Stored in localStorage as [{ ts: timestamp }, ...]
 */
function checkRateLimit() {
  const now = Date.now();
  let entries = [];

  try {
    entries = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "[]");
  } catch {
    entries = [];
  }

  // Purge entries outside the window
  entries = entries.filter((e) => now - e.ts < WINDOW_MS);

  if (entries.length >= MAX_SUBMISSIONS) {
    const oldest   = entries[0].ts;
    const resetIn  = WINDOW_MS - (now - oldest);
    return { allowed: false, remaining: 0, resetInMs: resetIn };
  }

  return { allowed: true, remaining: MAX_SUBMISSIONS - entries.length, resetInMs: 0 };
}

function recordSubmission() {
  const now = Date.now();
  let entries = [];
  try {
    entries = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "[]");
  } catch {
    entries = [];
  }
  entries = entries.filter((e) => now - e.ts < WINDOW_MS);
  entries.push({ ts: now });
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(entries));
}

function formatMs(ms) {
  const totalSec = Math.ceil(ms / 1000);
  const mins     = Math.floor(totalSec / 60);
  const secs     = totalSec % 60;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [error,     setError]     = useState("");
  const [rateLimitMsg, setRateLimitMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const sectionRef = useRef(null);
  const formRef    = useRef(null);

  // Countdown timer for rate-limit message
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1000) {
          setRateLimitMsg("");
          return 0;
        }
        return c - 1000;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  // Scroll reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".c-reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("c-reveal--visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ── Client-side rate limit check ──
    const { allowed, resetInMs } = checkRateLimit();
    if (!allowed) {
      const msg = `Too many submissions. Try again in ${formatMs(resetInMs)}.`;
      setRateLimitMsg(msg);
      setCountdown(resetInMs);
      return;
    }

    setSending(true);

    try {
      // Template variables — make sure your EmailJS template uses:
      // {{from_name}}, {{from_email}}, {{message}}
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          reply_to:   form.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      recordSubmission();
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Transmission failed. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="py-16 px-4 relative overflow-hidden"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        {/* Spidey GIF */}
        <img
          src="/spidey.gif"
          alt="spidey"
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            width: "clamp(120px, 30vw, 180px)",
            height: "auto",
            zIndex: 2,
            pointerEvents: "none",
            userSelect: "none",
            filter: "drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)",
          }}
        />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="c-reveal relative mt-14">

            {/* Floating badge */}
            <div className="contact-badge">START A PROJECT</div>

            {/* Card */}
            <div style={{ background: "#fff", border: "4px solid #000", boxShadow: "8px 8px 0 #000" }}>
              <div className="contact-grid">

                {/* ── LEFT ── */}
                <div className="contact-left">
                  <div>
                    <h2 className="contact-heading">
                      LET&apos;S<br />TALK<br />CODE.
                    </h2>
                    <p className="contact-subtext">
                      I am currently available for freelance<br />
                      work and open to full-time opportunities.
                    </p>
                  </div>

                  <div className="contact-info-links">
                    <a href="mailto:upayandutta204@gmail.com" className="contact-info-row" style={{ textDecoration: "none" }}>
                      <div className="contact-icon-box">
                        <i className="ri-mail-line text-lg" />
                      </div>
                      <span className="contact-info-text">upayandutta204@gmail.com</span>
                    </a>

                    <a href="https://www.instagram.com/505.not.alive" target="_blank" rel="noopener noreferrer" className="contact-info-row" style={{ textDecoration: "none" }}>
                      <div className="contact-icon-box">
                        <i className="ri-instagram-line text-lg" />
                      </div>
                      <span className="contact-info-text">@505.not.alive</span>
                    </a>
                  </div>
                </div>

                {/* ── RIGHT ── */}
                <div className="contact-right">
                  {submitted ? (
                    <div className="contact-success">
                      <div style={{
                        width: 64, height: 64,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "4px solid #000",
                        background: "#33FF57",
                        boxShadow: "4px 4px 0 #000",
                      }}>
                        <i className="ri-checkbox-circle-fill text-3xl text-black" />
                      </div>
                      <h3 className="contact-success-title">Transmission Received</h3>
                      <p className="contact-success-body">
                        System response initialized.<br />I will reach out shortly.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="contact-btn"
                        style={{ marginTop: "1rem", maxWidth: 220 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform  = "translate(2px,2px)";
                          e.currentTarget.style.boxShadow  = "2px 2px 0 #000";
                          e.currentTarget.style.background = "#121212";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform  = "";
                          e.currentTarget.style.boxShadow  = "4px 4px 0 #000";
                          e.currentTarget.style.background = "#3B82F6";
                        }}
                      >
                        SEND ANOTHER
                      </button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">

                      {[
                        { label: "Identity",    key: "name",  type: "text",  placeholder: "NAME / COMPANY" },
                        { label: "Coordinates", key: "email", type: "email", placeholder: "EMAIL ADDRESS"  },
                      ].map(({ label, key, type, placeholder }) => (
                        <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <label className="contact-label">{label}</label>
                          <input
                            type={type}
                            required
                            placeholder={placeholder}
                            value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="contact-input"
                            onFocus={(e) => { e.target.style.background = "#FBFF48"; }}
                            onBlur={(e)  => { e.target.style.background = "#f3f3f3"; }}
                          />
                        </div>
                      ))}

                      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                        <label className="contact-label">Transmission</label>
                        <textarea
                          rows={5}
                          required
                          placeholder="PROJECT DETAILS..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="contact-input"
                          style={{ resize: "none", flex: 1 }}
                          onFocus={(e) => { e.target.style.background = "#FBFF48"; }}
                          onBlur={(e)  => { e.target.style.background = "#f3f3f3"; }}
                        />
                      </div>

                      {/* Rate limit warning */}
                      {rateLimitMsg && (
                        <div style={{
                          background:  "#FFF3CD",
                          border:      "2px solid #000",
                          padding:     "10px 14px",
                          fontFamily:  '"JetBrains Mono", monospace',
                          fontSize:    "0.72rem",
                          fontWeight:  700,
                          color:       "#7a4800",
                          display:     "flex",
                          alignItems:  "center",
                          gap:         8,
                        }}>
                          <span>⚠</span>
                          {rateLimitMsg}
                          {countdown > 0 && (
                            <span style={{ marginLeft: "auto", color: "#c07000" }}>
                              {formatMs(countdown)}
                            </span>
                          )}
                        </div>
                      )}

                      {/* General error */}
                      {error && (
                        <div style={{
                          background: "#FFE5E5",
                          border:     "2px solid #000",
                          padding:    "10px 14px",
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize:   "0.72rem",
                          fontWeight: 700,
                          color:      "#8b0000",
                        }}>
                          ✕ {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="contact-btn"
                        onMouseEnter={(e) => {
                          if (sending) return;
                          e.currentTarget.style.transform  = "translate(2px,2px)";
                          e.currentTarget.style.boxShadow  = "2px 2px 0 #000";
                          e.currentTarget.style.background = "#121212";
                        }}
                        onMouseLeave={(e) => {
                          if (sending) return;
                          e.currentTarget.style.transform  = "";
                          e.currentTarget.style.boxShadow  = "4px 4px 0 #000";
                          e.currentTarget.style.background = sending ? "#555" : "#3B82F6";
                        }}
                        style={{ opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
                      >
                        {sending ? "TRANSMITTING..." : "TRANSMIT DATA"}
                      </button>

                    </form>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;600;700;800&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css');

        .c-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.6s cubic-bezier(0.25,1,0.5,1),
                      transform 0.6s cubic-bezier(0.25,1,0.5,1);
        }
        .c-reveal--visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .contact-badge {
          position:       absolute;
          top:            -22px;
          left:           12px;
          z-index:        10;
          background:     #FBFF48;
          border:         3px solid #000;
          padding:        6px 16px;
          font-family:    "Space Grotesk", sans-serif;
          font-weight:    900;
          font-size:      0.85rem;
          letter-spacing: 0.05em;
          box-shadow:     4px 4px 0 #000;
          transform:      rotate(-4deg);
          white-space:    nowrap;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
        }

        .contact-left {
          padding:       2rem;
          border-bottom: 4px solid #000;
          display:       flex;
          flex-direction:column;
          justify-content:space-between;
          gap:           2rem;
        }

        .contact-heading {
          font-family:    "Space Grotesk", sans-serif;
          font-weight:    900;
          text-transform: uppercase;
          line-height:    1.05;
          letter-spacing: -0.02em;
          color:          #000;
          font-size:      clamp(2.2rem, 10vw, 4.5rem);
          margin-bottom:  1.25rem;
        }

        .contact-subtext {
          font-family: "JetBrains Mono", monospace;
          font-size:   0.85rem;
          color:       #555;
          line-height: 1.7;
        }

        .contact-info-links {
          display:        flex;
          flex-direction: column;
          gap:            1rem;
        }

        .contact-info-row {
          display:     flex;
          align-items: center;
          gap:         1rem;
        }

        .contact-icon-box {
          width:           44px;
          height:          44px;
          flex-shrink:     0;
          display:         flex;
          align-items:     center;
          justify-content: center;
          background:      #121212;
          color:           #fff;
        }

        .contact-info-text {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size:   0.9rem;
          color:       #000;
          word-break:  break-all;
        }

        .contact-right { padding: 2rem; }

        .contact-form {
          display:        flex;
          flex-direction: column;
          gap:            1.25rem;
          height:         100%;
        }

        .contact-success {
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          min-height:      300px;
          text-align:      center;
          gap:             1rem;
        }

        .contact-success-title {
          font-family:    "Space Grotesk", sans-serif;
          font-weight:    900;
          font-size:      1.4rem;
          text-transform: uppercase;
        }

        .contact-success-body {
          font-family: "JetBrains Mono", monospace;
          font-size:   0.85rem;
          color:       #555;
        }

        .contact-label {
          font-family:    "JetBrains Mono", monospace;
          font-weight:    700;
          font-size:      0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color:          #121212;
        }

        .contact-input {
          background:  #f3f3f3;
          border:      2px solid #000;
          padding:     12px 14px;
          font-family: "JetBrains Mono", monospace;
          font-weight: 700;
          font-size:   0.85rem;
          outline:     none;
          transition:  background 0.15s;
          color:       #121212;
          width:       100%;
          box-sizing:  border-box;
        }

        .contact-input::placeholder { color: #aaa; font-weight: 400; }

        .contact-btn {
          background:     #3B82F6;
          color:          #fff;
          border:         2px solid #000;
          padding:        14px 0;
          font-family:    "JetBrains Mono", monospace;
          font-weight:    900;
          font-size:      1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor:         pointer;
          transition:     transform 0.15s, background 0.15s, box-shadow 0.15s;
          box-shadow:     4px 4px 0 #000;
          width:          100%;
        }

        @media (min-width: 768px) {
          .contact-badge {
            left:      -35px;
            font-size: 1rem;
            transform: rotate(-6deg);
          }
          .contact-grid {
            grid-template-columns: 1fr 1fr;
          }
          .contact-left {
            padding:       3rem;
            border-bottom: none;
            border-right:  4px solid #000;
          }
          .contact-right { padding: 3rem; }
          .contact-info-text { font-size: 1rem; word-break: normal; }
        }
      `}</style>
    </>
  );
}