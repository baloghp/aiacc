import React from "react";
import { Button, Group, Stack, Title, Text } from "@mantine/core";
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <Title order={1} mb="md">AI Act Compliance POC</Title>
      <Text mb="lg">Welcome! Choose a section to get started:</Text>
      <Stack gap="md">
        <Group>
          <Button component={Link} href="/setup" size="md" variant="filled">
            Entity Setup Page
          </Button>
          <Button component={Link} href="/assessment" size="md" variant="filled" color="teal">
            Assessment Wizard
          </Button>
          <Button component={Link} href="/mock-ui" size="md" variant="outline" color="grape">
            Mock UI Showcase
          </Button>
        </Group>
      </Stack>
    </main>
  );
}
