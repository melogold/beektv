// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * SF Symbols to Material Icons mappings.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Navigation
  'house.fill': 'home',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  // Tabs
  'tv.fill': 'live-tv',
  'calendar': 'event',
  'gearshape.fill': 'settings',
  'star.fill': 'star',
  'heart.fill': 'favorite',
  // Player
  'play.fill': 'play-arrow',
  'pause.fill': 'pause',
  'pip.fill': 'picture-in-picture-alt',
  'speaker.wave.2.fill': 'volume-up',
  'speaker.slash.fill': 'volume-off',
  // Actions
  'plus': 'add',
  'xmark': 'close',
  'magnifyingglass': 'search',
  'arrow.clockwise': 'refresh',
  'trash.fill': 'delete',
  // Status
  'exclamationmark.triangle.fill': 'warning',
  'checkmark.circle.fill': 'check-circle',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
