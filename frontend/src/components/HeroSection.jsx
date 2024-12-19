import React, { useState } from 'react';
import { Box, Button, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');  // Redirects to the 'browse' page
    };

    return (
        <Box
            sx={{
                textAlign: 'center',
                py: 10,
                width: '800px', 
                maxWidth: '600px',
                margin: '300px auto 0',
                px: 2,
                '@media (max-width: 900px)': {
                    width: '700px',
                    margin: '200px auto 0',
                },
                '@media (max-width: 600px)': {
                    width: '400px', 
                    margin: '150px auto 0',
                    py: 8, 
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    my: 5,
                }}
            >
                <Paper
                    component="form"
                    elevation={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '100%',
                        width: '100%',
                        p: 1,
                        pl: 2,
                        borderRadius: 25,
                        backgroundColor: 'white',
                        border: '1px solid #E0E0E0',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': { transform: 'scale(1.02)' },
                        flexWrap: 'wrap', 
                        '@media (max-width: 600px)': {
                            p: 0.5, 
                        },
                    }}
                >
                    <InputBase
                        fullWidth
                        placeholder="Find your dream job"
                        onChange={(e) => setQuery(e.target.value)}
                        sx={{
                            ml: 1,
                            flex: 1,
                            fontSize: '1rem',
                            color: 'text.primary',
                            placeholderColor: 'text.secondary',
                            '@media (max-width: 600px)': {
                                fontSize: '0.9rem', 
                            },
                        }}
                    />
                    <Button
                        onClick={searchJobHandler}
                        variant="contained"
                        sx={{
                            borderRadius: 20,
                            background: 'linear-gradient(to right,rgb(228, 142, 23),rgb(240, 109, 16))',
                            color: 'white',
                            px: 3,
                            py: 1,
                            '&:hover': {
                                background: 'linear-gradient(to right,rgb(249, 209, 49),rgb(240, 109, 16))',
                            },
                            mt: { xs: 1, sm: 0 }, 
                            '@media (max-width: 600px)': {
                                px: 2, 
                                py: 0.8, // Adjust button size for mobile
                            },
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
};

export default HeroSection;