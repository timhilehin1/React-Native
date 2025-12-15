import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

export type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      transparent
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 bg-black/50 justify-end" 
        onPress={onClose}
      >
        <Pressable 
          className="bg-white rounded-t-3xl p-6 items-center min-h-[250px]" 
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="text-xl font-bold mb-3 text-black">
            Delete Tasks?
          </Text>

          <Text className="text-base text-gray-600 text-center mb-6">
            Are you sure you want to delete the selected tasks? This action cannot be undone.
          </Text>

          <View className="flex-row w-full gap-3">
            <TouchableOpacity 
              className="flex-1 bg-slate-300 p-4 rounded-xl items-center"
              onPress={onClose}
            >
              <Text className="text-black font-semibold text-base ">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-1 bg-red-600 p-4 rounded-xl items-center"
              onPress={handleConfirm}
            >
              <Text className="text-white font-semibold text-base">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default DeleteModal;
