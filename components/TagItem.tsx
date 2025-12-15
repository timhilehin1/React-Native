import React from "react";
import { Text, TouchableOpacity } from "react-native";

export type TagProps = {
  title: string;
  id: any;
  onToggle?: (id: string) => void;
  tagType?: "display" | "filter";
  isSelected?: boolean;
};

const TagItem = ({
  id,
  title,
  onToggle,
  tagType = "display",
  isSelected = false,
}: TagProps) => {
  const isFilter = tagType === "filter";
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityHint={isFilter ? "Filter tag" : "Tag"}
      accessibilityLabel={`Tag: ${title}${isSelected ? ", selected" : ""}`}
      accessibilityState={{ selected: isSelected }}
      activeOpacity={0.6}
      onPress={() => isFilter && onToggle?.(id)}
      disabled={!isFilter}
      className={`p-2.5 border-2 rounded-lg ${
        isSelected ? "bg-primary border-primary" : "border-slate-300"
      }`}
    >
      <Text
        className={`text-lg font-interExtraBold capitalize ${
          isSelected ? "text-white" : "text-gray"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TagItem;
