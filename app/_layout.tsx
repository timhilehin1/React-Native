import ToastContainer from "@/components/ui/Toast/ToastContainer";
import { ToastProvider } from "@/components/ui/Toast/ToastProvider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
cssInterop(Image, {
  className: {
    target: "style",
  },
});
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    inter_100Thin: Inter_100Thin,
    inter_200ExtraLight: Inter_200ExtraLight,
    inter_300Light: Inter_300Light,
    inter_400Regular: Inter_400Regular,
    inter_500Medium: Inter_500Medium,
    inter_600SemiBold: Inter_600SemiBold,
    inter_700Bold: Inter_700Bold,
    inter_800ExtraBold: Inter_800ExtraBold,
    inter_900Black: Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
    <ToastProvider>
      <ToastContainer position="top" />
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="task-modal"
                options={{
                  presentation: "fullScreenModal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="tag"
                options={{ animation: "fade", presentation: "fullScreenModal" }}
              />
              <Stack.Screen
                name="reorder"
                options={{ presentation: "fullScreenModal", animation: "fade" }}
              />
            </Stack>
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </ToastProvider>
    </GestureHandlerRootView>
  );
}
