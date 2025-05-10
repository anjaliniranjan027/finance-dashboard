import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "90%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  borderRadius: "1rem",
};

interface MagnifyModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const MagnifyModal = ({ open, onClose, children }: MagnifyModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default MagnifyModal;