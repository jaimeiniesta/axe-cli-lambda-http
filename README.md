# Axe-Cli-Lambda-HTTP

An AWS lambda function to use axe-core as an HTTP service using axe-cli.

## Deployment

We use [Up](https://up.docs.apex.sh/) for deployment.

* `npm install` will update the packages as specified in `package.json`.
* `up start` will open a local development server.
* `up` or `up deploy` will deploy to staging.
* `up deploy production` will deploy to production.
* `up url` will show the URL.
* `up logs -f` to see the live logs.
