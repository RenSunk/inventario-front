import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface ComboboxProps {
  options: { [key: string]: any }[];
  nameKey: string;
  valueKey: string;
  label: string;
  onChange?: (event: any, value: any) => void;
  className?: string;
}

export default function Combobox({
  options = [
    {
      name: "The Shawshank Redemption",
      value: 1994,
    },
    {
      name: "The Godfather",
      value: 1972,
    },
    {
      name: "The Dark Knight",
      value: 2008,
    },
  ],
  nameKey = "name",
  valueKey = "value",
  label = "Label",
  onChange,
  className = "",
}: ComboboxProps) {
  const [list, setList] = useState<Array<{ id: string; label: number }>>(
    options.map((item) => ({
      label: item[nameKey as keyof typeof item],
      id: item[valueKey as keyof typeof item],
    }))
  );

  useEffect(() => {
    setList(
      options.map((item) => ({
        label: item[nameKey],
        id: item[valueKey],
      }))
    );
  }, [options]);

  return (
    <Autocomplete
      disablePortal
      options={list}
      className={className}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="standard" />
      )}
      onChange={onChange}
    />
  );
}
