"use client";

import { Accordion } from "@mantine/core";

const calendarItems = [
  {
    value: "내 캘린더",
    description:
      "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
  },
];

export function MainGroup() {
  const items = calendarItems.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion defaultValue="내 캘린더">{items}</Accordion>;
}
