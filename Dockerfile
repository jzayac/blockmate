############### 1. BUILD STAGE ###############
FROM node:lts-alpine AS build

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package*.json ./
RUN npm set progress=false ; npm i -g pkg && npm i --unsafe-perm

COPY . .
RUN npm run build

############### 2. RELEASE STAGE ###############
FROM node:lts-alpine AS release

WORKDIR /node

ARG PORT
ENV PORT $PORT

ARG X_API_KEY
ENV X_API_KEY $X_API_KEY

ENV USER=docker
ENV UID=1111
ENV GID=1111

COPY --from=build /opt/app/package*.json /node
RUN npm install --production

RUN addgroup --gid "$GID" "$USER" \
    && adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --ingroup "$USER" \
    --no-create-home \
    --uid "$UID" \
    "$USER" && \
    apk update && apk add --no-cache libstdc++ && \
    rm -rf /var/cache/apk/*

USER docker

COPY --from=build /opt/app/dist /node

CMD ["node", "index.js"]
