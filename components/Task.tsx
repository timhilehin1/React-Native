
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AdvancedCheckbox } from "react-native-advanced-checkbox";

export type TaskProps = {
  label: string;
  id: string;
  status: boolean;
  onToggle: (id: string) => void;
  onPress: () => void;
};

const Task = ({  id, label, status, onToggle, onPress  }: TaskProps) => {
  return (
        <View className="flex flex-row gap-3 min-h-20 p-3 bg-warm rounded-2xl font-interMedium items-center">
      <View onStartShouldSetResponder={() => true}>
        <AdvancedCheckbox
          value={status}
          onValueChange={() => onToggle(id)}
          checkedColor="#83c5f1"
          uncheckedColor="#6c757d"
          size={25}
          animationType="bounce"
          checkBoxStyle={{ borderRadius: 8 }}
          testID="custom-checkbox"
          accessibilityLabel="Toggle custom option"
          accessibilityHint="Toggles the custom checkbox on or off"
        />
      </View>
      

      <TouchableOpacity 
        onPress={onPress}
        className="flex-1"
        activeOpacity={0.7}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#333",
            fontFamily: "inter_800ExtraBold",
            textDecorationLine: status ? "line-through" : "none",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
   
  );
};

export default Task;
