# Uap Games API Documentation

## Endpoints :

List of available endpoints:

Public:
- `POST /users/register`
- `POST /users/login`
- `GET /games`
- `GET /games/steam/:steamAppID`
- `GET /games/cheapshark/:gameID`

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

## 3. GET /games

Request:

-query:

```json
{
    "page": "integer",
    "search": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "internalName": "WANDERER",
        "title": "Wanderer",
        "metacriticLink": "/game/pc/wanderer",
        "dealID": "85%2BjLZBdD2SdpO6ZiPaDfJfocVPztNLbz00nhu7d7lk%3D",
        "storeID": "1",
        "gameID": "239925",
        "salePrice": "3.49",
        "normalPrice": "34.99",
        "isOnSale": "1",
        "savings": "90.025722",
        "metacriticScore": "81",
        "steamRatingText": "Positive",
        "steamRatingPercent": "92",
        "steamRatingCount": "13",
        "steamAppID": "1599560",
        "releaseDate": 1643241600,
        "lastChange": 1670371102,
        "dealRating": "10.0",
        "thumb": "https://cdn.cloudflare.steamstatic.com/steam/apps/2027350/capsule_sm_120.jpg?t=1656386201"
    },
    {
        "internalName": "DISCOELYSIUMTHEFINALCUT",
        "title": "Disco Elysium - The Final Cut",
        "metacriticLink": "/game/pc/disco-elysium-the-final-cut",
        "dealID": "Uk9pH81%2BgPUwbkh9YzwMnYLT%2B%2FEaktqN8AgwMr6Y2wQ%3D",
        "storeID": "1",
        "gameID": "227942",
        "salePrice": "10.00",
        "normalPrice": "39.99",
        "isOnSale": "1",
        "savings": "74.993748",
        "metacriticScore": "97",
        "steamRatingText": "Very Positive",
        "steamRatingPercent": "93",
        "steamRatingCount": "62913",
        "steamAppID": "632470",
        "releaseDate": 1617062400,
        "lastChange": 1670398394,
        "dealRating": "9.9",
        "thumb": "https://cdn.cloudflare.steamstatic.com/steam/apps/632470/capsule_sm_120.jpg?t=1667483149"
    },
    {
        "internalName": "STOREKEEPERREVENGE",
        "title": "Storekeeper Revenge",
        "metacriticLink": "/game/pc/storekeeper-revenge",
        "dealID": "wh23Xgm5sjYY0eX2vaiwEDiJDQP9PkNGWv62pgR%2BOOo%3D",
        "storeID": "1",
        "gameID": "252037",
        "salePrice": "1.99",
        "normalPrice": "19.99",
        "isOnSale": "1",
        "savings": "90.045023",
        "metacriticScore": "0",
        "steamRatingText": "Positive",
        "steamRatingPercent": "100",
        "steamRatingCount": "10",
        "steamAppID": "2019630",
        "releaseDate": 1665446400,
        "lastChange": 1670273256,
        "dealRating": "9.6",
        "thumb": "https://cdn.cloudflare.steamstatic.com/steam/apps/2019630/capsule_sm_120.jpg?t=1665478208"
    },
    ...
]
```

&nbsp;

## 4. GET /games/steam/:steamAppID

Request:

-params:

```json
{
    "steamAppID": "integer"
}
```

_Response (200 - OK)_

```json
{
    "imgUrl": "https://cdn.akamai.steamstatic.com/steam/apps/35140/header.jpg?t=1634156906",
    "title": "Batman: Arkham Asylum Game of the Year Edition",
    "developer": {
        "link": "https://store.steampowered.com/search/?developer=Rocksteady%20Studios&snr=1_5_9__400",
        "name": "Rocksteady Studios"
    },
    "publisher": {
        "link": "https://store.steampowered.com/publisher/WBGames?snr=1_5_9__400",
        "name": "Warner Bros. Interactive Entertainment"
    },
    "released": "26 Mar, 2010",
    "description": "Experience what it’s like to be Batman and face off against Gotham's greatest villians. Explore every inch of Arkham Asylum and roam freely on the infamous island.",
    "tags": [
        {
            "url": "https://store.steampowered.com/tags/en/Action/?snr=1_5_9__409",
            "name": "Action"
        },
        {
            "url": "https://store.steampowered.com/tags/en/Stealth/?snr=1_5_9__409",
            "name": "Stealth"
        },
        {
            "url": "https://store.steampowered.com/tags/en/Third%20Person/?snr=1_5_9__409",
            "name": "Third Person"
        },
        ...
    ],
    "allReviews": {
        "summary": "Overwhelmingly Positive"
    },
    "price": "19,99€",
    "DLCs": []
}
```

&nbsp;

## 5. GET /games/cheapshark/:gameID

Request:

-params:

```json
{
    "gameID": "integer"
}
```

_Response (200 - OK)_

```json
{
    "info": {
        "title": "Batman: Arkham Asylum Game of the Year Edition",
        "steamAppID": "35140",
        "thumb": "https://cdn.cloudflare.steamstatic.com/steam/apps/35140/capsule_sm_120.jpg?t=1634156906"
    },
    "cheapestPriceEver": {
        "price": "3.80",
        "date": 1567154111
    },
    "deals": [
        {
            "storeID": "32",
            "dealID": "bDyGRBd6zYgwvMrueW9m1DFFdCKLAmNcDqgJUwdYeeQ%3D",
            "price": "4.16",
            "retailPrice": "19.99",
            "savings": "79.189595"
        },
        {
            "storeID": "23",
            "dealID": "LNCZ5EicmEMiwyfYVw%2FNdGPos9V7MzoPId2UuwaBqvA%3D",
            "price": "14.95",
            "retailPrice": "19.99",
            "savings": "25.212606"
        },
        {
            "storeID": "1",
            "dealID": "HR5V6hEl39sGwYodeqwwWuo8dKtKukteV0W9we9pI7I%3D",
            "price": "19.99",
            "retailPrice": "19.99",
            "savings": "0.000000"
        },
        ...
    ]
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid API key. Go to https://docs.rapidapi.com/docs/keys for more info."
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "You are not subscribed to this API."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```