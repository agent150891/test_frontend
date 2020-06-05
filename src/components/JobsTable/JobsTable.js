import React from "react";
import MaterialTable from "material-table";
import SkillsSelect from "../SkillsSelect";
import DeleteIcon from '@material-ui/icons/Delete';
import { jobController } from "../../controllers/jobController";

const JobsTable = () => {
  const { jobs, skills, deleteJob } = jobController();

  return (
    <MaterialTable
      title='Upwork RSS'
      data={jobs}
      actions={[{
        icon: () => <DeleteIcon color='error' />,
        tooltip: 'Delete Job',
        onClick: deleteJob
      }]}
      options={{
        filtering: true,
        search: false,
        actionsColumnIndex: -1
      }}
      columns={[
        { title: 'Title', field: 'title' },
        { title: 'Budget', field: 'budget' },
        { title: 'Workload', field: 'workload' },
        {
          title: 'Skills',
          field: 'skills',
          render: (rowData) => rowData.skills.join(', '),
          filterComponent: (filter) => <SkillsSelect filter={filter} skills={skills} />,
          customFilterAndSearch: (skillsList, rowData) => {
            return skillsList.every((skill) => rowData.skills.includes(skill));
          }
        }
      ]}
    />
  );
};

export default JobsTable;
