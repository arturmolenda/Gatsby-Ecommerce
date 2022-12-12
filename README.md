# Gatsby-Ecommerce
![GatsbyStore](https://user-images.githubusercontent.com/60189847/111696032-12cc7c00-8834-11eb-8c70-575836dd9050.jpg)
Ecommerce store with custom cms. Built using [Gatsby JS](https://www.gatsbyjs.com/) for frontend and [Node JS](https://nodejs.org/) with [Express](https://expressjs.com/) for backend and [MongoDB](http://mongodb.com/) for database.

## [live demo](https://gatsby-ecommerce.up.railway.app/)

To try administrator features please use this account 

email: **admin@example.com**

password: **123456**

**If products are missing or there is something wrong with them, then please use the reset button in the profile tab**

# Features
  - Frontend
      - [Gatsby JS](https://www.gatsbyjs.com/)
      - [Redux](https://redux.js.org/) state management
      - [Material-UI](https://material-ui.com/)
      - [axios](https://github.com/axios/axios) for api calls
      - Custom content management system
        - Pagination and search option for each admin screen
        - Creating, deleting, updating products
            - Rich text
            - Image Upload
            - Discount with expire date
            - Labels with custom colors
        - Creating, deleting, updating coupons
            - Either in $ or %
            - Unique codes
            - Unlimited or once per user 
            - Expire date and minimal price to apply
        - Deleting and updating user's permissions
            - Option to delete user or set permissions to administrator
        - Updating placed orders
            - Mark orders as shipped
            - Add tracking link
      - User Profile
        - Option to update name, email and password (disabled for admin@example.com user)
        - View placed orders with pagination
        - Reset Products button (available only for portfolio purposses in case where someone would delete all products you can reset them to initial state)
      - Cart
        - Add products
        - Delete products
        - Change product quantity
      - Checkout, Shipping, Payment Select and Place Order screens
        - Shipping address is saved in local storage for future uses
        - Apply discount on Place Order screen
      - Login and Register
      - PayPal payments
      - Product search by keyword
      - Product rating system
      - Products pagination
      - Skeleton for products load
  - Backend
    - [Node JS](https://nodejs.org/)
    - [Express](https://expressjs.com/)
    - [Mongoose](https://mongoosejs.com/)
    - [MongoDB](http://mongodb.com/)
    - REST API
    - JWT authentication
    - Multer to save images locally



