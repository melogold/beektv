import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ChannelsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">Channels</ThemedText>
        </View>
        <View style={styles.placeholder}>
          <ThemedText>No playlists added yet.</ThemedText>
          <ThemedText style={styles.hint}>
            Add a playlist from Settings to get started.
          </ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  hint: {
    marginTop: 8,
    opacity: 0.6,
    textAlign: 'center',
  },
});
