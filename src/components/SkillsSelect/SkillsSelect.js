import React, { useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./theme";
import { skillsSelectController } from "../../controllers/skillsSelectController";

const SkillsSelect = ({ skills, filter }) => {
  const { selectedSkills, selectSkills } = skillsSelectController(filter);

  return (
    <ThemeProvider theme={theme}>
      <FormControl fullWidth>
        <Select
          autoWidth
          multiple
          value={selectedSkills}
          onChange={(e) => selectSkills(e.target.value)}
        >
          {skills.map((skill) => (
            <MenuItem key={skill} value={skill}>
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default SkillsSelect;
