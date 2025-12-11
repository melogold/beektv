# BeekTV Development Plan

## Overview

BeekTV is a focused IPTV streaming app built with Expo. Unlike typical IPTV apps that bundle Movies/TV series content, BeekTV focuses solely on live TV streaming via M3U playlists.

## Architecture

```
src/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Main tab navigation
│   │   ├── channels/      # Channel list & player
│   │   ├── epg/           # Electronic Program Guide
│   │   ├── favorites/     # Favorites list
│   │   └── settings/      # App settings
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── player/           # Video player components
│   ├── channels/         # Channel list components
│   ├── epg/              # EPG components
│   └── parental/         # Parental control components
├── services/             # Business logic
│   ├── m3u/              # M3U parsing & management
│   ├── xtream/           # Xtream Codes API client
│   ├── epg/              # EPG fetching & parsing
│   ├── player/           # Playback service
│   ├── sync/             # Cloud sync service
│   └── auth/             # Authentication service
├── stores/               # State management (Zustand)
├── types/                # TypeScript definitions
└── utils/                # Helper functions
```

## Phase 1: Core Infrastructure

### 1.1 Project Setup
- [ ] Clean up Expo template boilerplate
- [ ] Set up folder structure as defined above
- [ ] Configure path aliases in tsconfig.json
- [ ] Add essential dependencies:
  - `expo-av` or `react-native-video` for playback
  - `zustand` for state management
  - `expo-file-system` for M3U file handling
  - `expo-document-picker` for file uploads

### 1.2 Type Definitions
- [ ] Define M3U channel interface
- [ ] Define Xtream Codes API interfaces
- [ ] Define EPG program interface
- [ ] Define playlist/source interface (unified for M3U and Xtream)
- [ ] Define player state interface
- [ ] Define user/sync data interfaces

### 1.3 Navigation Structure
- [ ] Set up tab navigation (Channels, EPG, Settings)
- [ ] Configure stack navigation for player screen
- [ ] Set up modal navigation for add playlist flow

## Phase 2: M3U Support

### 2.1 M3U Parser
- [ ] Implement M3U/M3U8 file parser
- [ ] Handle EXTINF metadata extraction (name, logo, group, tvg-id)
- [ ] Support both local files and remote URLs
- [ ] Handle encoding issues (UTF-8, Latin-1)

### 2.2 Playlist Management
- [ ] Create playlist storage service (expo-secure-store or AsyncStorage)
- [ ] Implement add playlist from file upload
- [ ] Implement add playlist from URL
- [ ] Implement playlist refresh mechanism
- [ ] Implement playlist deletion

### 2.3 Channel List UI
- [ ] Build channel list component with fast virtualized scrolling
- [ ] Implement channel search/filter
- [ ] Implement group/category filtering
- [ ] Display channel logos (with fallback)
- [ ] Show currently playing indicator

## Phase 3: Xtream Codes API Support

### 3.1 Xtream Codes Client
- [ ] Implement authentication (server URL, username, password)
- [ ] Fetch and parse server info endpoint
- [ ] Fetch live stream categories
- [ ] Fetch live streams list
- [ ] Build stream URLs with proper authentication tokens

### 3.2 Xtream EPG Integration
- [ ] Fetch EPG data via Xtream API (xmltv.php endpoint)
- [ ] Fetch short EPG for individual channels
- [ ] Map Xtream stream IDs to EPG data

### 3.3 Unified Source Management
- [ ] Abstract playlist source interface (M3U vs Xtream)
- [ ] Implement source type detection
- [ ] Handle Xtream session expiration/renewal
- [ ] Store Xtream credentials securely (expo-secure-store)

### 3.4 Xtream-Specific Features
- [ ] Display server info (expiry date, max connections)
- [ ] Handle connection limits gracefully
- [ ] Support output format selection (m3u8, ts)

## Phase 4: Video Player

### 4.1 Core Player
- [ ] Implement video player screen
- [ ] Handle HLS/MPEG-TS stream formats
- [ ] Implement play/pause controls
- [ ] Implement quality selection (if available)
- [ ] Handle stream errors gracefully

### 4.2 Player UI
- [ ] Build fullscreen player controls
- [ ] Implement gesture controls (swipe for volume/brightness)
- [ ] Show channel info overlay
- [ ] Implement channel up/down navigation
- [ ] Add recent channels quick access

### 4.3 Picture-in-Picture (iOS)
- [ ] Configure `expo-av` or `react-native-video` for PiP
- [ ] Add PiP toggle button
- [ ] Handle PiP mode transitions
- [ ] Maintain playback state during PiP

### 4.4 Background Audio
- [ ] Configure audio session for background playback
- [ ] Implement lock screen controls (Now Playing info)
- [ ] Handle audio interruptions (calls, other apps)
- [ ] Persist playback across app backgrounding

### 4.5 DRM Support
DRM (Digital Rights Management) handling options:

**Option A: Native DRM via react-native-video (Recommended)**
- Use `react-native-video` v6+ which supports FairPlay (iOS) and Widevine (Android)
- Handle license acquisition via DRM license server URLs
- Support for encrypted HLS streams

**Option B: Token-based Authentication**
- Many IPTV providers use URL tokens instead of full DRM
- Tokens embedded in stream URLs that expire
- Simpler to implement, handled automatically via Xtream API

**Implementation Tasks:**
- [ ] Add DRM configuration to react-native-video player
- [ ] Implement FairPlay Streaming for iOS
- [ ] Handle license server communication
- [ ] Support token-based stream authentication
- [ ] Gracefully handle DRM errors with user feedback

## Phase 5: EPG Support

### 5.1 EPG Parser
- [ ] Implement XMLTV format parser
- [ ] Handle gzipped EPG files
- [ ] Map EPG data to channels via tvg-id
- [ ] Implement efficient date/time handling

### 5.2 EPG Storage
- [ ] Design efficient EPG data structure
- [ ] Implement EPG caching strategy
- [ ] Handle EPG refresh scheduling
- [ ] Prune old EPG data automatically

### 5.3 EPG UI
- [ ] Build EPG grid view (timeline-based)
- [ ] Implement current/next program display on channel list
- [ ] Build program detail modal
- [ ] Implement "On Now" quick view
- [ ] Add program search

## Phase 6: Favorites & Cloud Sync

### 6.1 Favorites System
- [ ] Implement add/remove favorites functionality
- [ ] Build favorites list screen
- [ ] Add favorites indicator on channel list
- [ ] Implement favorites-only filter mode
- [ ] Store favorites locally (fallback when offline)

### 6.2 User Authentication
- [ ] Implement user registration/login (email + password)
- [ ] Add social login options (Apple Sign-In, Google)
- [ ] Secure token storage with expo-secure-store
- [ ] Handle session refresh/expiration

### 6.3 Cloud Sync Service
Backend options:
- **Supabase** (recommended): Open-source, real-time sync, easy auth
- **Firebase**: Battle-tested, good offline support
- **Custom API**: Full control, more development effort

**Implementation Tasks:**
- [ ] Set up backend service (Supabase/Firebase)
- [ ] Design sync data schema (favorites, settings, watch history)
- [ ] Implement real-time sync with conflict resolution
- [ ] Handle offline mode with queue-based sync
- [ ] Sync across multiple devices seamlessly

### 6.4 Sync Data Types
- [ ] Favorites list
- [ ] Custom channel ordering
- [ ] Parental control settings (encrypted)
- [ ] App preferences/theme
- [ ] Recently watched channels
- [ ] Hidden channels

## Phase 7: Parental Controls

### 7.1 PIN Protection
- [ ] Implement PIN setup flow (4-6 digit)
- [ ] Add PIN entry screen with lockout after failed attempts
- [ ] Biometric unlock option (Face ID, Touch ID)
- [ ] Secure PIN storage (expo-secure-store with encryption)

### 7.2 Channel Restrictions
- [ ] Implement channel locking (require PIN to view)
- [ ] Add channel hiding (completely hidden from list)
- [ ] Category-based restrictions (lock entire categories)
- [ ] Bulk lock/unlock functionality

### 7.3 Viewing Restrictions
- [ ] Time-based restrictions (viewing hours)
- [ ] Session timeout (re-require PIN after inactivity)
- [ ] Restrict settings access behind PIN

### 7.4 Parental Control UI
- [ ] Build parental controls settings screen
- [ ] Channel lock toggle on long-press
- [ ] Visual indicator for locked channels
- [ ] "Kids mode" quick toggle

## Phase 8: Settings & Polish

### 8.1 Settings Screen
- [ ] Playlist/source management (list, refresh, delete)
- [ ] EPG source configuration
- [ ] Player preferences (default quality, buffer size)
- [ ] Theme settings (dark/light/system)
- [ ] Account settings (login, sync status)
- [ ] Parental controls access
- [ ] About/version info

### 8.2 Performance Optimization
- [ ] Optimize M3U parsing for large playlists (10k+ channels)
- [ ] Implement lazy loading for channel logos
- [ ] Optimize EPG memory usage
- [ ] Profile and optimize list rendering
- [ ] Optimize sync data payload size

### 8.3 Error Handling & UX
- [ ] Implement comprehensive error states
- [ ] Add loading skeletons
- [ ] Implement pull-to-refresh where appropriate
- [ ] Add haptic feedback for interactions
- [ ] Offline mode indicators

## Phase 9: Platform-Specific Features

### 9.1 iOS Enhancements
- [ ] Configure proper background modes in app.json
- [ ] Implement CarPlay support (stretch goal)
- [ ] Add Shortcuts/Siri integration (stretch goal)
- [ ] Widget for favorite channels (stretch goal)

### 9.2 Android Support (Future)
- [ ] Test and fix Android-specific issues
- [ ] Configure Android PiP
- [ ] Handle Android background playback differences
- [ ] Implement Widevine DRM for Android

## Technical Decisions

### Video Player Library
**Decision needed:** `expo-av` vs `react-native-video`
- `expo-av`: Better Expo integration, simpler API
- `react-native-video`: More features, better PiP support, more active development

### State Management
**Recommendation:** Zustand
- Lightweight and TypeScript-friendly
- Simple API with good persistence options
- No boilerplate compared to Redux

### M3U Parsing Strategy
**Recommendation:** Streaming parser
- Parse M3U line-by-line to handle large files
- Use Web Workers/background threads if needed
- Cache parsed results

## Dependencies to Add

```json
{
  "dependencies": {
    "react-native-video": "^6.x",
    "zustand": "^4.x",
    "expo-file-system": "~18.x",
    "expo-document-picker": "~13.x",
    "expo-secure-store": "~14.x",
    "expo-local-authentication": "~15.x",
    "expo-crypto": "~14.x",
    "@supabase/supabase-js": "^2.x",
    "date-fns": "^3.x",
    "fast-xml-parser": "^4.x",
    "pako": "^2.x"
  }
}
```

### Dependency Notes
- `react-native-video`: Video playback with DRM support
- `expo-secure-store`: Secure credential storage (Xtream, PIN)
- `expo-local-authentication`: Biometric authentication for parental controls
- `expo-crypto`: Encryption for synced parental control data
- `@supabase/supabase-js`: Cloud sync backend
- `pako`: Gzip decompression for EPG files

## Success Metrics

1. **Performance:** M3U with 5000+ channels loads in < 3 seconds
2. **Reliability:** Stream starts within 2 seconds of selection
3. **Battery:** Background audio uses minimal battery
4. **UX:** Smooth 60fps scrolling in channel list
5. **Sync:** Cross-device sync completes within 5 seconds
6. **Security:** Parental controls cannot be bypassed without PIN

## Confirmed Decisions

| Decision | Answer |
|----------|--------|
| Xtream Codes API support | Yes - Full support alongside M3U |
| DRM handling | Native via react-native-video (FairPlay/Widevine) + token auth |
| Cross-device sync | Yes - Using Supabase for real-time sync |
| Parental controls | Yes - PIN + biometric with channel locking/hiding |
