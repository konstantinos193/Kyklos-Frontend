import { AboutContent, AboutImage, FloatingIcon } from "./types";
import { BookIcon, ShieldIcon, StarIcon, TrophyIcon } from "./icons";

export const aboutContent: AboutContent = {
  title: "Ποιοί",
  titleAccent: "είμαστε",
  description: [
    "Το Φροντιστήριο ΚΥΚΛΟΣ ιδρύθηκε το καλοκαίρι του 1991 από τους Γρηγόρη Καραβασίλη, Δημήτρη Κολιούλη, Κωνσταντίνο Μαστραπά, Ιωάννη Σδρίμα, Γεώργιο Σκούρα και Ευάγγελο Στάμο.",
    "Στόχος των ιδρυτών ήταν η δημιουργία ενός σύγχρονου και αξιόπιστου εκπαιδευτικού χώρου που θα προσφέρει ουσιαστική στήριξη στους μαθητές και υψηλού επιπέδου προετοιμασία για τις πανελλαδικές εξετάσεις.",
    "Με τις συνεχείς επιτυχίες των μαθητών του, ο ΚΥΚΛΟΣ βρίσκεται σταθερά στην κορυφή της προτίμησης των μαθητών της πόλης, αποτελώντας σημείο αναφοράς στην εκπαιδευτική κοινότητα."
  ],
  cta: {
    label: "Περισσότερα",
    href: "/about"
  }
};

export const aboutImages: AboutImage[] = [
  {
    src: "/building/0-02-05-3b3d8a2d20530e4f20a2f292136fede7d8148f5a5135339db427ddb6797c27ec_a83eae51ddeeb3df.jpg",
    alt: "ΚΥΚΛΟΣ Φροντιστήριο - Εξωτερική άποψη",
    position: "top-left"
  },
  {
    src: "/building/0-02-05-2db6b4fbe100045803def97de283ce520ce76147df7103391c700b83085e600d_22e3ccfda72dc3e1.jpg", 
    alt: "ΚΥΚΛΟΣ Φροντιστήριο - Αίθουσα διδασκαλίας",
    position: "top-right"
  },
  {
    src: "/building/0-02-05-08e00e190803b47149fcfb3b8ba0f6178912d887127a6f4b0d7ad54943eecd39_d0688f9520c31013.jpg",
    alt: "ΚΥΚΛΟΣ Φροντιστήριο - Εσωτερικός χώρος",
    position: "bottom-left"
  },
  {
    src: "/building/0-02-05-a22234b0cdaeeebbce18fcb7a3de009c7e62ac9f8f8f6b3da1b26efad0260398_7b671354b6155ced.jpg",
    alt: "ΚΥΚΛΟΣ Φροντιστήριο - Διδακτικές αίθουσες",
    position: "bottom-right"
  }
];

export const floatingIcons: FloatingIcon[] = [
  {
    icon: BookIcon,
    position: "top-right",
    color: "bg-[#E7B109]",
    size: "xl",
    animation: "bounce"
  },
  {
    icon: ShieldIcon,
    position: "middle-left",
    color: "bg-blue-600",
    size: "lg",
    animation: "pulse"
  },
  {
    icon: StarIcon,
    position: "bottom-right",
    color: "bg-green-600",
    size: "md",
    animation: "bounce",
    delay: 1000
  },
  {
    icon: TrophyIcon,
    position: "bottom-left",
    color: "bg-purple-600",
    size: "sm",
    animation: "pulse",
    delay: 500
  }
];
