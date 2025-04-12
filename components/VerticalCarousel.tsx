import { Dimensions, Platform, ViewToken, StyleSheet } from "react-native";
import { Item } from "../services/mockData";
import { useState, useCallback } from "react";
import Video from "./Video";
import { useCustomModalBackHandler } from "@/hook/useCustomBottomSheetModal";
import CustomBottomSheedModal from "./CustomBottomSheetModal";
import React from "react";
import ModalComments from "./ModalComments";
import ModalSharing from "./ModalSharing";
import ModalOptions from "./ModalOptions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list";
import { useVideoStore } from "../stores/useVideoStore";

type VerticalListProps = {
  data: Item[];
};

const VerticalCarousel = ({ data }: VerticalListProps) => {
  const insets = useSafeAreaInsets();
  const usableHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height - insets.top - insets.bottom
      : Dimensions.get("window").height;

  const [currentVideo, setCurrentVideo] = useState<Item | null>(null);

  const setVisibleVideoIndex = useVideoStore(
    (state) => state.setVisibleVideoIndex
  );
  const setIsPaused = useVideoStore((state) => state.setIsPaused);

  const {
    bottomSheetModalRef: bottomSheetModalRefComments,
    openModal: openModalComments,
  } = useCustomModalBackHandler();
  const {
    bottomSheetModalRef: bottomSheetModalRefSharing,
    openModal: openModalSharing,
  } = useCustomModalBackHandler();
  const {
    bottomSheetModalRef: bottomSheetModalRefOptions,
    openModal: openModalOptions,
  } = useCustomModalBackHandler();

  const handleOpenComments = (video: Item) => {
    setCurrentVideo(video);
    openModalComments();
  };

  const handleOpenSharing = (video: Item) => {
    setCurrentVideo(video);
    openModalSharing();
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const visibleItem = viewableItems[0]?.index as number;
        console.log(
          "👀 onViewableItemsChanged => visible index =",
          visibleItem
        );

        setVisibleVideoIndex(visibleItem);
        setIsPaused(false);
      }
    },
    [setVisibleVideoIndex, setIsPaused]
  );

  return (
    <>
      <LegendList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          return (
            <Video
              item={item}
              index={index}
              itemHeight={usableHeight}
              openModalComments={() => handleOpenComments(item)}
              openModalSharing={() => handleOpenSharing(item)}
              openModalOptions={() => openModalOptions()}
            />
          );
        }}
        pagingEnabled
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        estimatedItemSize={usableHeight}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 30,
        }}
        recycleItems
      />
      <CustomBottomSheedModal ref={bottomSheetModalRefComments}>
        <ModalComments comments={currentVideo?.comments || []} />
      </CustomBottomSheedModal>
      <CustomBottomSheedModal ref={bottomSheetModalRefSharing}>
        <ModalSharing friends={currentVideo?.friends || []} />
      </CustomBottomSheedModal>
      <CustomBottomSheedModal ref={bottomSheetModalRefOptions} isDynamic={true}>
        <ModalOptions />
      </CustomBottomSheedModal>
    </>
  );
};

export default VerticalCarousel;
