import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { options, quickActions } from "@/constants/data";

const CustomList = () => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        if (option.withSeparator) {
          return <View key={`sep-${index}`} style={styles.separator} />;
        }

        return (
          <View key={option.id} style={styles.item}>
            <View style={styles.iconContainer}>{option.icon}</View>
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: option.color }]}>
                {option.title}
              </Text>
              {option.subtitle && (
                <Text style={styles.subtitle}>{option.subtitle}</Text>
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
      <View style={styles.quickActionsRow}>
        {quickActions.map((item) => (
          <View key={item.id} style={styles.optionItem}>
            <View style={styles.iconWrapper}>{item.icon}</View>
            <Text style={styles.optionText} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        ))}
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
  quickActionsRow: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
