import React, { useState } from "react"

import {
  Button,
  Card,
  Collapse,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import { Alert } from "@material-ui/lab"
import Loader from "./Loader"

const useStyles = makeStyles(() => ({
  couponContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    marginTop: 16,
  },
  expandContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  expandIcon: {
    padding: 5,
    fontSize: "2rem",
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
}))

const CouponCard = ({
  coupon,
  couponLoading,
  couponError,
  setCoupon,
  applyCouponHandle,
  couponInfo,
  disableBtn,
}) => {
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()
  return (
    <Card className={classes.couponContainer}>
      <div
        className={classes.expandContainer}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="caption">
          Add discount coupon (optional)
        </Typography>
        {expanded ? (
          <ExpandLessIcon className={classes.expandIcon} />
        ) : (
          <ExpandMoreIcon className={classes.expandIcon} />
        )}
      </div>
      <Collapse in={expanded}>
        <TextField
          fullWidth
          type="text"
          label="Coupon"
          variant="outlined"
          margin="dense"
          value={coupon}
          onChange={setCoupon}
          style={{ marginBottom: 10 }}
        />
        {coupon.length !== 0 &&
          !couponError &&
          (couponInfo ? couponInfo.code !== coupon : true) && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={applyCouponHandle}
              disabled={couponLoading || disableBtn}
            >
              Apply
              {couponLoading && <Loader button />}
            </Button>
          )}
        {couponError && <Alert severity="error">{couponError}</Alert>}
        {couponInfo && couponInfo.code === coupon && (
          <Alert severity="success">Discount Applied!</Alert>
        )}
      </Collapse>
    </Card>
  )
}

export default CouponCard
