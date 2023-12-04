import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ position: 'static' }}
    >
      {'Copyright © '}
      FichaÁgil por Univale/Technamina {new Date().getFullYear()}
    </Typography>
  );
}
