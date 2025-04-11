import { Pressable, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Friend } from "@/types";
import {
  BottomSheetFlashList,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { MagnifyingGlass, UserPlus, Check } from "phosphor-react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { sharingApps } from "@/constants/data";

const ModalSharing = ({ friends }: { friends: Friend[] }) => {
  const inputRef = useRef<any>(null);
  const [isPickingFriend, setIsPickingFriend] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const selectedFriendsAvatars = selectedFriends
    .slice(0, 3)
    .map((id) => friends.find((f) => f.id === id)?.user.avatar)
    .filter(Boolean);
  const { width: windowWidth } = Dimensions.get("window");
  const containerHeight = useSharedValue(120);
  const itemWidth = (windowWidth - 40) / 3;

  useEffect(() => {
    containerHeight.value = withTiming(selectedFriends.length > 1 ? 180 : 120, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [selectedFriends.length]);

  const toggleFriendSelection = useCallback((friendId: string) => {
    setSelectedFriends((prev) => {
      if (prev.includes(friendId)) {
        const newSelected = prev.filter((id) => id !== friendId);
        if (newSelected.length === 0) {
          setIsPickingFriend(false);
        }
        return newSelected;
      }
      setIsPickingFriend(true);
      return [...prev, friendId];
    });
  }, []);

  const renderGridItem = useCallback(
    ({ item }: { item: Friend }) => {
      const isSelected = selectedFriends.includes(item.id);
      return (
        <Pressable
          onPress={() => toggleFriendSelection(item.id)}
          style={[styles.gridItem, { width: itemWidth }]}
        >
          <View style={styles.avatarWrapper}>
            <Image source={item.user.avatar} style={styles.gridAvatar} />
            {isSelected && (
              <View style={styles.selectedBadge}>
                <View style={styles.checkmark}>
                  <Check size={15} color="black" weight="bold" />
                </View>
              </View>
            )}
          </View>
          <Text style={styles.gridUsername} numberOfLines={1}>
            {item.user.name}
          </Text>
          <Text style={styles.gridComment} numberOfLines={2}></Text>
        </Pressable>
      );
    },
    [itemWidth, selectedFriends, toggleFriendSelection]
  );

  const renderSharingApp = useCallback(({ item }: { item: any }) => {
    const IconComponent = item.icon;
    return (
      <View style={styles.sharingAppItem}>
        <View
          style={[
            styles.sharingAppIconWrapper,
            { backgroundColor: item.color },
          ]}
        >
          <IconComponent
            size={item.iconSize || 27.5}
            color={item.iconColor || "white"}
            weight={item.iconWeight || "regular"}
          />
        </View>
        <Text style={[styles.sharingText, { maxWidth: 60 }]}>{item.name}</Text>
      </View>
    );
  }, []);

  const animatedSendContainerStyle = useAnimatedStyle(() => ({
    height: containerHeight.value,
  }));

  return (
    <BottomSheetView style={styles.sheetContainer}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <MagnifyingGlass size={25} color="#808080" />
          <BottomSheetTextInput
            ref={inputRef}
            placeholder="Rechercher"
            placeholderTextColor="#808080"
            style={styles.input}
            multiline
          />
        </View>
        <UserPlus size={25} color="#808080" />
      </View>
      <BottomSheetFlashList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={renderGridItem}
        numColumns={3}
        estimatedItemSize={145}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun ami pour le moment.</Text>
        }
        extraData={selectedFriends}
      />

      {!isPickingFriend ? (
        <View style={styles.sharingContainer}>
          <BottomSheetFlatList
            data={sharingApps}
            keyExtractor={(item) => item.id}
            renderItem={renderSharingApp}
            horizontal
            contentContainerStyle={styles.sharingList}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <Animated.View
          style={[styles.sendContainer, animatedSendContainerStyle]}
        >
          <BottomSheetTextInput
            placeholder="Ecrivez un message..."
            placeholderTextColor="#909090"
            style={styles.messageInput}
            multiline
          />
          <Pressable style={styles.sendButton}>
            <Text style={styles.sendButtonText}>
              {selectedFriends.length > 1 ? "Envoyer séparément" : "Envoyer"}
            </Text>
          </Pressable>
          {selectedFriends.length > 1 && (
            <Animated.View
              entering={FadeIn.duration(700)}
              exiting={FadeOut.duration(700)}
              style={styles.groupContainer}
            >
              <View style={styles.groupAvatarList}>
                {selectedFriendsAvatars.map((avatar, index) => (
                  <Image
                    key={index}
                    source={avatar}
                    style={[
                      styles.groupAvatar,
                      { zIndex: 3 - index, marginRight: -10 },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.groupText}>Créer un groupe</Text>
            </Animated.View>
          )}
        </Animated.View>
      )}
    </BottomSheetView>
  );
};

export default ModalSharing;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    backgroundColor: "#262626",
    marginTop: -1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#363636",
    margin: 15,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
  },
  input: {
    fontSize: 15,
    lineHeight: 20,
    color: "white",
    flex: 1,
    padding: 10,
  },
  gridItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarWrapper: {
    position: "relative",
  },
  gridAvatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  gridUsername: {
    color: "white",
    fontWeight: "500",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
  },
  gridComment: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },
  selectedBadge: {
    position: "absolute",
    bottom: -5,
    right: -7.5,
    backgroundColor: "#0095f6",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#262626",
    zIndex: 10,
  },
  checkmark: {
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  emptyText: {
    color: "#fff",
    paddingHorizontal: 15,
  },
  sharingContainer: {
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "#303030",
    backgroundColor: "#262626",
    gap: 15,
  },
  sharingList: {
    gap: 20,
    paddingHorizontal: 10,
  },
  sharingAppItem: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  sharingAppIconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    alignItems: "center",
    justifyContent: "center",
  },
  sharingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "normal",
    textAlign: "center",
  },
  sendContainer: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 2,
    borderTopColor: "#303030",
    backgroundColor: "#262626",
    gap: 15,
  },
  messageInput: {
    fontSize: 15,
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sendButton: {
    backgroundColor: "#3c89ee",
    padding: 12.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7.5,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#262626",
    padding: 12.5,
    justifyContent: "center",
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: "white",
  },
  groupAvatarList: {
    flexDirection: "row",
    marginRight: 10,
  },
  groupAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#262626",
  },
  groupText: {
    color: "white",
    fontWeight: "bold",
  },
});
