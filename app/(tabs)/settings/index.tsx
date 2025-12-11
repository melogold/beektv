import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

interface SettingsItemProps {
  icon: Parameters<typeof IconSymbol>[0]['name'];
  title: string;
  subtitle?: string;
  href?: string;
  onPress?: () => void;
}

function SettingsItem({ icon, title, subtitle, href, onPress }: SettingsItemProps) {
  const iconColor = useThemeColor({}, 'icon');
  const chevronColor = useThemeColor({}, 'tabIconDefault');

  const content = (
    <View style={styles.settingsItem}>
      <IconSymbol name={icon} size={24} color={iconColor} style={styles.settingsIcon} />
      <View style={styles.settingsText}>
        <ThemedText style={styles.settingsTitle}>{title}</ThemedText>
        {subtitle && (
          <ThemedText style={styles.settingsSubtitle}>{subtitle}</ThemedText>
        )}
      </View>
      <IconSymbol name="chevron.right" size={20} color={chevronColor} />
    </View>
  );

  if (href) {
    return (
      <Link href={href as never} asChild>
        <Pressable>{content}</Pressable>
      </Link>
    );
  }

  return <Pressable onPress={onPress}>{content}</Pressable>;
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <ThemedView style={styles.sectionContent}>{children}</ThemedView>
    </View>
  );
}

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">Settings</ThemedText>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <SettingsSection title="Playlists">
            <SettingsItem
              icon="plus"
              title="Add Playlist"
              subtitle="M3U URL, file, or Xtream login"
              href="/add-playlist"
            />
            <SettingsItem
              icon="tv.fill"
              title="Manage Playlists"
              subtitle="View, refresh, or remove playlists"
            />
          </SettingsSection>

          <SettingsSection title="Playback">
            <SettingsItem
              icon="play.fill"
              title="Player Settings"
              subtitle="Quality, buffer size, controls"
            />
          </SettingsSection>

          <SettingsSection title="Security">
            <SettingsItem
              icon="gearshape.fill"
              title="Parental Controls"
              subtitle="PIN, channel locks, time limits"
            />
          </SettingsSection>

          <SettingsSection title="Account">
            <SettingsItem
              icon="heart.fill"
              title="Sign In"
              subtitle="Sync favorites across devices"
            />
          </SettingsSection>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    opacity: 0.5,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sectionContent: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingsIcon: {
    marginRight: 12,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
  },
  settingsSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
  },
});
