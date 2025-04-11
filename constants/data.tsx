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
  WhatsappLogo,
  ShareNetwork,
  PlusCircle,
  LinkSimple,
  SnapchatLogo,
  MessengerLogo,
  ChatCenteredDots,
  FacebookLogo,
  XLogo,
  ThreadsLogo,
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

export const sharingApps = [
  {
    id: "whatsapp",
    name: "Whatsapp",
    icon: WhatsappLogo,
    color: "#3ad664",
    iconSize: 32.5,
  },
  { id: "share", name: "Partager", icon: ShareNetwork, color: "#363636" },
  {
    id: "story",
    name: "Ajouter à la story",
    icon: PlusCircle,
    color: "#363636",
  },
  { id: "link", name: "Copier le lien", icon: LinkSimple, color: "#363636" },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: SnapchatLogo,
    color: "#faff10",
    iconColor: "black",
    iconWeight: "duotone",
  },
  { id: "messenger", name: "Messenger", icon: MessengerLogo, color: "#aa37eb" },
  { id: "texto", name: "Texto", icon: ChatCenteredDots, color: "#2a5ac6" },
  { id: "facebook", name: "Facebook", icon: FacebookLogo, color: "#1a78f4" },
  { id: "x", name: "X", icon: XLogo, color: "#000000" },
  { id: "threads", name: "Threads", icon: ThreadsLogo, color: "#000000" },
];
