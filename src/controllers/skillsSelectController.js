import React, {useEffect} from "react";

export function skillsSelectController(filter) {
  const [selectedSkills, selectSkills] = React.useState([]);

  useEffect(() => {
    const rowId = String(filter.columnDef.tableData.id);
    filter.onFilterChanged(rowId, selectedSkills);
  }, [selectedSkills]);

  return { selectedSkills, selectSkills }
};
