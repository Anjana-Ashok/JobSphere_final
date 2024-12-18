import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    // IconButton, 
    // Tooltip,
    Button } from '@mui/material';
import { Avatar, Popover } from '@mui/material';
import { Edit, MoreHoriz } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import {  Link, useNavigate } from 'react-router-dom';


const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <TableContainer>
            <Table>
                <h1>A list of your recent registered companies</h1> 
                <TableHead>
                    <TableRow>
                        <TableCell>Logo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">
    <Link to="/admin/jobs" style={{ textDecoration: 'none' }}>
        <Button>
            Jobs
        </Button>
    </Link>
</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar src={company.logo} alt={company.name} />
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt ? company.createdAt.split("T")[0] : "N/A"}</TableCell>
                            <TableCell> </TableCell>

                            {/* <TableCell align="right">
                                <Popover
                                    content={
                                        <div>
                                            <Tooltip title="Edit" arrow>
                                                <IconButton onClick={() => navigate(`/admin/companies/${company._id}`)}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    }
                                >
                                    <IconButton>
                                        <MoreHoriz />
                                    </IconButton>
                                </Popover>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CompaniesTable;
