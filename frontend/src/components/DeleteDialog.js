import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"

const DeleteDialog = ({
  open,
  handleClose,
  title,
  description,
  handleDelete,
  actionBtn = "Delete",
}) => {
  return (
    <Dialog open={Boolean(open)} onClose={handleClose}>
      <div style={{ minWidth: 300 }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {description && <DialogContentText>{description}</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            {actionBtn}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

export default DeleteDialog
