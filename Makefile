include docker/server/env

run-init:
	cp docker/server/env.example docker/server/env

run-server:
	docker compose up -d

stop-server:
	docker compose down

run-test:
	docker compose up -d
	docker container exec -i $$(docker compose ps -q server) npm run test

build-prod:
	docker build --build-arg X_API_KEY=$(X_API_KEY) --build-arg PORT=$(PORT) -t blockmate .

