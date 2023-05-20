import { Button, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSunHigh } from '@tabler/icons-react';

interface ToggleColorButtonProps {
  onToggleColorScheme: (colorScheme: 'light' | 'dark') => void;
}

export function ToggleColorButton({
  onToggleColorScheme,
}: ToggleColorButtonProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleToggle = () => {
    toggleColorScheme();
    onToggleColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  const dark = colorScheme === 'dark';

  return (
    <Button
      color={dark ? 'gray' : 'blue'}
      onClick={handleToggle}
      title="Toggle color scheme"
      size="xs"
      variant="subtle"
      radius="xl"
    >
      {dark ? (
        <IconSunHigh size="1.8rem" stroke="1.1" />
      ) : (
        <IconMoonStars size="1.8rem" stroke="1.1" />
      )}
    </Button>
  );
}
