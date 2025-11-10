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
      duration: "14 ώρες έως 18 ώρες",
      applyText: "ΘΕΤ - ΤΕΧΝ - ΘΕΩΡ",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 4, icon: "📐" },
        { name: "Φυσική", hours: 3, icon: "⚡" },
        { name: "Χημεία", hours: 2, icon: "🧪" },
        { name: "Ελληνική Γλώσσα", hours: 3, icon: "📚" },
        { name: "Αρχαία", hours: 2, icon: "🏛️" }
      ]
    },
    {
      id: "v-lykeioy",
      title: "Β' Λυκείου",
      category: "lykeioy",
      categoryLabel: "#Λυκείου",
      duration: "9 ώρες έως 14 ώρες",
      applyText: "ΘΕΤ - ΤΕΧΝ - ΘΕΩΡ",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Χημεία", hours: 2, icon: "🧪" },
        { name: "Ελληνική Γλώσσα", hours: 2, icon: "📚" }
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
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Χημεία", hours: 2, icon: "🧪" },
        { name: "Βιολογία", hours: 2, icon: "🧬" },
        { name: "Ελληνική Γλώσσα", hours: 3, icon: "📚" },
        { name: "Αρχαία", hours: 2, icon: "🏛️" }
      ]
    },
    // Γυμνάσιο (middle)
    {
      id: "g-gymnasioy",
      title: "Γ' Γυμνασίου",
      category: "gymnasioy",
      categoryLabel: "#Γυμνασίου",
      duration: "9 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Χημεία", hours: 2, icon: "🧪" },
        { name: "Ελληνική Γλώσσα", hours: 2, icon: "📚" }
      ]
    },
    {
      id: "v-gymnasioy",
      title: "Β' Γυμνασίου",
      category: "gymnasioy",
      categoryLabel: "#Γυμνασίου",
      duration: "9 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Χημεία", hours: 2, icon: "🧪" },
        { name: "Ελληνική Γλώσσα", hours: 2, icon: "📚" }
      ]
    },
    {
      id: "a-gymnasioy",
      title: "Α' Γυμνασίου",
      category: "gymnasioy",
      categoryLabel: "#Γυμνασίου",
      duration: "6 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 2, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Ελληνική Γλώσσα", hours: 2, icon: "📚" }
      ]
    },
    // ΕΠΑΛ (bottom)
    {
      id: "g-lykeiou-epal",
      title: "Γ' Λυκείου",
      category: "epal",
      categoryLabel: "#ΕΠΑΛ",
      duration: "9 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Ελληνική Γλώσσα", hours: 2, icon: "📚" },
        { name: "ΑΟΘ", hours: 2, icon: "📊" }
      ]
    },
    {
      id: "b-lykeioy-epal",
      title: "Β' Λυκείου",
      category: "epal",
      categoryLabel: "#ΕΠΑΛ",
      duration: "9 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 3, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Ελληνική Γλώσσα", hours: 2, icon: "📚" },
        { name: "ΑΟΘ", hours: 2, icon: "📊" }
      ]
    },
    {
      id: "a-lykeioy-epal",
      title: "Α' Λυκείου",
      category: "epal",
      categoryLabel: "#ΕΠΑΛ",
      duration: "6 ώρες",
      applyHref: "/contact",
      moreHref: "/curriculum",
      subjects: [
        { name: "Μαθηματικά", hours: 2, icon: "📐" },
        { name: "Φυσική", hours: 2, icon: "⚡" },
        { name: "Ελληνική Γλώσσα", hours: 2, icon: "📚" }
      ]
    }
  ]
};
