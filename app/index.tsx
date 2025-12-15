import Container from "@/components/Container";
import CustomButton from "@/components/ui/CustomButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text } from "react-native";
export default function Welcome() {
  return (
    <Container>
      <Image
        source={require("../assets/images/landing.jpg")}
        className="w-full h-[60%] rounded-3xl  mx-auto"
        contentFit="cover"
        accessibilityRole="image"
        importantForAccessibility="no"
        accessible={false}
      />
      {/* //define how texts work in react and the easiest way for my own scenario */}
      <Text accessibilityRole="header" className="text-center font-interBold text-4xl px-4 mb-2">
        {" "}
        Task Management & To-Do List
      </Text>
      <Text accessible className="text-center font-interRegular text-lg px-3 text-gray-600 mb-8">
        This Productivity tool is designed to help simplify manage your daily
        tasks
      </Text>

      <CustomButton
        title="Let's start"
        size="lg"
        variant="primary"
        onPress={() => router.push("/home")}
      />
    </Container>
  );
}
