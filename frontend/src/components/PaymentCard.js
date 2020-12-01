import React from "react"
import { PayPalButton } from "react-paypal-button-v2"

import {
  Button,
  Card,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"

import Loader from "./Loader"

const useStyles = makeStyles(() => ({
  checkoutTitle: {
    padding: "16px 10px 5px",
    border: "none",
    "& h1": {
      fontSize: "1.9rem",
      margin: 0,
    },
  },
}))

const PaymentCard = ({
  title,
  price,
  totalPrice,
  loading,
  btnText,
  btnHandle,
  disableBtn,
  couponInfo,
  payPalBtn,
  sdkReady,
  isPaid,
}) => {
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
                $
                {couponInfo && couponInfo.newPrice
                  ? couponInfo.newPrice
                  : totalPrice}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div
          style={{
            padding: isPaid ? 0 : sdkReady ? "10px 10px 0" : 10,
            position: "relative",
          }}
        >
          {payPalBtn ? (
            !isPaid &&
            (!sdkReady && !loading ? (
              <Loader contained />
            ) : (
              <PayPalButton amount={totalPrice} onSuccess={btnHandle} />
            ))
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={btnHandle}
              disabled={loading || disableBtn}
            >
              {btnText}
              {loading && <Loader button />}
            </Button>
          )}
        </div>
      </TableContainer>
    </>
  )
}

export default PaymentCard
