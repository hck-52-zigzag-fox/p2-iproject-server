## Endpoints

## POST /customers/login

#### Description

- login user

#### Request

- body
  ```json
  {
    "email": string,
    "password": string
  }
  ```

#### Response

_200 - Ok_

- body
  ```json
  {
      "access_token": string,
      "email": string,
      "role": string,
      "id": integer
  }
  ```

_400 - Bad Request_

- body
  ```json
  {
    "message": "Email and password is required"
  }
  ```

_401 - Unauthorized_

- body
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## POST /customers/googleLogin

#### Description

- login with google

#### Request

- headers
  ```json
  {
      "google_token" : string
  }
  ```

#### Response

_200 - Ok_

- body
  ```json
  {
      "access_token": string,
      "email": string,
      "role": string,
      "id": integer
  }
  ```

## GET /items

#### Description

- read all items data
- can be access when login

#### Request

- headers
  ```json
  {
      "access_token": string
  }
  ```

#### response

_200 - Ok_

- body
  ```json
  {
      [
          {
              "id": 1,
        "name": "Bust Up",
            "description": "I will draw u the Bust Up version of your character.",
            "price": 50000,
            "imageUrl": "https://trello.com/1/cards/6310afa34687f0003096cfe5/attachments/631e10849ae2df00a130436d/previews/631e10859ae2df00a1304377/download/Untitled101_20220911231925-01.jpeg",
            "createdAt": "2022-12-08T02:45:31.299Z",
            "updatedAt": "2022-12-08T02:45:31.299Z"
          },
          ...
      ]
  }
  ```

## GET /orders

#### Description

- read all items data
- can be access when login

#### Request

- headers
  ```json
  {
      "access_token": string
  }
  ```

#### response

_200 - Ok_

- body
  ```json
  {
      [
          {
            "id": 1,
            "UserId": 1,
            "ItemId": 2,
            "status": "Unpaid",
            "additionalPrice": null,
            "additionalDetail": null,
            "ImageId": null,
            "createdAt": "2022-12-08T02:45:31.315Z",
            "updatedAt": "2022-12-08T02:45:31.315Z",
            "User": {
                "id": 1,
                "email": "nadya@gmail.com",
                "role": "Customer",
                "createdAt": "2022-12-08T02:45:31.272Z",
                "updatedAt": "2022-12-08T02:45:31.272Z"
            },
            "Item": {
                "id": 2,
                "name": "Knee Up",
                "description": "I will draw u the Knee Up version of your character.",
                "price": 100000,
                "imageUrl": "https://trello.com/1/cards/61df975c0dd2c061d2e8ff34/attachments/623012b5f46e354963dad71c/previews/623012b6f46e354963dad74a/download/SAVE_20220315_111430.jpg",
                "createdAt": "2022-12-08T02:45:31.299Z",
                "updatedAt": "2022-12-08T02:45:31.299Z"
        }
    },
          ...
      ]
  }
  ```

## POST /orders

#### Description

- Add new product
- Can be access when login

#### Request

- headers

  ```json
  {
      "access_token": string
  }
  ```

- body
  ```json
  {
    "name": "celana",
    "description": "test",
    "price": 10000,
    "stock": 67,
    "imgUrl": "asds",
    "categoryId": 1
  }
  ```

#### Response

_201 - Created_

- body
  ```json
  {
    "id": 4,
    "UserId": 1,
    "ItemId": 2,
    "additionalPrice": 12321,
    "additionalDetail": "asdasdhjasd",
    "status": "Unpaid",
    "updatedAt": "2022-12-08T03:44:51.500Z",
    "createdAt": "2022-12-08T03:44:51.500Z",
    "ImageId": null
  }
  ```

_400 - Bad Request_

- body
  ```json
  { "message": "UserId is required" }
  or
  { "message": "ItemId is required" }
  or
  { "message": "ItemId must be an number" }
  or
  { "message": "status is required" }
  or
  {"message": "Status must be Paid/Unpaid"}
  or
  { "message": "ItemId must be an number" }
  or
  {"message": "Price must be more than 0"}
  ```

## GET /orders/:id

#### Description

- read order by id
- can be access when login

#### Request

- headers
  ```json
  {
      "access_token": string
  }
  ```

#### response

_200 - Ok_

- body
  ```json
  {
      [
          {
            "id": 1,
            "UserId": 1,
            "ItemId": 2,
            "status": "Unpaid",
            "additionalPrice": null,
            "additionalDetail": null,
            "ImageId": null,
            "createdAt": "2022-12-08T02:45:31.315Z",
            "updatedAt": "2022-12-08T02:45:31.315Z",
            "User": {
                "id": 1,
                "email": "nadya@gmail.com",
                "role": "Customer",
                "createdAt": "2022-12-08T02:45:31.272Z",
                "updatedAt": "2022-12-08T02:45:31.272Z"
            },
            "Item": {
                "id": 2,
                "name": "Knee Up",
                "description": "I will draw u the Knee Up version of your character.",
                "price": 100000,
                "imageUrl": "https://trello.com/1/cards/61df975c0dd2c061d2e8ff34/attachments/623012b5f46e354963dad71c/previews/623012b6f46e354963dad74a/download/SAVE_20220315_111430.jpg",
                "createdAt": "2022-12-08T02:45:31.299Z",
                "updatedAt": "2022-12-08T02:45:31.299Z"
        }
    },
          ...
      ]
  }
  ```

## PATCH /orders/:id

#### request

- headers
  {
  access_token: string
  }

- params
  {
  id: integer
  }

#### response

200 - Ok
{
"message": "Success update status with id: 2"
}

404 - Not found
{
"message": "Order with ID 10000 Not Found"
}

403 - Forbidden
{
"message": "You cannot access this feature"
}

## DELETE /orders/:id

#### request

- headers
  {
  access_token: string
  }

- params
  {
  id: integer
  }

#### response

200 - Ok
{
"message": "Success delete order with id: 1"
}

404 - Not found
{
"message": "Order with ID 10000 Not Found"
}

403 - Forbidden
{
"message": "You cannot access this feature"
}

## POST /orders/images/:id

#### request

- headers
  {
  access_token: string
  }

- body
  {
  url: string,
  fileName:string
  }

#### response

200 - Ok
{
"fileId": "639161cee809dd54b0d9df05",
"name": "ajshdjksad_umaMo7KpE",
"size": 6,
"versionInfo": {
"id": "639161cee809dd54b0d9df05",
"name": "Version 1"
},
"filePath": "/ajshdjksad_umaMo7KpE",
"url": "https://ik.imagekit.io/iprojectNadya/ajshdjksad_umaMo7KpE",
"fileType": "non-image",
"AITags": null
}

404 - Not Found
{
"message": "Order with ID 10000 Not Found"
}

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": "Please login first"
  }
  ```
