import CircularIcon from "@/assets/icons/CircularIcon";
import CloseIcon from "@/assets/icons/CloseIcon";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SubTaskProps = {
  subTask: any;
  onRemove: (id: string) => void;
};

const SubTask = ({ subTask, onRemove }: SubTaskProps) => {
  return (
    <View className="flex flex-row items-center justify-between p-2 w-full">
      <View className="flex flex-row items-center gap-3 flex-1 mr-2">
        <CircularIcon color={"#9ca3af"} width={30} height={30} />
        <Text accessibilityRole="header" className="text-xl font-interMedium flex-1" numberOfLines={4}>
          {subTask.label}
        </Text>
      </View>
      <TouchableOpacity
        accessibilityLabel={`Delete ${subTask.label}`}
        accessibilityRole="button"
        accessibilityHint={`Delete ${subTask.label}`}
        className="shrink-0 grow-0"
        onPress={() => onRemove(subTask.id)}
      >
        <CloseIcon
          accessible={false}
          color={"#9ca3af"}
          width={25}
          height={25}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SubTask;
