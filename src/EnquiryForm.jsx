import { useEffect, useRef, useState } from "react";
import { company, services } from "./content.js";
import { Icon } from "./components.jsx";

const interests = [
  ...services
    .filter((service) => !service.pending)
    .map((service) => [service.id, service.title]),
  ["careers", "Career enquiry"],
  ["general", "General enquiry"],
];

export default function EnquiryForm({ initialInterest }) {
  const [interest, setInterest] = useState(
    interests.some(([value]) => value === initialInterest)
      ? initialInterest
      : "",
  );
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const review = useRef(null);
  const form = useRef(null);
  const previousDraft = useRef(null);

  useEffect(() => {
    if (draft) review.current?.focus();
    else if (previousDraft.current)
      form.current?.elements.namedItem("name")?.focus();
    previousDraft.current = draft;
  }, [draft]);

  function prepare(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Native required validates empty strings; also reject whitespace-only values.
    for (const fieldName of ["name", "message"]) {
      const field = form.elements.namedItem(fieldName);
      const trimmed = field.value.trim();
      field.setCustomValidity(
        !trimmed
          ? "Please fill out this field."
          : fieldName === "message" && trimmed.length < 10
            ? "Please provide at least 10 characters."
            : "",
      );
      if (!field.reportValidity()) return;
    }
    const details = Object.fromEntries(data.entries());
    const subject = `${interests.find(([value]) => value === interest)?.[1] || "Enquiry"} — ${details.name.trim()}`;
    const body = `Hello H SAT Edu Solutions,\n\n${details.message.trim()}\n\nName: ${details.name.trim()}\nEmail: ${details.email.trim()}\nOrganisation: ${details.organisation.trim() || "Not specified"}\nInterested in: ${interests.find(([value]) => value === interest)?.[1]}\n\nRegards,\n${details.name.trim()}`;
    setDraft({
      subject,
      body,
      mailto: `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    });
    setEmailOpened(false);
    setCopied(false);
    setCopyError(false);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(
        `To: ${company.email}\nSubject: ${draft.subject}\n\n${draft.body}`,
      );
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  function downloadDraft() {
    const blob = new Blob(
      [`To: ${company.email}\nSubject: ${draft.subject}\n\n${draft.body}`],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "h-sat-enquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <form onSubmit={prepare} hidden={!!draft} ref={form}>
        <p className="form-intro">A few details to start the conversation.</p>
        <div className="form-row">
          <label>
            Your name <span aria-hidden="true">*</span>
            <input
              name="name"
              autoComplete="name"
              placeholder="How should we address you?"
              maxLength="100"
              required
              onInput={(event) => event.currentTarget.setCustomValidity("")}
            />
          </label>
          <label>
            Email address <span aria-hidden="true">*</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              maxLength="200"
              required
            />
          </label>
        </div>
        <label>
          School / organisation <span className="optional">(optional)</span>
          <input
            name="organisation"
            autoComplete="organization"
            placeholder="The name of your institution"
            maxLength="200"
          />
        </label>
        <label>
          I’m interested in <span aria-hidden="true">*</span>
          <select
            name="interest"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            required
          >
            <option value="" disabled>
              Select a service or enquiry
            </option>
            {interests.map(([value, title]) => (
              <option value={value} key={value}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          A little about what you need <span aria-hidden="true">*</span>
          <textarea
            name="message"
            rows="4"
            placeholder="Your ideas, questions, or a little about your next chapter…"
            minLength="10"
            maxLength="4000"
            required
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </label>
        <p className="form-note">
          <Icon name="mail" />
          We’ll prepare your enquiry for your email app. Nothing is sent
          automatically.
        </p>
        <button className="button" type="submit">
          <span>Prepare my enquiry</span>
          <Icon name="northeast" />
        </button>
        <p className="form-privacy">
          Your details are used only to prepare this enquiry and are not saved
          by this website.
        </p>
      </form>
      {draft && (
        <div
          className="enquiry-review"
          ref={review}
          tabIndex="-1"
          aria-label="Review your enquiry"
        >
          <div className="review-check">
            <Icon name="check" />
          </div>
          <h3>Your conversation starts here.</h3>
          <p>
            Your enquiry is ready to review. Open your email app and press Send
            to deliver it to us.
          </p>
          <div className="draft-preview">
            <span className="draft-recipient">To: {company.email}</span>
            <h4>{draft.subject}</h4>
            <pre>{draft.body}</pre>
          </div>
          <a
            className="button"
            href={draft.mailto}
            onClick={() => setEmailOpened(true)}
          >
            Open email app <Icon name="northeast" />
          </a>
          {emailOpened && (
            <p role="status" className="draft-status">
              Finish sending in your email app. If it didn’t open, copy or
              download the enquiry and email it to {company.email}.
            </p>
          )}
          <div className="review-actions">
            <button
              type="button"
              onClick={() => {
                setDraft(null);
                setCopied(false);
              }}
            >
              Edit enquiry
            </button>
            <button type="button" onClick={copyDraft}>
              {copied ? "Copied!" : "Copy enquiry"}
            </button>
            <button type="button" onClick={downloadDraft}>
              <Icon name="download" />
              Save draft
            </button>
          </div>
          <span className="sr-only" role="status">
            {copied ? "Enquiry copied to clipboard" : ""}
          </span>
          {copyError && (
            <p role="status" className="draft-status">
              Copying is unavailable in this browser. Use Save draft to download
              your enquiry.
            </p>
          )}
        </div>
      )}
    </>
  );
}
