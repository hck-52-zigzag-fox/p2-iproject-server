# Movie API Documentation

## Endpoints :

List of available endpoints:

## endpoints/users

- `POST/users/register`
- `POST/users/login`
- `POST/users/google-sign-in`

## endpoints/product
- `POST/product`
## endpoints/order
- `GET/order/city`
- `Post/order/ongkir`
- `GET/order`
- `POST/order/add/:id`
- `DELETE/order/:id`
- `PATCH/order/:id`
- `POST/order/payment`

## endpoints/category



## 1. POST /product

Description :

- Created new cust

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "username": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 4,
  "email": "j@gmail.com"
}
```

_Response (400 - bad request)_

```json
{
  "message": "Email Already Used"
}
OR
{
  "message": "Format Email Required"
}
OR
{
  "message": "username required"
}
OR
{
  "message": "password required"
}
OR
{
  "message": "phone number required"
}
{
  "message": "address required"
}
```

_Response (500 - internal server error)_

```json
{
  "message": "internal server error"
}
```

&nbsp;

## 2. POST /customers/pub/google-sign-in

Description :

- Created new cust by google

Request:
-headers :
{
"google_token" : string
}

_Response (201 - Created)_

- body:

```json
{
  "access_token": "string",
  "email": "string"
}
```

_Response (401 - Unathorized)_

```js
{
  "message": "Invalid Token"
}
```

&nbsp;

## 3. POST /customers/pub/login

Description :

- Login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "email": "j@gmail.com",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjcwMTk2MzUwfQ.ZJub04exOYr_qXt38eM36rDidGMFMHKXjzz3nDxZiOA"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;


## 4. GET customers/pub/movies

Description:

- Get all movie from database by filter,pagination, search

Request:
query
```json
{
"filter": "genreId",
"search": "name",
"page": "integer"
}
```

_Response (200 - OK)_

```json
{
    "total": 4,
    "rows": [
        {
            "id": 1,
            "title": "black adam",
            "synopsis": "Black Adam is a 2022 American superhero film starring Dwayne Johnson as the titular DC Comics character. The film is a spin-off from Shazam! (2019) and the eleventh film in the DC Extended Universe (DCEU).",
            "trailerUrl": "https://www.youtube.com/watch?v=mkomfZHG5q4",
            "imgUrl": "https://statics.indozone.news/local/62a03f2cb5b8b.jpg",
            "rating": 8,
            "genreId": 4,
            "authorId": 1,
            "status": "Active",
            "Genre": {
                "id": 4,
                "name": "Action",
                "createdAt": "2022-12-04T06:59:21.116Z",
                "updatedAt": "2022-12-04T06:59:21.116Z"
            }
        },
        {
            "id": 2,
            "title": "Harry Potter and the Sorcerer's Stone (2001)",
            "synopsis": "Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.",
            "trailerUrl": "youtube.com/watch?v=VyHV0BRtdxo",
            "imgUrl": "https://images.tokopedia.net/img/cache/700/product-1/2018/10/1/4030377/4030377_cffd0f5b-87b8-4cc9-915b-5096d1ff13c5_720_720.jpg",
            "rating": 9,
            "genreId": 2,
            "authorId": 1,
            "status": "Active",
            "Genre": {
                "id": 2,
                "name": "Drama",
                "createdAt": "2022-12-04T06:59:21.116Z",
                "updatedAt": "2022-12-04T06:59:21.116Z"
            }
        },
        {
            "id": 3,
            "title": "Harry Potter and the Chamber of Secrets",
            "synopsis": "The second instalment of boy wizard Harry Potter's adventures at Hogwarts School of Witchcraft and Wizardry, based on the novel by JK Rowling. A mysterious elf tells Harry to expect trouble during his second year at Hogwarts, but nothing can prepare him for trees that fight back, flying cars, spiders that talk and deadly warnings written in blood on the walls of the school.",
            "trailerUrl": "https://www.youtube.com/watch?v=jBltxS8HfQ4",
            "imgUrl": "https://upload.wikimedia.org/wikipedia/id/thumb/5/5c/Harry_Potter_and_the_Chamber_of_Secrets.jpg/800px-Harry_Potter_and_the_Chamber_of_Secrets.jpg",
            "rating": 8,
            "genreId": 3,
            "authorId": 2,
            "status": "Active",
            "Genre": {
                "id": 3,
                "name": "Comedy",
                "createdAt": "2022-12-04T06:59:21.116Z",
                "updatedAt": "2022-12-04T06:59:21.116Z"
            }
        },
        {
            "id": 5,
            "title": "Harry Potter and the Goblet of Fire",
            "synopsis": "The fourth movie in the Harry Potter franchise sees Harry (Daniel Radcliffe) returning for his fourth year at Hogwarts School of Witchcraft and Wizardry, along with his friends, Ron (Rupert Grint) and Hermione (Emma Watson). There is an upcoming tournament between the three major schools of magic, with one participant selected from each school by the Goblet of Fire. When Harry's name is drawn, even though he is not eligible and is a fourth player, he must compete in the dangerous contest.",
            "trailerUrl": "https://www.youtube.com/watch?v=3EGojp4Hh6I",
            "imgUrl": "https://m.media-amazon.com/images/I/71DmBF2SE3L._AC_SY679_.jpg",
            "rating": 9,
            "genreId": 5,
            "authorId": 2,
            "status": "Active",
            "Genre": {
                "id": 5,
                "name": "Thriller",
                "createdAt": "2022-12-04T06:59:21.116Z",
                "updatedAt": "2022-12-04T06:59:21.116Z"
            }
        },
        {
            "id": 6,
            "title": "Harry Potter and the Order of the Phoenix",
            "synopsis": "Now in his fifth year at Hogwarts, Harry (Daniel Radcliffe) learns that many in the wizarding community do not know the truth of his encounter with Lord Voldemort. Cornelius Fudge, minister of Magic, appoints his toady, Dolores Umbridge, as Defense Against the Dark Arts teacher, for he fears that professor Dumbledore will take his job. But her teaching is deficient and her methods, cruel, so Harry prepares a group of students to defend the school against a rising tide of evil.",
            "trailerUrl": "https://www.youtube.com/watch?v=y6ZW7KXaXYk",
            "imgUrl": "https://i.pinimg.com/originals/01/f0/62/01f0625c8e61586d543b1f2d34cd31a8.jpg",
            "rating": 8,
            "genreId": 3,
            "authorId": 2,
            "status": "Active",
            "Genre": {
                "id": 3,
                "name": "Comedy",
                "createdAt": "2022-12-04T06:59:21.116Z",
                "updatedAt": "2022-12-04T06:59:21.116Z"
            }
        },
        {
            "id": 7,
            "title": "Harry Potter and the Half-Blood Prince",
            "synopsis": "As Death Eaters wreak havoc in both Muggle and Wizard worlds, Hogwarts is no longer a safe haven for students. Though Harry (Daniel Radcliffe) suspects there are new dangers lurking within the castle walls, Dumbledore is more intent than ever on preparing the young wizard for the final battle with Voldemort. Meanwhile, teenage hormones run rampant through Hogwarts, presenting a different sort of danger. Love may be in the air, but tragedy looms, and Hogwarts may never be the same again.",
            "trailerUrl": "https://www.youtube.com/watch?v=ZgMIlFDIPNc",
            "imgUrl": "https://m.media-amazon.com/images/I/71C4bkYFWSL._AC_SY606_.jpg",
            "rating": 8,
            "genreId": 2,
            "authorId": 2,
            "status": "Active",
            "Genre": {
                "id": 2,
                "name": "Drama",
                "createdAt": "2022-12-04T06:59:21.116Z",
                "updatedAt": "2022-12-04T06:59:21.116Z"
            }
        },
        {
            "id": 8,
            "title": "Harry Potter and the Deathly Hallows–Part 1",
            "synopsis": "Without the guidance and protection of their professors, Harry (Daniel Radcliffe), Ron (Rupert Grint) and Hermione (Emma Watson) begin a mission to destroy the Horcruxes, the sources of Voldemort's immortality. Though they must rely on one another more than ever, dark forces threaten to tear them apart. Voldemort's Death Eaters have seized control of the Ministry of Magic and Hogwarts, and they are searching for Harry -- even as he and his friends prepare for the ultimate showdown.",
            "trailerUrl": "https://www.youtube.com/watch?v=MxqsmsA8y5k",
            "imgUrl": "https://cdn.europosters.eu/image/750/posters/harry-potter-7-part-2-teaser-i11030.jpg",
            "rating": 9,
            "genreId": 5,
            "authorId": 2,
            "status": "Active",
            "Genre": {
                "id": 5,
                "name": "Thriller",
                "createdAt": "2022-12-04T06:59:21.116Z",
                "updatedAt": "2022-12-04T06:59:21.116Z"
            }
        },
        {
            "id": 9,
            "title": "Harry Potter and the Deathly Hallows-Part 2",
            "synopsis": "Without the guidance and protection of their professors, Harry (Daniel Radcliffe), Ron (Rupert Grint) and Hermione (Emma Watson) begin a mission to destroy the Horcruxes, the sources of Voldemort's immortality. Though they must rely on one another more than ever, dark forces threaten to tear them apart. Voldemort's Death Eaters have seized control of the Ministry of Magic and Hogwarts, and they are searching for Harry -- even as he and his friends prepare for the ultimate showdown.",
            "trailerUrl": "https://www.youtube.com/watch?v=5NYt1qirBWg",
            "imgUrl": "https://m.media-amazon.com/images/I/71Uqy34noML._AC_SY679_.jpg",
            "rating": 9,
            "genreId": 1,
            "authorId": 2,
            "status": "Active",
            "Genre": {
                "id": 1,
                "name": "Horror",
                "createdAt": "2022-12-04T06:59:21.116Z",
                "updatedAt": "2022-12-04T06:59:21.116Z"
            }
        }
    ]
}
```


&nbsp;

## 5. GET /customers/pub/movies-cust/:id

Description:

- Get movie details

Request:
params : {
  ```json
  "id" : "integer"
  ```
}


_Response (200 - OK)_

```json
{
    "id": 2,
    "title": "Harry Potter and the Sorcerer's Stone (2001)",
    "synopsis": "Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.",
    "trailerUrl": "youtube.com/watch?v=VyHV0BRtdxo",
    "imgUrl": "https://images.tokopedia.net/img/cache/700/product-1/2018/10/1/4030377/4030377_cffd0f5b-87b8-4cc9-915b-5096d1ff13c5_720_720.jpg",
    "rating": 9,
    "genreId": 2,
    "authorId": 1,
    "status": "Active",
    "createdAt": "2022-12-04T06:59:21.235Z",
    "updatedAt": "2022-12-04T06:59:21.235Z"
}
```

_Response (404 - not found)_

```js
{
  "message": "Movie not found"
}
```

## 6. GET customers/pub/genres

Description:

- Get all movie from database by filter,pagination, search

Request:

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Horror",
        "createdAt": "2022-12-04T06:59:21.116Z",
        "updatedAt": "2022-12-04T06:59:21.116Z"
    },
    {
        "id": 2,
        "name": "Drama",
        "createdAt": "2022-12-04T06:59:21.116Z",
        "updatedAt": "2022-12-04T06:59:21.116Z"
    },
    {
        "id": 3,
        "name": "Comedy",
        "createdAt": "2022-12-04T06:59:21.116Z",
        "updatedAt": "2022-12-04T06:59:21.116Z"
    },
    {
        "id": 4,
        "name": "Action",
        "createdAt": "2022-12-04T06:59:21.116Z",
        "updatedAt": "2022-12-04T06:59:21.116Z"
    },
    {
        "id": 5,
        "name": "Thriller",
        "createdAt": "2022-12-04T06:59:21.116Z",
        "updatedAt": "2022-12-04T06:59:21.116Z"
    }
]
``` 

&nbsp;

## 7. GET customers/pub/movies-cust

Description:

- get bookmarks users

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body

```json
{
    "fav": [
        {
            "id": 7,
            "CustomerId": 1,
            "MovieId": 1,
            "createdAt": "2022-12-04T07:33:52.656Z",
            "updatedAt": "2022-12-04T07:33:52.656Z",
            "WatchList": {
                "id": 1,
                "title": "black adam",
                "synopsis": "Black Adam is a 2022 American superhero film starring Dwayne Johnson as the titular DC Comics character. The film is a spin-off from Shazam! (2019) and the eleventh film in the DC Extended Universe (DCEU).",
                "trailerUrl": "https://www.youtube.com/watch?v=mkomfZHG5q4",
                "imgUrl": "https://statics.indozone.news/local/62a03f2cb5b8b.jpg",
                "rating": 8,
                "genreId": 4,
                "authorId": 1,
                "status": "Active",
                "createdAt": "2022-12-04T06:59:21.235Z",
                "updatedAt": "2022-12-04T06:59:21.235Z",
                "Genre": {
                    "id": 4,
                    "name": "Action",
                    "createdAt": "2022-12-04T06:59:21.116Z",
                    "updatedAt": "2022-12-04T06:59:21.116Z"
                }
            }
        },
        {
            "id": 8,
            "CustomerId": 1,
            "MovieId": 8,
            "createdAt": "2022-12-04T07:46:04.753Z",
            "updatedAt": "2022-12-04T07:46:04.753Z",
            "WatchList": {
                "id": 8,
                "title": "Harry Potter and the Deathly Hallows–Part 1",
                "synopsis": "Without the guidance and protection of their professors, Harry (Daniel Radcliffe), Ron (Rupert Grint) and Hermione (Emma Watson) begin a mission to destroy the Horcruxes, the sources of Voldemort's immortality. Though they must rely on one another more than ever, dark forces threaten to tear them apart. Voldemort's Death Eaters have seized control of the Ministry of Magic and Hogwarts, and they are searching for Harry -- even as he and his friends prepare for the ultimate showdown.",
                "trailerUrl": "https://www.youtube.com/watch?v=MxqsmsA8y5k",
                "imgUrl": "https://cdn.europosters.eu/image/750/posters/harry-potter-7-part-2-teaser-i11030.jpg",
                "rating": 9,
                "genreId": 5,
                "authorId": 2,
                "status": "Active",
                "createdAt": "2022-12-04T06:59:21.235Z",
                "updatedAt": "2022-12-04T06:59:21.235Z",
                "Genre": {
                    "id": 5,
                    "name": "Thriller",
                    "createdAt": "2022-12-04T06:59:21.116Z",
                    "updatedAt": "2022-12-04T06:59:21.116Z"
                }
            }
        },
        .....
    ]
```


Response (401 - Unathorized)\_

```js
{
    "message": "Please login first"
}
```

&nbsp;

## 8. POST /customers/pub/movies-cust/:id

Description:

- add bookmark

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```


_Response (201 - CREATED)_

```json
{
    "id": 13,
    "CustomerId": 1,
    "MovieId": 5,
    "updatedAt": "2022-12-04T23:47:36.049Z",
    "createdAt": "2022-12-04T23:47:36.049Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

Response (401 - Unathorized)\_

```js
{
    "message": "Please login first"
}
```

&nbsp;

#

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
