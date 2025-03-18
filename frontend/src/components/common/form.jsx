import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
const types = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
  PASSWORD: "password",
};

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  const renderInputsByComponentType = (getItem) => {
    let element = null;
    const value = formData[getItem.name] || "";
    switch (getItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={getItem.name}
            id={getItem.name}
            placeholder={getItem.placeholder}
            type={getItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItem?.name]: event.target.value,
              })
            }
          />
        );

        break;
      case types.SELECT:
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getItem.label} />
              <SelectContent>
                {getItem.options && getItem.options.length > 0
                  ? getItem.options.map((optionItem) => (
                      <SelectItem key={optionItem.id} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem>
                    ))
                  : null}
              </SelectContent>
            </SelectTrigger>
          </Select>
        );

        break;
      case types.TEXTAREA:
        element = (
          <Textarea
            value={value}
            name={getItem.name}
            id={getItem.id}
            placeholder={getItem.placeholder}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItem?.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getItem.name}
            id={getItem.name}
            placeholder={getItem.placeholder}
            type={getItem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button className="mt-2 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
