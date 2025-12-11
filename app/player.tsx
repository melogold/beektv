import { StyleSheet, View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function PlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ channelId?: string }>();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header with close button */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color="#fff" />
          </Pressable>
        </View>

        {/* Video player placeholder */}
        <View style={styles.playerContainer}>
          <ThemedText style={styles.placeholderText}>
            Video Player
          </ThemedText>
          <ThemedText style={styles.placeholderSubtext}>
            Channel ID: {params.channelId ?? 'None'}
          </ThemedText>
        </View>

        {/* Controls placeholder */}
        <View style={styles.controls}>
          <Pressable style={styles.controlButton}>
            <IconSymbol name="play.fill" size={48} color="#fff" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  placeholderSubtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 32,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
