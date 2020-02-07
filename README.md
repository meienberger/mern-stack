
# Alaya mern dev challenge | Nicolas Meienberger's application 

This is my forked repo from the Alaya dev challenge. Here you'll find my final result and some explaination on how I implemented the requested features.

## Happy reviewing :)

### 0 - Base app changes

To make it easier for me to develop locally, I created a `docker-compose.yml` file which runs the whole project as 3 containers (db, server, client) without any further configuration.

just run `docker-compose up` inside the root directory of the project.

You can still run the project like the initial base app by having mongo installed locally and by launching the server and then the client app. (Please refer to the [README](https://github.com/Onigam/mern-stack/blob/master/README.md) from the original repo)

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

### 1 - User account management

Working on it...

### 2 - Picture upload

Working on it...
