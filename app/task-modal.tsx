// app/home/task-modal.tsx
import ArrowBackIcon from "@/assets/icons/ArrowBackIcon";
import CheckIcon from "@/assets/icons/CheckIcon";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon";
import DeleteIcon from "@/assets/icons/DeleleIcon";
import NoteIcon from "@/assets/icons/NoteIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import SomedayIcon from "@/assets/icons/SomeDayIcon";
import SubTaskIcon from "@/assets/icons/SubTaskIcon";
import TagIcon from "@/assets/icons/TagIcon";
import TodayIcon from "@/assets/icons/TodayIcon";
import TomorrowIcon from "@/assets/icons/TomorrowIcon";
import CustomCalendar from "@/components/CustomCalendar";
import SubTask from "@/components/SubTask";
import TagItem from "@/components/TagItem";
import FloatingButton from "@/components/ui/FloatingButton";
import { useToast } from "@/components/ui/Toast/ToastProvider";
import useKeyboardHeight from "@/hooks/useKeyboardHeight";
import { generateId } from "@/utils/helper";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// import { Calendar } from 'react-native-calendars';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TaskModal() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const toast = useToast();
  const keyboardHeight = useKeyboardHeight();
  const [formData, setFormData] = useState<any>({ title: "" });
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = Platform.select({ ios: 50, android: 56, default: 56 });
  const bottomOffset = TAB_BAR_HEIGHT + 16 + insets.bottom;
  const scrollViewRef = useRef<ScrollView>(null);
  const dynamicOffset = keyboardHeight > 0 ? keyboardHeight + 20 : bottomOffset;

  useEffect(() => {
    // Only announce if user has typed something (FAB is visible)
    // And keyboard just opened (height > 0)
    if (showSubmitButton && keyboardHeight > 0) {
      AccessibilityInfo.announceForAccessibility(
        "Add task button moved above the keyboard"
      );
    }
  }, [keyboardHeight, showSubmitButton]);

  useEffect(() => {
    if (formData.title) {
      setShowSubmitButton(true);
    } else {
      setShowSubmitButton(false);
    }
  }, [formData.title]);

  const handleNoteFocus = () => {
    // Simply scroll to end when note is focused
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Modal state
  const [isSubtasksOpen, setIsSubtasksOpen] = useState(false);
  const [subTasks, setSubTasks] = useState<{ [key: string]: string }[]>([]);
  const [scheduleType, setScheduleType] = useState<string>("");

  const schedules = [
    { key: "today", label: "Today", icon: TodayIcon },
    { key: "tomorrow", label: "Tomorrow", icon: TomorrowIcon },
    { key: "custom", label: "Select date", icon: SomedayIcon },
  ];

  const Tags = [
    "House",
    "Relationship",
    "Kids",
    "Relax",
    "Self-care",
    "Health",
    "Work",
    "Hobby",
    "Study",
  ];

  const handleTaskSubmission = () => {
    console.log(formData.title);
    toast.success("Task Added!", { subtitle: "Jaiye lo!" });
  };

  const toggleSubTask = () => setIsSubtasksOpen((prev) => !prev);

  const addSubTask = (subTask: { [key: string]: string }) =>
    setSubTasks((prevSubTask: any) => [...prevSubTask, subTask]);

  const removeSubTask = (taskId: string) =>
    setSubTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

  const navigateToTags = () => {
    router.push("/tag");
  };

  // Handle date selection

  const handleDateSelect = (date: Date) => {
    console.log("Selected date:", date);

    setSelectedDate(date);

    // You can also format the date for your server

    const formattedDate = date.toISOString();
    // "2024-03-15T00:00:00.000Z"

    console.log("Formatted for server:", formattedDate);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-primary"
    >
      {showSubmitButton && (
        <FloatingButton
          icon={<ChevronUpIcon accessible={false} height={40} width={40} />}
          onPress={() => handleTaskSubmission()}
          bottomOffset={dynamicOffset}
          hint="Add and save task"
          label="Add task"
        />
      )}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
        bounces
        className="!space-y-2"
        keyboardShouldPersistTaps="handled"
      >
        {/* Task input card */}
        <View className="min-h-[200px] w-full rounded-[1.875rem] p-6 bg-white mb-2">
          <TouchableOpacity
            accessibilityHint="Go back to previous screen"
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="bg-[#DBDBDB] rounded-full h-10 w-10 flex items-center justify-center mb-4"
          >
            <ArrowBackIcon accessible={false} width={25} height={25} />
          </TouchableOpacity>

          <TextInput
            accessibilityLabel="Add task"
            accessibilityHint="Type the task name"
            placeholder="Brain dump your tasks..."
            multiline
            enablesReturnKeyAutomatically
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            className="text-5xl placeholder-gray-400 font-interExtraBold min-h-[150px]"
          />
        </View>

        {/* Subtasks card */}
        <View className="w-full rounded-[1.875rem] p-4 bg-offWhite mb-2">
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Subtasks"
            accessibilityHint="Open to add or manage subtasks"
            activeOpacity={0.7}
            onPress={toggleSubTask}
          >
            <View className="flex flex-row items-center justify-between p-2">
              <View className="flex flex-row gap-2 items-center">
                <SubTaskIcon
                  width={35}
                  height={35}
                  color={"#83c5f1"}
                  fontWeight={900}
                  accessible={false}
                />
                <Text
                  accessibilityRole="header"
                  className="text-xl text-primary font-interExtraBold"
                >
                  {subTasks.length > 0 ? subTasks.length : "Add"} subtask
                  {subTasks.length > 1 && "s"}
                </Text>
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Clear subtask"
                accessibilityHint="Removes all subtasks for this task"
                onPress={() => setSubTasks([])}
              >
                <DeleteIcon
                  accessible={false}
                  width={30}
                  height={30}
                  color={"#83c5f1"}
                />
              </TouchableOpacity>
            </View>

            {isSubtasksOpen && (
              <View className="border-t border-t-slate-300 mt-3 mx-3 py-8">
                {subTasks.length > 0 && (
                  <View className="pb-8 border-b border-b-slate-300">
                    {subTasks.map((item) => (
                      <SubTask
                        key={item.id}
                        subTask={item}
                        onRemove={removeSubTask}
                      />
                    ))}
                  </View>
                )}

                <View
                  className={`flex flex-row items-center gap-2 ${
                    subTasks.length > 0 ? "mt-8" : "mt-4"
                  }`}
                >
                  <TextInput
                    className="text-xl rounded-full bg-[#DBDBDB] p-4 placeholder-gray-400 font-interMedium flex-1"
                    enablesReturnKeyAutomatically
                    placeholder="Type subtask"
                    accessibilityLabel="New sub task"
                    accessibilityHint="Type the description of the task and press the add sub task button"
                  />
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Add sub task"
                    accessibilityHint="Adds a new sub task to support the task created"
                    onPress={() =>
                      addSubTask({
                        id: generateId(),
                        label: "Create List",
                      })
                    }
                    activeOpacity={0.7}
                    className="bg-primary rounded-full h-12 w-12 flex items-center justify-center"
                  >
                    <ChevronUpIcon
                      accessible={false}
                      width={20}
                      height={20}
                      color={"#fff"}
                      className="font-interExtraBold"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Schedule card */}
        <View className="w-full rounded-[1.875rem] p-8 bg-offWhite mb-2">
          {schedules.map(({ key, label, icon: Icon }) => {
            const isActive = scheduleType === key;

            return (
              <View key={key}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={label}
                  accessibilityHint="Schedules when the task should be completed"
                  key={key}
                  activeOpacity={0.8}
                  onPress={() => setScheduleType(key)}
                  className="mb-6 flex flex-row items-center gap-2"
                >
                  <Icon
                    color={isActive ? "#83c5f1" : "#9ca3af"}
                    width={28}
                    height={28}
                    accessible={false}
                  />
                  <Text
                    className={`font-interBlack text-2xl flex-1 ${
                      isActive ? "text-primary" : "text-black"
                    }`}
                  >
                    {isActive && key === "custom"
                      ? selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : label}
                  </Text>
                  {isActive && scheduleType !== "custom" && (
                    <CheckIcon
                      accessible={false}
                      width={30}
                      height={30}
                      color={"#83c5f1"}
                    />
                  )}
                </TouchableOpacity>

                {isActive && key === "custom" && (
                  <View className="border-t-2 border-slate-300 w-full mb-4 p-6">
                    <CustomCalendar
                      onDateSelect={handleDateSelect}
                      initialDate={new Date()}

                      // optional: set initial date
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Tags */}
        <View className="w-full rounded-[1.875rem] p-8 bg-offWhite  min-h-[300px] mb-2">
          <View className="flex flex-row gap-1 header mb-6 items-center text-primary">
            <TagIcon color={"#83c5f1"} className="font-interExtraBold" />
            <Text
              accessibilityRole="header"
              className="text-2xl text-primary font-interBlack"
            >
              Tags
            </Text>
          </View>
          <View className="flex flex-row flex-wrap gap-4">
            {Tags.map((title) => (
              <TagItem key={title} title={title} id={title}></TagItem>
            ))}
          </View>

          <TouchableOpacity
            accessibilityHint="Opens the page to add or remove tags"
            accessibilityLabel="Manage tags"
            accessibilityRole="button"
            activeOpacity={0.8}
            className="border-t-2 border-slate-300 w-full flex-row mt-8 pt-4 items-center gap-2"
            onPress={navigateToTags}
          >
            <SettingsIcon
              accessible={false}
              color={"#83c5f1"}
              className="font-interExtraBold"
            />
            <Text className="text-primary font-interExtraBold text-2xl">
              Manage
            </Text>
          </TouchableOpacity>
        </View>

        {/* //private note */}
        <View className="w-full rounded-[1.875rem] p-8 bg-offWhite mb-2 min-h-[210px]">
          <View className="header flex flex-row gap-2 items-center mb-3">
            <NoteIcon color={"#83c5f1"} />
            <Text
              accessibilityRole="header"
              className="font-interBold text-2xl text-primary"
            >
              Private note
            </Text>
          </View>
          <TextInput
            accessibilityLabel="Note"
            accessibilityHint="Add a private note for this task"
            placeholder="Leave yourself a note or comment about the task"
            multiline
            enablesReturnKeyAutomatically
            onFocus={handleNoteFocus}
            className="text-xl placeholder-gray-400 font-interExtraBold h-full flex-1 "
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
