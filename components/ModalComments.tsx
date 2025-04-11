import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Gift, Heart, Info, Smiley, X } from "phosphor-react-native";
import { Image } from "expo-image";
import { Comment } from "@/types";
import { emojis } from "@/constants/data";
import {
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Animated, {
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ModalComments = ({ comments }: { comments: Comment[] }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyingToUser, setReplyingToUser] = useState("");
  const inputRef = useRef<any>(null);
  const scaleValue = useSharedValue(0);
  const hasAnimated = useRef(false);
  const showSendButton = commentText.trim().length > 0 || isAnswering;

  useEffect(() => {
    if (showSendButton && !hasAnimated.current) {
      scaleValue.value = 0;
      scaleValue.value = withTiming(1, { duration: 200 });
      hasAnimated.current = true;
    } else if (!showSendButton) {
      hasAnimated.current = false;
    }
  }, [showSendButton]);

  const handleReply = useCallback((username: string) => {
    setIsAnswering(true);
    setReplyingToUser(username);
    setCommentText(`@${username} `);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, []);

  const cancelReply = useCallback(() => {
    setIsAnswering(false);
    setReplyingToUser("");
    setCommentText("");
  }, []);

  const handleSend = useCallback(() => {
    console.log("Envoi du message:", commentText);
    setCommentText("");
    if (isAnswering) {
      setIsAnswering(false);
      setReplyingToUser("");
    }
  }, [commentText, isAnswering]);

  const animatedSendButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  const renderItem = useCallback(
    ({ item }: { item: Comment }) => (
      <View style={styles.commentsContainer}>
        <View style={styles.comment}>
          <Image source={item.user.avatar} style={styles.avatar} />
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.username}>{item.user.name}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).getHours()} h
              </Text>
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
            <Pressable onPress={() => handleReply(item.user.name)}>
              <Text style={styles.replyButton}>Répondre</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.likesColumn}>
          <Pressable
            onPress={() => setIsLiked(!isLiked)}
            style={styles.likeButton}
          >
            <Heart
              size={20}
              weight={isLiked ? "fill" : "regular"}
              color={isLiked ? "red" : "white"}
            />
          </Pressable>
          <Text style={styles.likeCount}>{item.likesCount}</Text>
        </View>
      </View>
    ),
    [handleReply]
  );

  const insertEmoji = useCallback((emoji: string) => {
    setCommentText((prev) => prev + emoji);
  }, []);

  const renderEmoji = useCallback(
    ({ item }: { item: string }) => (
      <Pressable style={styles.emojiButton} onPress={() => insertEmoji(item)}>
        <Text style={styles.emojiText}>{item}</Text>
      </Pressable>
    ),
    [insertEmoji]
  );

  return (
    <BottomSheetView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Commentaires</Text>
        </View>
      </View>
      <BottomSheetFlashList
        data={comments}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        estimatedItemSize={125}
        contentContainerStyle={styles.flashListContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucun commentaire pour le moment.
          </Text>
        }
      />
      {isAnswering && (
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={styles.replyBanner}
        >
          <Text style={styles.replyText}>Réponse à {replyingToUser}</Text>
          <Pressable onPress={cancelReply}>
            <X size={15} color="#808080" />
          </Pressable>
        </Animated.View>
      )}

      <View style={styles.inputContainer}>
        <BottomSheetFlatList
          data={emojis}
          renderItem={renderEmoji}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.emojiList}
        />
        <View style={styles.inputWrapper}>
          <Image
            source="https://picsum.photos/seed/696/3000/2000"
            style={styles.avatar}
          />
          <BottomSheetTextInput
            ref={inputRef}
            placeholder="Lancez la conversation..."
            placeholderTextColor="#808080"
            style={styles.input}
            value={commentText}
            multiline={true}
            onChangeText={setCommentText}
          />
          {showSendButton ? (
            <Animated.View style={animatedSendButtonStyle}>
              <Pressable style={styles.sendButton} onPress={handleSend}>
                <ArrowUp size={22.5} color="white" weight="bold" />
              </Pressable>
            </Animated.View>
          ) : (
            <>
              <Smiley size={32} color="white" />
              <Gift size={32} color="white" />
            </>
          )}
        </View>
      </View>
    </BottomSheetView>
  );
};

export default ModalComments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  headerContainer: {
    width: "100%",
    backgroundColor: "#262626",
    paddingTop: 10,
    paddingHorizontal: 15,
    marginBottom: -1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  commentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentContent: {
    marginLeft: 15,
    gap: 7.5,
    maxWidth: "80%",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  username: {
    color: "white",
    fontSize: 13,
  },
  timestamp: {
    color: "#808080",
    fontSize: 13,
  },
  commentText: {
    color: "white",
    fontSize: 14,
  },
  replyButton: {
    fontSize: 13,
    color: "#808080",
  },
  likesColumn: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  likeButton: {
    alignItems: "center",
    padding: 5,
  },
  likeCount: {
    color: "#fff",
    fontSize: 12,
  },
  separator: {
    height: 30,
  },
  flashListContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#262626",
  },
  emptyText: {
    color: "#fff",
    paddingHorizontal: 15,
  },
  replyBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#343434",
  },
  replyText: {
    color: "#808080",
    fontSize: 15,
  },
  inputContainer: {
    width: "100%",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#303030",
    backgroundColor: "#262626",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
  emojiList: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  emojiButton: {
    paddingHorizontal: 10,
  },
  emojiText: {
    fontSize: 22,
  },
  sendButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#3e8df8",
    borderRadius: 20,
  },
});
