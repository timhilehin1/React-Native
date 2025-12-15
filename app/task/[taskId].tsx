import ArrowBackIcon from "@/assets/icons/ArrowBackIcon";
import CheckIcon from "@/assets/icons/CheckIcon";
import DeleteIcon from "@/assets/icons/DeleleIcon";
import EditIcon from "@/assets/icons/EditIcon";
import SubTaskItem from "@/components/SubTaskItem";
import DeleteModal from "@/components/ui/DeleteModal";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const taskId = () => {
  const { taskId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [subTasks, setSubTasks] = useState([
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
  const handleDeleteTask = () => {
    setOpenDeleteModal(true);
  };

  const toggleSubTaskStatus = (id: any)=>{
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSubTasks((prev) =>
      prev
        .map((subTask) =>
          subTask.id === id ? { ...subTask, status: !subTask.status } : subTask
        )
    );
  }

  const navigateToEditTask = ()=>{
    router.push('/task-modal')
  }

    const confirmDelete = ()=>{}

  return (
    <View
      style={{
        paddingTop: insets.top + 25,
        paddingBottom: insets.bottom + 25,
      }}
      className="flex-1 bg-primary py-8"
    >
           <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
      />
      <View className="bg-offWhite rounded-[4rem] h-full w-full flex-1 relative overflow-hidden">
        <ScrollView 
          className="flex-1 p-8"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="header flex items-center justify-between flex-row mb-8">
            <TouchableOpacity
              accessibilityHint="Go back to previous screen"
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="bg-[#DBDBDB] rounded-full h-[45px] w-[45px] flex items-center justify-center"
            >
              <ArrowBackIcon accessible={false} width={35} height={35} />
            </TouchableOpacity>
            <View className="flex flex-row items-center gap-4 header">
              <TouchableOpacity
                accessibilityHint="Edit task"
                accessibilityRole="button"
                accessibilityLabel="Edit"
                onPress={navigateToEditTask}
                activeOpacity={0.7}
                className="bg-[#DBDBDB] rounded-full h-[45px] w-[45px] flex items-center justify-center mb-4"
              >
                <EditIcon accessible={false} width={30} height={30} />
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityLabel="Delete"
                accessibilityRole="button"
                accessibilityHint="Delete task"
                onPress={() => {
                  handleDeleteTask();
                }}
                activeOpacity={0.7}
                className="bg-[#DBDBDB] rounded-full h-[45px] w-[45px] flex items-center justify-center mb-4"
              >
                <DeleteIcon accessible={false} width={30} height={30} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-center font-interBold text-[50px] text-dark mb-4">
              Create view one task screeennnn
            </Text>
            <Text className="text-base font-interSemiBold text-center text-dark mb-4">
              Ownership Mindset is key
            </Text>

            {/* Add dummy content to test scrolling */}
           <View className="">
            <FlatList
              data={subTasks}
              renderItem={({ item }) => (
                <SubTaskItem
                  id={item.id}
                  label={item.label}
                  status={item.status}
                  onToggle={toggleSubTaskStatus}

                />
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-2" />}
              scrollEnabled={false}
            />
          </View>
          </View>
        </ScrollView>

        {/* Simple fade overlay using shadow/blur effect */}
        <View
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: 100,
            height: 50,
            backgroundColor: '#FAFAFA',
            opacity: 0.95,
            shadowColor: '#FAFAFA',
            shadowOffset: { width: 0, height: -20 },
            shadowOpacity: 1,
            shadowRadius: 20,
            elevation: 10,
          }}
        />

        {/* Fixed footer */}
        <View
          style={{
            paddingBottom: insets.bottom + 20,
          }}
          className="absolute bottom-0 left-0 right-0 bg-offWhite px-8 py-4"
        >
          <TouchableOpacity
            accessibilityHint="Mark task as completed"
            accessibilityLabel="Save changes and close modal"
            accessibilityRole="button"
            activeOpacity={0.7}
            className="bg-primary rounded-full p-4 items-center flex flex-row"
          >
            <CheckIcon width={30} height={30} />
            <Text className="text-xl font-interBold text-white flex-1 text-center">
              Complete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default taskId;