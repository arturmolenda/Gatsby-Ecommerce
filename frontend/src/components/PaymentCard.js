import React, { useState } from "react"

import {
  Button,
  Card,
  Collapse,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import { Alert } from "@material-ui/lab"
import Loader from "./Loader"

const useStyles = makeStyles(theme => ({
  checkoutTitle: {
    padding: "16px 10px 5px",
    border: "none",
    "& h1": {
      fontSize: "1.9rem",
      margin: 0,
    },
  },
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

const PaymentCard = ({
  title,
  price,
  totalPrice,
  loading,
  btnText,
  btnHandle,
  showCoupon,
  coupon,
  couponLoading,
  couponError,
  setCoupon,
  applyCouponHandle,
  couponInfo,
}) => {
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()
  return (
    <>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.checkoutTitle}>
                <Typography variant="h1">{title}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell align="right">${price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Delivery</TableCell>
              <TableCell align="right">
                {price >= 100 ? "Free" : "$10"}
              </TableCell>
            </TableRow>
            {couponInfo && (
              <TableRow>
                <TableCell>Coupon Applied: "{couponInfo.code}"</TableCell>
                <TableCell align="right">
                  {couponInfo.isPercent
                    ? `${couponInfo.amount}%`
                    : `$${couponInfo.amount}`}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>
                Total Price (tax included)
              </TableCell>
              <TableCell style={{ fontWeight: 600 }} align="right">
                ${couponInfo ? couponInfo.newPrice : totalPrice}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{ padding: 10 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={btnHandle}
            disabled={loading || couponLoading}
          >
            {btnText}
            {loading && <Loader button />}
          </Button>
        </div>
      </TableContainer>
      {showCoupon && (
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
                  disabled={couponLoading || loading}
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
      )}
    </>
  )
}

export default PaymentCard
