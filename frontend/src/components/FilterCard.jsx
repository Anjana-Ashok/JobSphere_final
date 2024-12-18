import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Android Developer",
      "Software Engineer",
      "Member of Technical Staff",
      "Data Scientist",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0-40k",
      "42-1lakh",
      "1lakh to 5lakh",
      "5lakh to 10lakh",
      "10lakh to 20lakh",
      "20lakh to 50lakh",
      "50lakh to 90lakh",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <Card sx={{ width: "100%", p: 2, borderRadius: 2, backgroundColor: "white" }}>
      <Typography variant="h6" fontWeight="bold">
        Filter Jobs
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <FormControl component="fieldset">
        {filterData.map((data, index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            <FormLabel component="legend" sx={{ fontWeight: "bold", mb: 1 }}>
              {data.filterType}
            </FormLabel>
            <RadioGroup
              value={selectedValue}
              onChange={(e) => changeHandler(e.target.value)}
            >
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <FormControlLabel
                    key={itemId}
                    value={item}
                    control={<Radio />}
                    label={item}
                  />
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </FormControl>
    </Card>
  );
};

export default FilterCard;
