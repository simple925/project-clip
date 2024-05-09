import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
  Stack,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

export function MyPageSearchBar() {
  const theme = useMantineTheme();
  const [values, setValues] = useState("");

  return (
    <Stack w={800} mt={40} align="flex-end">
        <TextInput
          radius="xl"
          size="sm"
          style={{ width: rem(300)}}
          placeholder="Search questions"
          value={values}
          onChange={(event) => {
            event.preventDefault();
            setValues(event.currentTarget.value);
          }}
          rightSectionWidth={42}
          leftSection={
            <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          }
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
            >
              <IconArrowRight
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          }
        />
    </Stack>
  );
}
