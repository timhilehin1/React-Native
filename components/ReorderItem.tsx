import { TagItemProps } from "@/app/tag";
import RowIcon from "@/assets/icons/RowIcon";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type ReOrderItemProps = TagItemProps & {
  onToggle?: () => void;
  status?:boolean;
  isSelected?:boolean;
};

const ReorderItem = ({ title, id, onToggle, isSelected =false }: ReOrderItemProps) => {
  return (
    <View className="flex flex-row w-full items-center bg-gray/15 rounded-xl p-4">
      <View className="flex-1 flex-row gap-4 items-center">
        <RowIcon className="self-center" color={"#9ca3af"} />
        <Text className='text-black text-lg font-interExtraBold capitalize flex-shrink'>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.5}
        accessibilityLabel={`Task: ${title}${isSelected ? "selected" : ""}`}
        accessibilityHint="Click to show selected task"
        accessibilityRole="button"
        className="ml-4"
        accessibilityState={{ selected: isSelected }}
      >
        <View className={`h-7 w-7 rounded-full border-4 ${isSelected ? 'border-primary' : 'border-slate-300'}   items-center justify-center`}>
          <View className={`h-3 w-3  rounded-full border-none ${isSelected ? 'bg-primary':'bg-transparent'}`}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ReorderItem;
