import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
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

type ListItem = {
  id: string;
  icon: React.ReactNode;
  color?: string;
  title: string;
  subtitle?: string;
  withSeparator?: boolean;
};

const items: ListItem[] = [
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

const CustomList = () => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        if (item.withSeparator) {
          return <View key={`sep-${index}`} style={styles.separator} />;
        }

        return (
          <View key={item.id} style={styles.item}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: item.color }]}>
                {item.title}
              </Text>
              {item.subtitle && (
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const ModalOptions = () => {
  return (
    <BottomSheetView style={{ backgroundColor: "#262626" }}>
      <View style={{ paddingVertical: 10, flexDirection: "row", gap: 10 }}>
        <View style={styles.optionItem}>
          <View style={styles.iconWrapper}>
            <BookmarkSimple size={27.5} color="#fff" />
          </View>
          <Text style={styles.optionText} numberOfLines={1}>
            Enregistrer
          </Text>
        </View>
        <View style={styles.optionItem}>
          <View style={styles.iconWrapper}>
            <PlusSquare size={27.5} color="#fff" />
          </View>
          <Text style={styles.optionText} numberOfLines={1}>
            Remixer
          </Text>
        </View>
        <View style={styles.optionItem}>
          <View style={styles.iconWrapper}>
            <FolderSimplePlus size={27.5} color="#fff" />
          </View>
          <Text style={styles.optionText} numberOfLines={1}>
            Séquence
          </Text>
        </View>
      </View>
      <CustomList />
    </BottomSheetView>
  );
};

export default ModalOptions;

const styles = StyleSheet.create({
  optionItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#262626",
    paddingVertical: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 15,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 2,
  },
  separator: {
    height: 0.5,
    marginVertical: 5,
    backgroundColor: "#3a3a3a",
  },
});
