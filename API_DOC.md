Individual Project - RZ Gaming Community

## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /profiles`
- `GET /profiles/:id`
- `POST /posts`
- `GET /posts`
- `GET /games`

### 1. POST /register

#### Description

- Create a new users data

#### Request

- Body
  ```json
  {
    "username": String,
    "email": String,
    "password": String,
  }
  ```

_201 - Created_

- Body
  ```json
  {
    "id": INTEGER,
    "email": STRING
  }
  ```

_400 - Bad Request_

- Body
  ```json
    {
      "message": "Username already exist"
    }
    OR
    {
      "message": "Username is required"
    }
    OR
    {
      "message": "Email is required"
    }
    OR
    {
      "message": "Email already exist"
    }
    OR
    {
      "message": "Must use Email Format"
    }
    OR
    {
      "message": "Password is required"
    }
  ```

### 2. POST /login

#### Description

- Process users to access a site

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
  "access_token": String,
  "id": Integer,
  "username": String,
  "email": String,
  }
  ```

  _400 - Bad Request_

- Body

  ```json
  {
    "message": "Email/password is required"
  }
  ```

  _401 - invalid_credentials_

- Body
  ```json
  {
    "message": "Email/password is invalid"
  }
  ```

### 3. POST /profiles

#### Description

- Create a new profiles data for user

#### Request

- Headers
  ```json
  {
    "Content-Type": "multipart/form-data",
    "access_token": string
  }
  ```
- Body
  ```json
  {
    "imgUrl": String,
    "gender": String,
    "dateOfBirth": Date,
    "location": String,
    "games": String,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json

  {
    "imgUrl": String,
    "gender": String,
    "dateOfBirth": Date,
    "location": String,
    "games": String,
    "UserId": Integer,
    "updatedAt": Date,
    "createdAt": Date
  }
  ```

_400 - Bad Request_

- Body

  ```json
    {
      "message": "Image url is required"
    }
    OR
    {
      "message": "Gender is required"
    }
    OR
    {
      "message": "Location is required"
    }
    OR
    {
      "message": "Games is required"
    }
    {
      "message": "User only can have 1 profile"
    }
  ```

### 4. GET /profiles/:id

#### Description

- Get Profiles data include Users data column username based on given id

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "id": Integer,
    "imgUrl": String,
    "gender": String,
    "dateOfBirth": Women,
    "location": String,
    "games": String,
    "User": {
      "username": String
    }
  }
  ```

  _404 - Not Found_

- Body
  ```json
  {
    "message": "Data not found"
  }
  ```

### 5. POST /posts

#### Description

- Create a new posts data

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```
- Body
  ```json
  {
    "Content": String,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "id": Integer,
    "content": String,
    "UserId": Integer,
    "updatedAt": Date,
    "createdAt": Date
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": "Post is required"
  }
  ```

### 6. GET /posts

#### Description

- Get all the Posts include Users data column username include Profile data column imgUrl

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "id": Integer,
        "content": String,
        "UserId": Integer,
        "createdAt": Date,
        "User": {
            "username": String,
            "Profile": {
                "imgUrl": String
            }
        }
    },
      ...
  ]
  ```

### 7. GET /games

#### Description

- Get games data from 3rd party api mmo-games from rapid api

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "id": Integer,
        "title": String,
        "thumbnail": String,
        "short_description": String,
        "game_url": String,
        "genre": String,
        "platform": String,
        "publisher": String,
        "developer": String,
        "release_date": Date,
        "profile_url": String
    },
      ...
  ]
  ```

### Global Error

#### Response

_Response (401 - Unauthorized)_

- Body
  ```json
  {
    "message": "Invalid token"
  }
  ```

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
