import React from "react";
import {ToggleButton} from '@material-ui/lab';
import {makeStyles, withStyles} from "@material-ui/core/styles";

const SignUpCheckBox = ({value, isClicked, onClick}) => {

  const CustomToggleButton = withStyles({
    root: {
      border: '1px solid #BAC8FF'
    },
    selected: {
      backgroundColor: "#BAC8FF !important"
    }
  })(ToggleButton);


  return (
    <CustomToggleButton selected={isClicked} value={value} onClick={onClick}>
      {value}
    </CustomToggleButton>
  )
};

export default SignUpCheckBox;