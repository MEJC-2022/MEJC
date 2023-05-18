import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSunHigh } from '@tabler/icons-react';
import { useState } from 'react';

export function ToggleColorButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [logoType, setLogoType] = useState('dark');

  const handleToggle = () => {
    toggleColorScheme();
    setLogoType(colorScheme === 'dark' ? 'dark' : 'light');
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