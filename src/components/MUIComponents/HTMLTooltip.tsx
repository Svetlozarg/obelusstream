"use client";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { Box, ClickAwayListener } from "@mui/material";
import { useState } from "react";

interface HTMLTooltipProps {
  children: React.ReactNode;
}

const HTMLTooltip: React.FC<HTMLTooltipProps> = ({ children }) => {
  const theme = useTheme();
  const [openTooltip, setOpenTooltipValue] = useState(false);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => {
        setOpenTooltipValue(false);
      }}
    >
      <Tooltip
        open={openTooltip}
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
        onClick={(e) => {
          e.preventDefault();
          setOpenTooltipValue(!openTooltip);
        }}
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
