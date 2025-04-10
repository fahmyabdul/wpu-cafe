<a name="readme-top"></a>
[![forks-shield]][forks-url] [![stars-shield]][stars-url] ![Javascript] [![Typescript]][Typescript-url] [![ReactJS]][ReactJS-url] [![Docker]][Docker-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/fahmyabdul">
    <img src="https://raw.githubusercontent.com/fahmyabdul/fahmyabdul.github.io/main/assets/img/flg-round.png" alt="Logo" width="100" height="100">
  </a>
  

  <h3 align="center">WPU Cafe</h3>
  <p align="center">
    <span>WPU Course Assignment</span>
    <br/>
    WPU Ramadhan Camp: Kajian React.js Dari Dasar Hingga Mahir
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-this-repository">About This Repository</a>
    </li>
    <li>
      <a href="#prerequisites">Prerequisites</a>
    </li>
    <li>
      <a href="#how-to-run">How To Run</a>
    </li>
    <li>
      <a href="#library-rights">Library Rights</a>
    </li>
  </ol>
</details>

<!-- ABOUT THIS REPOSITORY -->
## About This Repository

This repository was created to fulfill the **assignment** given by the instructors at the conclusion of the **WPU Ramadhan Camp: Kajian React.js Dari Dasar Hingga Mahir** bootcamp at **WPU Course**. 

It is a cafe website that allows administrator to to create **Customer Orders** from the cafe's menu.

The website was built using the following technologies: 
- **JavaScript** + **TypeScript**
- **ReactJS**
- **TailwindCSS**
- **HeroUI**.

I hope that this website meets the requirements set by the instructors.

## Prerequisites

Before reading further, there are some prerequisites that you need to fulfill in order to run this applications:
- [NodeJs](https://nodejs.org/en/download) (version 20 or later)
- [Docker](https://docs.docker.com/engine/install/) (optional, only if you want to run this application via docker container)

<!-- HOW TO  RUN-->
## How To Run

There are two ways you can run this application.

### Via Npm Run

To run this application with `npm` command, you first need to install the required node modules with this command:

```shell
  npm i
```

Ensure everything run successfully, after that run this command to run in **development mode**:

```shell
  npm run dev
```

If you want to run in **release mode**, you need to run build command:

```shell
  npm run build
```

And then start with this command:

```shell
  npm run preview
```

The application will be running on port `:4173`, you can access locally with this URL: `http://localhost:4173`.

To change port, you need to change the `server.port` value inside [vite config file](vite.config.ts).

### Via Docker

To run this application via **Docker**, you can use [this docker compose file](deployments/docker-compose.example.yaml) in order to make it easier to run in container, and use this command to run the docker container:

```shell
  docker compose -f deployments/docker-compose.example.yaml up
```

After that you will see the container logs in your terminal.

To stop the container, simply push `CTRL+C` inside your terminal.

If you want to run the container in **detached mode**, simply add `-d` params to the docker compose command like this:

```shell
  docker compose -f deployments/docker-compose.example.yaml up -d
```

When running in detached mode you will not see the container logs in your terminal. You can access the container logs from **Docker Desktop** app, or you can use this command:

```shell
  docker logs -f wpu-cafe-fe
```

To stop the container, use this command:

```shell
  docker compose -f deployments/docker-compose.example.yaml down
```

The application will be running on port `:4173`, you can access locally with this URL: `http://localhost:4173`.

To change port, you can change the `ports` value inside [docker compose file](deployments/docker-compose.example.yaml) to your desired port like this:

```yaml
  ports:
    - 'YourPort:4173'
```

<!-- LIBRARY RIGHTS -->
## Library Rights

All rights of the libraries used by this project goes to the owners of each libraries, see **dependencies** in [package.json](package.json).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[forks-shield]: https://img.shields.io/github/forks/fahmyabdul/wpu-cafe.svg?style=for-the-badge
[forks-url]: https://github.com/fahmyabdul/wpu-cafe/network/members

[stars-shield]: https://img.shields.io/github/stars/fahmyabdul/wpu-cafe.svg?style=for-the-badge
[stars-url]: https://github.com/fahmyabdul/wpu-cafe/stargazers

[Javascript]: https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=for-the-badge

[Typescript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge
[Typescript-url]: https://www.typescriptlang.org/

[ReactJS]: https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge
[ReactJS-url]: https://react.dev/

[Docker]:https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
