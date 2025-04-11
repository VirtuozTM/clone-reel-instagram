import { ListItem } from "@/types";
import React from "react";
import {
  BookmarkSimple,
  ClosedCaptioning,
  FolderSimplePlus,
  PlusSquare,
  Translate,
  Selection,
  Eye,
  EyeSlash,
  Warning,
  FadersHorizontal,
} from "phosphor-react-native";

export const categories = [
  "cat",
  "dog",
  "nature",
  "city",
  "food",
  "people",
  "animals",
  "sports",
  "business",
  "technics",
];

export const emojis = ["❤️", "🙌", "🔥", "👏", "😔", "🥰", "😮", "😂"];

export const options: ListItem[] = [
  {
    id: "sep1",
    icon: null,
    title: "",
    withSeparator: true,
  },
  {
    id: "1",
    icon: <Translate size={24} color="#fff" />,
    title: "Traductions",
    color: "#fff",
  },
  {
    id: "2",
    icon: <ClosedCaptioning size={24} color="#fff" />,
    title: "Discussions",
    color: "#fff",
  },
  {
    id: "3",
    icon: <Selection size={24} color="#fff" />,
    title: "Voir en plein écran",
    color: "#fff",
  },
  {
    id: "4",
    icon: <PlusSquare size={24} color="#fff" />,
    title: "Voir tous les remix",
    color: "#fff",
  },
  {
    id: "sep1",
    icon: null,
    title: "",
    withSeparator: true,
  },
  {
    id: "5",
    icon: <Eye size={24} color="#fff" />,
    title: "Intéressé(e)",
    color: "#fff",
  },
  {
    id: "6",
    icon: <EyeSlash size={24} color="#fff" />,
    title: "Ça ne m'intéresse pas",
    color: "#fff",
  },
  {
    id: "7",
    icon: <Warning size={24} color="red" />,
    title: "Signaler...",
    color: "red",
  },
  {
    id: "sep1",
    icon: null,
    title: "",
    withSeparator: true,
  },
  {
    id: "8",
    icon: <FadersHorizontal size={24} color="#fff" />,
    title: "Gérer les préférences de contenu",
    color: "#fff",
  },
];

export const quickActions: ListItem[] = [
  {
    id: "quick-1",
    icon: <BookmarkSimple size={24} color="#fff" />,
    title: "Enregistrer",
    color: "#fff",
  },
  {
    id: "quick-2",
    icon: <PlusSquare size={24} color="#fff" />,
    title: "Remixer",
    color: "#fff",
  },
  {
    id: "quick-3",
    icon: <FolderSimplePlus size={24} color="#fff" />,
    title: "Séquence",
    color: "#fff",
  },
];
