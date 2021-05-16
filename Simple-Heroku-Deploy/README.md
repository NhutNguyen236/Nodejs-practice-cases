# This is my short note for deploying to `Heroku` 📔
## ⚠️ [Notes before deployment](https://devcenter.heroku.com/articles/deploying-nodejs)

- Click the link above for details form Heroku Dev Center, I will just note down what I have met during my deployment

- At my first time deploying, I got `Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch` which is very common when your app runs perfectly in local env but on production env like this you need to make sure it will be compatible

- 1️⃣ Change your `app.listen` to this 

    ```js
    var server = app.listen(process.env.PORT || 3000, () =>{
        //console.log("The server is now running at http://localhost:" + PORT);
    })
    ```

- 2️⃣ Make sure your `package.json` specifies `engines` with its node version, `"start"` from `scripts`, like this

    ```json

    "scripts": {
        "start": "node server.js"
    },
    "engines": {
        "node": "14.x"
    }
    ```
- 3️⃣ Give your app a `Procfile` and define it like this

    ```Procfile
    web: node server.js
    ```
- If you are using `nodemon`, I recommend don't use it in production env or if you still want to, move it from `Devdependencies` to `dependencies`

- 😘 I have given you all the basic config here in this folder so try to deploy it to `Heroku`

## Deployment methods you can pick

<p align="center">
    <img src="https://i.ibb.co/c19hStq/image.png"/>
</p>

## Deployment with Github
- I have done deployment with Github before and I think this one is more suitable for a personal use only. Yeah, My [TDTU-Noti-Clone](https://tdtu-noticlone.herokuapp.com/) was deployed using this method
- `Github` as your source code host, `Heroku` as your online web server
- It is not hard to setup, maintain and keep everything up to date
- Everything you should do is working with your repository 
- One thing here I found useful is `Automatic deploys` which will save your time whenever you have new commit to your chosen `branch`

<img src="https://i.ibb.co/Fg4K4YT/image.png">

- 😃 Just with some clicks and you are there to your working website on Heroku, more  details [here](https://devcenter.heroku.com/articles/github-integration)

## Deployment with Heroku Git
Coming soon
## Deployment with Container Registry