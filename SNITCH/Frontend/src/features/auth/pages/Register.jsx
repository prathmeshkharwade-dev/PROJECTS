import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────
   SNITCH — Register Page
   Design System: Stitch "Obsidian & Gilt"
   Layout: 60/40 split-screen (image left, frosted glass form right)
   Mobile: full-screen form over background image
───────────────────────────────────────────────────────────────────── */

/* ── SVG Icons (inline, no dependency) ─────────────────────────────── */
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#F5F0E8" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#F5F0E8" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#F5F0E8" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#F5F0E8" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5F0E8">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/* ── Field component ─────────────────────────────────────────────────── */
const Field = ({ id, label, type = "text", autoComplete, value, onChange, rightSlot }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          marginBottom: "8px",
          color: focused ? "var(--color-gold)" : "var(--color-muted)",
          transition: "color 0.4s cubic-bezier(0.2,0,0,1)",
        }}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
          required
          className="snitch-input"
          style={{ paddingRight: rightSlot ? "2rem" : "0" }}
        />
        {rightSlot && (
          <div className="absolute right-0" style={{ color: "var(--color-muted)" }}>
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Main Register Component ─────────────────────────────────────────── */
const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    isSeller: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register payload:", form);
  };

  return (
    <div
      className="relative min-h-screen w-full flex"
      style={{ background: "var(--color-bg)", fontFamily: "var(--font-sans)" }}
    >

      {/* ══════════════════════════════════════════════════════════════
          LEFT PANEL — Brand / Editorial Image (desktop only)
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="hidden lg:flex lg:w-[60%] relative flex-col justify-between overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/store-bg.png')" }}
        />

        {/* Dark warm overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--color-overlay)" }}
        />

        {/* Gradient at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          }}
        />

        {/* ── TOP: Brand name ── */}
        <div className="relative z-10 px-12 pt-12">
          <a href="/" aria-label="Snitch home">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-cream)",
              }}
            >
              Snitch
            </span>
          </a>
        </div>

        {/* ── BOTTOM: Tagline ── */}
        <div className="relative z-10 px-12 pb-14">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
              fontWeight: 600,
              fontStyle: "italic",
              lineHeight: 1.1,
              color: "var(--color-cream)",
              letterSpacing: "-0.01em",
              marginBottom: "2.25rem",
            }}
          >
            Wear the Story
          </p>
          <a
            href="/login"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "var(--color-muted)",
              letterSpacing: "0.05em",
            //   textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--color-gold)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--color-muted)")}
          >
            Already a member? Sign in →
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          RIGHT PANEL — Form
      ══════════════════════════════════════════════════════════════ */}

      {/* Mobile: full-screen bg image behind the form */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/store-bg.png')" }}
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{ background: "rgba(0,0,0,0.6)" }}
      />

      <div
        className="relative z-10 lg:w-[40%] w-full flex items-center justify-center px-5 sm:px-10 lg:px-10 py-12"
        style={{
          background: "linear-gradient(to bottom, #1A1608 0%, #111008 40%, #0D0B05 100%)",
          borderLeft: "1px solid rgba(201,168,76,0.15)",
        }}
      >

        {/* Frosted glass card */}
        <div
          className="w-full max-w-[420px] px-8 py-10 sm:px-10 sm:py-12"
        >

          {/* Mobile brand name */}
          <div className="lg:hidden mb-8 text-center">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 500,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--color-cream)",
              }}
            >
              Snitch
            </span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 3.5vw, 3.25rem)",
                fontWeight: 500,
                color: "var(--color-cream)",
                letterSpacing: "0.01em",
                lineHeight: 1.05,
                marginBottom: "0.625rem",
              }}
            >
              Sign Up
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "#7A7060",
                fontWeight: 600,
                fontStyle: "italic",
                fontFamily: "var(--font-display)",
                letterSpacing: "0.02em",
              }}
            >
              Create your SNITCH account
            </p>
          </div>

          {/* Form */}
          <form id="register-form" onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "28px" }} noValidate>

            <Field
              id="fullName"
              label="Full Name"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={handleChange}
            />

            <Field
              id="contactNumber"
              label="Contact Number"
              type="tel"
              autoComplete="tel"
              value={form.contactNumber}
              onChange={handleChange}
            />

            <Field
              id="email"
              label="Email Address"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
            />

            <Field
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    color: "var(--color-muted)",
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />

            {/* isSeller Checkbox */}
            <label
              htmlFor="isSeller"
              className="flex items-start gap-3 cursor-pointer"
            >
              <input
                id="isSeller"
                name="isSeller"
                type="checkbox"
                checked={form.isSeller}
                onChange={handleChange}
                className="snitch-checkbox"
              />
              <div>
                <span
                  style={{
                    fontSize: "0.9375rem",
                    color: form.isSeller ? "var(--color-cream)" : "#C8C0B0",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    transition: "color 0.3s ease",
                    display: "block",
                    lineHeight: 1.4,
                  }}
                >
                  I want to sell on Snitch
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#6A6050",
                    letterSpacing: "0.02em",
                    marginTop: "3px",
                    display: "block",
                  }}
                >
                  List and manage your products on the marketplace
                </span>
              </div>
            </label>

            {/* CTA Button */}
            <button
              id="register-submit"
              type="submit"
              style={{
                width: "100%",
                background: "#C9A84C",
                color: "#1A1608",
                fontFamily: "var(--font-sans)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "1.0625rem 2rem",
                border: "none",
                borderRadius: "0",
                cursor: "pointer",
                transition: "background 0.4s cubic-bezier(0.2,0,0,1), box-shadow 0.4s cubic-bezier(0.2,0,0,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#B8973E";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(201,168,76,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#C9A84C";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.1)" }} />
              <span
                style={{
                  fontSize: "0.625rem",
                  color: "#6A6050",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-sans)",
                }}
              >
                or sign up with
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.1)" }} />
            </div>

            {/* Social buttons */}
            <div className="flex gap-3">
              {[
                { label: "Google", Icon: GoogleIcon },
                { label: "Apple", Icon: AppleIcon },
              ].map(({ label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`Sign up with ${label}`}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    background: "#1C1A12",
                    border: "1px solid rgba(201,168,76,0.25)",
                    borderRadius: "0",
                    color: "var(--color-cream)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    padding: "0.8125rem 1rem",
                    cursor: "pointer",
                    transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C9A84C";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(201,168,76,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile sign-in link */}
            <p
              className="lg:hidden text-center"
              style={{ fontSize: "0.8125rem", color: "var(--color-muted)", marginTop: "0.5rem" }}
            >
              Already a member?{" "}
              <a
                href="/login"
                style={{
                  color: "var(--color-gold)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Sign in →
              </a>
            </p>

            {/* Terms */}
            <p
              style={{
                fontSize: "0.625rem",
                color: "#6A6050",
                textAlign: "center",
                lineHeight: 1.8,
                letterSpacing: "0.04em",
              }}
            >
              By registering you agree to our{" "}
              <a
                href="/terms"
                style={{ color: "#9A9080", textDecoration: "underline", textDecorationColor: "rgba(154,144,128,0.3)" }}
              >
                Terms
              </a>{" "}
              &{" "}
              <a
                href="/privacy"
                style={{ color: "#9A9080", textDecoration: "underline", textDecorationColor: "rgba(154,144,128,0.3)" }}
              >
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;