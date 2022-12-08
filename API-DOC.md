# API Documentation

## Endpoints :

List of available endpoints:

- `POST /pub/register/`
- `POST /pub/login/`
- `POST /pub/googleLogin/`
- `GET /pub/speech`
- `GET /pub/products/`
- `GET /pub/categories/`
- `GET /pub//products/:id`
- `GET /pub/bookmarks/`
- `POST /pub/midtrans/`
- `DELETE /pub/bookmarks/customer/:CustomerId`
- `DELETE /pub/bookmarks/:ProductId`
- `POST /pub/bookmarks/:ProductId`

&nbsp;

## 1. PUT /categories/:id

Description:

- Edit Category Name to database

Request:

_Response (200 - OK)_

```json
[
  {
    "message": "string"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "string"
}
```

&nbsp;

## 2. POST /pub/register

Description:

- Register Customer to database

Request:

_Response (201 - OK)_

```json
[
  {
    "id": "integer",
    "email": "string"
  }
]
```

&nbsp;

## 3. POST /pub/login

Description:

- Login Customer

Request:

_Response (200 - OK)_

```json
[
  {
    "access_token": "string",
    "id": "integer",
    "username": "string",
    "role": "string"
  }
]
```

\_Response (401 - Unauthorized)

```json
[
  {
    "message": "string"
  }
]
```

\_Response (403 - Forbidden)

```json
[
  {
    "message": "string"
  }
]
```

&nbsp;

## 4. POST /pub/googleLogin

Description:

- Socmed Login Customer

Request:

_Response (200 - OK)_

```json
[
  {
    "access_token": "string",
    "id": "integer",
    "username": "string",
    "role": "string",
    "email": "string"
  }
]
```

&nbsp;

## 5. GET /pub/products

Description:

- Fetch Products

Request:

_Response (200 - OK)_

```json
[
  {
    "name": "string",
    "description": "string",
    "price": "Integer",
    "stock": "Integer",
    "imgUrl": "string",
    "categoryId": "Integer",
    "authorId": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

&nbsp;

## 6. GET /pub/categories

Description:

- Fetch Categories

Request:

_Response (200 - OK)_

```json
[
  {
    "id" : "Integer",
    "name": "String",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

&nbsp;

## 7. GET /pub/products/:id

Description:

- Fetch products by Id

Request:

_Response (200 - OK)_

```json
[
  {
    "name": "string",
    "description": "string",
    "price": "Integer",
    "stock": "Integer",
    "imgUrl": "string",
    "categoryId": "Integer",
    "authorId": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

&nbsp;

## 8. POST /pub/bookmarks

Description:

- Add Bookmarks

Request:

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

&nbsp;

## 9. GET /pub/bookmarks

Description:

- Fetch Bookmarks

Request:

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "CustomerId": "Integer",
    "ProductId": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```
&nbsp;

## 10. GET /pub/midtrans

Description:

- Transaction

Request:

_Response (201 - OK)_

```json
[
  {
    "token": "string",
    "redirect_url": "string"
  }
]
```

&nbsp;

## 11. DELETE /pub/bookmarks/Customer/:CustomerId

Description:

- Delete all bookmark

Request:

_Response (200 - OK)_

```json
[
  {
    "string"
  }
]
```

&nbsp;

## 12. DELETE /pub/bookmarks/:ProductId

Description:

- Delete all bookmark

Request:

_Response (200 - OK)_

```json
[
  {
    "string"
  }
]
```
&nbsp;

## 13. POST /pub/bookmarks/:ProductId

Request:

_Response (200 - OK)_

```json
[
  {
    "id":"integer"
  }
]
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "string"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "string"
}
```
