function followPointer(event) {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
  )
    return;
  const { left, top, width, height } =
    event.currentTarget.getBoundingClientRect();
  if (!width || !height) return;
  const x = Math.max(-1, Math.min(1, ((event.clientX - left) / width) * 2 - 1));
  const y = Math.max(-1, Math.min(1, ((event.clientY - top) / height) * 2 - 1));
  event.currentTarget.style.setProperty("--art-x", `${x * 13}px`);
  event.currentTarget.style.setProperty("--art-y", `${y * 10}px`);
  event.currentTarget.style.setProperty("--art-tilt", `${x * 2}deg`);
}

function resetPointer(event) {
  for (const variable of ["--art-x", "--art-y", "--art-tilt"])
    event.currentTarget.style.removeProperty(variable);
}

function ArtworkFrame({ className, children }) {
  return (
    <figure
      className={className}
      onPointerMove={followPointer}
      onPointerLeave={resetPointer}
    >
      {children}
    </figure>
  );
}

export function FoundationArt() {
  return (
    <figure className="foundation-art">
      <img
        className="foundation-book"
        src="https://purepng.com/public/uploads/large/purepng.com-open-bookbookillustratedwrittenprintedliterature-14215264519799t1mw.png"
        alt="An open book with softly curved pages"
        width="2723"
        height="1950"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </figure>
  );
}

export function SwissPoster({ variant }) {
  const description =
    variant === "people"
      ? "Three geometric figures coming together on a shared foundation"
      : variant === "services"
        ? "Four geometric building blocks representing the service structure"
        : "Two geometric conversation bubbles connecting";
  return (
    <ArtworkFrame className={`swiss-poster poster-${variant}`}>
      <div className="swiss-poster-canvas">
        <svg viewBox="0 0 480 480" role="img" aria-label={description}>
          <g className="artwork-parallax">
            <g className="artwork-enter">
              {variant === "people" && (
                <>
                  <circle cx="240" cy="258" r="204" fill="#f0d57f" />
                  <path d="M64 352a96 96 0 0 1 192 0v64H64Z" fill="#ed5a36" />
                  <path d="M224 352a96 96 0 0 1 192 0v64H224Z" fill="#e5b94a" />
                  <path
                    d="M144 304a96 96 0 0 1 192 0v112H144Z"
                    fill="#262b25"
                  />
                  <g className="people-head head-left">
                    <circle cx="160" cy="188" r="44" fill="#ed5a36" />
                  </g>
                  <g className="people-head head-right">
                    <circle cx="320" cy="188" r="44" fill="#e5b94a" />
                  </g>
                  <g className="people-head head-centre">
                    <circle cx="240" cy="132" r="52" fill="#262b25" />
                  </g>
                  <path d="M144 416h192v-48H144Z" fill="#f5f4ee" />
                </>
              )}
              {variant === "services" && (
                <>
                  <g className="poster-tile tile-one">
                    <path d="M40 40h192v192H40Z" fill="#ed5a36" />
                    <g
                      className="tile-sun"
                      transform="translate(136 136)"
                      fill="#f5f4ee"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <rect
                          key={i}
                          x="-5"
                          y="-52"
                          width="10"
                          height="104"
                          transform={`rotate(${i * 15})`}
                        />
                      ))}
                      <circle r="30" />
                    </g>
                  </g>
                  <g className="poster-tile tile-two">
                    <path d="M248 40h192v192H248Z" fill="#e5b94a" />
                    <path
                      d="M280 200v-40h40v-40h40V80h40v120Z"
                      fill="#262b25"
                    />
                  </g>
                  <g className="poster-tile tile-three">
                    <path d="M40 248h192v192H40Z" fill="#e5b94a" />
                    <path
                      d="M84 408v-64a52 52 0 0 1 104 0v64h-26v-64a26 26 0 0 0-52 0v64Z"
                      fill="#262b25"
                    />
                  </g>
                  <g className="poster-tile tile-four">
                    <path d="M248 248h192v192H248Z" fill="#262b25" />
                    <path
                      d="M284 284a60 60 0 0 1 60 60 60 60 0 0 1 60-60v120a60 60 0 0 1-60-60 60 60 0 0 1-60 60Z"
                      fill="#ed5a36"
                    />
                  </g>
                </>
              )}
              {variant === "contact" && (
                <>
                  <circle cx="246" cy="246" r="205" fill="#f0d57f" />
                  <g className="message-back">
                    <path
                      d="M64 80h280v208H160l-72 64v-64H64Z"
                      fill="#ed5a36"
                    />
                    {[132, 192, 252].map((x, i) => (
                      <circle
                        className="message-dot"
                        style={{ "--dot-delay": `${i * 180}ms` }}
                        key={x}
                        cx={x}
                        cy="184"
                        r="14"
                        fill="#f5f4ee"
                      />
                    ))}
                  </g>
                  <g className="message-front">
                    <path
                      d="M200 232h216v128h-32v56l-64-56H200Z"
                      fill="#262b25"
                    />
                    <path d="M240 296h128" stroke="#e5b94a" strokeWidth="12" />
                  </g>
                  <circle
                    className="decorative-orb"
                    cx="402"
                    cy="76"
                    r="22"
                    fill="#ed5a36"
                  />
                </>
              )}
            </g>
          </g>
        </svg>
      </div>
    </ArtworkFrame>
  );
}
