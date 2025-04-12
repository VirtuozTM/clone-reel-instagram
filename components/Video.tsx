import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Item } from "../services/mockData";
import { Image } from "expo-image";
import {
  ChatCircle,
  DotsThreeVertical,
  Heart,
  MusicNotesSimple,
  PaperPlaneTilt,
  SealCheck,
  Play,
  Camera,
  SpeakerHigh,
} from "phosphor-react-native";
import { useState, useEffect, memo, useRef } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent, useEventListener } from "expo";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withSpring,
  withDelay,
  withSequence,
} from "react-native-reanimated";
import { useVideoStore } from "../stores/useVideoStore";

type VideoProps = {
  item: Item;
  index: number;
  openModalComments: () => void;
  openModalSharing: () => void;
  openModalOptions: () => void;
  itemHeight: number;
};

const VideoComponent = ({
  item,
  index,
  openModalComments,
  openModalSharing,
  openModalOptions,
  itemHeight,
}: VideoProps) => {
  // store
  const visibleVideoIndex = useVideoStore((state) => state.visibleVideoIndex);
  const isPaused = useVideoStore((state) => state.isPaused);
  const setIsPaused = useVideoStore((state) => state.setIsPaused);
  const shouldPlay = index === visibleVideoIndex;

  // states
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likesCount);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // animations
  const progress = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);
  const descriptionHeight = useSharedValue(16);
  const scale = useSharedValue(1);
  const bigHeartScale = useSharedValue(0);
  const bigHeartOpacity = useSharedValue(0);
  const containerRef = useRef<View>(null);

  const player = useVideoPlayer(item.videoSource, (p) => {
    p.loop = true;
    p.timeUpdateEventInterval = 0.05;
  });

  // // On récupère le statut "isPlaying"
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  // // On récupère la position courante (currentTime) et la durée (duration) via timeUpdate
  const timeUpdate = useEvent(player, "timeUpdate", {
    currentTime: player.currentTime,
    bufferedPosition: player.bufferedPosition,

    currentLiveTimestamp: null,
    currentOffsetFromLive: null,
  });

  useEventListener(player, "playToEnd", () => {
    console.log(`💀 [${item.key}] => playToEnd => reset progress`);
    progress.value = 0;
    player.currentTime = 0;
  });

  const currentTime = timeUpdate.currentTime;

  // // Calcul du ratio d'avancement
  useEffect(() => {
    if (player.duration > 0) {
      progress.value = withTiming(currentTime / player.duration, {
        duration: 80,
      });
    }
  }, [currentTime, player.duration]);

  // Auto-play/pause quand l'item devient visible ou non
  useEffect(() => {
    if (!player) return;
    if (shouldPlay && status === "readyToPlay") {
      console.log(`▶️ [${item.key}] => PLAY (status=${status})`);
      player.play();
    } else {
      console.log(
        `⏸ [${item.key}] => PAUSE (shouldPlay=${shouldPlay}, status=${status})`
      );
      player.pause();
    }
  }, [shouldPlay, status]);

  useEffect(() => {
    // Animer l'overlay
    overlayOpacity.value = withTiming(isDescriptionExpanded ? 0.8 : 0, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Animer la hauteur de la description (valeur approximative pour 10 lignes)
    descriptionHeight.value = withTiming(isDescriptionExpanded ? 160 : 16, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isDescriptionExpanded]);

  // On peut s’offrir un petit bouton pour toggler manuellement
  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
      setIsPaused(true);
    } else {
      player.play();
      setIsPaused(false);
    }
  };

  const handleLikePress = () => {
    // Animation de "pop"
    scale.value = withTiming(1.5, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });

    // Toggle like
    setIsLiked((prev) => {
      const newState = !prev;
      setLikesCount((count) => count + (newState ? 1 : -1));
      return newState;
    });

    if (!isLiked) {
      bigHeartScale.value = withSequence(
        withSpring(1.5, { damping: 8 }),
        withDelay(750, withTiming(0.7, { duration: 250 }))
      );

      bigHeartOpacity.value = withSequence(
        withTiming(1),
        withDelay(750, withTiming(0, { duration: 250 }))
      );
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
      height: 5,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      position: "absolute",
      left: 0,
      top: 0,
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "black",
      pointerEvents: "none",
    };
  });

  const bigHeartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bigHeartScale.value }],
    opacity: bigHeartOpacity.value,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Styles animés pour la description
  const descriptionAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: descriptionHeight.value,
      overflow: "hidden",
    };
  });

  return (
    <View ref={containerRef} style={{ height: itemHeight }}>
      <VideoView
        style={StyleSheet.absoluteFill}
        player={player}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />

      <Animated.View style={bigHeartAnimatedStyle}>
        <Heart size={60} weight="fill" color="#fff" />
      </Animated.View>

      {/* Overlay en pressable pour toggle play/pause */}
      <Pressable style={[StyleSheet.absoluteFill]} onPress={togglePlayPause}>
        {isPaused && (
          <View style={styles.pauseIconContainer}>
            <View style={styles.soundIconBackground}>
              <SpeakerHigh size={17.5} weight="fill" color="white" />
            </View>
            <View style={styles.pauseIconBackground}>
              <Play size={30} weight="fill" color="white" />
            </View>
          </View>
        )}
      </Pressable>

      <Animated.View style={overlayAnimatedStyle} />

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          gap: 15,
          padding: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              gap: 10,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.author.avatar }}
                style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
              />
              <Text style={styles.authorName}>{item.author.name}</Text>
              <SealCheck
                size={15}
                weight="fill"
                color="#fff"
                style={{ marginLeft: -2 }}
              />
              <Pressable
                onPress={() => setIsFollowed(!isFollowed)}
                style={styles.followButton}
              >
                <Text style={styles.followButtonText}>
                  {isFollowed ? "Suivi(e)" : "Suivre"}
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              <Animated.View style={descriptionAnimatedStyle}>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </Animated.View>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "flex-start" }}>
              <Camera size={32} weight={"regular"} color={"#fff"} />
            </View>

            <View style={styles.actionsColumn}>
              <Pressable onPress={handleLikePress} style={styles.actionItem}>
                <Animated.View style={heartAnimatedStyle}>
                  <Heart
                    size={32}
                    weight={isLiked ? "fill" : "regular"}
                    color={isLiked ? "#FF0000" : "#fff"}
                  />
                </Animated.View>
                <Text style={styles.actionText}>{likesCount}</Text>
              </Pressable>

              <Pressable onPress={openModalComments} style={styles.actionItem}>
                <ChatCircle size={32} color="#fff" />
                <Text style={styles.actionText}>{item.commentsCount}</Text>
              </Pressable>

              <Pressable onPress={openModalSharing} style={styles.actionItem}>
                <PaperPlaneTilt size={32} color="#fff" />
                <Text style={styles.actionText}>{item.sharesCount}</Text>
              </Pressable>

              <Pressable onPress={openModalOptions} style={styles.actionItem}>
                <DotsThreeVertical size={24} weight="bold" color="#fff" />
              </Pressable>

              <View style={styles.musicContainer}>
                <Image
                  source={{ uri: item.music }}
                  style={[StyleSheet.absoluteFillObject, { borderRadius: 5 }]}
                />
                <View style={styles.musicOverlay} />
                <MusicNotesSimple size={15} weight="bold" color="#fff" />
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <View
          style={{
            height: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
          }}
        >
          <Animated.View style={animatedStyles} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  debugContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 5,
  },
  debugText: {
    color: "#FFF",
    fontSize: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  followButton: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginLeft: 10,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  descriptionText: {
    color: "#fff",
    maxWidth: "90%",
    fontSize: 14,
    lineHeight: 16,
  },
  actionsColumn: {
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
  },
  actionItem: {
    gap: 10,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
  },
  musicContainer: {
    height: 30,
    width: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 2.5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  musicOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
  },
  progressContainer: {
    backgroundColor: "black",
    height: 15 * 2,
    justifyContent: "center",
  },
  pauseIconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  pauseIconBackground: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  soundIconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  soundIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(VideoComponent);
