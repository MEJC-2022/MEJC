import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSunHigh } from '@tabler/icons-react';

interface ToggleColorButtonProps {
    onToggleColorScheme: (colorScheme: 'light' | 'dark') => void;
  }

export function ToggleColorButton({ onToggleColorScheme }: ToggleColorButtonProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleToggle = () => {
    toggleColorScheme();
    onToggleColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'gray' : 'blue'}
      onClick={handleToggle}
      title="Toggle color scheme"
      sx={{ marginRight: '1rem' }}
    >
      {dark ? (
        <IconSunHigh size="1.3rem" stroke="1.6" />
      ) : (
        <IconMoonStars size="1.3rem" stroke="1.6" />
      )}
    </ActionIcon>
  );
}