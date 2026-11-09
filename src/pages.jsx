import { Link, useSearchParams } from "react-router";
import { associates, company, services } from "./content.js";
import {
  ButtonLink,
  FoundationArt,
  Icon,
  Shape,
  SwissPoster,
} from "./components.jsx";
import EnquiryForm from "./EnquiryForm.jsx";

export function Home() {
  return (
    <>
      <section className="home-hero wrap" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title">
            Building
            <br />
            <span className="hero-word">brighter</span>
            <br />
            futures<span className="accent-dot">.</span>
          </h1>
          <p className="hero-description">
            From opening a school to helping it thrive, H SAT Edu Solutions
            brings your educational vision to life.
          </p>
          <div className="hero-actions">
            <ButtonLink to="/contact">Get Started</ButtonLink>
            <Link className="quiet-link" to="/about">
              A little about us <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <figure className="hero-visual">
          <img
            className="hero-image"
            src="/images/education-hero.png"
            alt="A child looking up, with books, stationery, and a laptop representing a world of learning"
            width="577"
            height="433"
            fetchPriority="high"
          />
        </figure>
      </section>

      <section
        className="home-intro wrap section-space"
        aria-labelledby="home-intro-title"
      >
        <FoundationArt />
        <div>
          <h2 id="home-intro-title">
            Behind every thriving school
            <br />
            is a <span className="underlined">thoughtful foundation.</span>
          </h2>
          <div className="intro-columns">
            <p>
              H SAT Edu Solutions brings direction to the many moving parts of
              education. We work across institution setup, school resources,
              management, and administration.
            </p>
            <p>
              From planning a new institution to improving an existing one, our
              purpose is to help educational communities move forward with
              clarity.
            </p>
          </div>
          <Link className="text-link" to="/about">
            Meet the people behind the purpose <Icon name="northeast" />
          </Link>
        </div>
      </section>

      <section
        className="home-services wrap section-space"
        aria-labelledby="home-services-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="home-services-title">
              Your vision.
              <br />
              Our shared direction.
            </h2>
          </div>
          <Link className="text-link" to="/services">
            Explore our services <Icon name="northeast" />
          </Link>
        </div>
        <div className="service-highlight-grid">
          {services.map((service) => (
            <Link
              to={`/services#${service.id}`}
              className={`service-highlight service-${service.number} ${service.pending ? "service-pending" : ""}`}
              key={service.id}
            >
              <div className="highlight-top">
                <Icon name="northeast" />
              </div>
              <Shape type={service.shape} />
              <h3>{service.title}</h3>
              <p>
                {service.pending
                  ? "Content confirmation pending"
                  : service.short}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-cta wrap section-space">
        <div className="cta-art" aria-hidden="true">
          <Shape type="sun" />
        </div>
        <div>
          <h2>
            What’s next
            <br />
            for your school?
          </h2>
          <ButtonLink light to="/contact">
            Start a conversation
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function PortraitPlaceholder({ initials, name, className = "" }) {
  return (
    <div
      className={`portrait-placeholder ${className}`}
      role="img"
      aria-label={`Photograph of ${name} to be added`}
    >
      <span className="portrait-initials">{initials}</span>
      <span className="portrait-note">Photograph to be added</span>
    </div>
  );
}

export function About() {
  return (
    <div className="about-content wrap">
      <section className="swiss-hero about-hero">
        <div className="swiss-hero-copy">
          <h1>
            Good schools.
            <br />
            <span>Good people.</span>
          </h1>
          <p>
            Meet Dr. Tumma Hyma Reddy, the founder behind H SAT Edu Solutions,
            and discover the purpose that guides our work.
          </p>
          <a className="text-link" href="#founder">
            Meet our people <Icon name="down" />
          </a>
        </div>
        <SwissPoster variant="people" />
      </section>

      <section
        className="about-mission about-section"
        aria-labelledby="mission-title"
      >
        <Shape type="steps" className="section-art" />
        <div>
          <h2 id="mission-title">
            A clear vision.
            <br />
            <span className="accent-text">A considered approach.</span>
          </h2>
          <div className="about-columns">
            <p>
              H SAT Edu Solutions provides educational consulting, school
              establishment, resource management, administration, and
              institutional improvement services.
            </p>
            <p>
              Our mission is to support educational institutions with clear
              planning and practical guidance. We bring together the resources,
              people, and processes that help an institution develop.
            </p>
          </div>
        </div>
      </section>

      <section
        className="founder-section about-section"
        id="founder"
        aria-labelledby="founder-title"
      >
        <div className="founder-portrait">
          <PortraitPlaceholder initials="HR" name={company.founder} />
        </div>
        <div className="founder-copy">
          <h2 id="founder-title">
            Dr. Tumma
            <br />
            <span className="accent-text">Hyma Reddy</span>
          </h2>
          <span className="role-label">Founder & Managing Director</span>
          <p>
            With experience in academics, administration, and marketing, Dr.
            Tumma Hyma Reddy leads H SAT Edu Solutions.
          </p>
          <p>
            This experience brings several perspectives to the organisation’s
            educational consulting and institutional support services.
          </p>
        </div>
      </section>

      <section
        className="associates-section about-section"
        aria-labelledby="associates-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="associates-title">
              Connected by <span className="accent-text">education.</span>
            </h2>
          </div>
          <p>A network of shared purpose.</p>
        </div>
        <div className="associates-grid">
          {associates.map((name) => (
            <div className="associate" key={name}>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        className="career-section about-section"
        aria-labelledby="career-title"
      >
        <Shape type="flower" className="career-art" />
        <div>
          <h2 id="career-title">
            Bring your experience.
            <br />
            <span className="accent-text">Explore what’s next.</span>
          </h2>
          <p>
            Interested in working in education? Introduce yourself and share
            your interests with H SAT Edu Solutions.
          </p>
          <p className="content-note">
            Current vacancies and role details will be added when available.
          </p>
          <ButtonLink to="/contact?interest=careers">
            Make a career enquiry
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}

export function Services() {
  return (
    <>
      <section className="swiss-hero services-hero wrap">
        <div className="swiss-hero-copy">
          <h1>
            Support for
            <br />
            <span>better schools.</span>
          </h1>
          <p>
            Planning, resources, and administration. Practical help for starting
            a school and improving how it runs.
          </p>
          <a href="#service-details" className="button">
            <span>Explore our services</span>
            <Icon name="down" />
          </a>
        </div>
        <SwissPoster variant="services" />
      </section>

      <section
        className="services-detail wrap"
        id="service-details"
        aria-label="Our educational services"
      >
        <div className="services-intro">
          <Shape type="arch" className="section-art" />
          <div>
            <h2>
              Good things take shape
              <br />
              with the <span className="accent-text">right support.</span>
            </h2>
            <p>
              Our services bring together planning, resources, and
              administration to support educational institutions.
            </p>
          </div>
        </div>
        {services.map((service) => (
          <article
            className={`service-detail detail-${service.number} ${service.pending ? "detail-pending" : ""}`}
            id={service.id}
            key={service.id}
          >
            <div className="service-detail-art">
              <Shape type={service.shape} />
              <span className="detail-art-caption">
                {service.pending
                  ? "A space for what comes next."
                  : service.short}
              </span>
            </div>
            <div className="service-detail-copy">
              {service.pending && (
                <p className="service-status">Details awaiting confirmation</p>
              )}
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              {service.details.length > 0 && (
                <ul className="service-features">
                  {service.details.map((detail) => (
                    <li key={detail}>
                      <Icon name="check" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
              {service.pending ? (
                <p className="confirmation-note">
                  <Icon name="plus" />
                  This duplicate is retained from the original site. A distinct
                  service will be added only after confirmation.
                </p>
              ) : (
                <ButtonLink to={`/contact?interest=${service.id}`}>
                  Let’s discuss your needs
                </ButtonLink>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="home-cta services-cta wrap section-space">
        <div className="cta-art" aria-hidden="true">
          <Shape type="sun" />
        </div>
        <div>
          <h2>
            Talk through
            <br />
            your next step.
          </h2>
          <p>
            Tell us about your institution, your plans, or a challenge you’re
            working through. We’ll start there.
          </p>
          <ButtonLink light to="/contact">
            Find your next step
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

export function Contact() {
  const [searchParams] = useSearchParams();
  return (
    <div className="contact-content wrap">
      <section className="swiss-hero contact-hero">
        <div className="swiss-hero-copy">
          <h1>
            Let’s talk
            <br />
            <span>education.</span>
          </h1>
          <p>
            A new school, a new challenge, or your next role in education. Tell
            us what you have in mind.
          </p>
          <a className="button" href="#enquiry">
            Get Started <Icon name="down" />
          </a>
        </div>
        <SwissPoster variant="contact" />
      </section>

      <section
        className="contact-main"
        id="enquiry"
        aria-labelledby="contact-form-title"
      >
        <div className="contact-information">
          <h2>
            A little hello can
            <br />
            go a <span className="accent-text">long way.</span>
          </h2>
          <p>
            Tell us what’s on your mind. Start with the details below, or write
            to us directly.
          </p>
          <a className="contact-detail" href={`mailto:${company.email}`}>
            <span className="detail-icon">
              <Icon name="mail" />
            </span>
            <span>
              <small>Email</small>
              <strong>{company.email}</strong>
            </span>
            <Icon name="northeast" />
          </a>
          <a
            className="contact-detail"
            href={company.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="detail-icon">
              <Icon name="pin" />
            </span>
            <span>
              <small>Location</small>
              <strong>
                Hyderabad, Telangana
                <br />
                500092, India
              </strong>
            </span>
            <Icon name="northeast" />
          </a>
          <div className="contact-detail muted-detail">
            <span className="detail-icon">
              <Icon name="phone" />
            </span>
            <span>
              <small>Telephone</small>
              <span className="content-note">Phone number to be added.</span>
            </span>
          </div>
          <div className="social-section">
            <h3>Social media</h3>
            <strong>@hsatedu</strong>
            <p>Social profile links are awaiting verification.</p>
            <div className="social-labels">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="contact-form-card">
          <h2 id="contact-form-title">
            Let’s get started<span>.</span>
          </h2>
          <EnquiryForm initialInterest={searchParams.get("interest")} />
        </div>
      </section>

      <section className="location-section" aria-labelledby="location-title">
        <div className="location-map">
          <iframe
            title="Map showing Hyderabad, Telangana 500092, India (general location)"
            src="https://maps.google.com/maps?q=Hyderabad%2C%20Telangana%20500092%2C%20India&t=&z=12&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className="map-link"
            href={company.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps <Icon name="northeast" />
          </a>
        </div>
        <div className="location-copy">
          <h2 id="location-title">
            Visit us in
            <br />
            <span className="accent-text">Hyderabad.</span>
          </h2>
          <p>{company.address}</p>
          <p className="content-note">
            This map shows our general location. A street address and visit
            information will be added once confirmed.
          </p>
          <Shape type="sun" />
        </div>
      </section>
    </div>
  );
}
