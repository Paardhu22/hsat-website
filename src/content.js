// Confirm these details with HSAT before making the site public.
// Empty contact values are intentionally not replaced by invented information.
export const company = {
  name: "H SAT Edu Solutions",
  founder: "Dr. Tumma Hyma Reddy",
  email: "hsatedu@gmail.com",
  phone: "",
  address: "Hyderabad, Telangana – 500092, India",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana%20500092%2C%20India",
  socials: { instagram: "", linkedin: "", facebook: "" },
};

// The original site repeats Establishment and Setup as its third card.
// Preserve the four-card structure until the organization confirms the content.
export const services = [
  {
    id: "establishment",
    number: "01",
    title: "Establishment and Setup",
    short: "From a vision to a place of learning.",
    description:
      "Support for establishing educational institutions, with guidance on planning, infrastructure, staffing, and resource requirements.",
    details: [
      "Institutional planning",
      "Infrastructure & facility requirements",
      "Staffing & resource planning",
    ],
    shape: "sun",
  },
  {
    id: "resources",
    number: "02",
    title: "School Resource and Management",
    short: "The right resources. Working together.",
    description:
      "Support for managing school facilities, technology, personnel, finances, academic resources, and student services.",
    details: [
      "Facilities, technology & academic resources",
      "Personnel & financial management",
      "Student services",
    ],
    shape: "steps",
  },
  {
    id: "confirmation",
    number: "03",
    title: "Establishment and Setup",
    short: "Service details to be confirmed.",
    description:
      "The original website lists Establishment and Setup a second time. The content for this service is awaiting confirmation from H SAT Edu Solutions.",
    details: [],
    shape: "flower",
    pending: true,
  },
  {
    id: "administration",
    number: "04",
    title: "Administration and Improvement",
    short: "Thoughtful systems. Lasting progress.",
    description:
      "Guidance to improve administrative processes, operational efficiency, technology adoption, and overall institutional performance.",
    details: [
      "Administrative process improvement",
      "Operational efficiency",
      "Technology adoption & institutional performance",
    ],
    shape: "arch",
  },
];

export const associates = [
  "Central Clothing",
  "Full Marks",
  "Amanda Imprints",
  "Arkbird Publication",
  "Focus Learning",
  "Mystone Education",
  "Crown Technologies",
  "Swa-Adhyayan",
  "Rachna Sagar Pvt Ltd.",
];
