import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Img as ReactImage } from "react-image"
import { Skeleton } from "@material-ui/lab"

const Image = props => {
  return (
    <StaticQuery
      query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const image = data.images.edges.find(n => {
          return n.node.relativePath.includes(props.filename)
        })

        if (!image) {
          try {
            const src = require(`../../public/images/${props.filename}`)
            if (src) {
              const placeholder = data.images.edges.find(n => {
                return n.node.relativePath.includes("productPlaceholder.jpg")
              })

              return (
                <ReactImage
                  style={{
                    width: "100%",
                    display: "flex",
                    ...props.customStyle,
                  }}
                  alt={props.alt}
                  src={src}
                  loader={
                    <div style={{ position: "relative" }}>
                      <div style={{ visibility: "hidden" }}>
                        <Img
                          alt={props.alt}
                          fluid={placeholder.node.childImageSharp.fluid}
                          style={props.customStyle}
                        />
                      </div>
                      <Skeleton
                        variant="rect"
                        style={{
                          position: "absolute",
                          top: 0,
                          height: "100%",
                          width: "100%",
                          zIndex: 111,
                        }}
                      />
                    </div>
                  }
                />
              )
            }
          } catch (error) {
            return null
          }
        }
        return (
          <Img
            alt={props.alt}
            fluid={image.node.childImageSharp.fluid}
            style={props.customStyle}
          />
        )
      }}
    />
  )
}

export default Image
