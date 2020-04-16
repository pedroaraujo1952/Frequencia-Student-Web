import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: "6px 26px 6px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
}));

export default function MaterialSelect({ onChange, value, name }) {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          className="selectCustom"
          name={name}
          value={value}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={"1AI"}>1AI</MenuItem>
          <MenuItem value={"1BI"}>1BI</MenuItem>
          <MenuItem value={"1CI"}>1CI</MenuItem>
          <MenuItem value={"1AE"}>1AE</MenuItem>
          <MenuItem value={"1BE"}>1BE</MenuItem>
          <MenuItem value={"1AM"}>1AM</MenuItem>
          <MenuItem value={"1BM"}>1BM</MenuItem>
          <MenuItem value={"1CM"}>1CM</MenuItem>
          <MenuItem value={"3AI"}>3AI</MenuItem>
          <MenuItem value={"3BI"}>3BI</MenuItem>
          <MenuItem value={"3CI"}>3CI</MenuItem>
          <MenuItem value={"3AE"}>3AE</MenuItem>
          <MenuItem value={"3BE"}>3BE</MenuItem>
          <MenuItem value={"3AM"}>3AM</MenuItem>
          <MenuItem value={"3BM"}>3BM</MenuItem>
          <MenuItem value={"3CM"}>3CM</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
