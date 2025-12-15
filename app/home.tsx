import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import HomeShortcut from "@/components/HomeShortcut";
import TagItem from "@/components/TagItem";
import Task from "@/components/Task";
import FloatingButton from "@/components/ui/FloatingButton";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TagItemProps } from "./tag";
export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: "task-1", label: "Buy groceries", status: false },
    { id: "task-2", label: "Prepare weekly budget", status: true },
    { id: "task-3", label: "Read 10 pages of a book", status: false },
    { id: "task-4", label: "Clean the living room", status: false },
    { id: "task-5", label: "Reply to important emails", status: true },
    { id: "task-6", label: "Meditate for 5 minutes", status: false },
    { id: "task-7", label: "Backup phone photos", status: true },
    { id: "task-8", label: "Plan meals for the week", status: false },
    { id: "task-9", label: "Review saved bookmarks", status: false },
    { id: "task-10", label: "Organize workspace", status: true },
  ]);
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

  const [isShortcutOpen, setIsShortcutOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = Platform.select({ ios: 50, android: 56, default: 56 });
  const bottomOffset = TAB_BAR_HEIGHT + 16 + insets.bottom;
  const isOpenRef = useRef(false);

  const toggleTag = (id: any) => {
     
  setSelectedTags(prev => 
    prev.includes(id) 
      ? prev.filter(tagId => tagId !== id) 
      : [...prev, id]
  );
     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

  useEffect(() => {
    // Add a small delay so the modal renders first
    // const timer = setTimeout(() => {
    //   promptDNDSettings();
    // }, 500); // 500ms delay for better UX
    // return () => clearTimeout(timer);
  }, []);

  const promptDNDSettings = () => {
    Alert.alert(
      "🎯 Stay Focused",
      "Enable Do Not Disturb for a distraction-free planning session?",
      [
        { text: "Not Now", style: "cancel" },
        {
          text: "Open Settings",
          onPress: async () => {
            if (Platform.OS === "ios") {
              await Linking.openURL("App-prefs:DO_NOT_DISTURB");
            } else {
              await Linking.sendIntent(
                "android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS"
              );
            }
          },
        },
      ]
    );
  };

  const toggleShortcut = () => {
    const isOpen = isOpenRef.current;

    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : 120,
      duration: 260,
      useNativeDriver: false,
    }).start();

    isOpenRef.current = !isOpen;
    setIsShortcutOpen(!isOpen);
  };
  const toggleTaskStatus = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTasks((prev) =>
      prev
        .map((task) =>
          task.id === id ? { ...task, status: !task.status } : task
        )
        .sort((a, b) => Number(a.status) - Number(b.status))
    );
  };
  const sortedTasks = [...tasks].sort(
    (a, b) => Number(a.status) - Number(b.status)
  );
    const viewOneTask = (taskId:string)=>{
    if(!taskId) return;
    router.push({
      pathname:'/task/[taskId]',
      params:{taskId}
    })
  }

  return (
    <View className="flex-1 relative">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 300,
        }}
        className="flex-1"
      >
        <View className="bg-primary h-[22%] w-full  justify-end">
          <View className="flex flex-row justify-between items-center p-4 container">
            {/* //idk what to place here hence reason for the circle */}
            <TouchableNativeFeedback
              accessibilityRole="button"
              accessibilityLabel="Streak"
              accessibilityHint="Streak counter"
            >
              <View className="rounded-full border-white p-6 border-2 grow-0"></View>
            </TouchableNativeFeedback>
            <TouchableOpacity
              onPress={toggleShortcut}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Open routines menu"
              accessibilityHint="Shows dropdown of routine  options"
              className="flex flex-row gap-0 items-center grow-0"
            >
              <Text
                accessibilityRole="header"
                className="text-white text-center text-[40px] font-interExtraBold"
              >
                Today
              </Text>
              <ArrowDownIcon
                width={40}
                height={40}
                color={"#ffffff"}
                className="font-interExtraBold"
                fontWeight={900}
                accessible={false}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Profile"
              accessibilityHint="Go to User Profile"
            >
              <Image
                className="w-16 h-16 rounded-full"
                source={require("../assets/images/avatar.jpg")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={{
            height: slideAnim,
            overflow: "hidden",
          }}
        >
          <HomeShortcut />
        </Animated.View>
        {!isShortcutOpen && (
          <View className="p-6">
            <FlatList
              data={tags}
              horizontal
              renderItem={({ item }) => (
                  <TagItem title={item.title} id={item.id} tagType="filter"
                     isSelected={selectedTags.includes(item.id)}
                      onToggle={toggleTag}
                    />
              )}
              keyExtractor={(item) => item.title}
              ItemSeparatorComponent={() => <View className="w-7" />}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        <View className="p-6">
          {/* //tag filter */}
          {/* //hide filter if home shortcuts are opened */}
          <View className="flex gap-4">
            <FlatList
              data={sortedTasks}
              renderItem={({ item }) => (
                <Task
                  onPress = {()=>viewOneTask(item.id)}
                  id={item.id}
                  label={item.label}
                  status={item.status}
                  onToggle={toggleTaskStatus}

                />
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-4" />}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
      <FloatingButton
        icon={<PlusIcon height={40} width={40} accessible={false} />}
        onPress={() => router.push("/task-modal")}
        bottomOffset={bottomOffset}
        hint="Opens the View to add task"
        label="Add task"
      />
    </View>
  );
}
