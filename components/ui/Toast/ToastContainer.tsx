import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from './Toast';
import { useToast } from './ToastProvider';
import { ToastPosition, ToastStyles } from './types';

interface ToastContainerProps {
    position?: ToastPosition;
    defaultBlockInteraction?: boolean;
    defaultOverlayColor?: string;
    defaultOverlayOpacity?: number;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top', defaultBlockInteraction = false,
    defaultOverlayColor = 'rgba(0, 0, 0, 0.5)',
    defaultOverlayOpacity = 0.3 }) => {
    const { toasts, dismiss } = useToast();
    const currentToast = toasts.length > 0 ? toasts[0] : null;
    const insets = useSafeAreaInsets();
    const shouldBlockInteraction = currentToast?.blockInteraction ?? defaultBlockInteraction;
    const overlayColor = currentToast?.overlayColor ?? defaultOverlayColor;
    const overlayOpacity = currentToast?.overlayOpacity ?? defaultOverlayOpacity;

    const containerStyle = position === 'top'
        ? { top: insets.top }
        : { bottom: insets.bottom };
    const overlayOpacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (currentToast && shouldBlockInteraction) {
            Animated.timing(overlayOpacityAnim, {
                toValue: overlayOpacity,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(overlayOpacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [currentToast, shouldBlockInteraction, overlayOpacity, overlayOpacityAnim]);

    return (
        <>
            {/* Overlay */}
            {currentToast && shouldBlockInteraction && (
                <Animated.View
                    style={[
                        styles.overlay,
                        {
                            backgroundColor: overlayColor,
                            opacity: overlayOpacityAnim,
                        }
                    ]}
                    pointerEvents="auto"
                />
            )}
            <View
                style={[
                    styles.container,
                    containerStyle,
                    position === 'bottom' && styles.bottomContainer
                ]}
                pointerEvents="box-none"
            >
                {currentToast && (
                    <Toast
                        key={currentToast.id}
                        toast={currentToast}
                        position={position}
                        onDismiss={() => dismiss(currentToast.id)}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create<ToastStyles & { container: ViewStyle; bottomContainer: ViewStyle, overlay: ViewStyle }>({
    // Toast Container Styles
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: 'box-none',
    },
    bottomContainer: {
        bottom: 0,
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9998,
    },

    toastContainer: {
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    toast: {
        minHeight: 60,
        justifyContent: 'center',
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        marginRight: 12,
    },
    messageContainer: {
        flex: 1,
    },
    message: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        lineHeight: 20,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
        lineHeight: 18,
    },
    closeButton: {
        padding: 4,
        marginLeft: 8,
    },

    // Toast Type Styles
    defaultToast: {
        backgroundColor: '#fff',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    successToast: {
        backgroundColor: '#f8fdf8',
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    errorToast: {
        backgroundColor: '#fef8f8',
        borderLeftWidth: 4,
        borderLeftColor: '#F44336',
    },
    warnToast: {
        backgroundColor: '#fffbf0',
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    infoToast: {
        backgroundColor: '#f0f8ff',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
});

export default ToastContainer;