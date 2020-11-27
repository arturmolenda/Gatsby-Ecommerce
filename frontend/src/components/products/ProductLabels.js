import React from "react"

const ProductLabels = ({ labels, discount }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 5,
        display: "flex",
        flexWrap: "wrap-reverse",
      }}
    >
      {discount &&
        discount.amount > 0 &&
        discount.expireDate > new Date().toISOString() && (
          <div
            style={{
              backgroundColor: "#eb0037",
              color: "#fff",
              position: "relative",
              margin: "4px 4px 0 0",
              padding: "0px 5px",
              fontWeight: 600,
            }}
          >
            - {discount.amount}%
          </div>
        )}
      {labels &&
        labels.length !== 0 &&
        labels.map(
          (label, i) =>
            label.labelText &&
            label.bgColor &&
            label.color && (
              <div
                key={i}
                style={{
                  backgroundColor: label.bgColor,
                  color: label.color,
                  position: "relative",
                  margin: "4px 4px 0 0",
                  padding: "0px 5px",
                  fontWeight: 600,
                }}
              >
                {label.labelText}
              </div>
            )
        )}
    </div>
  )
}

export default ProductLabels
