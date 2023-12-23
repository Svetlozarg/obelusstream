import {
  Typography,
  Breadcrumbs as MUIBreadcrumbs,
  useTheme,
} from "@mui/material";

interface BreadcrumbsProps {
  link: string;
  series?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ link, series }) => {
  const theme = useTheme();

  return (
    <MUIBreadcrumbs sx={{ color: theme.palette.common.white }}>
      <Typography variant="body1" component="p">
        Home
      </Typography>
      <Typography variant="body1" component="p">
        {series ? "Series" : "Movies"}
      </Typography>
      <Typography variant="body1" component="p">
        {link}
      </Typography>
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
