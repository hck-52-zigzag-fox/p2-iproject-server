List of User Endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`
- `GET /teams`
- `GET /players`
- `PATCH /upgrade`
- `POST /tokens`
- `GET /matches`

## 1. POST /register

Request:

- body

```json
 {
    "email" : STRING,
    "password" : STRING,
    "status": STRING,
}
```

_Response (201 - Created)_

```json
{
    "email" : STRING,
    "password" : STRING,
    "status": STRING,
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Must be Email format"
}
OR
{
  "message": "Email already taken"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body

```json
{
  "email": STRING,
  "password": STRING
}
```

_Response (200 - OK)_

```json
{
  "access_token": STRING,
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

&nbsp;

## 3. POST /login-google

Request:

- Sign in by Google Account

_Response (200 - OK)_

```json
{
  "access_token": STRING,
}
```

&nbsp;

## 4. GET /teams

Request:

- headers

```json
{
  "access_token": STRING,
  "X-RapidAPI-Key": STRING,
  "X-RapidAPI-Host": STRING,
}
```

_Response (200 - OK)_

```json
[
  "data": [
        {
            "id": INTEGER,
            "abbreviation": STRING,
            "city": STRING,
            "conference": STRING,
            "division": STRING,
            "full_name": STRING,
            "name": STRING
        },
  ]
]
```

&nbsp;

## 5. GET /players

Request:

- headers

```json
{
  "access_token": STRING,
  "X-RapidAPI-Key": STRING,
  "X-RapidAPI-Host": STRING,
}
```

_Response (200 - OK)_

```json
[
  "data": [
        {
            "id": INTEGER,
            "first_name": STRING,
            "height_feet": INTEGER,
            "height_inches": INTEGER,
            "last_name": STRING,
            "position": STRING,
            "team": {
                "id": INTEGER,
                "abbreviation": STRING,
                "city": STRING,
                "conference": STRING,
                "division": STRING,
                "full_name": STRING,
                "name": STRING
            },
            "weight_pounds": INTEGER
        },
        ]
]
```

&nbsp;

## 6. PATCH /upgrade

Request:

- headers

```json
{
  "access_token": STRING
}
```

- params

```json
{
  "id": INTEGER
}
```

- body:

```json
{
  "status": STRING,
}
```

_Response (200 - OK)_

```json
{
  "message": "${foundUser.email} success updated status into ${status}"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not Found"
}
```

&nbsp;

## 7. POST /tokens

Request:

- headers

```json
{
  "access_token": STRING,
  "serverKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "token": STRING,
    "redirect_url": STRING
  }
]
```

&nbsp;

## 8. GET /matches

Request:

- headers

```json
{
  "access_token": STRING,
  "X-RapidAPI-Key": STRING,
  "X-RapidAPI-Host": STRING,
}
```

_Response (200 - OK)_

```json
[
 "data": [
        {
            "id": INTEGER,
            "date": DATE,
            "home_team": {
                "id": INTEGER,
                "abbreviation": STRING,
                "city": STRING,
                "conference": STRING,
                "division": STRING,
                "full_name": STRING,
                "name": STRING
            },
            "home_team_score": INTEGER,
            "period": INTEGER,
            "postseason": STRING,
            "season": INTEGER,
            "status": STRING,
            "time": INTEGER,
            "visitor_team": {
                "id": INTEGER,
                "abbreviation": STRING,
                "city": STRING,
                "conference": STRING,
                "division": STRING,
                "full_name": STRING,
                "name": STRING
            },
            "visitor_team_score": INTEGER
        },
        ]
]
```

&nbsp;
