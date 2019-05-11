# rad_task


## Geting started
clone project
create .env file with next environment variables
```
DEV_DB_HOST=db
DEV_DB_NAME
DEV_DB_USER
DEV_DB_PWD

TEST_DB_HOST=db
TEST_DB_NAME
TEST_DB_USER
TEST_DB_PWD

PROD_DB_HOST=db
PROD_DB_NAME
PROD_DB_USER
PROD_DB_PWD
```

run docker containers postgres, order_api, payment_api:
```
$ docker-compose -f docker-compose.yml up`
```

migrate database:
```
$ docker exec -it orders_api ./node_modules/sequelize-cli/lib/sequelize db:migrate
```

Development mode, reloads server after change files within models, controllers, tests, helpers:
```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up`
```

## API
show created orders:
```
$ curl -H "x-access-token: any_string" localhost:3000/orders
```

create new order that contains sum field as a sum of sent items:
```
$ curl -X POST -d '{"items":[{"name": "Food", "price": "10.2"}, {"price": "30"}] }' -H "Content-Type: application/json" -H "x-access-token: any_string" localhost:3000/orders
```

## Tests
Create and migrate test database:
```
$ docker exec -e NODE_ENV=test -it orders_api ./node_modules/sequelize-cli/lib/sequelize db:create
$ docker exec -e NODE_ENV=test -it orders_api ./node_modules/sequelize-cli/lib/sequelize db:migrate
```

Run tests:
```
docker exec -it orders_api npm run test
```
