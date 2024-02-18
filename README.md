# QuarterlyRepBackend

Backend for quarterly report submission

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`PORT`

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`POSTGRES_DB`

`DATABASE_URL`

## Installation

#### Install [Docker](https://www.docker.com/products/docker-desktop/) in Windows/Mac/Linux before running locally.

Clone the project

```bash
git clone https://github.com/SwethaS03/QuarterlyRepBackend.git
```

Go to the project directory

```bash
cd QuarterlyRepBackend
```

build the docker image

```bash
npm run docker:dev
```

run prisma migrations in new terminal

```bash
npm run prisma:migrate
```

## Run Locally

To start the server

```bash
npm run docker:dev
```
