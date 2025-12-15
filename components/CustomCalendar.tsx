import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CustomCalendarProps {
  onDateSelect: (date: Date) => void;
  initialDate?: Date;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ 
  onDateSelect, 
  initialDate 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(initialDate || new Date());

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Handle date selection
  const handleDatePress = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(newDate);
    onDateSelect(newDate);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const calendarDays = generateCalendarDays();

  return (
    <View className="">
      {/* Month/Year Header with Navigation */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity 
          onPress={goToPreviousMonth}
          className="p-2"
        >
          <Text className="text-3xl font-bold text-primary">←</Text>
        </TouchableOpacity>
        
        <Text className="text-lg font-interBold text-gray-800">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        
        <TouchableOpacity 
          onPress={goToNextMonth}
          className="p-2"
        >
          <Text className="text-3xl font-bold text-primary">→</Text>
        </TouchableOpacity>
      </View>

      {/* Day Names */}
      <View className="flex-row mb-2">
        {dayNames.map((dayName) => (
          <View key={dayName} className="flex-1 items-center">
            <Text className="text-gray font-interBold text-base">
              {dayName}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className="flex-row flex-wrap">
        {calendarDays.map((day, index) => {
          if (day === null) {
            // Empty cell
            return <View key={`empty-${index}`} className="w-[14.28%] aspect-square p-1" />;
          }

          const dateToCheck = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const isSelected = isSameDay(dateToCheck, selectedDate);
          const isToday = isSameDay(dateToCheck, new Date());

          return (
            <TouchableOpacity
              key={`day-${day}`}
              onPress={() => handleDatePress(day)}
              className="w-[14.28%] aspect-square p-1"
            >
              <View
                className={`
                  flex-1 items-center justify-center rounded-lg
                  ${isSelected ? 'bg-primary' : isToday ? 'bg-primary/10' : 'bg-transparent'}
                `}
              >
                <Text
                  className={`
                    font-interBold
                    text-lg
                    ${isSelected ? 'text-white' : isToday ? 'text-primary' : 'text-gray-800'}
                  `}
                >
                  {day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Selected Date Display */}
     
    </View>
  );
};

export default CustomCalendar;