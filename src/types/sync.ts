/**
 * User authentication state
 */
export interface AuthUser {
  /** Unique user ID */
  id: string;
  /** User email */
  email: string;
  /** Display name */
  displayName?: string;
  /** Profile picture URL */
  avatarUrl?: string;
  /** Authentication provider */
  provider: 'email' | 'apple' | 'google';
  /** Account created timestamp */
  createdAt: number;
}

/**
 * Authentication state
 */
export interface AuthState {
  /** Currently authenticated user */
  user: AuthUser | null;
  /** Whether auth state is being loaded */
  isLoading: boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Last auth error */
  error?: string;
}

/**
 * Sync status
 */
export type SyncStatus = 'idle' | 'syncing' | 'error' | 'offline';

/**
 * Sync state
 */
export interface SyncState {
  /** Current sync status */
  status: SyncStatus;
  /** Last successful sync timestamp */
  lastSynced?: number;
  /** Pending changes count */
  pendingChanges: number;
  /** Last sync error */
  error?: string;
  /** Whether device is online */
  isOnline: boolean;
}

/**
 * User data that gets synced
 */
export interface SyncData {
  /** Favorite channel IDs by source */
  favorites: Record<string, string[]>;
  /** Custom channel ordering */
  channelOrder?: Record<string, string[]>;
  /** Hidden channel IDs */
  hiddenChannels: string[];
  /** Recently watched channel IDs */
  recentlyWatched: string[];
  /** App preferences */
  preferences: AppPreferences;
  /** Parental control settings (encrypted) */
  parentalControls?: ParentalControlsSync;
  /** Last modified timestamp */
  lastModified: number;
}

/**
 * App preferences that sync
 */
export interface AppPreferences {
  /** Theme setting */
  theme: 'light' | 'dark' | 'system';
  /** Default start screen */
  defaultTab: 'channels' | 'favorites' | 'epg';
  /** EPG time format */
  timeFormat: '12h' | '24h';
  /** Channel list display mode */
  channelListMode: 'list' | 'grid';
  /** Show channel numbers */
  showChannelNumbers: boolean;
}

/**
 * Parental control settings (for sync - encrypted)
 */
export interface ParentalControlsSync {
  /** Whether parental controls are enabled */
  enabled: boolean;
  /** Locked channel IDs */
  lockedChannels: string[];
  /** Locked group IDs */
  lockedGroups: string[];
  /** Time restrictions */
  timeRestrictions?: {
    enabled: boolean;
    allowedStart: string; // "HH:MM"
    allowedEnd: string;   // "HH:MM"
  };
}

/**
 * Conflict resolution strategy
 */
export type ConflictResolution = 'local' | 'remote' | 'merge';

/**
 * Sync conflict
 */
export interface SyncConflict {
  /** Field that has conflict */
  field: string;
  /** Local value */
  localValue: unknown;
  /** Remote value */
  remoteValue: unknown;
  /** Timestamps */
  localTimestamp: number;
  remoteTimestamp: number;
}
