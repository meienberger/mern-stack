
# Alaya mern dev challenge | Nicolas Meienberger's application 

This is my forked repo from the Alaya dev challenge. Here you'll find my final result and some explaination on how I implemented the requested features.

## Happy reviewing :)

### 0 - Base app changes

To make it easier for me to develop locally, I created a `docker-compose.yml` file which runs the whole project as 3 containers (db, server, client) without any further configuration.

just run `docker-compose up` inside the root directory of the project.

You can still run the project like the initial base app by having mongo installed locally and by launching the server and then the client app. (Please refer to the [README](https://github.com/Onigam/mern-stack/blob/master/README.md) from the original repo)

If you want to start the project manually (without docker) be sure to install `node_modules` in both client and server and you should use my start script on the server (`yarn start` or `npm run start`) to support the custom babel configuration.

---

I added some basic packages and configurations I like to use in my personnal projects. 

- Babel configuration to support ES6 syntax on the server
- ESLint + Prettier to help me to point out issues quickly and to maintain a consistent syntax accross all the files

I also refactored the client app structure to separate every part of the app in it's own directory (Pages, Components, Redux)

```bash
├── Dockerfile
├── package.json
├── public
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   │   ├── Nav
│   │   │   ├── Navbar.js
│   │   │   └── index.js
│   │   ├── Post
│   │   │   ├── PostCreateWidget.js
│   │   │   ├── PostList.js
│   │   │   ├── PostListItem.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── pages
│   │   ├── LoginPage
│   │   │   ├── LoginPage.js
│   │   │   └── index.js
│   │   ├── PostDetailPage
│   │   │   ├── PostDetailPage.js
│   │   │   └── index.js
│   │   ├── PostListPage
│   │   │   ├── PostListPage.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── redux
│   │   ├── actions
│   │   │   ├── PostActions.js
│   │   │   └── index.js
│   │   ├── reducers
│   │   │   ├── PostReducer.js
│   │   │   └── index.js
│   │   └── types.js
│   └── util
│       └── apiCaller.js
│   ├── setupTests.js
│   ├── index.css
│   ├── index.js
└──
```

---

Before running the project, you need to create a .env file at the root directory of the server. There is a `.env.example` file to help you with the required vars.

```
MONGO_URI=
PORT=
JWT_SECRET=
```

MONGO_URI should be `mongodb://127.0.0.1:27017/mern-stack` PORT : `3000` and JWT_SECRET can be anything you want.

### 1 - User account management

To manage users I created a Token based system using JWT. When the user is registering for an account, a new db entry is created and their password is hashed using `bcrypt`. Then the server creates a token and send it back to the client as a Cookie.

Every request from the client includes the cookie and on the server I created a middleware to check if token is valid and to secure sensitive routes. (`middlewares/withAuth.js`).

If the token is inexistant or invalid, the server sends back an error telling the user to log in before performing the action (like create a post).

If the token is valid, the middleware adds the user's email in `req.email` to be used by the controllers (for example check if the post to delete is from the same user)

The token is refreshed on every app load.

### 2 - Picture upload

I choose to use [Cloudinary](cloudinary.com) to support file upload. The process is very simple. I added an image field inside the `CreatePostWidget` where users can upload a custom image for the post. Then the Cloudinary API is called with the file to upload. I then just store the result url as a `String` inside the `Post`
