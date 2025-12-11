/**
 * EPG program information
 */
export interface EPGProgram {
  /** Unique program ID */
  id: string;
  /** Channel ID this program belongs to (tvg-id) */
  channelId: string;
  /** Program title */
  title: string;
  /** Program description */
  description?: string;
  /** Start time (Unix timestamp) */
  start: number;
  /** End time (Unix timestamp) */
  end: number;
  /** Category/genre */
  category?: string;
  /** Program icon/image URL */
  iconUrl?: string;
  /** Episode information */
  episode?: string;
  /** Season number */
  season?: number;
  /** Episode number */
  episodeNumber?: number;
  /** Rating (e.g., "TV-14", "PG") */
  rating?: string;
}

/**
 * EPG channel definition from XMLTV
 */
export interface EPGChannel {
  /** Channel ID (matches tvg-id in M3U) */
  id: string;
  /** Display name */
  displayName: string;
  /** Channel icon URL */
  iconUrl?: string;
}

/**
 * EPG data for a single channel
 */
export interface ChannelEPG {
  /** Channel ID */
  channelId: string;
  /** Programs for this channel, sorted by start time */
  programs: EPGProgram[];
}

/**
 * Currently playing and next program info
 */
export interface NowNextInfo {
  /** Currently playing program */
  current?: EPGProgram;
  /** Next program */
  next?: EPGProgram;
  /** Progress through current program (0-1) */
  progress?: number;
}

/**
 * EPG source configuration
 */
export interface EPGSource {
  /** Unique identifier */
  id: string;
  /** User-defined name */
  name: string;
  /** URL to fetch EPG from */
  url: string;
  /** Associated playlist source ID (optional) */
  playlistSourceId?: string;
  /** Last successful refresh */
  lastRefreshed?: number;
  /** Last error message */
  lastError?: string;
  /** Whether currently refreshing */
  isRefreshing?: boolean;
}

/**
 * EPG fetch result
 */
export interface EPGFetchResult {
  /** Channels defined in EPG */
  channels: EPGChannel[];
  /** All programs */
  programs: EPGProgram[];
  /** Timestamp of fetch */
  fetchedAt: number;
}
