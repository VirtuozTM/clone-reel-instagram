import { StyleSheet, StatusBar as RNStatusBar } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

export type Ref = BottomSheetModal;

interface CustomBottomSheedModalProps {
  children: React.ReactNode;
  isDynamic?: boolean;
}

const CustomBottomSheedModal = forwardRef<Ref, CustomBottomSheedModalProps>(
  ({ children, isDynamic = false }, ref) => {
    // ---------------------------------- MODAL PROPS ------------------------------------
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );
    const topInset = RNStatusBar.currentHeight || 0;
    const snapPoints = useMemo(() => {
      return isDynamic ? undefined : ["70%"];
    }, [isDynamic]);

    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
      console.log("isDynamic", isDynamic);
    }, []);

    return (
      <BottomSheetModal
        name="BottomSheetModal"
        ref={ref}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        enableContentPanningGesture
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enablePanDownToClose={true}
        enableDismissOnClose
        enableDynamicSizing={isDynamic}
        handleIndicatorStyle={styles.handleIndicator}
        handleStyle={styles.handle}
        topInset={topInset}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  handle: {
    backgroundColor: "#262626",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },

  handleIndicator: {
    width: 35,
    height: 4,
    borderRadius: 2,
    backgroundColor: "white",
  },
});

export default CustomBottomSheedModal;
