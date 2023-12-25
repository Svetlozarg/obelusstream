import {
  Typography,
  Breadcrumbs as MUIBreadcrumbs,
  useTheme,
  Link,
  Skeleton,
} from "@mui/material";

interface BreadcrumbsProps {
  link: string;
  series?: boolean;
  loading?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ link, series, loading }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <MUIBreadcrumbs sx={{ color: theme.palette.common.white }}>
        <Skeleton variant="text" width={100} height={30} />
        <Skeleton variant="text" width={100} height={30} />
        <Skeleton variant="text" width={100} height={30} />
      </MUIBreadcrumbs>
    );
  }

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
