// Toast.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

import CancelIcon from '@/assets/icons/CancelIcon';
import ToastErrorIcon from '@/assets/icons/ToastErrorIcon';
import ToastSuccessIcon from '@/assets/icons/ToastSuccessIcon';
import { ToastPosition, ToastStyles, Toast as ToastType } from './types';

const { width } = Dimensions.get('window');

interface ToastProps {
  toast: ToastType;
  onDismiss: () => void;
  position?: ToastPosition;
}

const Toast: React.FC<ToastProps> = ({ 
  toast, 
  onDismiss, 
  position = 'top' 
}) => {
  const slideAnim = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;


  // useEffect(() => {
  //   Animated.parallel([
  //     Animated.timing(slideAnim, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(opacityAnim, {
  //       toValue: 1,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }),
  //   ]).start();
  // }, [slideAnim, opacityAnim]);

   useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  // const handleDismiss = (): void => {
  //   Animated.parallel([
  //     Animated.timing(slideAnim, {
  //       toValue: position === 'top' ? -100 : 100,
  //       duration: 250,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(opacityAnim, {
  //       toValue: 0,
  //       duration: 250,
  //       useNativeDriver: true,
  //     }),
  //   ]).start(() => {
  //     onDismiss();
  //   });
  // };

   const handleDismiss = (): void => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0,
        tension: 200,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const getToastStyle = (): ViewStyle => {
    switch (toast.type) {
      case 'success':
        return styles.successToast;
      case 'error':
        return styles.errorToast;
      case 'warn':
        return styles.warnToast;
      case 'info':
        return styles.infoToast;
      default:
        return styles.defaultToast;
    }
  };

  const getDefaultIcon = (): React.JSX.Element => {
    switch (toast.type) {
      case 'error':
        return <ToastErrorIcon/>;
      default:
        return <ToastSuccessIcon/>;
    }
  };

  const getIconColor = (): string => {
    switch (toast.type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warn':
        return '#FF9800';
      case 'info':
        return '#2196F3';
      default:
        return '#2196F3';
    }
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        getToastStyle(),
        {
          // transform: [{ translateY: slideAnim }],
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.toast}
        onPress={handleDismiss}
        activeOpacity={0.9}
      >
        {toast.customComponent ? (
          toast.customComponent
        ) : (
          <View style={styles.toastContent}>
            <View style={styles.iconContainer}>
              {toast.icon ? (
                typeof toast.icon === 'string' ? (
                  <Ionicons 
                    name={toast.icon as keyof typeof Ionicons.glyphMap} 
                    size={24} 
                    color={toast.iconColor || getIconColor()} 
                  />
                ) : (
                  toast.icon
                )
              ) : (
                getDefaultIcon()
              )}
            </View>
            
            <View style={styles.messageContainer}>
              <Text style={[styles.message, toast.messageStyle]}>
                {toast.message}
              </Text>
              {toast.subtitle && (
                <Text style={[styles.subtitle, toast.subtitleStyle]}>
                  {toast.subtitle}
                </Text>
              )}
            </View>
            
            {toast.showCloseButton !== false && (
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleDismiss}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <CancelIcon/>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create<ToastStyles & { container: ViewStyle; bottomContainer: ViewStyle }>({
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
  toastContainer: {
    marginHorizontal: 24,
    marginVertical: 4,
    borderRadius: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
  },
  toast: {
    minHeight: 54,
    justifyContent: 'center',
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    // gap: 6
  },
  iconContainer: {
    // marginRight: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 6
  },
  message: {
    fontSize: 16,
    fontFamily: 'inter_800ExtraBold',
    color: '#303030',
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 13,
    color: '#616161',
    // marginTop: 2,
    lineHeight: 20,
    letterSpacing: 0.26,
    fontFamily: "inter_500Medium"
  },
  closeButton: {
    padding: 2,
    // width: 30,
    // height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  defaultToast: {
    backgroundColor: '#fff',
    // borderLeftWidth: 4,
    // borderLeftColor: '#2196F3',
  },
  successToast: {
    // backgroundColor: '#f8fdf8',
    backgroundColor: '#fff',
    // borderLeftWidth: 4,
    // borderLeftColor: '#4CAF50',
  },
  errorToast: {
    // backgroundColor: '#fef8f8',
    backgroundColor: '#fff',
    // borderLeftWidth: 4,
    // borderLeftColor: '#F44336',
  },
  warnToast: {
    // backgroundColor: '#fffbf0',
    backgroundColor: '#fff',
    // borderLeftWidth: 4,
    // borderLeftColor: '#FF9800',
  },
  infoToast: {
    // backgroundColor: '#f0f8ff',
    backgroundColor: '#fff',
    // borderLeftWidth: 4,
    // borderLeftColor: '#2196F3',
  },
});

export default Toast