import { useState } from "react";
import { Button } from "./Button";
import Input from "./Input";
import { type ListItem } from "../types/ListItem";

interface FormValues {
  input1: string;
  input2: string;
}

type FormProps = {
  item1: ListItem;
  item2: ListItem;
  onSubmit: (biggerValueItem: ListItem) => void;
};

const Form = ({ item1, item2, onSubmit }: FormProps) => {
  const [values, setValues] = useState<FormValues>({ input1: "", input2: "" });
  const [errors, setErrors] = useState({
    input1: "",
    input2: "",
    sameValue: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    if (errors.input1 || errors.input2 || errors.sameValue) {
      setErrors({ input1: "", input2: "", sameValue: "" });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (!values.input1) {
      setErrors((prev) => ({ ...prev, input1: "*" }));
      isValid = false;
    }

    if (!values.input2) {
      setErrors((prev) => ({ ...prev, input2: "*" }));
      isValid = false;
    }

    if (values.input2 === values.input1) {
      setErrors((prev) => ({
        ...prev,
        sameValue: "One value must be higher than the other",
      }));
      isValid = false;
    }

    if (isValid) {
      // Submit the form
      const biggerValueItem = values.input1 > values.input2 ? item1 : item2;
      onSubmit(biggerValueItem);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap w-full gap-4 p-4">
      <div className="relative sm:flex-1">
        <Input
          label={item1.name}
          value={values.input1}
          onChange={handleChange}
          name="input1"
        />
        {errors.input1 && (
          <p className="absolute left-0 text-sm font-semibold text-red-700 -bottom-5">
            {errors.input1}
          </p>
        )}
      </div>
      <div className="relative sm:flex-1">
        <Input
          label={item2.name}
          value={values.input2}
          onChange={handleChange}
          name="input2"
        />
        {errors.input2 && (
          <p className="absolute left-0 text-sm font-semibold text-red-700 -bottom-5">
            {errors.input2}
          </p>
        )}
      </div>
      {errors.sameValue && !errors.input1 && !errors.input2 && (
        <p className="absolute text-xs font-semibold text-red-700 left-8 bottom-24">
          {errors.sameValue}
        </p>
      )}
      <div className="absolute bottom-4 left-4">
        <Button type="submit" success={true}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
