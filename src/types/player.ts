import { Channel } from './channel';
import { NowNextInfo } from './epg';

/**
 * Player state
 */
export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error' | 'buffering';

/**
 * Video quality option
 */
export interface QualityOption {
  /** Quality label (e.g., "1080p", "720p", "Auto") */
  label: string;
  /** Bitrate in bps (for sorting) */
  bitrate?: number;
  /** Resolution height */
  height?: number;
  /** Whether this is the auto quality option */
  isAuto?: boolean;
  /** Index in the HLS manifest */
  index: number;
}

/**
 * Audio track option
 */
export interface AudioTrack {
  /** Track index */
  index: number;
  /** Track title/name */
  title: string;
  /** Language code */
  language?: string;
  /** Whether this track is selected */
  selected: boolean;
}

/**
 * Subtitle track option
 */
export interface SubtitleTrack {
  /** Track index */
  index: number;
  /** Track title/name */
  title: string;
  /** Language code */
  language?: string;
  /** Whether this track is selected */
  selected: boolean;
}

/**
 * Player state interface
 */
export interface PlayerState {
  /** Current playback status */
  status: PlayerStatus;
  /** Currently playing channel */
  currentChannel: Channel | null;
  /** EPG info for current channel */
  epgInfo: NowNextInfo | null;
  /** Current volume (0-1) */
  volume: number;
  /** Whether audio is muted */
  isMuted: boolean;
  /** Whether in fullscreen mode */
  isFullscreen: boolean;
  /** Whether in PiP mode */
  isPiP: boolean;
  /** Current playback position (for DVR/timeshift) */
  position?: number;
  /** Duration (for DVR/timeshift) */
  duration?: number;
  /** Whether buffering */
  isBuffering: boolean;
  /** Buffer progress (0-1) */
  bufferProgress: number;
  /** Error message if status is 'error' */
  error?: string;
  /** Available quality options */
  qualityOptions: QualityOption[];
  /** Selected quality option index */
  selectedQualityIndex: number;
  /** Available audio tracks */
  audioTracks: AudioTrack[];
  /** Available subtitle tracks */
  subtitleTracks: SubtitleTrack[];
  /** Whether controls are visible */
  controlsVisible: boolean;
  /** Recently played channels */
  recentChannels: Channel[];
}

/**
 * Player preferences
 */
export interface PlayerPreferences {
  /** Default quality setting */
  defaultQuality: 'auto' | 'highest' | 'lowest';
  /** Auto-hide controls delay in ms */
  autoHideControlsDelay: number;
  /** Enable hardware acceleration */
  hardwareAcceleration: boolean;
  /** Buffer size in seconds */
  bufferSize: number;
  /** Remember last volume */
  rememberVolume: boolean;
  /** Show channel info overlay on channel change */
  showChannelInfoOnChange: boolean;
  /** Channel info overlay duration in ms */
  channelInfoDuration: number;
}
