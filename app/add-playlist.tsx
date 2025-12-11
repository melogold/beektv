import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

type PlaylistType = 'm3u-url' | 'm3u-file' | 'xtream';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function TabButton({ label, isActive, onPress }: TabButtonProps) {
  const activeColor = useThemeColor({}, 'tint');
  const inactiveColor = useThemeColor({}, 'tabIconDefault');

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tabButton,
        isActive && { borderBottomColor: activeColor, borderBottomWidth: 2 },
      ]}>
      <ThemedText
        style={[styles.tabButtonText, { color: isActive ? activeColor : inactiveColor }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export default function AddPlaylistScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PlaylistType>('m3u-url');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'tabIconDefault');
  const tintColor = useThemeColor({}, 'tint');

  const handleAddPlaylist = () => {
    // TODO: Implement playlist addition
    router.back();
  };

  const handlePickFile = () => {
    // TODO: Implement file picker using expo-document-picker
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ThemedView style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabBar}>
          <TabButton
            label="M3U URL"
            isActive={activeTab === 'm3u-url'}
            onPress={() => setActiveTab('m3u-url')}
          />
          <TabButton
            label="M3U File"
            isActive={activeTab === 'm3u-file'}
            onPress={() => setActiveTab('m3u-file')}
          />
          <TabButton
            label="Xtream"
            isActive={activeTab === 'xtream'}
            onPress={() => setActiveTab('xtream')}
          />
        </View>

        <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
          {/* Playlist Name (common to all) */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Playlist Name</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
              placeholder="My IPTV"
              placeholderTextColor={placeholderColor}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* M3U URL form */}
          {activeTab === 'm3u-url' && (
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>M3U URL</ThemedText>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
                placeholder="http://example.com/playlist.m3u"
                placeholderTextColor={placeholderColor}
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
              />
            </View>
          )}

          {/* M3U File form */}
          {activeTab === 'm3u-file' && (
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>M3U File</ThemedText>
              <Pressable
                style={[styles.fileButton, { borderColor: placeholderColor }]}
                onPress={handlePickFile}>
                <IconSymbol name="plus" size={24} color={placeholderColor} />
                <ThemedText style={[styles.fileButtonText, { color: placeholderColor }]}>
                  Choose File
                </ThemedText>
              </Pressable>
            </View>
          )}

          {/* Xtream form */}
          {activeTab === 'xtream' && (
            <>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Server URL</ThemedText>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
                  placeholder="http://example.com:8080"
                  placeholderTextColor={placeholderColor}
                  value={serverUrl}
                  onChangeText={setServerUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="url"
                />
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Username</ThemedText>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
                  placeholder="username"
                  placeholderTextColor={placeholderColor}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
                  placeholder="password"
                  placeholderTextColor={placeholderColor}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                />
              </View>
            </>
          )}
        </ScrollView>

        {/* Add Button */}
        <View style={styles.footer}>
          <Pressable
            style={[styles.addButton, { backgroundColor: tintColor }]}
            onPress={handleAddPlaylist}>
            <ThemedText style={styles.addButtonText}>Add Playlist</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.2)',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  fileButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileButtonText: {
    marginTop: 8,
    fontSize: 14,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
  addButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
