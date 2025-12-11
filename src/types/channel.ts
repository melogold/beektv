/**
 * Represents a single channel from an M3U playlist or Xtream source
 */
export interface Channel {
  /** Unique identifier for the channel */
  id: string;
  /** Channel display name */
  name: string;
  /** Stream URL */
  url: string;
  /** Channel logo URL */
  logoUrl?: string;
  /** Group/category this channel belongs to */
  group?: string;
  /** TVG ID for EPG matching */
  tvgId?: string;
  /** TVG name for EPG matching (fallback) */
  tvgName?: string;
  /** Source playlist ID this channel belongs to */
  sourceId: string;
  /** Whether this channel is a favorite */
  isFavorite?: boolean;
  /** Whether this channel is locked (parental controls) */
  isLocked?: boolean;
  /** Whether this channel is hidden */
  isHidden?: boolean;
  /** Last watched timestamp */
  lastWatched?: number;
  /** Channel number (if provided) */
  channelNumber?: number;
}

/**
 * A group/category of channels
 */
export interface ChannelGroup {
  /** Group identifier */
  id: string;
  /** Group display name */
  name: string;
  /** Number of channels in this group */
  channelCount: number;
  /** Source playlist ID */
  sourceId: string;
}

/**
 * Filters for channel list
 */
export interface ChannelFilters {
  /** Search query */
  search?: string;
  /** Filter by group ID */
  groupId?: string;
  /** Show only favorites */
  favoritesOnly?: boolean;
  /** Show hidden channels */
  showHidden?: boolean;
}
