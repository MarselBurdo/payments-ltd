import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export const DialogCloseButton = ({
  onClose,
  top = 8,
  right = 8,
  color,
}: {
  onClose: () => void;
  top?: number;
  right?: number;
  color?: string;
}) => {
  return (
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: 'absolute',
        right,
        top,
        color: theme => (color ? color : theme.palette.grey[500]),
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
