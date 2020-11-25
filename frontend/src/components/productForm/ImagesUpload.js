import React from "react"

import { useStaticQuery, graphql } from "gatsby"

import {
  Button,
  Fab,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import { v4 as uuidv4 } from "uuid"

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100%",
    "&:last-child": {
      marginBottom: 10,
    },
  },
}))

const ImagesUpload = ({ images, setImages }) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
          }
        }
      }
    }
  `)
  const classes = useStyles()

  console.log(data)

  const updateImages = (e, i) => {
    e.persist()
    setImages(prevImages => {
      prevImages[i][e.target.name] = e.target.value
      if (e.target.name === "image") {
        const image = data.images.edges.find(n => {
          return n.node.relativePath === e.target.value
        })
        delete prevImages[i].blob
        delete prevImages[i].error
        delete prevImages[i].formData
        if (!image) {
          prevImages[i].local = false
        } else {
          prevImages[i].local = true
        }
      }
      return [...prevImages]
    })
  }
  const deleteImage = i => {
    setImages(prevImages => {
      prevImages.splice(i, 1)
      return [...prevImages]
    })
  }
  const addImage = () => {
    setImages(prevImages => {
      return [...prevImages, { image: "", description: "" }]
    })
  }
  const handleSelectPicture = i => {
    document.getElementById(`imageUpload-${i}`).click()
  }

  const handleImageChange = async (e, i) => {
    const imageFile = e.target.files[0]
    if (imageFile) {
      console.log("new img file")
      let fileType = imageFile.type.split("/")
      fileType = fileType[fileType.length - 1]
      console.log(fileType)
      // check if is image
      if (!!fileType.match("jpg|jpeg|png|gif")) {
        // Replace img name with projectId and proper extension type
        const blob = imageFile.slice(0, imageFile.size, imageFile.type)
        const newFileName = await uuidv4()
        const newFile = new File([blob], newFileName, {
          type: imageFile.type,
        })
        console.log("new file", newFile)
        const imageDisplay = URL.createObjectURL(imageFile)
        console.log("backgroundUpdate", imageDisplay)

        const imageFormData = new FormData()
        imageFormData.append("img", newFile)

        setImages(prevImages => {
          prevImages[i].image = `${newFile.name}.${fileType}`
          prevImages[i].blob = imageDisplay
          prevImages[i].formData = imageFormData
          prevImages[i].local = false
          delete prevImages[i].error
          return [...prevImages]
        })
      }
    }
  }
  return (
    <div className={classes.container}>
      {images.map((item, i) => (
        <div className={classes.flexContainer} key={i}>
          <div className={classes.inputContainer}>
            <div className={classes.flexContainer}>
              <TextField
                required
                fullWidth
                type="text"
                label="Upload or enter url"
                name="image"
                margin="dense"
                variant="filled"
                value={item.image}
                error={item.error}
                helperText={item.error}
                onChange={e => updateImages(e, i)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Fab
                        color="primary"
                        onClick={() => handleSelectPicture(i)}
                        size="small"
                      >
                        <input
                          id={`imageUpload-${i}`}
                          type="file"
                          hidden="hidden"
                          onChange={e => handleImageChange(e, i)}
                        />
                        <AddIcon />
                      </Fab>
                    </InputAdornment>
                  ),
                }}
              />
              {images.length > 1 && (
                <IconButton
                  color="primary"
                  onClick={() => deleteImage(i)}
                  style={{ padding: 6 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
            <TextField
              fullWidth
              type="text"
              label="Image description (optional)"
              name="description"
              margin="dense"
              variant="filled"
              value={item.description}
              onChange={e => updateImages(e, i)}
            />
          </div>
        </div>
      ))}
      <Button
        className={classes.iconBtn}
        color="primary"
        variant="contained"
        onClick={addImage}
        startIcon={<AddIcon />}
        error
      >
        Add Image
      </Button>
    </div>
  )
}

export default ImagesUpload
