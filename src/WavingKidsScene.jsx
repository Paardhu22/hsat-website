import { useEffect, useId, useRef, useState } from "react";
import "./waving-kids.css";

function Eye({ x, y = -4, iris = "#6c432c", size = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <g className="friend-eye-blink">
        <ellipse cy="1" rx="22" ry="29" fill="#fffdf5" />
        <g className="friend-pupil">
          <ellipse cy="4" rx="13.5" ry="21" fill={iris} />
          <ellipse cy="5" rx="8.5" ry="15.5" fill="#252b32" />
          <ellipse cx="-4.5" cy="-4" rx="5" ry="6" fill="white" />
          <circle cx="5" cy="14" r="2.5" fill="white" opacity=".85" />
        </g>
      </g>
    </g>
  );
}

function Smile({ wide = false }) {
  return (
    <g
      className="friend-smile"
      transform={wide ? "translate(0 1) scale(1.08)" : undefined}
    >
      <path d="M-26 36Q0 47 26 36C23 70-23 70-26 36Z" fill="#643631" />
      <path d="M-16 39Q0 44 16 39L13 46Q0 49-13 46Z" fill="#fffdf5" />
      <path d="M-13 59Q0 46 14 59Q0 68-13 59Z" fill="#ee7b78" />
    </g>
  );
}

function Hand({ x = 0, y = 0, skin }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M-12 16-21 2C-25-5-18-10-14-5L-9 1-12-22C-13-30-4-32-2-23L1-8 2-30C3-38 12-37 12-29L11-8 16-24C19-31 27-27 24-20L20 5C20 18 13 27 3 28-5 28-9 24-12 16Z"
        fill={skin}
      />
      <path
        d="M-5 9Q3 6 10 9"
        fill="none"
        stroke="#b86e4c"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".35"
      />
    </g>
  );
}

const childPalettes = {
  buns: {
    skin: "#aa653c",
    shade: "#8f4e30",
    blush: "#df845d",
    hair: "#2c303e",
    shirt: "#ed6544",
    iris: "#623a25",
  },
  glasses: {
    skin: "#dfa071",
    shade: "#c18258",
    blush: "#ee9a7a",
    hair: "#4b342c",
    shirt: "#eab94b",
    iris: "#74522e",
  },
  bob: {
    skin: "#f0c3a1",
    shade: "#daa582",
    blush: "#efad97",
    hair: "#29364a",
    shirt: "#51a79e",
    iris: "#517970",
  },
};

/** An independent vector character. Position/scale it in any SVG scene. */
export function WavingChild({
  variant = "buns",
  x = 0,
  y = 0,
  scale = 1,
  delay = 0,
}) {
  const { skin, shade, blush, hair, shirt, iris } = childPalettes[variant];
  return (
    <g
      data-character="child"
      className={`waving-child child-${variant}`}
      transform={`translate(${x} ${y}) scale(${scale})`}
      style={{ "--friend-delay": `${delay}s` }}
    >
      <g className="friend-body">
        <ellipse cy="267" rx="60" ry="7" fill="#557950" opacity=".15" />
        <path
          d="M-51 176H51L47 254H8L0 207-8 254H-47Z"
          fill={variant === "glasses" ? "#b77a3e" : "#344458"}
        />
        <path
          d="M-48 248H-8V263H-60Q-62 250-48 248ZM8 248H48Q62 250 60 263H8Z"
          fill="#fff9e9"
        />
        <path
          d="M-59 261H-9m18 0h50"
          fill="none"
          stroke="#344458"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M-46 99Q-76 124-75 155"
          fill="none"
          stroke={skin}
          strokeWidth="23"
          strokeLinecap="round"
        />
        <ellipse cx="-75" cy="158" rx="14" ry="17" fill={skin} />
        <g className="friend-wave-arm">
          <path
            d="M53 100Q91 109 108 71L112 22"
            fill="none"
            stroke={skin}
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Hand x={112} y={1} skin={skin} />
        </g>
        <path
          d="M-60 98Q-40 79-16 81H16Q43 80 63 98L69 123 48 132 55 191Q0 205-55 191L-48 132-68 122Z"
          fill={variant === "glasses" ? "#fff9e9" : shirt}
        />
        <path d="M-18 61H18V88Q0 108-18 88Z" fill={skin} />
        <path
          d="M-23 83Q0 109 23 83"
          fill="none"
          stroke={variant === "glasses" ? "#e5ded0" : "#ffffff50"}
          strokeWidth="6"
        />
        {variant === "glasses" ? (
          <>
            <path d="M-44 93H-30V133H30V93H44V184Q0 200-44 184Z" fill={shirt} />
            <rect
              x="-25"
              y="141"
              width="50"
              height="35"
              rx="8"
              fill="#d6a131"
            />
            <circle cx="-37" cy="129" r="4" fill="#fff5cd" />
            <circle cx="37" cy="129" r="4" fill="#fff5cd" />
          </>
        ) : variant === "buns" ? (
          <>
            <path
              d="m0 128 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z"
              fill="#ffdf87"
            />
            <path
              d="M-51 179Q0 190 51 179"
              fill="none"
              stroke="#da4e34"
              strokeWidth="4"
            />
          </>
        ) : (
          <>
            <rect
              x="-23"
              y="135"
              width="46"
              height="31"
              rx="5"
              fill="#f6f1d9"
            />
            <path
              d="M0 139v22m-17-19q9-2 17 3 8-5 17-3"
              fill="none"
              stroke="#4c9388"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        )}
      </g>
      <g
        transform={`rotate(${variant === "buns" ? -5 : variant === "bob" ? 4 : 0})`}
      >
        <g className="friend-head">
          {variant === "buns" && (
            <g fill={hair}>
              <circle cx="-68" cy="-72" r="33" />
              <circle cx="68" cy="-72" r="33" />
              <circle cx="-87" cy="-77" r="16" />
              <circle cx="-69" cy="-98" r="17" />
              <circle cx="-49" cy="-82" r="19" />
              <circle cx="88" cy="-78" r="16" />
              <circle cx="69" cy="-98" r="17" />
              <circle cx="49" cy="-83" r="19" />
            </g>
          )}
          {variant === "bob" && (
            <path
              d="M-78-38C-94-119 85-140 84-35L86 65Q59 91 39 67H-48Q-86 83-86 52Z"
              fill={hair}
            />
          )}
          <ellipse cx="-74" cy="6" rx="17" ry="23" fill={skin} />
          <ellipse cx="74" cy="6" rx="17" ry="23" fill={skin} />
          <ellipse cx="-77" cy="7" rx="7" ry="13" fill={shade} />
          <ellipse cx="77" cy="7" rx="7" ry="13" fill={shade} />
          <path
            d="M-74-27C-74-79-40-101 0-101S74-79 74-27V15C74 60 43 82 0 82S-74 60-74 15Z"
            fill={skin}
          />
          <path
            d="M-65 34Q-48 68 0 72 48 68 65 34C55 67 32 82 0 82S-55 67-65 34Z"
            fill={shade}
            opacity=".18"
          />
          {variant === "buns" ? (
            <>
              <path
                d="M-78-25C-84-68-52-109-7-109 41-113 79-83 79-27L60-37Q37-48 25-79-3-40-59-34Z"
                fill={hair}
              />
              <path d="m-79-54 13-7 5 15-15 5Z" fill="#efc850" />
              <path d="m64-61 13 5-4 15-15-5Z" fill="#efc850" />
              <path
                d="M-48-78Q-23-101 7-94"
                fill="none"
                stroke="#454758"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </>
          ) : variant === "glasses" ? (
            <>
              <path
                d="M-79-24Q-91-70-65-78-77-102-48-103-41-123-16-109 7-128 27-106 55-114 62-93 90-89 77-53L66-29 49-62Q31-44 13-65-6-42-21-64-44-38-60-57L-65-27Z"
                fill={hair}
              />
              <path
                d="M-45-89Q-17-108 7-93"
                fill="none"
                stroke="#684c3a"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <path
                d="M-80-29C-84-83-47-115 7-110 60-114 89-80 80-25L60-38 56-65Q21-37-14-67-31-39-63-37L-65-13Z"
                fill={hair}
              />
              <path
                d="M-39-85Q-12-103 24-91"
                fill="none"
                stroke="#41536a"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <rect
                x="51"
                y="-58"
                width="26"
                height="8"
                rx="4"
                transform="rotate(25 64 -54)"
                fill="#ed7b69"
              />
            </>
          )}
          <g
            className="friend-brows"
            fill="none"
            stroke={hair}
            strokeWidth="5.5"
            strokeLinecap="round"
          >
            <path d="M-47-39Q-31-48-17-41" />
            <path d="M17-41Q31-48 47-39" />
          </g>
          <Eye x={-29} iris={iris} size={variant === "glasses" ? 0.92 : 1} />
          <Eye x={29} iris={iris} size={variant === "glasses" ? 0.92 : 1} />
          {variant === "glasses" && (
            <g fill="none" stroke="#39424a" strokeWidth="3.5">
              <circle cx="-29" cy="-3" r="27" />
              <circle cx="29" cy="-3" r="27" />
              <path d="M-2-6Q0-9 2-6M-56-6l-12-5m124 5 12-5" />
            </g>
          )}
          <ellipse cy="23" rx="7" ry="4.5" fill={shade} opacity=".7" />
          <ellipse cx="-53" cy="29" rx="10" ry="6" fill={blush} opacity=".75" />
          <ellipse cx="53" cy="29" rx="10" ry="6" fill={blush} opacity=".75" />
          <Smile wide={variant === "bob"} />
        </g>
      </g>
    </g>
  );
}

/** Independent dog with a waving paw, blinking eyes, floppy ears and tail. */
export function WavingDog({ x = 0, y = 0, scale = 1 }) {
  return (
    <g
      data-character="dog"
      className="waving-dog"
      transform={`translate(${x} ${y}) scale(${scale})`}
      style={{ "--friend-delay": "-2.1s" }}
    >
      <g className="dog-tail">
        <path
          d="M46 133C99 126 118 86 101 68"
          fill="none"
          stroke="#b57744"
          strokeWidth="25"
          strokeLinecap="round"
        />
        <path
          d="M104 89Q110 79 101 68"
          fill="none"
          stroke="#fff7e5"
          strokeWidth="25"
          strokeLinecap="round"
        />
      </g>
      <path d="M-52 72Q0 44 52 72L62 164Q1 190-62 164Z" fill="#fff7e5" />
      <ellipse cy="123" rx="32" ry="43" fill="#f1dfba" />
      <path
        d="M36 102Q59 126 49 157"
        fill="none"
        stroke="#fff7e5"
        strokeWidth="24"
        strokeLinecap="round"
      />
      <ellipse cx="48" cy="161" rx="22" ry="14" fill="#fff7e5" />
      <g className="dog-wave-paw">
        <path
          d="M-45 104Q-87 109-91 53"
          fill="none"
          stroke="#fff7e5"
          strokeWidth="25"
          strokeLinecap="round"
        />
        <ellipse cx="-91" cy="32" rx="23" ry="29" fill="#fff7e5" />
        <ellipse cx="-91" cy="41" rx="11" ry="12" fill="#c99571" />
        <circle cx="-104" cy="20" r="5" fill="#c99571" />
        <circle cx="-91" cy="13" r="5" fill="#c99571" />
        <circle cx="-78" cy="20" r="5" fill="#c99571" />
      </g>
      <g className="dog-head">
        <g className="dog-ear ear-left">
          <path
            d="M-55-69Q-102-75-106-16C-112 31-79 55-62 21L-43-37Z"
            fill="#b57744"
          />
          <path
            d="M-76-41Q-96-5-81 20"
            fill="none"
            stroke="#945a35"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </g>
        <g className="dog-ear ear-right">
          <path
            d="M55-69Q102-75 106-16C112 31 79 55 62 21L43-37Z"
            fill="#b57744"
          />
          <path
            d="M76-41Q96-5 81 20"
            fill="none"
            stroke="#945a35"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M-72-31C-72-84-34-101 0-98 34-101 72-84 72-31V13C72 58 38 80 0 80S-72 58-72 13Z"
          fill="#fff7e5"
        />
        <path
          d="M8-96C42-98 70-73 72-35L64 10Q42 32 17 7C1-14-4-64 8-96Z"
          fill="#c98d54"
        />
        <path d="M-15-96Q-29-121-8-113L2-101Q15-119 19-100" fill="#fff7e5" />
        <g
          className="friend-brows"
          fill="none"
          stroke="#73513b"
          strokeWidth="5"
          strokeLinecap="round"
        >
          <path d="M-47-38q12-8 25-1M23-39q13-7 25 1" />
        </g>
        <Eye x={-31} y={-5} iris="#574132" size={0.88} />
        <Eye x={31} y={-5} iris="#574132" size={0.88} />
        <ellipse cy="42" rx="45" ry="30" fill="#f5e9cf" />
        <path
          d="M-17 22Q0 11 17 22C18 34 8 38 0 40-8 38-18 34-17 22Z"
          fill="#31363b"
        />
        <ellipse cx="-5" cy="22" rx="6" ry="3" fill="#71767a" />
        <path
          d="M0 39v8m-17-1q17 17 34 0"
          fill="none"
          stroke="#5d4438"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g className="dog-tongue">
          <path d="M-10 52H10V66C10 80-10 80-10 66Z" fill="#ed8c88" />
          <path
            d="M0 55v13"
            stroke="#ce6b74"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <path d="M-60 71Q0 96 60 71L59 84Q0 109-59 84Z" fill="#388a83" />
        <circle cy="96" r="13" fill="#efc454" />
        <path
          d="M-4 96h8m-4-4v8"
          stroke="#bf8d31"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

function Cloud({ x, y, scale = 1 }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="#fffaf0"
      opacity=".8"
    >
      <path d="M-48 15C-68 14-67-11-46-14-43-41-9-44 3-22 24-34 45-20 45-4 68-6 73 15 52 18Z" />
    </g>
  );
}

function Plant({ x, y, flip = false, colour = "#648d60" }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}
      fill={colour}
    >
      <path d="M0 0C-44-17-50-66-39-85-14-70-7-41 0 0Z" />
      <path d="M-2 0C-7-49 12-93 31-103 41-66 22-24-2 0Z" />
      <path d="M-1 0C15-41 45-59 68-53 56-18 30-5-1 0Z" />
      <path d="M-2 0C-43-2-68-23-66-46-32-48-7-25-2 0Z" />
    </g>
  );
}

/** Reusable, entirely vector artwork. No raster files or character libraries. */
export function KidsAndDogIllustration({ compact = false, className = "" }) {
  const titleId = useId();
  const width = compact ? 760 : 1280;
  const height = compact ? 600 : 480;
  const ground = compact ? 444 : 364;
  return (
    <svg
      className={`farewell-illustration ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        Three smiling kids and a floppy-eared dog waving goodbye in a sunny
        garden
      </title>
      <rect width={width} height={height} fill="#c6e7e8" />
      <circle cx={width * 0.36} cy="91" r="47" fill="#f1c65c" />
      <Cloud x={width * 0.1} y="114" scale={0.9} />
      <Cloud x={width * 0.89} y="126" scale={0.8} />
      <Cloud x={width * 0.59} y="63" scale={0.55} />
      <path
        d={`M0 ${ground + 3}Q${width * 0.22} ${ground - 119} ${width * 0.48} ${ground + 17}T${width} ${ground - 30}V${height}H0Z`}
        fill="#adc992"
      />
      <path
        d={`M0 ${ground + 56}Q${width * 0.35} ${ground - 12} ${width * 0.7} ${ground + 57}T${width} ${ground + 30}V${height}H0Z`}
        fill="#91b875"
      />
      <g className="garden-sparkles" fill="#fff9dc">
        <path d={`m${width * 0.72} 93 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z`} />
        <circle cx={width * 0.08} cy="188" r="4" />
        <circle cx={width * 0.94} cy="240" r="4" />
      </g>
      <g className="friend-group">
        <WavingChild
          variant="buns"
          x={compact ? 130 : 226}
          y={compact ? 260 : 245}
          scale={compact ? 0.88 : 1.14}
          delay={-0.8}
        />
        <WavingChild
          variant="glasses"
          x={compact ? 374 : 590}
          y={compact ? 242 : 225}
          scale={compact ? 0.9 : 1.19}
          delay={-2.4}
        />
        <WavingChild
          variant="bob"
          x={compact ? 620 : 1034}
          y={compact ? 258 : 241}
          scale={compact ? 0.88 : 1.16}
          delay={-1.6}
        />
        <WavingDog
          x={compact ? 497 : 818}
          y={compact ? 460 : 339}
          scale={compact ? 0.76 : 1.02}
        />
      </g>
      <Plant x="29" y={height + 5} />
      <Plant x={width - 15} y={height + 2} flip />
      <g transform={`translate(${width - 92} ${height - 19})`}>
        <path
          d="M0 8v-40m0 18q-19-11-21-2 5 10 21 8m0-20q15-11 19-3-4 12-19 10"
          fill="none"
          stroke="#4f8356"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g fill="#f6dc8b">
          <circle cy="-45" r="10" />
          <circle cx="10" cy="-36" r="10" />
          <circle cx="6" cy="-23" r="10" />
          <circle cx="-8" cy="-24" r="10" />
          <circle cx="-12" cy="-38" r="10" />
        </g>
        <circle cy="-35" r="8" fill="#e98b50" />
      </g>
    </svg>
  );
}

function useScenePreferences() {
  const [preferences, setPreferences] = useState({
    compact: false,
    reduced: false,
  });
  useEffect(() => {
    if (!window.matchMedia) return;
    const compact = window.matchMedia("(max-width: 600px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setPreferences({ compact: compact.matches, reduced: reduced.matches });
    update();
    compact.addEventListener?.("change", update);
    reduced.addEventListener?.("change", update);
    return () => {
      compact.removeEventListener?.("change", update);
      reduced.removeEventListener?.("change", update);
    };
  }, []);
  return preferences;
}

export default function WavingKidsScene({
  className = "",
  showControls = true,
}) {
  const { compact, reduced } = useScenePreferences();
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const scene = useRef(null);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || !scene.current) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.02 },
    );
    observer.observe(scene.current);
    return () => observer.disconnect();
  }, []);
  function followGaze(event) {
    if (reduced || paused || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
    );
    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
    );
    event.currentTarget.style.setProperty("--friend-look-x", `${x * 3}px`);
    event.currentTarget.style.setProperty("--friend-look-y", `${y * 2}px`);
  }
  function resetGaze(event) {
    event.currentTarget.style.removeProperty("--friend-look-x");
    event.currentTarget.style.removeProperty("--friend-look-y");
  }
  const stopped = paused || reduced || !inView;
  return (
    <section
      ref={scene}
      className={`waving-farewell ${stopped ? "scene-paused" : ""} ${reduced ? "scene-reduced" : ""} ${className}`}
      aria-label="A friendly goodbye"
      onPointerMove={followGaze}
      onPointerLeave={resetGaze}
    >
      {showControls && (
        <div className="farewell-toolbar">
          <h2>See you soon!</h2>
          <div className="farewell-controls">
            {!reduced && (
              <button
                type="button"
                className="scene-pause-button"
                aria-label={
                  paused
                    ? "Play character animations"
                    : "Pause character animations"
                }
                aria-pressed={paused}
                title={paused ? "Play animations" : "Pause animations"}
                onClick={() => setPaused((value) => !value)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  {paused ? (
                    <path
                      d="m9 5 10 7-10 7Z"
                      fill="currentColor"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path d="M9 6v12m6-12v12" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      <KidsAndDogIllustration compact={compact} />
    </section>
  );
}
