# Tech Radar

/aws = infrastructure code
/app = application code

To make a change to the tech radar technologies

- clone the app from Github
- Run the app locally using the instructions below.

# Start dev

- install docker
- cd into the app directory
- run the following commands

```bash
docker build -t devserver .
docker run -d -v $PWD:/app -v /app/node_modules -p 3000:3000 --name dev_server --rm devserver
```

- make changes within the app
- open the browser console and copy the latest JSON object for the log message preceeded with `Technologies JSON`.
- paste the object into the app/public/technologies.json file
- commit your code and create a PR on Github
