import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Search as SearchIcon } from "lucide-react-native";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState } from "@/components/EmptyState";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { searchAll } from "@/lib/dataClient";
import { colors, radius, spacing, typography } from "@/lib/theme";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { data } = useQuery({ queryKey: ["search", query], queryFn: () => searchAll(query) });
  const total = (data?.missions.length ?? 0) + (data?.equipment.length ?? 0) + (data?.events.length ?? 0);

  return (
    <Screen>
      <AppHeader title="Search" />
      <View style={styles.searchBox}>
        <SearchIcon color={colors.textDim} size={18} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search missions, equipment, sources"
          placeholderTextColor={colors.textDim}
          style={styles.input}
        />
      </View>

      {total === 0 ? <EmptyState title="No results" message="Try Artemis, rover, Gateway, SLS, or lander." /> : null}

      {data?.missions.map((mission) => (
        <Pressable key={mission.id} onPress={() => router.push({ pathname: "/mission/[id]", params: { id: mission.id } })}>
          <Panel>
            <Text style={styles.kicker}>Mission</Text>
            <Text style={styles.title}>{mission.title}</Text>
            <Text numberOfLines={2} style={styles.summary}>
              {mission.summary}
            </Text>
          </Panel>
        </Pressable>
      ))}

      {data?.equipment.map((item) => (
        <Pressable key={item.id} onPress={() => router.push({ pathname: "/equipment/[id]", params: { id: item.id } })}>
          <Panel>
            <Text style={styles.kicker}>Equipment</Text>
            <Text style={styles.title}>{item.name}</Text>
            <Text numberOfLines={2} style={styles.summary}>
              {item.summary}
            </Text>
          </Panel>
        </Pressable>
      ))}

      {data?.events.map((event) => (
        <Panel key={event.id}>
          <Text style={styles.kicker}>Event · {event.dateLabel}</Text>
          <Text style={styles.title}>{event.title}</Text>
          <Text numberOfLines={2} style={styles.summary}>
            {event.summary}
          </Text>
        </Panel>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    alignItems: "center",
    backgroundColor: colors.panel,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 46,
    paddingHorizontal: spacing.md
  },
  input: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    minHeight: 44
  },
  kicker: {
    ...typography.small,
    color: colors.blue
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  }
});
