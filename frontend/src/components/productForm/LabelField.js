import React from "react"

import { Button, IconButton, makeStyles, TextField } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    "& > div": {
      margin: "10px 5px 10px 0",
    },
  },
}))

const LabelField = ({ labels, setLabels }) => {
  const classes = useStyles()

  const updateLabel = (e, i) => {
    // console.log(labels, e.target.value)
    e.persist()
    setLabels(prevLabels => {
      prevLabels[i][e.target.name] = e.target.value
      return [...prevLabels]
    })
  }
  const deleteLabel = i => {
    setLabels(prevLabels => {
      prevLabels.splice(i, 1)
      return [...prevLabels]
    })
  }
  const addLabel = () => {
    setLabels(prevLabels => {
      return [...prevLabels, { labelText: "", color: "", bgColor: "" }]
    })
  }
  return (
    <div className={classes.container}>
      {labels.map((item, i) => (
        <div className={classes.flexContainer} key={i}>
          <div className={classes.inputContainer}>
            <TextField
              type="text"
              label="Label"
              name="labelText"
              variant="filled"
              placeholder="Label text"
              value={item.labelText}
              onChange={e => updateLabel(e, i)}
            />
            <TextField
              type="text"
              label="Text Color"
              name="color"
              variant="filled"
              placeholder="i.e., #000"
              value={item.color}
              onChange={e => updateLabel(e, i)}
            />
            <TextField
              type="text"
              label="Bg Color"
              name="bgColor"
              variant="filled"
              placeholder="i.e., #fff"
              value={item.bgColor}
              onChange={e => updateLabel(e, i)}
            />
          </div>
          <IconButton
            color="primary"
            onClick={() => deleteLabel(i)}
            style={{ cursor: "pointer" }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button
        className={classes.iconBtn}
        color="primary"
        variant="contained"
        onClick={addLabel}
        startIcon={<AddIcon />}
      >
        Add Label
      </Button>
    </div>
  )
}

export default LabelField
