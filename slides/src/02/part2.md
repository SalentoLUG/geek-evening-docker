## Previously

* What's docker?
* Containers vs VM
* Docker Engine
  * Installation
  * Registry
  * Containers
  * Images
* A web application as CaaS

----sub

## Previously

<div class="mark">**Docker** is a platform for developing, shipping, and running applications using containers
virtualization technology.</div>

<small>
Containers vs Virtual Machines:

* Containers are more lightweight
* No need to install guest OS
* Less CPU, RAM, storage space required
* More containers pre machine than VMs
* Greater portability
</small>

----sub

## Previously

<div class="mark"><strong>Docker Hub</strong> is the public registry that contains
a large number of images available for use.
</div>
<small>
* collection of repositories (ubuntu, nginx, mysql...)
* each repository contains a lot of images ordered by tag
</small>

----sub

## Previously

<small>
Images:
* set of layers
* **read only** template used to create containers
* built by you or other Docker users
* stored in Docker Hub or local registry

Containers:
* based on one or more images
* all library needed to run an application
* isolated workspace
* with a PID 1 process
</small>

----sub

## Previously

<small>
![small](/src/images/image-layers.jpg)
Each Docker image references a list of read-only layers that represent filesystem differences.<br>
Layers are stacked on top of each other to form a base for a container’s root filesystem.<br><br>
The Docker storage driver is responsible for stacking these layers and providing a single unified view.
</small>

----sub

## Previously

<small>
![small](/src/images/container-layers.jpg)
Start of a new container, add a new, thin, writable layer on top of the underlying
stack. That is the “container layer”<br><br>
All changes made to the running container (writing new files, modifying existing
files, and deleting files) are written to this container layer.
</small>

----sub

## Previously

<center>
![large](/src/images/sharing-layers.jpg)
<small>
**When the container is deleted the writable layer is also deleted.<br> The underlying image remains unchanged.**
</small>
</center>

----sub

## Previously

<center>
![large](/src/images/3d-layers.png)
</center>

----sub

## Previously

<center>
![large](/src/images/shared-volume.jpg)

<small>
docker run **-v /data:/dir_nel_container** ....
</small>
</center>

----sub

## Previously

Commands:

* [docker run](https://docs.docker.com/engine/reference/run/)
* [docker ps](https://docs.docker.com/engine/reference/commandline/ps/)
* [docker images](https://docs.docker.com/engine/reference/commandline/images/)
* [docker logs](https://docs.docker.com/engine/reference/commandline/logs/)
* [docker pull](https://docs.docker.com/engine/reference/commandline/pull/)

----sub

## In this talk

* build image
* Dockerfile
* manage images and containers
* volumes
* basic container networking
* docker-compose

----right

## Start and stop containers

* Find containers with **docker ps -a**

![](/src/images/docker-ps-a.png)

* Start o stop with:

```
docker start f0671136bac3

docker stop jovial_yonath
```

----sub

## Getting terminal access

* Use **docker exec** to start another process within a container

```
docker exec -it container_name_or_id /bin/bash
```

* Exiting from the terminal will not terminate the container

----sub

## Deleting containers

* Can only delete containers that have been stopped
* Use:

```
docker rm container_name_or_id
```

----sub

## Deleting local images

* Use **docker rmi** command

```
docker images
REPOSITORY   TAG    IMAGE ID         CREATED           SIZE
prova        1.0    32f4c4fc3b51     16 minutes ago    226.7 MB
prova        2.0    837ab3028e32     10 minutes ago    230.7 MB

docker rmi 32f4c4fc3b51
or
docker rmi prova   (ERRORE)

```
* if an image has multiple tag, remove each tag.

----right

## Building images: wrong method

<div class="mark">**docker commit** command saves the changes in a container as an image.
</div>

<small>
**es:**<br>
</small>

```
docker commit  0f3badc1e7df  angelo/app:1.0
```
<br>
**NB:** Do not use it!!!

----sub

## Building images: Dockerfile

<div class="mark">A **Dockerfile** is a configuration file that contains instructions for
building a docker image.</div>

* A more effective way to build images compared to using *docker commit*
* Easily fits in your continuous integration and deployment process

----sub

## Dockerfile instructions

* instructions specify what to do when building the image
* **FROM** specifies the base image
* **RUN** specifies a command to execute

```
#Example of comment
FROM ubuntu:14.04

RUN apt-get install -y vim
RUN apt-get install -y htop
```

<br><small><em>Example 01 in the directory **/02/examples/01**</em></small>

----sub

## RUN instruction

* Each RUN instruction will execute the command on the top writable layer and perform a commit of the image
* Can aggregate multiple RUN instructions by using "&&"

```
RUN apt-get update && apt-get install vim \
    htop \
    nano
```
<br><br>
**NB:** c'e' un problema/errore!!! A voi la ricerca!

----sub

## Docker build

```
docker build -t [repository:tag] [path]
```

* **path** is build context
* docker client packs the build context and send to the daemon
* Dockerfile must be present in context (alternative **-f** option)

----sub

## Docker build Example

<center>
<video width="1000" height="500" controls>
<source src="../video/docker_build.mp4" type="video/mp4">
</video>
</center>

----sub


## CMD instruction

* CMD defines a default command to execute when a container is created
* CMD performs no action during building
* Shell format and EXEC format
* Only one in Dockerfile
* **Can be override at run time**

```
CMD ping 127.0.0.1 -c 30

or

CMD ["ping", "127.0.0.1", "-c", "30"]
```

----sub

## ENTRYPOINT instruction

* Defines the command that will run when a container is executed
* Run time arguments and CMD instruction are passed as parameters to the ENTRYPOINT instruction
* Shell format and EXEC format
* EXEC format preferred as shell format cannot accept arguments at run time
* Container run as an executable

```
ENTRYPOINT ["ping"]

```

----sub

## CMD vs ENTRYPOINT

The **ENTRYPOINT** specifies a command that will **ALWAYS** be executed when the container starts.

Default is:
```
ENTRYPOINT ["/bin/sh","-c"]
```

The **CMD** specifies arguments that will be fed to the ENTRYPOINT.

```
ENTRYPOINT ["/bin/ping"]

CMD ["localhost"]
```

----sub

## USER and WORKDIR instructions

The USER instruction sets the user name or UID to use when running the
image and for any RUN, CMD and ENTRYPOINT instructions that follow it in the Dockerfile.

```
USER www-data
```

The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT,
COPY and ADD instructions that follow it in the Dockerfile.

```
WORKDIR /opt/test
```

**NB:** Follow it!!! Multiple definitions!

----sub

## COPY and ADD instructions

COPY copies new files or directory into image filesystem

```
COPY test.txt relativeDir/      # adds "test.txt" to `WORKDIR`/rel....
COPY test_dir /absoluteDir/     # adds "test" to /absoluteDir/
```

ADD copies new files, directory and remote url into image filesystem.
(auto-extract compressed file)

```
...
ADD http://example.com/sources.zip /usr/local/src/
ADD resources/sources.tar.gz /usr/local/src/

```

----sub


## EXPOSE and ENV instructions

EXPOSE informs Docker that the container listens on the specified network
ports at runtime. EXPOSE does not make the ports of the container accessible to
the host.

```
EXPOSE <port> [<port>...]
```

ENV sets the environment variable <key> to the value <value>.

```
ENV <key> <value>
ENV <key>=<value> ...
```

----sub

## MANTAINER instruction

The most important instruction!

The MAINTAINER instruction allows you to set the Author field of the generated images.

```
MAINTAINER Angelo D'Autilia <sydro@salug.it>
```

----sub

## Dockerfile example

```
FROM ubuntu:14.04

MAINTAINER Angelo D'Autilia <sydro@salug.it>

RUN apt-get update && \
    apt-get install -y php5 libapache2-mod-php5 php5-mysql && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ADD index.html /var/www/html/
ADD apache2.conf /etc/apache2/apache2.conf

EXPOSE 80

WORKDIR /var/www/html

CMD ["/usr/sbin/apache2", "-D", "FOREGROUND"]

```

```
docker build -t prova:1.0 .
docker run -d -p 80:8080 prova:1.0
```

----sub

## Tagging images

* Used to rename a local image or add a label version

```
docker tag original_name:1.0 new_name:1.0

docker tag original_name:2.0 original_name:latest
```

----right

## Volumes

<div class="mark">A volume is a designated directory in a container, which is
designed to persist data, independent of the container's life cycle</div>

* Volumes changes are excluded when updating an image
* Persist when a container is deleted
* Can be mapped to a host folder
* Can be shared between containers

----sub

## Mount a volume

* Volumes are mounted when creating or executing a container
* Volume paths specified must be absolute

```
docker run -d -v /myvolume nginx:1.7

docker run -d -v /path/directory/host:/path/in/container nginx:1.7
```

----sub

## Volumes in Dockerfile

* VOLUME instruction creates a mount point
* Cannot map volumes to host directories
* Volumes are inizialized when the container is executed

```
VOLUME /myvol

VOLUME /myvol1 /myvol2

VOLUME ['myvol1', 'myvol2']
```

----right

## Containers networking: <br>mapping ports

* Each container has its own network and ip address
* Map exposed container ports to ports on the host machine
* Ports can manually mapped (-p) or auto mapped (-P)
* Auto mapping works only for ports defined in the EXPOSE instruction

```
docker run -d -p 8888:80 nginx

docker run -d -P nginx          (RANDOM port selected)
```

----sub

## EXPOSE instruction

```
....
EXPOSE 80 443
....
```
<small>
* Ports will be mapped when container is executed
* Ports will be selected in the range between 49153 e 65535
</small>

----sub

## Linking containers

<div class="mark">Linking is a communication method between containers which
allows them to securely transfer data from one to another.</div>

* Source and recipient containers
* Recipient containers have access to data on sources containers
* Links are established based on container names

----sub

## Creating link

<center>
![medium](/src/images/linking-containers.png)
</center>

* Create the source container
* Create the recipient container and use **--link** option

```
docker run -d --name database mysql

docker run -d --name web --link database:db nginx
```

----right

## What is docker compose ?

<div class="mark">Docker compose is a tool for creating and managing multi container
application.</div>

* All containers are defined in a single file named **docker-compose.yml**
* Usually each container runs a particular component/service of your application.
* Container links are defined
* Compose will spin all containers in a single command

----sub

## Docker-compose.yml

```
mysql:
  image: mysql
  container_name: database
  volumes:
    - ./mysql_data:/var/lib/mysql

web:
  build: .
  container_name: website
  dockerfile: Dockerfile.web
  ports:
    - "80:80"
    - "443:443"
  links:
    - mysql:db
  volumes:
    - ./configs/apache-vhost.conf:/etc/apache2/sites-enabled/...
    - ./configs/php.ini:/etc/php5/apache2/php.ini
    - ./www/sito-online:/var/www/html

```

----sub

## Build and image instruction

- **build:** defines the path to the Dockerfile that will be used to build the image
```
  mysql:
    image: mysql
```
- **image:** defines the image that will be used to run the container
```
  web:
    build: .
```
* all services must have either a build or image instruction

----sub

## Links

- Same concept as container linking
- Specify: *<service name>:<alias>*
```
  links:
    - mysql:db
```
- it creates an entry inside the container's /etc/hosts file

----sub

## Ports and volumes

- Same concept as EXPOSE and VOLUME instructions

```
  ports:
    - "80:80"
    - "443:443"

  volumes:
    - ./www/sito-online:/var/www/html

```

----sub

## Running the application

* Use **docker-compose up**
* Up command will:
  - build the image for each service (if image doesn't exists)
  - create and start containers

----sub

## Install docker-compose

<center>RTFM: Read the fucking manual!!! <center>

[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

----sub

## The command docker-compose

```
**docker-compose**

Define and run multi-container applications with Docker.
....
Options:
...

Commands:
  build              Build or rebuild services
...
  down               Stop and remove containers, networks, images, and volumes
...
  exec               Execute a command in a running container
...
  logs               View output from containers
...
  ps                 List containers
...
  rm                 Remove stopped containers
  run                Run a one-off command
...
  start              Start services
  stop               Stop services
...
  up                 Create and start containers

```

----sub

## Practical example

Open a terminal

----sub

## Resources 1/2

* Docker hub: [https://hub.docker.com/](https://hub.docker.com/)
* Docker Documentation: [https://docs.docker.com/](https://docs.docker.com/)
  * [docker start](https://docs.docker.com/engine/reference/commandline/start/)
  * [docker stop](https://docs.docker.com/engine/reference/commandline/stop/)
  * [docker exec](https://docs.docker.com/engine/reference/commandline/exec/)
  * [docker rm](https://docs.docker.com/engine/reference/commandline/rm/)
  * [docker rmi](https://docs.docker.com/engine/reference/commandline/rmi/)
  * [docker build](https://docs.docker.com/engine/reference/commandline/build/)
  * [docker commit](https://docs.docker.com/engine/reference/commandline/commit/)
  * [docker tag](https://docs.docker.com/engine/reference/commandline/tag/)

----sub

## Resources 2/2

* Dockerfile Reference: [https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)
* Docker Compose Reference: [https://docs.docker.com/compose/overview/](https://docs.docker.com/compose/overview/)
* Thanks to "Docker self traning": [link](https://training.docker.com/self-paced-training)
<br><br><br>
* Slides repository: [https://github.com/SalentoLUG/geek-evening-docker](https://github.com/SalentoLUG/geek-evening-docker)
