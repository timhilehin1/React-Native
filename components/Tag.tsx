import DeleteIcon from "@/assets/icons/DeleleIcon";
import RowIcon from "@/assets/icons/RowIcon";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import TagItem, { TagProps } from "./TagItem";

const Tag = ({ title }: TagProps) => {
  return (
    <View className="flex flex-row w-full items-center mb-2">
      <View className="flex-1 flex-row gap-4 items-center">
        <RowIcon  color={'#9ca3af'} />
        <TagItem id={title} title={title} />
      </View>
      <TouchableOpacity>
        <DeleteIcon width={35} height={35} color={"#83c5f1"} />
      </TouchableOpacity>
    </View>
  );
};

export default Tag;
