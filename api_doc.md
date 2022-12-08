# Movies API Documentation

## Endpoints :

List of available endpoints:

Endpoint Users:

- `POST /users/register`
- `POST /users/login`
- `POST /users/googleLogin`

Endpoint Motorcycles:

- `GET /motorcycles`
- `GET /motorcycles/:id`

Endpoint News:

- `GET /news`

Endpoint Rents:

- `POST /rents/payment/:id/:price/:trxcode`
- `PATCH /rents/:id`
- `POST /rents/:id`

&nbsp;

## ENDPOINT USERS

&nbsp;

## 1. POST /users/register

Request:

- body

```json
{
  "email": "janu@gmail.com",
  "password": "qwe123"
}
```

_Response (201 - Created)_

```json
{
  "id": 12,
  "email": "nabil@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "password is required"
}
```

&nbsp;

## 2. POST /users/login

Request:

- body

```json
{
  "email": "janu@gmail.com",
  "password": "qwe123"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY2ODY5MTU0OX0.v7gxTujb2RYUJ0FX8BvLs3RxiQCdEGxdeE1rzWO_wvc",
  "user": {
    "id": 1,
    "email": "janu@gmail.com"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email or password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid email or password"
}
```

&nbsp;

## 3. POST /users/googleLogin

Request:

- Sign in by Google Account

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTY2ODc0MzIyOX0.3dyj5eE6ebg7FidZLIFuwi1NQ472YmBf4l5vtRylz68",
  "user": {
    "id": 3,
    "email": "muhammadjanu30@gmail.com"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email or password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid email or password"
}
```

&nbsp;

## ENDPOINT MOTORCYCLES

&nbsp;

## 2. GET /motorcycles

Description:

- Get all movie from database

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "type": "ZX10-R",
        "cc": 985,
        "price": 1200000,
        "BrandId": 1,
        "facility": "Helm fullface AGV",
        "status": "booked",
        "imageUrl": "https://asset.kompas.com/crops/3J_ezvrHzmM8r0l6DMHL8-7D53I=/0x107:2560x1814/750x500/data/photo/2020/11/24/5fbc2cf88f751.jpg",
        "Brand": {
            "id": 1,
            "name": "Kawasaki",
        }
    },
    ...,
]
```

&nbsp;

## 2. GET /motorcycles/:id

Description:

- Detail movie by id

Request:

- headers

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY2ODUyMjQxM30.lzkf4NMjIv3Ra2wA2ocnUCj0Pmp8e_sY5X1YdjFOKQ0"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 3,
  "type": "Z1000",
  "cc": 996,
  "price": 1300000,
  "BrandId": 1,
  "facility": "Helm fullface AGV",
  "status": "booked",
  "imageUrl": "https://i0.wp.com/warungasep.net/wp-content/uploads/2016/10/ninja-zx-1000-sx-green-2017.jpg?ssl=1",
  "Brand": {
    "id": 1,
    "name": "Kawasaki"
  }
}
```

_Response (404 - not found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## ENDPOINT NEWS

&nbsp;

## 1. GET /news

Description:

- Get all genres movie from database

_Response (200 - OK)_

```json
[
    {
        "_type": "NewsArticle",
        "name": "Single ‘murder hornet’ queen may have led insect’s aggressive invasion of Europe",
        "url": "https://www.msn.com/en-gb/news/world/single-murder-hornet-queen-may-have-sparked-insect-s-aggressive-invasion-of-europe/ar-AA150zhh",
        "image": {
            "_type": "ImageObject",
            "thumbnail": {
                "_type": "ImageObject",
                "contentUrl": "https://www.bing.com/th?id=OVFT.QIHmSiOltVcD-hVSfy6Sri&pid=News",
                "width": 1199,
                "height": 599
            },
            "isLicensed": true
        },
        "description": "Single ‘murder hornet’ queen may have led insect’s aggressive invasion of Europe - Scientists say findings are both ‘bad news’ and ‘good news’ for control of the invasive species in Europe",
        "provider": [
            {
                "_type": "Organization",
                "name": "The Independent",
                "image": {
                    "_type": "ImageObject",
                    "thumbnail": {
                        "_type": "ImageObject",
                        "contentUrl": "https://www.bing.com/th?id=ODF.Itq1YaygZYquIY-bZPUV3w&pid=news"
                    }
                }
            }
        ],
        "datePublished": "2022-12-07T16:42:00.0000000Z"
    },
  ....,
]
```

&nbsp;

## ENDPOINT RENTS

&nbsp;

## 1. POST /rents/payment/:price/:trxcode

Request:

- headers

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5OTczNzU4fQ.5vBKlstqShhxw5sfO58JEknRPoB5i9PSfjgYgBS9et4"
}
```

- params

```json
{
  "price": "integer",
  "trxcode": "string"
}
```

_Response (201 - Created)_

```json
{
  "token": "5465647c-9544-4e5b-87de-c7af35d9bbec",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/5465647c-9544-4e5b-87de-c7af35d9bbec"
}
```

&nbsp;

## 2. PATCH /rents/:id

Request:

- headers

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5OTczNzU4fQ.5vBKlstqShhxw5sfO58JEknRPoB5i9PSfjgYgBS9et4"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Motorcycle has been booked"
}
```

_Response (404 - not found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 3. POST /rents/:id

Request:

- headers

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5OTczNzU4fQ.5vBKlstqShhxw5sfO58JEknRPoB5i9PSfjgYgBS9et4"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 4,
  "UserId": 1,
  "MotorcycleId": 1
}
```

_Response (404 - not found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first!"
}
```
