FROM node:14-alpine AS compilation

WORKDIR /compilation

COPY . .

RUN yarn tsc


FROM node:14-alpine AS build

WORKDIR /build

COPY . .

RUN yarn --production


FROM node:14-alpine AS production

ENV NODE_ENV production

WORKDIR /app

COPY --from=compilation /compilation/dist dist
COPY --from=build /build/node_modules node_modules
COPY bin bin
COPY databases databases
COPY public public
COPY views views
COPY package.json package.json
CMD ["yarn", "start"]
