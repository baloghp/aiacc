'use client';

import { useEffect, useState } from 'react';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, Group, Tooltip, useMantineColorScheme, useMantineTheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!mounted) {
    return null;
  }

  const getIconColor = (scheme: string) => {
    if (colorScheme === scheme) {
      return 'white';
    }
    return colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7];
  };

  const getBackgroundColor = (scheme: string) => {
    if (colorScheme === scheme) {
      return theme.colors.blue[6];
    }
    return colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1];
  };

  return (
    <Group gap={4}>
      <Tooltip label="Light theme">
        <ActionIcon
          size="md"
          variant={colorScheme === 'light' ? 'filled' : 'subtle'}
          color={colorScheme === 'light' ? 'blue' : 'gray'}
          onClick={() => setColorScheme('light')}
          style={{
            backgroundColor: getBackgroundColor('light'),
            color: getIconColor('light'),
            border: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
          }}
        >
          <IconSun size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Dark theme">
        <ActionIcon
          size="md"
          variant={colorScheme === 'dark' ? 'filled' : 'subtle'}
          color={colorScheme === 'dark' ? 'blue' : 'gray'}
          onClick={() => setColorScheme('dark')}
          style={{
            backgroundColor: getBackgroundColor('dark'),
            color: getIconColor('dark'),
            border: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
          }}
        >
          <IconMoon size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Auto (system preference)">
        <ActionIcon
          size="md"
          variant={colorScheme === 'auto' ? 'filled' : 'subtle'}
          color={colorScheme === 'auto' ? 'blue' : 'gray'}
          onClick={() => setColorScheme('auto')}
          style={{
            backgroundColor: getBackgroundColor('auto'),
            color: getIconColor('auto'),
            border: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
          }}
        >
          <IconDeviceDesktop size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
