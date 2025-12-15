import ArrowBackIcon from "@/assets/icons/ArrowBackIcon";
import CheckIcon from "@/assets/icons/CheckIcon";
import DeleteIcon from "@/assets/icons/DeleleIcon";
import Container from "@/components/Container";
import ReorderItem from "@/components/ReorderItem";
import DeleteModal from "@/components/ui/DeleteModal";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ReOrderItemProps = {
  id: any;
  title: string;
};
const reorder = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tasks, setTasks] = useState<any>([
    { id: "task-1", title: "Buy groceries", status: false },
    {
      id: "task-2",
      title:
        "Prepare weekly budgethhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      status: true,
    },
    { id: "task-3", title: "Read 10 pages of a book", status: false },
    { id: "task-4", title: "Clean the living room", status: false },
    { id: "task-5", title: "Reply to important emails", status: true },
    { id: "task-6", title: "Meditate for 5 minutes", status: false },
    { id: "task-7", title: "Backup phone photos", status: true },
    { id: "task-8", title: "Plan meals for the week", status: false },
    { id: "task-9", title: "Review saved bookmarks", status: false },
    { id: "task-10", title: "Organize workspace", status: true },
  ]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [selectedTasksIds, setSelectedTasksIds] = useState<ReOrderItemProps[]>([]);
  const toggleTask = (id: any) => {
    setSelectedTasksIds((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const handleDeleteTask = () => {
    setOpenDeleteModal(true)
  };

  const confirmDelete = ()=>{
      const updatedTasks = tasks.filter((task: { id: ReOrderItemProps }) =>
      !selectedTasksIds.includes(task.id)
    );
      setTasks(updatedTasks);
      console.log(updatedTasks)
      setSelectedTasksIds([]);
  }
  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<ReOrderItemProps>) => {
    const handleDrag = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      drag();
    };
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Task: ${item.title}`}
        accessibilityHint="Long press and drag up or down to reorder"
        onLongPress={handleDrag}
        disabled={isActive}
        activeOpacity={0.8}
        className={`mb-6 ${isActive ? "opacity-50" : ""}`}
      >
        <ReorderItem
          onToggle={() => toggleTask(item.id)}
          id={item.id}
          title={item.title}
          isSelected={selectedTasksIds.includes(item.id)}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-appBackground"
      >
        <Container>
          <View className="flex flex-row items-center mb-6 h-16 justify-between">
            <View className=" flex flex-row gap-1">
              <TouchableOpacity
                accessibilityLabel="Go back"
                accessibilityRole="button"
                accessibilityHint="Go back to home page"
                accessible
                className=""
                activeOpacity={0.7}
                onPress={() => router.back()}
              >
                <ArrowBackIcon height={35} width={35} color={"#000"} />
              </TouchableOpacity>
              <Text
                accessibilityRole="header"
                className="text-black text-4xl font-interBlack"
              >
                Reorder
              </Text>
            </View>

            {selectedTasksIds && selectedTasksIds.length > 0 && (
              <TouchableOpacity
                accessibilityLabel="Delete"
                accessibilityRole="button"
                accessibilityHint="Delete tasks"
                accessible
                className="bg-[#F9E69A] rounded-full h-12 w-12 flex items-center justify-center mb-4"
                activeOpacity={0.7}
                onPress={() => {
                  handleDeleteTask();
                }}
              >
                <DeleteIcon
                  accessible={false}
                  width={30}
                  height={30}
                  color={"#866E0C"}
                />
              </TouchableOpacity>
            )}
          </View>

          <DraggableFlatList
            accessibilityRole="list"
            accessibilityLabel="Reorderable task list"
            accessibilityHint="Drag and drop items to change their order"
            data={tasks}
            onDragEnd={({ data }) => {
              setTasks(data);
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
          <TouchableOpacity
            accessibilityHint="Returns to previous screen"
            accessibilityLabel="Save task order and close modal"
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={() => router.back()}
            className="bg-primary rounded-full p-4 items-center  flex flex-row"
          >
            <CheckIcon width={30} height={30} />
            <Text className="text-xl font-interBold text-white flex-1 text-center">
              Apply Order
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default reorder;
