import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import classes from './Prompt.module.css';

export const Prompt = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <TextInput
        size="xl"
        variant="filled"
        label="Generate recipes"
        description="List your ingredients Eg. Pineapple, tomatos, cilantro, sugar, pepper"
        placeholder="Type the ingredients here"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Button className={classes.promptbutton} variant="filled">Button</Button>
    </>
  );
};
