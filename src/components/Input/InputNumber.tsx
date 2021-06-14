import { TextField } from "@material-ui/core";

interface PropTypes {
  id: string;
  label: string;
  value: number;
  onChange: Function;
}

const InputNumber = ({ id, label, value, onChange }: PropTypes) => {
  return (
    <TextField
      id={id}
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
      label={label}
      name={id}
      style={{ width: '90%' }}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default InputNumber;
