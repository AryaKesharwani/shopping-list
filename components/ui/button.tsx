import { appleBlue, zincColors } from "@/constants/Colors";
import React from "react";
import {
  ViewStyle,
  TextStyle,
  useColorScheme,
  Pressable,
  ActivityIndicator,
    StyleSheet,
} from "react-native";
import { ThemedText } from "../ThemedText";

type ButtonVariant = "filled" | "outlined" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: {
      height: 36,
      fontSize: 14,
      padding: 12,
    },
    md: {
      height: 44,
      fontSize: 16,
      padding: 16,
    },
    lg: {
      height: 55,
      fontSize: 18,
      padding: 20,
    },
  };

  const getVariantStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    };
    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: isDark ? zincColors[50] : zincColors[900],
        };
      case "outlined":
        return {
          ...baseStyle,
          borderWidth: 1,
          backgroundColor: "transparent",
          borderColor: isDark ? zincColors[700] : zincColors[300],
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? zincColors[500] : zincColors[400];
    }
    switch (variant) {
      case "filled":
        return isDark ? zincColors[900] : zincColors[50];
      case "outlined":
      case "ghost":
        return appleBlue;
    }
  };
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyle(),
        {
          height: sizeStyles[size].height,
          padding: sizeStyles[size].padding,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText
            style={StyleSheet.flatten([{
                fontSize: sizeStyles[size].fontSize,
                color: getTextColor(),
                textAlign: "center",
                marginBottom: 0,
                fontWeight: "700",
            },
            textStyle,
        ])}
        >{children}</ThemedText>
      )}
    </Pressable>
  );
};

export default Button;