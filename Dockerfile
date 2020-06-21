FROM hayd/alpine-deno:1.0.0

ARG DOCKER_PORT
ENV DOCKER_PORT $DOCKER_PORT
EXPOSE $DOCKER_PORT

WORKDIR /app

# Cache the dependencies as a layer (this is re-run only when deps.ts is modified).
# Ideally this will download and compile _all_ external files used in main.ts.

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

ENTRYPOINT []