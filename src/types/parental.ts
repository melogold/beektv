/**
 * Parental control state
 */
export interface ParentalControlState {
  /** Whether parental controls are enabled */
  enabled: boolean;
  /** Whether controls are currently locked (PIN required) */
  isLocked: boolean;
  /** Session unlock timestamp (unlocked until this time) */
  unlockedUntil?: number;
  /** PIN hash (never stored in plain text) */
  pinHash?: string;
  /** Biometric authentication enabled */
  biometricEnabled: boolean;
  /** Failed PIN attempt count */
  failedAttempts: number;
  /** Lockout until timestamp (after too many failed attempts) */
  lockoutUntil?: number;
}

/**
 * Parental control settings
 */
export interface ParentalControlSettings {
  /** Locked channel IDs */
  lockedChannels: string[];
  /** Locked group/category IDs */
  lockedGroups: string[];
  /** Hidden channel IDs (completely hidden from list) */
  hiddenChannels: string[];
  /** Time restrictions */
  timeRestrictions?: TimeRestrictions;
  /** Session timeout in minutes (re-lock after inactivity) */
  sessionTimeout: number;
  /** Require PIN to access settings */
  protectSettings: boolean;
}

/**
 * Time-based viewing restrictions
 */
export interface TimeRestrictions {
  /** Whether time restrictions are enabled */
  enabled: boolean;
  /** Allowed viewing start time (HH:MM format) */
  allowedStartTime: string;
  /** Allowed viewing end time (HH:MM format) */
  allowedEndTime: string;
  /** Days of week restrictions apply (0=Sunday, 6=Saturday) */
  restrictedDays: number[];
}

/**
 * PIN verification result
 */
export interface PINVerificationResult {
  /** Whether PIN was correct */
  success: boolean;
  /** If failed, remaining attempts before lockout */
  remainingAttempts?: number;
  /** If locked out, when lockout expires */
  lockoutExpiresAt?: number;
}

/**
 * Parental control action
 */
export type ParentalAction =
  | 'view_channel'
  | 'access_settings'
  | 'view_hidden'
  | 'modify_locks';
