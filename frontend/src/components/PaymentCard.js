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
  setCoupon,
  applyCouponHandle,
  error,
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
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>
                Total Price (tax included)
              </TableCell>
              <TableCell style={{ fontWeight: 600 }} align="right">
                ${totalPrice}
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
            disabled={loading}
          >
            {btnText}
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
              onChange={e => setCoupon(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            {coupon.length !== 0 && !error && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={applyCouponHandle}
              >
                Apply
              </Button>
            )}
            {error && <Alert variant="error">{error}</Alert>}
          </Collapse>
        </Card>
      )}
    </>
  )
}

export default PaymentCard
