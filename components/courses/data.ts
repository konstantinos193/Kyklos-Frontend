import { CoursesContent } from "./types";

export const coursesContent: CoursesContent = {
  title: "Πρόγραμμα Σπουδών",
  subtitle: "Λυκείου - Γυμνασίου - ΕΠΑΛ",
  courses: [
    // Λύκειο (top)
    {
      id: "g-lykeioy",
      title: "Γ' Λυκείου",
      category: "lykeioy",
      categoryLabel: "#Λυκείου",
      // Σύνολο ωρών: 6 (Μαθηματικά) + 4 (Φυσική) + 4 (Χημεία) + 2 (Νεοελληνική) + 3 (ΑΕΠΠ) + 3 (ΑΟΘ) = 22
      duration: "22 ώρες",
      applyText: "ΘΕΤ - ΤΕΧΝ - ΘΕΩΡ",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 6, icon: "📐" },
        { name: "Φυσική", hours: 4, icon: "⚡" },
        { name: "Χημεία", hours: 4, icon: "🧪" },
        { name: "Νεοελληνική Γλώσσα", hours: 2, icon: "📚" },
        { name: "ΑΕΠΠ", hours: 3, icon: "💻" },
        { name: "ΑΟΘ", hours: 3, icon: "📊" }
      ]
    },
    {
      id: "v-lykeioy",
      title: "Β' Λυκείου",
      category: "lykeioy",
      categoryLabel: "#Λυκείου",
      duration: "17 ώρες",
      applyText: "ΘΕΤ - ΤΕΧΝ - ΘΕΩΡ",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 6, icon: "📐" },
        { name: "Φυσική", hours: 4, icon: "⚡" },
        { name: "Χημεία", hours: 3, icon: "🧪" },
        { name: "Νεοελληνική Γλώσσα", hours: 2, icon: "📚" },
        { name: "ΑΕΠΠ", hours: 1, icon: "💻" },
        { name: "ΑΟΘ", hours: 1, icon: "📊" }
      ]
    },
    {

      
      id: "a-lykeioy",
      title: "Α' Λυκείου",
      category: "lykeioy",
      categoryLabel: "#Λυκείου",
      duration: "14 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 5, icon: "📐" },
        { name: "Φυσική", hours: 3, icon: "⚡" },
        { name: "Χημεία", hours: 2, icon: "🧪" },
        { name: "Νεοελληνική Γλώσσα", hours: 2, icon: "📚" },
        { name: "Αρχαία", hours: 2, icon: "🏛️" }
      ]
    },
    // Γυμνάσιο (middle)
    {
      id: "g-gymnasioy",
      title: "Γ' Γυμνασίου",
      category: "gymnasioy",
      categoryLabel: "#Γυμνασίου",
      duration: "8 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φυσική", hours: 4, icon: "⚡" },
        { name: "Χημεία", hours: 1, icon: "🧪" },
        { name: "Φιλολογικά", hours: 2, icon: "📚" }
      ]
    },
    {
      id: "v-gymnasioy",
      title: "Β' Γυμνασίου",
      category: "gymnasioy",
      categoryLabel: "#Γυμνασίου",
      duration: "8 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Χημεία", hours: 1, icon: "🧪" },
        { name: "Φιλολογικά", hours: 2, icon: "📚" }
      ]
    },
    {
      id: "a-gymnasioy",
      title: "Α' Γυμνασίου",
      category: "gymnasioy",
      categoryLabel: "#Γυμνασίου",
      duration: "5 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φιλολογικά", hours: 2, icon: "📚" }
      ]
    },
    // ΕΠΑΛ (bottom)
    {
      id: "g-lykeiou-epal",
      title: "Γ' Λυκείου",
      category: "epal",
      categoryLabel: "#ΕΠΑΛ",
      duration: "5 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Νεοελληνική Γλώσσα", hours: 2, icon: "📚" }
      ]
    },
    {
      id: "b-lykeioy-epal",
      title: "Β' Λυκείου",
      category: "epal",
      categoryLabel: "#ΕΠΑΛ",
      duration: "5 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Νεοελληνική Γλώσσα", hours: 2, icon: "📚" }
      ]
    },
    {
      id: "a-lykeioy-epal",
      title: "Α' Λυκείου",
      category: "epal",
      categoryLabel: "#ΕΠΑΛ",
      duration: "4 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 2, icon: "📐" },
        { name: "Νεοελληνική Γλώσσα", hours: 2, icon: "📚" }
      ]
    }
  ]
};
