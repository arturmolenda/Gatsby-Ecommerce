import { Step, StepLabel, Stepper } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"

const Steps = ({ activeStep }) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      style={{ background: "transparent" }}
    >
      <Step>
        <StepLabel>Sing in</StepLabel>
      </Step>
      <Step>
        <StepLabel>
          {activeStep >= 1 ? <Link to="/shipping">Shipping</Link> : "Shipping"}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          {activeStep >= 2 ? <Link to="/payment">Payment</Link> : "Payment"}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          {activeStep >= 3 ? (
            <Link to="/placeOrder">PlaceOrder</Link>
          ) : (
            "PlaceOrder"
          )}
        </StepLabel>
      </Step>
    </Stepper>
  )
}

export default Steps
