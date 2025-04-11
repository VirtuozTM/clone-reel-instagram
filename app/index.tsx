import VerticalCarousel from "@/components/VerticalCarousel";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Item } from "@/services/mockData";
import { useState, useEffect, useMemo } from "react";
import { fetchMockData } from "@/services/mockData";

export default function Index() {
  const insets = useSafeAreaInsets();
  const [videos, setVideos] = useState<Item[]>([]);
  const memoizedVideos = useMemo(() => videos, [videos]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const result = await fetchMockData();
    setVideos(result);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <VerticalCarousel data={memoizedVideos} />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
