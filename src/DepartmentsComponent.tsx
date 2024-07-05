import React, { useState } from "react";
import {
    Checkbox,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Department {
    department: string;
    sub_departments: string[];
}

const departmentsData: Department[] = [
    {
        department: "customer_service",
        sub_departments: ["support", "customer_success"],
    },
    {
        department: "design",
        sub_departments: ["graphic_design", "product_design", "web_design"],
    },
];

const DepartmentsComponent: React.FC = () => {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [selectedDepartments, setSelectedDepartments] = useState<{
        [key: string]: boolean;
    }>({});
    const [selectedSubDepartments, setSelectedSubDepartments] = useState<{
        [key: string]: { [key: string]: boolean };
    }>({});

    const handleExpandClick = (department: string) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [department]: !prevExpanded[department],
        }));
    };

    const handleDepartmentChange = (department: string) => {
        const isSelected = !selectedDepartments[department];
        setSelectedDepartments((prevSelected) => ({
            ...prevSelected,
            [department]: isSelected,
        }));
        setSelectedSubDepartments((prevSelected) => ({
            ...prevSelected,
            [department]: Object.fromEntries(
                departmentsData
                    .find((dep) => dep.department === department)!
                    .sub_departments.map((subDep) => [subDep, isSelected])
            ),
        }));
    };

    const handleSubDepartmentChange = (
        department: string,
        subDepartment: string
    ) => {
        const isSelected = !selectedSubDepartments[department]?.[subDepartment];
        const newSubDepartments = {
            ...selectedSubDepartments[department],
            [subDepartment]: isSelected,
        };

        setSelectedSubDepartments((prevSelected) => ({
            ...prevSelected,
            [department]: newSubDepartments,
        }));

        const allSelected = Object.values(newSubDepartments).every(
            (value) => value
        );
        setSelectedDepartments((prevSelected) => ({
            ...prevSelected,
            [department]: allSelected,
        }));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Departments
            </Typography>
            <List>
                {departmentsData.map((department) => (
                    <div key={department.department}>
                        <ListItem>
                            <Checkbox
                                checked={
                                    selectedDepartments[
                                        department.department
                                    ] || false
                                }
                                onChange={() =>
                                    handleDepartmentChange(
                                        department.department
                                    )
                                }
                            />
                            <ListItemText primary={department.department} />
                            <IconButton
                                onClick={() =>
                                    handleExpandClick(department.department)
                                }
                            >
                                {expanded[department.department] ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )}
                            </IconButton>
                        </ListItem>
                        <Collapse
                            in={expanded[department.department]}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {department.sub_departments.map(
                                    (subDepartment) => (
                                        <ListItem
                                            key={subDepartment}
                                            sx={{ pl: 4 }}
                                        >
                                            <Checkbox
                                                checked={
                                                    selectedSubDepartments[
                                                        department.department
                                                    ]?.[subDepartment] || false
                                                }
                                                onChange={() =>
                                                    handleSubDepartmentChange(
                                                        department.department,
                                                        subDepartment
                                                    )
                                                }
                                            />
                                            <ListItemText
                                                primary={subDepartment}
                                            />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </Container>
    );
};

export default DepartmentsComponent;
