import React from "react"
import CKEditor from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { InputLabel, makeStyles } from "@material-ui/core"
import { useState } from "react"

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 15,
    position: "relative",
    maxWidth: "100vw",
    overflowX: "hidden",
    "& .ck-editor__editable_inline": {
      minHeight: 100,
      backgroundColor: "rgb(0 0 0 / 10%) !important",
      transition: "background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
      "&:hover": {
        backgroundColor: "rgb(0 0 0 / 15%) !important",
      },
    },
    "& .ck-editor__editable_inline > *": {
      marginTop: "20px !important",
    },
    "& .ck-editor__editable_inline > p": {
      fontSize: 16,
    },
    "& .ck-focused": {
      borderColor: "#9d9d9d !important",
    },
    "& .ck-toolbar_grouping": {
      borderTopLeftRadius: "4px !important",
      borderTopRightRadius: "4px !important",
    },
  },
  inputLabel: {
    zIndex: -1,
    position: "absolute",
    top: 38,
    left: -3,
    transform: "translate(12px, 17px) scale(0.91)",
    color: "#646464",
  },
  inputLabelFocused: {
    transform: "translate(12px, 7px) scale(0.75)",
  },
}))

const RichTextEditor = ({ description, setDescription }) => {
  const [isFocused, setIsFocused] = useState(false)
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "blockQuote",
            "link",
            "numberedList",
            "bulletedList",
            "|",
            "undo",
            "redo",
          ],
        }}
        data={description}
        onChange={(event, editor) => {
          const data = editor.getData()
          setDescription(data)
        }}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
      <InputLabel
        focused={isFocused}
        shrink={isFocused}
        className={`${classes.inputLabel} ${
          (isFocused || description !== "") && classes.inputLabelFocused
        }`}
      >
        Description
      </InputLabel>
    </div>
  )
}

export default RichTextEditor
