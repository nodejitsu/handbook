# Using The API

- Overview
- Application
- Deployment
- User
- Database
- Logging

## Overview

Nodejitsu provides a web API for users who want to interact with the Nodejitsu platform programatically. This API is built to be RESTful and communicates via JSON. Our tools such as Samurai and Jitsu rely on this API.

## Applications

### Snapshots
---

#### Deploy a snapshot
     POST /apps/:user-name/:snapshots/:id

#### Show a catalog of all snapshots
     GET /apps/:user-name/:app-name/snapshots

#### Show the contents of a snapshot
     GET /apps/:user-name/:app-name/snapshots/:id

#### Make an existing snapshot the active app
     PUT /apps/:user-name/:app-name/snapshots/:id/active


## Users

## Deployment


- Application
- Deployment
- User
- Database
- Logging

