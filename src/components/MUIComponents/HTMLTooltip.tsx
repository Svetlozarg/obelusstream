"use client";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { Box, ClickAwayListener } from "@mui/material";

interface HTMLTooltipProps {
  children: React.ReactNode;
}

const HTMLTooltip: React.FC<HTMLTooltipProps> = ({ children }) => {
  const theme = useTheme();
  const [openTooltip, setOpenTooltipValue] = useState(false);
  const [openHoverTooltip, setOpenHoverTooltipValue] = useState(false);

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenTooltipValue(!openTooltip);
    setOpenHoverTooltipValue(false);
  };

  const handleTooltipClose = () => {
    setOpenTooltipValue(false);
  };

  const handleHoverIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenHoverTooltipValue(true);
  };

  const handleHoverTooltipClose = () => {
    setOpenHoverTooltipValue(false);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        open={openTooltip || openHoverTooltip}
        title={
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              height: "100%",
              maxHeight: 400,
              overflow: "auto",
            }}
          >
            {children}
          </Box>
        }
        onClick={handleIconClick}
        onMouseOver={handleHoverIcon}
        onMouseLeave={handleHoverTooltipClose}
        arrow
      >
        <InfoIcon
          sx={{
            color: theme.palette.customColors.gold,
          }}
        />
      </Tooltip>
    </ClickAwayListener>
  );
};

export default HTMLTooltip;
