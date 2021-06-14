import { TextField } from "@material-ui/core";

interface PropTypes {
  id: string;
  label: string;
  value: string;
  onChange: Function;
  placeholder: string;
}

const InputText = ({ id, label, value, onChange, placeholder }: PropTypes) => {
  return (
    <TextField
      id={id}
      style={{ width: '90%' }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label={label}
      name={id}
      placeholder={placeholder}
      type="text"
    />
  )
}

export default InputText;
