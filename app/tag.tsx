import ArrowBackIcon from "@/assets/icons/ArrowBackIcon";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon";
import Container from "@/components/Container";
import Tag from "@/components/Tag";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type TagItemProps = {
  id: any;
  title: string;
};

const tag = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [tags, setTags] = useState<TagItemProps[]>([
    { id: 1, title: "House" },
    { id: 2, title: "Education" },
    { id: 3, title: "Work" },
    { id: 4, title: "Bible" },
    { id: 5, title: "self development" },
    { id: 6, title: "Health" },
    { id: 7, title: "Hobby" },
    { id: 8, title: "Relax" },
    { id: 9, title: "Kids" },
  ]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<TagItemProps>) => {
    const handleDrag = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      drag();
    };

    return (
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Tag: ${item.title}`}
        accessibilityHint="Long press and drag up or down to reorder"
        onLongPress={handleDrag}
        disabled={isActive}
        activeOpacity={0.8}
        className={`mb-6 ${isActive ? "opacity-50" : ""}`}
      >
        <Tag id={item.id} title={item.title} />
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-appBackground"
      >
        <Container>
          <TouchableOpacity
            accessibilityLabel="Go back"
            accessibilityRole="button"
            accessibilityHint="Go back to home page"
            accessible
            className="mb-6 mt-4"
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <ArrowBackIcon height={35} width={35} color={"#000"} />
          </TouchableOpacity>
          <Text accessibilityRole="header" className="text-black text-4xl font-interBlack mb-4">
            Tags
          </Text>
          <Text  className="text-dark text-2xl font-interBlack mb-10">
            Rearrange and create
          </Text>

          <DraggableFlatList
          accessibilityRole="list"
          accessibilityLabel="Reorderable tag list"
            accessibilityHint="Drag and drop items to change their order"
            data={tags}
            onDragEnd={({ data }) => {
              setTags(data);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: 200,
            }}
            showsVerticalScrollIndicator={false}
          />
        </Container>

        {/* Footer */}
        <View
          style={{
            paddingBottom: insets.bottom + 20,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          }}
          className="bg-appBackground px-6 py-4 gap-4"
        >
          <View className="relative w-full">
            <TextInput
            accessibilityLabel="New tag name"
            accessibilityHint="Type the name and press add"
              className="text-xl rounded-full bg-[#DBDBDB] p-4 pr-14 placeholder-gray-400 font-interMedium w-full"
              enablesReturnKeyAutomatically
              placeholder="Add new tag"
            />
            <TouchableOpacity
              accessibilityLabel="Add tag"
              accessibilityRole="button"
              accessibilityHint="Add a new tag to the list"
              onPress={() => {
                console.log("Arrow clicked!");
              }}
              activeOpacity={0.7}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: [{ translateY: -20 }],
              }}
              className="bg-primary rounded-full h-10 w-10 items-center justify-center"
            >
              <ChevronUpIcon
                accessible={false}
                width={20}
                height={20}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            accessibilityHint="Returns to previous screen"
            accessibilityLabel="Save changes and close modal"
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={() => router.back()}
            className="bg-primary rounded-full p-4 items-center justify-center"
          >
            <Text className="text-xl font-interBold text-white">
              Save and close
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default tag;
