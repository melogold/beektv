/**
 * Types of playlist sources
 */
export type PlaylistSourceType = 'm3u' | 'xtream';

/**
 * Base playlist source interface
 */
interface PlaylistSourceBase {
  /** Unique identifier */
  id: string;
  /** User-defined name for this source */
  name: string;
  /** Source type */
  type: PlaylistSourceType;
  /** When this source was added */
  createdAt: number;
  /** Last successful refresh timestamp */
  lastRefreshed?: number;
  /** Whether this source is currently refreshing */
  isRefreshing?: boolean;
  /** Last refresh error message */
  lastError?: string;
  /** Number of channels in this source */
  channelCount?: number;
}

/**
 * M3U playlist source - from file or URL
 */
export interface M3USource extends PlaylistSourceBase {
  type: 'm3u';
  /** URL to fetch M3U from (remote) */
  url?: string;
  /** Whether this is a local file */
  isLocalFile?: boolean;
  /** Local file path (if isLocalFile) */
  localPath?: string;
  /** EPG URL associated with this playlist */
  epgUrl?: string;
}

/**
 * Xtream Codes API source
 */
export interface XtreamSource extends PlaylistSourceBase {
  type: 'xtream';
  /** Server URL (without /player_api.php) */
  serverUrl: string;
  /** Username for authentication */
  username: string;
  /** Password for authentication (stored securely) */
  password: string;
  /** Server info from API */
  serverInfo?: XtreamServerInfo;
  /** User info from API */
  userInfo?: XtreamUserInfo;
  /** Preferred output format */
  outputFormat?: 'm3u8' | 'ts';
}

/**
 * Xtream server info from API
 */
export interface XtreamServerInfo {
  url: string;
  port: string;
  httpsPort?: string;
  serverProtocol: string;
  rtmpPort?: string;
  timezone: string;
  timestampNow: number;
  timeNow: string;
}

/**
 * Xtream user info from API
 */
export interface XtreamUserInfo {
  username: string;
  password: string;
  message?: string;
  auth: number;
  status: string;
  expDate?: string;
  isTrial: string;
  activeCons: string;
  createdAt: string;
  maxConnections: string;
  allowedOutputFormats: string[];
}

/**
 * Union type for all playlist sources
 */
export type PlaylistSource = M3USource | XtreamSource;

/**
 * Form data for adding a new M3U source
 */
export interface AddM3USourceForm {
  name: string;
  url?: string;
  localPath?: string;
  epgUrl?: string;
}

/**
 * Form data for adding a new Xtream source
 */
export interface AddXtreamSourceForm {
  name: string;
  serverUrl: string;
  username: string;
  password: string;
}
