import * as React from "react";
import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputProps as ChakraNumberInputProps,
} from "@chakra-ui/react";
import { isNumberString } from "utils";

interface NumberInputProps extends ChakraNumberInputProps {
  value: number;
  setValue: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  setValue,
  placeholder = "0",
  min,
  max,
  ...props
}) => {
  const [inputValue, setInputValue] = React.useState<string | number>(value);

  React.useEffect(() => {
    if (inputValue !== value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <ChakraNumberInput
      value={inputValue}
      onChange={(valueAsString, valueAsNumber) => {
        setInputValue(valueAsString);
        if (isNumberString(valueAsString)) {
          let value = valueAsNumber;
          if (typeof min === "number") {
            value = Math.max(min, value);
          }
          if (typeof max === "number") {
            value = Math.min(max, value);
          }
          setValue(value);
        }
      }}
      min={min}
      max={max}
      {...props}
    >
      <NumberInputField placeholder={placeholder} />
    </ChakraNumberInput>
  );
};

export default NumberInput;
