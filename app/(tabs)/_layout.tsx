import { Tabs } from "expo-router";
import { LayoutDashboard, Radio, Route, Search, Wrench } from "lucide-react-native";
import { colors, typography } from "@/lib/theme";

export default function TabsLayout() {
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
          backgroundColor: colors.backgroundSoft,
          borderTopColor: colors.borderSoft,
          minHeight: 66,
          paddingTop: 6
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          title: "Roadmap",
          tabBarIcon: ({ color, size }) => <Route color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="equipment"
        options={{
          title: "Equipment",
          tabBarIcon: ({ color, size }) => <Wrench color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: "Live",
          tabBarIcon: ({ color, size }) => <Radio color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
