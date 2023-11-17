# CS3219 Assignment 4

Containerises assignment 3 to prepare for easy deployment.

The following objectives are achieved:
- Fully containerise assignment 3 with Docker Compose Up
- Allow web application to run locally using a single line 'docker compose up'
- Allow easy teardown of web application (running of containers) with 'docker compose down'
- Enables easy deployment of the web application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set-up

### Navigate to the current project directory 

After cloning the project in your personal device, navigate the directory to ay2324s1-course-assessment-g33/assignments/assignment_4 using `cd` commands in the terminal.

Within the project directory, create an environment file. You can request the environment file containing our API secrets from our group over email, at woobt123@gmail.com.
This allows you to access MongoDB, Firebase, and AWS RDS servers.
Ensure that the environment file is named as the following: docker-compose.env, and it shares the same project directory as the compose.yaml file.
<br/>
![image](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g33/assets/62021897/95172724-c47b-466d-8f5e-c2ba85da24ef)


Before running the program, ensure that Docker (CLI and Docker Desktop) and docker compose is installed on your system.

In the project directory, you can run:

### `docker compose up`

This command builds all the images of the frontend and backend services, installs the necessary dependencies required to run the program, and runs the container thereafter.
Thereafter, you can access the web application via localhost:3000.

### `docker compose down`
This command ends the running of containers and teardown of containers gracefully, without removing the images created. You can remove the images manually after running the assignment manually via Docker Desktop or the Visual Studio Code's docker extension.

## User Guide

### Getting the Web Application up via running of Containers

![image](https://github.com/Bobowoo2468/ay2324s1-course-assessment-g33/assets/62021897/f0d55c94-b838-4304-b684-8feee00e92c1)

- You can view the images created and containers running on the Visual Studio Code 'Docker Extension'
![image](https://github.com/Bobowoo2468/ay2324s1-course-assessment-g33/assets/62021897/9d00ecc9-2347-4d2c-bd30-1a2ec8883f69)

- Or via Docker Desktop's UI
![image](https://github.com/Bobowoo2468/ay2324s1-course-assessment-g33/assets/62021897/76781851-7ff2-46f3-ad62-cd4c39af5e57)
![image](https://github.com/Bobowoo2468/ay2324s1-course-assessment-g33/assets/62021897/ea3217dc-9ab0-444a-8beb-d695c952dc7d)


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
