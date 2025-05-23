import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface DisplayRatingProps {
  value: number;
  label: string;
  color?: string;
  direction?: 'row' | 'column';
}

export default function DisplayRating({ value, label, color, direction = 'row' }: DisplayRatingProps) {

  return (
    <Stack spacing={0.5} direction={direction} alignItems={direction === 'column' ? 'center' : 'flex-start'}>
      <Typography component="legend">{label}</Typography>
      <Rating 
        name="rating" 
        precision={0.5} 
        value={value} 
        readOnly 
        sx={{ color: color }} 
        size="small"
      />
    </Stack>
  );
}
