import React from "react"
import StarIcon from "@material-ui/icons/Star"
import StarHalfIcon from "@material-ui/icons/StarHalf"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import { Typography } from "@material-ui/core"
const Rating = ({ rating, text, color = "#f8e825" }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ color }}>
        {rating >= 1 ? (
          <StarIcon />
        ) : rating >= 0.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span style={{ color }}>
        {rating >= 2 ? (
          <StarIcon />
        ) : rating >= 1.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span style={{ color }}>
        {rating >= 3 ? (
          <StarIcon />
        ) : rating >= 2.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span style={{ color }}>
        {rating >= 4 ? (
          <StarIcon />
        ) : rating >= 3.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span style={{ color }}>
        {rating >= 5 ? (
          <StarIcon />
        ) : rating >= 4.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      {text && (
        <Typography
          variant="subtitle1"
          style={{ marginLeft: 5, fontWeight: 600 }}
        >
          {text}
        </Typography>
      )}
    </div>
  )
}

export default Rating
