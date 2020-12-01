import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import {
  DISCOUNT_CREATE_RESET,
  DISCOUNT_DETAILS_RESET,
  DISCOUNT_UPDATE_RESET,
} from "../../../redux/constants/discountConstats"
import {
  createDiscount,
  getDiscountDetails,
  updateDiscount,
} from "../../../redux/actions/discountActions"

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { Alert } from "@material-ui/lab"
import Loader from "../../Loader"

const AdminDiscount = ({ id }) => {
  const [code, setCode] = useState("SampleCode")
  const [isPercent, setIsPercent] = useState(true)
  const [minPrice, setMinPrice] = useState(0)
  const [amount, setAmount] = useState(10)
  const [expireDate, setExpireDate] = useState(
    new Date().toISOString().substring(0, 10)
  )
  const [couponsAmount, setCouponsAmount] = useState(100)
  const [onePerUser, setOnePerUser] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, discountInfo, error } = useSelector(
    state => state.discountDetails
  )
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = useSelector(state => state.discountCreate)
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector(state => state.discountUpdate)

  const resetReducers = () => {
    dispatch({ type: DISCOUNT_CREATE_RESET })
    dispatch({ type: DISCOUNT_UPDATE_RESET })
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")

    if (discountInfo) {
      setCode(discountInfo.code)
      setIsPercent(discountInfo.isPercent)
      setMinPrice(discountInfo.minPrice)
      setAmount(discountInfo.amount)
      setExpireDate(discountInfo.expireDate.substring(0, 10))
      setCouponsAmount(discountInfo.couponsAmount)
      setOnePerUser(discountInfo.onePerUser)
      setIsActive(discountInfo.isActive)
    }
  }, [userInfo, discountInfo, id])

  useEffect(() => {
    if (id) {
      if (
        (!discountInfo || (discountInfo && discountInfo._id !== id)) &&
        !updateSuccess &&
        !createSuccess
      )
        dispatch(getDiscountDetails(id))
      else if (updateSuccess) {
        dispatch(getDiscountDetails(id))
      } else if (createSuccess)
        navigate(`/admin/discounts/edit/${createSuccess}`)
    }
  }, [createSuccess, updateSuccess, id])

  useEffect(() => {
    return () => {
      dispatch({ type: DISCOUNT_DETAILS_RESET })
      resetReducers()
    }
  }, [])

  const submitHandle = async e => {
    e.preventDefault()
    if (id) {
      dispatch(
        updateDiscount(
          {
            code,
            isPercent,
            minPrice,
            amount,
            expireDate,
            couponsAmount,
            onePerUser,
            isActive,
          },
          discountInfo._id
        )
      )
    } else {
      dispatch(
        createDiscount({
          code,
          isPercent,
          minPrice,
          amount,
          expireDate,
          couponsAmount,
          onePerUser,
          isActive,
        })
      )
    }
  }

  return (
    <>
      <Link to={"/admin/discounts"}>
        <Button startIcon={<ArrowBackIcon />} style={{ marginBottom: 10 }}>
          Go back
        </Button>
      </Link>
      {loading && id ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          wrap="nowrap"
        >
          <Grid container justify="center">
            <Grid item md={5} sm={8} xs={12}>
              <Typography variant="h1" align="center">
                {id ? "UPDATE DISCOUNT" : "CREATE NEW DISCOUNT"}
              </Typography>
              {createSuccess && (
                <Alert severity="success">New discount created!</Alert>
              )}
              {updateSuccess && (
                <Alert severity="success">Discount edited</Alert>
              )}
              <form
                onSubmit={submitHandle}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  required
                  type="text"
                  label="Code"
                  variant="filled"
                  margin="dense"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />

                <TextField
                  required
                  type="number"
                  label="Discount (in % or $)"
                  variant="filled"
                  margin="dense"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Discount in</FormLabel>
                  <RadioGroup
                    value={isPercent}
                    onChange={e => setIsPercent(e.target.value === "true")}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="%"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="$"
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  required
                  type="number"
                  label="Min price to apply"
                  variant="filled"
                  margin="dense"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                />

                <TextField
                  required
                  type="number"
                  label="Coupons Amount"
                  variant="filled"
                  margin="dense"
                  value={couponsAmount}
                  onChange={e => setCouponsAmount(e.target.value)}
                />

                <TextField
                  required
                  type="date"
                  label="Expire Date"
                  variant="filled"
                  margin="dense"
                  value={expireDate}
                  onChange={e => setExpireDate(e.target.value)}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={onePerUser}
                      onChange={e => setOnePerUser(e.target.checked)}
                    />
                  }
                  label="One per user"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isActive}
                      onChange={e => setIsActive(e.target.checked)}
                    />
                  }
                  label="Active"
                />

                {createError && <Alert severity="error">{createError}</Alert>}
                {updateError && <Alert severity="error">{updateError}</Alert>}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginTop: 15 }}
                  disabled={createLoading || updateLoading}
                >
                  {id ? "Update" : "Create"}
                  {(createLoading || updateLoading) && <Loader button />}
                </Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default AdminDiscount
