import React, { useEffect, useState, ReactNode } from 'react';
import {
    View,
    StyleSheet,
    Keyboard,
    Platform,
    LayoutAnimation,
    ViewStyle,
    KeyboardEvent,
    UIManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Props for the BottomSafeArea component.
 */
export interface BottomSafeAreaProps {
    /**
     * The content to render inside the safe area container.
     * Typically a button or a row of buttons.
     */
    children: ReactNode;

    /**
     * Additional spacing (padding) to add to the bottom, in pixels.
     * Useful if you want more space than just the safe area/keyboard height.
     * Defaults to 0.
     */
    extraSpacing?: number;

    /**
     * Background color of the safe area container.
     * Defaults to 'transparent'.
     */
    backgroundColor?: string;

    /**
     * Optional custom style for the container.
     */
    style?: ViewStyle;
}

/**
 * A component that automatically handles bottom safe area insets and keyboard avoidance.
 *
 * It listens to keyboard events and adjusts the bottom padding accordingly,
 * ensuring that the content (e.g., action buttons) is always visible and clickable,
 * never hidden behind the keyboard or the home indicator.
 *
 * @example
 * <BottomSafeArea>
 *   <Button title="Continue" onPress={...} />
 * </BottomSafeArea>
 */
export const BottomSafeArea = ({
    children,
    extraSpacing = 0,
    backgroundColor = 'transparent',
    style,
}: BottomSafeAreaProps) => {
    const insets = useSafeAreaInsets();
    const [bottomPadding, setBottomPadding] = useState(0);

    useEffect(() => {
        // Function to handle keyboard showing
        const onKeyboardShow = (e: KeyboardEvent) => {
            // Configure animation for smooth transition
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

            // When keyboard shows, we want to pad by the keyboard height
            // However, on iOS, the keyboard sits on top of the view, so we might need to adjust logic based on where this component is placed.
            // But typically for a bottom-anchored view, we want to lift it up.
            // The `e.endCoordinates.height` gives the keyboard height.
            // We subtract insets.bottom because the keyboard covers the safe area too.
            // If we are already respecting safe area, we don't want to double count it when keyboard appears.

            const keyboardHeight = e.endCoordinates.height;

            if (Platform.OS === 'ios') {
                setBottomPadding(keyboardHeight);
            } else {
                setBottomPadding(keyboardHeight);
            }
        };

        // Function to handle keyboard hiding
        const onKeyboardHide = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setBottomPadding(0);
        };

        // Subscriptions
        const showSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            onKeyboardShow
        );
        const hideSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            onKeyboardHide
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const finalBottomPadding = Math.max(bottomPadding, insets.bottom) + extraSpacing;

    return (
        <View
            style={[
                styles.container,
                {
                    paddingBottom: finalBottomPadding,
                    backgroundColor: backgroundColor,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Default style: full width, acting as a container at the bottom
        width: '100%',
        // We don't enforce absolute positioning here to allow flexibility, 
        // but often this component is used at the bottom of a flex:1 container.
    },
});
