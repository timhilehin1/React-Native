import NotebookIcon from "@/assets/icons/NotebookIcon";
import SparkleIcon from "@/assets/icons/SparkleIcon";
import TagIcon from "@/assets/icons/TagIcon";
import { useRouter } from "expo-router";
import React, { JSX } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const HomeShortcut = () => {
  type AppRoutes = "/tag" | "/reorder";
  type ShortcutItem = {
    title: string;
    url?: AppRoutes;
    icon: (color: string, size: number) => JSX.Element;
    action?: () => void;
  };

  const router = useRouter();
  const openRoutineModal = () => {
    console.log("routine modal here");
  };
  const ShortcutItems: ShortcutItem[] = [
    {
      title: "Plans",
      icon: (color, size) => (
        <NotebookIcon color={color} width={size} height={size} />
      ),
      action: openRoutineModal,
    },
    {
      title: "Tags",
      url: "/tag",
      icon: (color, size) => (
        <TagIcon color={color} width={size} height={size} />
      ),
    },
    {
      title: "Reorder",
      url: "/reorder",
      icon: (color, size) => (
        <SparkleIcon color={color} width={size} height={size} />
      ),
    },
  ];
  const handlePress = (item: ShortcutItem) => {
    if (item.action) return item.action;
    if (item.url) router.push(item.url);
  };

  return (
    <View className="w-full flex-row items-center justify-around p-6">
      {ShortcutItems.map((item) => (
        <TouchableOpacity
          onPress={() => handlePress(item)}
          activeOpacity={0.7}
          key={item.title}
          className="flex items-center justify-center gap-1"
        >
          <View
            className="bg-warm rounded-full items-center justify-center"
            style={{ width: 72, height: 72 }}
          >
            {item.icon("#83c5f1", 40)}
          </View>

          <Text className="text-xl text-dark font-interSemiBold text-center">
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeShortcut;
