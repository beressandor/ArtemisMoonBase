import { Tabs } from "expo-router";
import { Orbit, Radio, Rocket, Search } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RoverIcon } from "@/components/icons/RoverIcon";
import { useTranslation } from "@/lib/i18n";
import { colors, typography } from "@/lib/theme";

export default function TabsLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 10);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: {
          ...typography.small,
          fontSize: 11
        },
        tabBarStyle: {
          backgroundColor: "#05080E",
          borderTopColor: colors.border,
          height: 58 + bottomPadding,
          minHeight: 58 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 7,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.34,
          shadowRadius: 18
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.dashboard"),
          tabBarIcon: ({ color, size }) => <Rocket color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          title: t("tabs.roadmap"),
          tabBarIcon: ({ color, size }) => <Orbit color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="equipment"
        options={{
          title: t("tabs.equipment"),
          tabBarIcon: ({ color, size }) => <RoverIcon color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: t("tabs.live"),
          tabBarIcon: ({ color, size }) => <Radio color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
          title: t("tabs.search"),
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
