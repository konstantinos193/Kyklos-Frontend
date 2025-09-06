import { AboutContent, AboutImage, FloatingIcon } from "./types";
import { BookIcon, ShieldIcon, StarIcon, TrophyIcon } from "./icons";

export const aboutContent: AboutContent = {
  title: "Ποιοί",
  titleAccent: "Είμαστε",
  description: [
    "Η σταδιακή οικοδόμηση της γνώσης και ο εμπλουτισμός της ώστε να επιτευχθεί η εύκολη αφομοίωση της ύλης στη Δευτεροβάθμια Εκπαίδευση και η σίγουρη επιτυχία στις επιλεγμένες από τους μαθητές σχολές των ΑΕΙ.",
    "Η ευρύτερη εγκυκλοπαιδική μόρφωση των μαθητών που επιθυμούν και διαθέτουν τον απαραίτητο χρόνο, μέσα από την διδακτική τους, τα επιλεγμένα συγγράμματα και τα κατάλληλα εποπτικά μέσα, όπως η ηλεκτρονική και δανειστική τους βιβλιοθήκη."
  ],
  cta: {
    label: "Περισσότερα",
    href: "#about"
  }
};

export const aboutImages: AboutImage[] = [
  {
    src: "https://placehold.co/400x300/1E40AF/FFFFFF",
    alt: "Modern Classroom Environment",
    position: "top-left"
  },
  {
    src: "https://placehold.co/400x300/7C3AED/FFFFFF", 
    alt: "Students Learning Together",
    position: "top-right"
  },
  {
    src: "https://placehold.co/400x300/059669/FFFFFF",
    alt: "Academic Excellence",
    position: "bottom-left"
  },
  {
    src: "https://placehold.co/400x300/DC2626/FFFFFF",
    alt: "Educational Resources",
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
