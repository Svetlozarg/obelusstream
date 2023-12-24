import {
  Typography,
  Breadcrumbs as MUIBreadcrumbs,
  useTheme,
  Link,
} from "@mui/material";

interface BreadcrumbsProps {
  link: string;
  series?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ link, series }) => {
  const theme = useTheme();

  return (
    <MUIBreadcrumbs sx={{ color: theme.palette.common.white }}>
      <Link href="/">
        <Typography variant="h4" component="p" fontWeight="normal">
          Home
        </Typography>
      </Link>
      <Link href={series ? "/explore/series" : "/explore/movies"}>
        <Typography variant="h4" component="p" fontWeight="normal">
          {series ? "Series" : "Movies"}
        </Typography>
      </Link>
      <Typography variant="h4" component="p">
        {link}
      </Typography>
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
