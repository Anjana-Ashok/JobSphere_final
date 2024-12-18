import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <Card 
            onClick={() => navigate(`/description/${job._id}`)}
            sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: 6,
                },
                background: 'linear-gradient(to right, #ffffff, #f7f7f7)',
                border: '1px solid #e0e0e0',
            }}
        >
            <CardContent>
                <Box mb={2}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {job?.company?.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        India
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="h6" color="textPrimary" fontWeight="bold">
                        {job?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                        {job?.description}
                    </Typography>
                </Box>
                <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
                    <Chip
                        label={`${job?.position} Positions`}
                        sx={{ backgroundColor: '#E3F2FD', color: '#1E88E5', fontWeight: 'bold' }}
                    />
                    <Chip
                        label={job?.jobType}
                        sx={{ backgroundColor: '#FFEBEE', color: '#E53935', fontWeight: 'bold' }}
                    />
                    <Chip
                        label={`${job?.salary} LPA`}
                        sx={{ backgroundColor: '#F3E5F5', color: '#6A1B9A', fontWeight: 'bold' }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default LatestJobCards;
