"use client";
import React, { useState } from "react";
import { Button, Table, Modal, Stepper, Group, Text, MantineProvider } from "@mantine/core";
import { theme } from "../../theme";

export default function MockUIPage() {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <MantineProvider theme={{ ...theme, primaryColor: "grape" }}>
      <main style={{ padding: 32 }}>
        <h1>Mock UI Showcase</h1>
        <Group mb="md">
          <Button onClick={() => setOpened(true)}>Open Modal</Button>
          <Button color="teal">Teal Button</Button>
        </Group>
        <Table striped mb="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Role</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Alice</Table.Td>
              <Table.Td>Provider</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Bob</Table.Td>
              <Table.Td>Deployer</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Stepper active={active} onStepClick={setActive} mb="md">
          <Stepper.Step label="First" description="Entity setup" />
          <Stepper.Step label="Second" description="Assessment" />
          <Stepper.Step label="Third" description="Results" />
        </Stepper>
        <Group>
          <Button disabled={active === 0} onClick={() => setActive((a) => a - 1)}>
            Back
          </Button>
          <Button disabled={active === 2} onClick={() => setActive((a) => a + 1)}>
            Next
          </Button>
        </Group>
        <Modal opened={opened} onClose={() => setOpened(false)} title="Example Modal">
          <Text>This is a Mantine Modal component.</Text>
        </Modal>
        <Text mt="xl" c="grape">
          This text uses the customized primary color from the theme.
        </Text>
      </main>
    </MantineProvider>
  );
} 