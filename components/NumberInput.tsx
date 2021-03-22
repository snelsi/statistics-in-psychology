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
          setValue(valueAsNumber);
        }
      }}
      {...props}
    >
      <NumberInputField placeholder={placeholder} />
    </ChakraNumberInput>
  );
};

export default NumberInput;
