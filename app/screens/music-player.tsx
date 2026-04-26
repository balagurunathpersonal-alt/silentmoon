import { Feather } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Video, {
  OnLoadData,
  OnProgressData,
  OnVideoErrorData,
  VideoRef,
} from "react-native-video";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppNavigationHandler } from "../../navigation/app-navigation";
import { RootStackParamList } from "../../types/navigation";

type MusicPlayerRouteProp = RouteProp<RootStackParamList, "MusicPlayer">;

const BASE_WIDTH = 414;

const formatDurationLabel = (duration?: string) => {
  if (!duration) {
    return "45:00";
  }

  if (duration.includes(":")) {
    return duration;
  }

  const minutes = duration.match(/\d+/)?.[0];
  return minutes ? `${minutes.padStart(2, "0")}:00` : duration;
};

const parseDurationSeconds = (duration?: string) => {
  if (!duration) {
    return undefined;
  }

  if (duration.includes(":")) {
    const parts = duration.split(":").map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
  }

  const minutes = duration.match(/\d+/)?.[0];
  return minutes ? Number(minutes) * 60 : undefined;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const MusicPlayerScreen = () => {
  const navigation = useAppNavigationHandler();
  const { params } = useRoute<MusicPlayerRouteProp>();
  const { width } = useWindowDimensions();
  const videoRef = useRef<VideoRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [detectedDuration, setDetectedDuration] = useState(0);
  const [isPreparing, setIsPreparing] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const music = params.music;
  const scale = Math.min(width / BASE_WIDTH, 1.08);
  const fallbackDurationLabel = useMemo(
    () => formatDurationLabel(music.duration),
    [music.duration],
  );
  const fallbackDuration = useMemo(
    () => parseDurationSeconds(music.duration),
    [music.duration],
  );
  const playbackDuration = detectedDuration || fallbackDuration || 0;
  const playbackProgress =
    playbackDuration > 0 ? Math.min(1, currentTime / playbackDuration) : 0;
  const isBusy = isPreparing || isBuffering;

  useEffect(() => {
    setCurrentTime(0);
    setDetectedDuration(0);
    setIsPlaying(Boolean(music.url));
    setIsPreparing(Boolean(music.url));
    setIsBuffering(false);
    setPlaybackError(music.url ? null : "Audio URL is missing for this track.");
  }, [music.url]);

  const handleLoad = (event: OnLoadData) => {
    setDetectedDuration(event.duration);
    setCurrentTime(event.currentTime);
    setIsPreparing(false);
    setIsBuffering(false);
    setPlaybackError(null);
  };

  const handleProgress = (event: OnProgressData) => {
    setCurrentTime(event.currentTime);
  };

  const handlePlaybackError = (event: OnVideoErrorData) => {
    setIsPreparing(false);
    setIsBuffering(false);
    setIsPlaying(false);
    setPlaybackError(
      event.error.errorString ??
        event.error.localizedDescription ??
        "Unable to stream audio.",
    );
  };

  const handleScrub = (event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;
    const nextProgress = Math.max(0, Math.min(1, locationX / (334 * scale)));
    if (playbackDuration > 0) {
      const nextTime = nextProgress * playbackDuration;
      videoRef.current?.seek(nextTime);
      setCurrentTime(nextTime);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((value) => !value);
  };

  const handleSkip = (offset: number) => {
    const nextPosition = Math.max(
      0,
      playbackDuration
        ? Math.min(playbackDuration, currentTime + offset)
        : currentTime + offset,
    );
    videoRef.current?.seek(nextPosition);
    setCurrentTime(nextPosition);
  };

  const handleOpenUrl = () => {
    if (music.url) {
      Linking.openURL(music.url).catch(() => undefined);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <View style={styles.screen}>
        {music.url ? (
          <Video
            ignoreSilentSwitch="ignore"
            onAudioBecomingNoisy={() => setIsPlaying(false)}
            onBuffer={({ isBuffering: nextIsBuffering }) =>
              setIsBuffering(nextIsBuffering)
            }
            onEnd={() => setIsPlaying(false)}
            onError={handlePlaybackError}
            onLoad={handleLoad}
            onLoadStart={() => {
              setIsPreparing(true);
              setPlaybackError(null);
            }}
            onProgress={handleProgress}
            paused={!isPlaying}
            playInBackground={false}
            progressUpdateInterval={250}
            ref={videoRef}
            source={{ uri: music.url }}
            style={styles.hiddenVideo}
          />
        ) : null}

        <View
          pointerEvents="none"
          style={[styles.shape, styles.topLeftShape, { transform: [{ scale }] }]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.shape,
            styles.topRightShape,
            { transform: [{ rotate: "16deg" }, { scale }] },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.shape,
            styles.bottomLeftShape,
            { transform: [{ rotate: "-18deg" }, { scale }] },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.shape,
            styles.bottomRightShape,
            { transform: [{ rotate: "26deg" }, { scale }] },
          ]}
        />

        <View style={[styles.header, { paddingHorizontal: 20 * scale }]}>
          <TouchableOpacity
            activeOpacity={0.78}
            onPress={navigation.goBack}
            style={[styles.closeButton, { height: 55 * scale, width: 55 * scale }]}
          >
            <Feather name="x" size={28 * scale} color="#3F414E" />
          </TouchableOpacity>

          <View style={[styles.headerActions, { gap: 15 * scale }]}>
            <TouchableOpacity
              activeOpacity={0.78}
              style={[styles.circleButton, { height: 55 * scale, width: 55 * scale }]}
            >
              <Feather name="heart" size={23 * scale} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.78}
              onPress={handleOpenUrl}
              style={[styles.circleButton, { height: 55 * scale, width: 55 * scale }]}
            >
              <Feather name="download" size={22 * scale} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.trackInfo}>
          <Text numberOfLines={2} style={[styles.trackTitle, { fontSize: 34 * scale }]}>
            {music.name}
          </Text>
          <Text numberOfLines={2} style={styles.trackDescription}>
            {music.description}
          </Text>
          {playbackError ? (
            <Text style={styles.errorText}>{playbackError}</Text>
          ) : null}
        </View>

        <View style={[styles.controls, { paddingHorizontal: 20 * scale }]}>
          <TouchableOpacity
            activeOpacity={0.78}
            disabled={isBusy}
            onPress={() => handleSkip(-15)}
            style={styles.skipButton}
          >
            <Feather name="rotate-ccw" size={31 * scale} color="#A0A3B1" />
            <Text style={styles.skipText}>15</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.82}
            disabled={isBusy || Boolean(playbackError)}
            onPress={handlePlayPause}
            style={[
              styles.mainControlHalo,
              { height: 110 * scale, width: 110 * scale },
            ]}
          >
            <View
              style={[
                styles.mainControl,
                { height: 88 * scale, width: 88 * scale },
              ]}
            >
              <Feather
                name={isBusy ? "loader" : isPlaying ? "pause" : "play"}
                size={34 * scale}
                color="#FFFFFF"
                style={!isPlaying ? styles.playIcon : undefined}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.78}
            disabled={isBusy}
            onPress={() => handleSkip(15)}
            style={styles.skipButton}
          >
            <Feather name="rotate-cw" size={31 * scale} color="#A0A3B1" />
            <Text style={styles.skipText}>15</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.progressArea, { paddingHorizontal: 20 * scale }]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleScrub}
            style={[styles.progressTouchArea, { width: 334 * scale }]}
          >
            <View style={styles.progressTrack} />
            <View
              style={[
                styles.progressFill,
                { width: `${playbackProgress * 100}%` },
              ]}
            />
            <View
              style={[
                styles.progressThumb,
                { left: `${playbackProgress * 100}%`, marginLeft: -8 },
              ]}
            />
          </TouchableOpacity>

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>
              {playbackDuration > 0
                ? formatTime(playbackDuration)
                : fallbackDurationLabel}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FAF7F2",
    flex: 1,
  },
  screen: {
    backgroundColor: "#FAF7F2",
    flex: 1,
    overflow: "hidden",
  },
  hiddenVideo: {
    height: 1,
    opacity: 0,
    position: "absolute",
    width: 1,
  },
  shape: {
    backgroundColor: "#EFEBE4",
    opacity: 0.78,
    position: "absolute",
  },
  topLeftShape: {
    borderBottomRightRadius: 150,
    borderTopRightRadius: 150,
    height: 210,
    left: -55,
    top: -30,
    width: 240,
  },
  topRightShape: {
    borderBottomLeftRadius: 160,
    borderTopLeftRadius: 220,
    height: 300,
    right: -74,
    top: -16,
    width: 250,
  },
  bottomLeftShape: {
    borderRadius: 130,
    bottom: -4,
    height: 250,
    left: -26,
    width: 252,
  },
  bottomRightShape: {
    borderRadius: 130,
    bottom: -40,
    height: 250,
    right: -114,
    width: 264,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 28,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#EBEAEC",
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: "center",
  },
  headerActions: {
    flexDirection: "row",
  },
  circleButton: {
    alignItems: "center",
    backgroundColor: "#BFC1C8",
    borderRadius: 38,
    justifyContent: "center",
  },
  trackInfo: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  trackTitle: {
    color: "#3F414E",
    fontWeight: "700",
    lineHeight: 39,
    textAlign: "center",
  },
  trackDescription: {
    color: "#A0A3B1",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.7,
    lineHeight: 19,
    marginTop: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  errorText: {
    color: "#D95F5F",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    marginTop: 14,
    maxWidth: 300,
    textAlign: "center",
  },
  controls: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  skipButton: {
    alignItems: "center",
    height: 58,
    justifyContent: "center",
    width: 70,
  },
  skipText: {
    color: "#A0A3B1",
    fontSize: 12,
    fontWeight: "500",
    marginTop: -23,
  },
  mainControlHalo: {
    alignItems: "center",
    backgroundColor: "rgba(63, 65, 78, 0.11)",
    borderRadius: 55,
    justifyContent: "center",
  },
  mainControl: {
    alignItems: "center",
    backgroundColor: "#3F414E",
    borderRadius: 44,
    justifyContent: "center",
  },
  playIcon: {
    marginLeft: 4,
  },
  progressArea: {
    marginBottom: 88,
  },
  progressTouchArea: {
    alignSelf: "center",
    height: 28,
    justifyContent: "center",
    position: "relative",
  },
  progressTrack: {
    backgroundColor: "#CFD0D6",
    borderRadius: 3,
    height: 3,
    width: "100%",
  },
  progressFill: {
    backgroundColor: "#3F414E",
    borderRadius: 3,
    height: 3,
    left: 0,
    position: "absolute",
  },
  progressThumb: {
    backgroundColor: "#3F414E",
    borderColor: "#A0A3B1",
    borderRadius: 8,
    borderWidth: 2,
    height: 16,
    position: "absolute",
    width: 16,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    color: "#3F414E",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MusicPlayerScreen;
