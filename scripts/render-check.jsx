import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import App from "../src/App.jsx";
import { associates, company } from "../src/content.js";

const render = (route) =>
  renderToStaticMarkup(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
const routes = ["/", "/about", "/services", "/contact"];
const pages = new Map(routes.map((route) => [route, render(route)]));

for (const [route, html] of pages) {
  assert.equal(
    (html.match(/<footer\b/g) || []).length,
    1,
    `${route} needs exactly one site footer`,
  );
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${route} needs one primary heading`,
  );
  assert.match(
    html,
    /aria-label="Main navigation"/,
    `${route} needs accessible navigation`,
  );
  assert.match(html, /id="main"/, `${route} needs its skip-link destination`);
  for (const destination of routes)
    assert.ok(
      html.includes(`href="${destination}"`),
      `${route} must link to ${destination}`,
    );
  assert.ok(
    !html.includes("you@example.com") || route === "/contact",
    "Contact placeholder belongs only in the enquiry input",
  );
}

const about = pages.get("/about");
for (const person of ["Dr. Tumma", "Hyma Reddy"])
  assert.ok(about.includes(person), `${person} must appear on About Us`);
for (const associate of associates)
  assert.ok(about.includes(associate), `${associate} must appear on About Us`);
assert.ok(
  about.includes("/contact?interest=careers"),
  "Career enquiries should pass their purpose to Contact",
);

const services = pages.get("/services");
assert.equal(
  (services.match(/<article/g) || []).length,
  4,
  "Preserve the four-service structure",
);
assert.equal(
  (services.match(/<h2>Establishment and Setup<\/h2>/g) || []).length,
  2,
  "Retain the original duplicate service",
);
assert.ok(
  services.includes("Details awaiting confirmation"),
  "The duplicate must be explicitly marked",
);

const contact = pages.get("/contact");
assert.ok(
  contact.includes('class="contact-closing"'),
  "The contact page should have an integrated closing landscape",
);
assert.ok(
  contact.indexOf('class="contact-closing"') > contact.indexOf("</main>"),
  "Keep the integrated global footer outside the main content landmark",
);
assert.equal(
  (contact.match(/data-character="child"/g) || []).length,
  3,
  "The contact farewell should include three kids",
);
assert.equal(
  (contact.match(/data-character="dog"/g) || []).length,
  1,
  "The contact farewell should include one dog",
);
assert.ok(
  contact.indexOf('class="waving-farewell') >
    contact.indexOf('class="location-section"'),
  "Place the farewell scene below the location section",
);
assert.ok(
  contact.includes(`mailto:${company.email}`),
  "Show the verified email address",
);
assert.ok(
  contact.includes("Phone number to be added."),
  "Do not invent a phone number",
);
assert.ok(
  contact.includes("general location"),
  "Label the city-level map accurately",
);
assert.ok(
  contact.includes("awaiting verification"),
  "Identify unverified social links",
);
assert.ok(
  contact.includes("Nothing is sent automatically."),
  "Explain the email handoff accurately",
);
assert.equal(
  (contact.match(/<form/g) || []).length,
  1,
  "Provide one enquiry form",
);
for (const field of ["name", "email", "interest", "message"])
  assert.ok(
    new RegExp(
      `<(?:input|select|textarea)\\b(?=[^>]*\\bname="${field}")(?=[^>]*\\brequired)[^>]*>`,
    ).test(contact),
    `${field} is required`,
  );
assert.ok(
  !contact.includes('<option value="confirmation"'),
  "The unconfirmed duplicate cannot be selected as a distinct service",
);
const careerContact = render("/contact?interest=careers");
assert.match(
  careerContact,
  /<option value="careers" selected="">/,
  "Career interest should be preselected",
);
for (const service of ["establishment", "resources", "administration"])
  assert.match(
    render(`/contact?interest=${service}`),
    new RegExp(`<option value="${service}" selected="">`),
    `${service} should be preselected`,
  );

const internalLinks = [
  ...new Set(
    [...pages.values()].flatMap((html) =>
      [...html.matchAll(/<a\b[^>]*\bhref="(\/[^\"]*)"/g)].map(
        (match) => match[1],
      ),
    ),
  ),
];
for (const href of internalLinks) {
  const url = new URL(href, "https://hsat.example");
  const route = url.pathname;
  const fragment = url.hash.slice(1);
  assert.ok(pages.has(route), `Internal route ${route} must exist`);
  if (fragment)
    assert.ok(
      pages.get(route).includes(`id="${fragment}"`),
      `Anchor ${route}#${fragment} must exist`,
    );
}
assert.ok(
  render("/unknown").includes("This page is still"),
  "Unknown routes should show a helpful fallback",
);
console.log(
  "Passed: four pages render; supplied content, internal links, service placeholders, enquiry fields, and interest selection are correct.",
);
