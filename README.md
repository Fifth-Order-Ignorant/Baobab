# Baobab

## Description

The African Impact Challenge is a non-profit investing in aspiring young African 
entrepreneurs. Participants work on building market innovations that tackle 
their country’s challenges with technology. The motivation of this project is to 
provide a user-friendly community and e-learning platform for the moderators and 
participants of the challenge.

### Features

- Individual and organization profiles.
- Discussion board for networking.
- Direct text messaging.
- Learning materials and deliverables hosting.
- Real time conferencing.

## Installation

### Requirements

- Node.js 16.2.0 (npm 7.13.0)
- MongoDB Community Server 4.4.6

### Git (Windows)

Due to a limitation with the 
[NestJS CLI Plugin](https://docs.nestjs.com/openapi/cli-plugin), we were forced 
to use Git symlinks to link common types to the backend package. Git symlinks 
work fine without any setup macOS and Linux but may require the setup below on 
Windows.

1. Run `git config --global core.symlinks true`.

2. Enable developer mode (Settings App &#8594; Update & Security &#8594; 
For developers &#8594; Developer Mode) or run Git as administrator when working 
with the repository.

After setting up the above requirements, clone the repository and run
`npm install --legacy-peer-deps` (argument needed due to 
[Storybook issue](https://github.com/storybookjs/storybook/issues/12983)) to 
download the libraries this project relies on followed by 
`npm run build --workspace=common` to build code shared between the frontend and 
backend of the project.

To run the backend locally, use `npm run start --workspace=server`.

To run the frontend locally, use `npm run dev --workspace=client`.

## Deployment

TBD

## Contributing

### Repository Structure

This project uses
[npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) to separate
code and prevent issues such as unintentional dependencies and build system
conflicts.

`server` contains code for the project's Express backend.

`client` contains code for the project's React frontend.

`common` contains code meant to be shared between the frontend and backend
(request & response types, validation schemas, etc).

### Git Flow

The following procedure should be followed when contributing to the project.

1. Checkout a new branch from `develop` and name it using the ID of the Jira
   entry you are implementing (e.g. `DEV-000`).

2. After the new feature has been implemented and tested in the feature branch
   (e.g. `DEV-000`), create a pull request that merges the feature branch back
   into `develop`.

3. Another member from the team should review the pull request, requesting
   changes as necessary.

4. When both the contributor and code reviewer are satisfied with the pull
   request, it can be merged into `develop`.
   
5. On release days (sprint deadlines), a member from the team will create a pull 
   request that merges `develop` into `main`.
   
6. Two or more members from the team (can include the member who created the 
   pull request) will review the pull request, requesting changes as necessary.
   
7. When at least two members from the team are satisfied with the pull request, 
   it can be merged into `main`.