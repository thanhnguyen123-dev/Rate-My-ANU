import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
interface HoverRatingProps {
  value: number,
  onChange: (value: number) => void
  label?: string
}

export default function HoverRating({ value, onChange, label }: HoverRatingProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      onChange(newValue || 0.5);
    }
  };
  return (
    <Stack spacing={0.5} alignItems="center">
      {label && (
        <Typography component="legend" className="text-sm font-medium" variant="body2">
          {label}
        </Typography>
      )}
      <Rating 
        name="half-rating" 
        precision={0.5} 
        onChange={handleChange}
        value={value}
      />
    </Stack>
  );
}
