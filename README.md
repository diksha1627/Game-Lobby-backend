# Project Name
Game Lobby
## Docker Setup Guide

### 1. Install Docker

Follow the instructions on the official Docker website to install Docker on your machine: [Get Docker](https://docs.docker.com/get-docker/)

### 2. Build and Run Apollo Server

1. Clone the repository: `git clone https://github.com/diksha1627/Game-Lobby-backend.git`
2. Navigate to the project directory: `cd your-repo`
3. Build the Docker container: `npm run docker-build`
4. Start the Docker container: `npm run docker-up`
5. Access Apollo Server at: http://localhost:4000/graphql

### 3. Stop Docker Container

To stop the Docker container, run: `npm run docker-down`

### To run without Docker

1. npm i ( to install the dependencies )
2. npm start
3. Access Apollo Server at: http://localhost:4000/graphql


##### Example Queries to run

##### mutation CreateUser($username:String!){
#####   createUser(username: $username) {
#####     id,
#####     username
#####   }
##### }




##### query GetUsers{
#####   getUsers{
#####     id
#####     username
#####   }
##### }




##### mutation CreateTournament($creatorUserId: ID!){
#####    createTournament(creatorUserId: $creatorUserId) {
#####      roomId,
#####      creatorUserId
#####    }
##### }




##### query GetTournaments{
#####   getTournaments {
#####     creatorName,
#####     roomId,
#####     participants{
#####       userId,
#####       username,
#####       isAdmin
#####     },
#####     settings,
#####     creatorUserId
#####   }
##### }




##### mutation JoinTournament($roomId: String!,$userId:ID!,$username:String!){
#####   joinTournament(roomId:$roomId,userId:$userId,username:$username) {
#####     roomId,
#####   }
##### }




##### mutation UpdateTournament($roomId: String!, $settings: String, $participants: [String]) {
#####   updateTournament(roomId: $roomId, settings: $settings, participants: $participants) {
#####     id
#####     roomId
#####     settings
#####     participants{
#####       userId,
#####       username
#####     }
#####   }
##### }




##### subscription {
#####   tournamentUpdated(roomId: "cc16") {
#####     id
#####     roomId
#####     settings
#####     participants {
#####       userId
#####       username
#####     }
#####   }
##### }




##### query GetTournament($roomName:String!) {
#####   getTournament(roomId:$roomName) {
#####     id
#####     roomId
#####     creatorUserId
#####     creatorName
#####     settings
#####     participants {
#####       id
#####       userId
#####       username
#####       isAdmin
#####     }
#####   }
##### }




##### mutation DeleteTournament($roomId: String!) {
#####   deleteTournament(roomId: $roomId)
##### }








