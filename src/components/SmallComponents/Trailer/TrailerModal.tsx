import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
};

interface TrailerModalProps {
  trailerURL: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ trailerURL }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ width: "8rem" }} variant="contained" onClick={handleOpen}>
        <VideocamIcon />
        Trailer
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe
            src={trailerURL}
            style={{
              width: "100%",
              maxWidth: "80vw",
              height: "80vh",
              border: "none",
            }}
          ></iframe>
        </Box>
      </Modal>
    </div>
  );
};

export default TrailerModal;
