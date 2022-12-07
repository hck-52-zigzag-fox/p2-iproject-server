# Uap Games API Documentation

## Endpoints :

List of available endpoints:

Public:
- `POST /users/register`
- `POST /users/login`

&nbsp;

## 1. POST /users/register

Request:

-body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Email is required", "Password is required"]
}
OR
{
  "message": ["Email is required", "Invalid email format", "Password is required"]
}
OR
{
  "message": ["Email already used"]
}
```

&nbsp;

## 2. POST /users/login

Request:

-body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
    "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Both Email and Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```