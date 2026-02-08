# react-native-bottom-safe-area

A lightweight, zero-native-dependency React Native library that creates a bottom container which automatically adapts to Safe Area insets (iPhone X+ Home Indicator) and Keyboard visibility.

Perfect for "Continue", "Submit", or "Checkout" buttons that need to sit at the bottom of the screen but never get hidden behind the keyboard or system navigation.

## Why this exists?

Even with `react-native-safe-area-context`, handling the keyboard interactions along with safe area insets often leads to:
- Boilerplate code in every screen.
- Buttons jumping or getting hidden behind the keyboard.
- Double padding issues (Safe Area + Keyboard Cushion).
- Manual calculations for different devices.

This library encapsulates that logic into a single simple component wrapping your button.

## Features

- 🚀 **Auto-handling**: Automatically applies `paddingBottom` based on Safe Area or Keyboard height.
- ⌨️ **Keyboard Aware**: Smoothly animates padding when keyboard opens/closes.
- 📱 **Cross Platform**: Works on iOS (Home Indicator) and Android (Navigation Bar).
- ⚡ **Lightweight**: No native code to link, just pure JS/TS + `react-native-safe-area-context`.
- 🛡️ **TypeScript**: Fully typed.

## Installation

```sh
npm install react-native-bottom-safe-area
# OR
yarn add react-native-bottom-safe-area
```

This library requires `react-native-safe-area-context` as a peer dependency. If you haven't installed it yet:

```sh
npm install react-native-safe-area-context
cd ios && pod install && cd ..
```

## Usage

Wrap your functionality (like a Button) with `BottomSafeArea`. It acts as a View that adds dynamic bottom padding.

```tsx
import React from 'react';
import { Button, View, Text } from 'react-native';
import { BottomSafeArea } from 'react-native-bottom-safe-area';

export default function MyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ padding: 20 }}>
        <Text>Some content here...</Text>
      </View>

      {/* Place this at the bottom of your container */}
      <BottomSafeArea extraSpacing={10} backgroundColor="white">
        <Button title="Continue" onPress={() => console.log('Pressed')} />
      </BottomSafeArea>
    </View>
  );
}
```

## API

### `<BottomSafeArea />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | The content to render (Buttons, Text, etc.). |
| `extraSpacing` | `number` | `0` | Additional padding (in pixels) to add on top of the calculated safe area/keyboard offset. |
| `backgroundColor` | `string` | `'transparent'` | Background color of the container view. |
| `style` | `ViewStyle` | `undefined` | Custom styles for the container view. |

## Android Parsing

On Android, ensure your `android/app/src/main/AndroidManifest.xml` has `windowSoftInputMode="adjustResize"` for best results, although this library attempts to handle padding manually as well.

## License

MIT
