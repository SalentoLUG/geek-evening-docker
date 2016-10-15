## In this talk

* What's docker?
* Containers vs VM
* Docker Engine
  * Installation
  * Registry
  * Containers
  * Images
* A web application as CaaS

----sub

## What is Docker

<div class="mark">**Docker** is a platform for developing, shipping, and running applications using containers
virtualization technology.</div>

<br>
<small>
The Docker Platform consists of multiple products/tools:
* Docker Engine
* Docker Hub
* Docker Machine
* Docker Swarm
* Docker Compose
...
</small>

----sub

## The past 1/2

<div class="mark"><strong>1</strong> Application on <strong>1</strong> Physical server</div>

![small](/src/images/past1_2.png)
<small>
Problems:
* long deployment times
* huge costs
* wasted resources
* difficult to scale or to migrate
* vendor lock in
</small>

----sub

## The past 2/2

<div class="mark"><strong>More</strong> VM+APP on <strong>1</strong> Physical server</div>
<center>
![medium](/src/images/past2_2.png)
</center>

----sub

## The past 2/2

<div class="mark"><strong>More</strong> VM+APP on <strong>1</strong> Physical server</div>

Benefits:
<small>
* better resource polling
* easier to scale
* VM's in the cloud (AWS, Linode, ...) or on multiple physical server
  - faster hardware upgrade
  - faster vm transfer
</small>

----sub

## The past 2/2

<div class="mark"><strong>More</strong> VM+APP on <strong>1</strong> Physical server</div>

Limitations:
<small>
* each vm still requires: CPU, RAM and Storage allocation and <span class="underline">an entire guest OS</span>
* more vm run, more resources required
* wasted resources
* application portability not guaranteed
</small>

----sub

## Containers

<div class="mark"><strong>Container</strong> based virtualization uses the <strong>kernel</strong> on the host's operating
system to run multiple guest instances.</div>

* each guest instance is called a **container**
<br><br>
* each container has its own:
<small>
  * root filesystem
  * processes
  * memory
  * devices
  * network ports
</small>

----sub

## Containers

<div class="mark">Look like VM, but <strong>it is NOT a VM.</strong></div>

![small](/src/images/containers1.png)

Real example:
<small>
* 3 containers
  * openjdk
  * oracle java 7
  * oracle java 8
</small>

<br>
**NB**: only java lib needed

----sub

## Containers vs Virtual Machines

* Containers are more lightweight
* No need to install guest OS
* Less CPU, RAM, storage space required
* More containers pre machine than VMs
* Greater portability

----sub

## Benefits of Docker

* Separation of concerns
  * developers focus on building their apps
  * system admins focus on deployment
* Fast deployment cycle
* Application portability
  * build in one environment, ship to another
* Scalability
  * easly spin up new containers if needed
* Run more apps on one host machine

----right


## Docker Platform: overview and terminology

The Docker Platform consists of multiple products/tools:
* Docker Engine
* Docker Hub
* Docker Machine
* Docker Swarm
* Docker Compose
...

----sub

## Docker Engine

<div class="mark"><strong>Docker Engine</strong> is the program than enables
containers to be built, shipped and run.</div>

* It is identified as docker daemon

* It uses Linux Kernel namespaces and control groups

* Namespaces, particularly, create isolated workspaces

----sub

## Docker orchestation tools

* Docker Machine
  - tool that provisions Docker hosts and installs the Docker Engine on them
* Docker Swarm
  - tool that clusters many Engines and schedules containers
* Docker Compose
  - tool to create and manage multi-container applications

----sub

## Namespaces

<div class="mark">Namespaces are a feature of the Linux kernel that isolates and virtualizes system
resources of a collection of processes.
<br><br>
<small>
Examples of resources that can be virtualized
include process IDs, hostnames, user IDs, network access, interprocess communication,
and filesystems.</small></div>

Example:
```
Host:
    ID:1 - /sbin/init
Container:
    ID:1 - /bin/bash
```

Note:
   control groups, which are called by their shorter name cgroups in this guide. Cgroups
   allow you to allocate resources — such as CPU time, system memory, network bandwidth,
   or combinations of these resources — among user-defined groups of tasks (processes)
   running on a system. You can monitor the cgroups you configure, deny cgroups access
   to certain resources, and even reconfigure your cgroups dynamically on a running system.

----sub

## Namespaces reality

<center>
![big](/src/images/security-cat.jpg)
</center>

----sub

## Installation

Prerequisites:
* Docker requires a 64-bit OS installation
* kernel must be 3.10 at minimum
<br><br><br>
<small>
Installation guide: https://docs.docker.com/engine/installation/

</small>

----sub

## Installation 1/4

Example Ubuntu 14.04:
* Update package information, ensure that APT works with the https method, and that CA certificates are installed.

```
$ sudo apt-get update
$ sudo apt-get install apt-transport-https ca-certificates
```

----sub

## Installation 2/4

* Add the new docker repository GPG key.

```
$ sudo apt-key adv --keyserver \
    hkp://p80.pool.sks-keyservers.net:80  \
    --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```

----sub

## Installation 3/4

* Add an entry for your Ubuntu operating system apt repositories list.

```
# echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main">> \
    /etc/apt/sources.list.d/docker.list
```

----sub

## Installation 4/4

* Update repositories list and install docker.

```
$ sudo apt-get update
$ sudo apt-get install docker-engine
```

----sub

## Installation: hello-world

<center>
![big](/src/images/test_installation.png)
</center>

----sub

## Docker Architechture

* client/server architechture
* client send inputs to the deamon
* deamon build, run and distributes containers
* client and server run on same or different host

```
$ docker version
Client:
 Version:      1.12.1
 API version:  1.24
 Go version:   go1.6.3
 Git commit:   23cf638
 Built:        Thu Aug 18 05:22:43 2016
 OS/Arch:      linux/amd64

Server:
 Version:      1.12.1
 API version:  1.24
 Go version:   go1.6.3
 .....

```

----right

## Containers and Images

<small>
Images:
* **read only** template used to create containers
* built by you or other Docker users
* stored in Docker Hub or local registry

Containers:
* all library needed to run an application
* based on one or more images
* isolated workspace
</small>

----sub

## Registry (Docker Hub)
<div class="mark"><strong>Docker Hub</strong> is the public registry that contains
a large number of images available for use.
</div>
<small>
* collection of repositories (ubuntu, nginx, mysql...)
* each repository contains a lot of images
</small>
<center>
![large_width](/src/images/docker-hub.png)
[https://hub.docker.com/explore/](https://hub.docker.com/explore/)
</center>

----sub

## Images

![big](/src/images/docker-hub2.png)

----sub

## Images

![big](/src/images/docker-hub3.png)

----sub

## Display local images

* run **docker images**
* when creating a container _nginx_ will attempt to use a local image first, but
  if no local image is found, docker daemon search on registry

![big](/src/images/docker-images.png)

----sub

## Image tags
Notes:
<small>
* images are specified by **repository:tag**
* the same image may have multiple tags
* the default tag is **latest**
* look up the repository on Docker Hub to see what tags are available
</small>
![big](/src/images/docker-hub4.png)


----right

## Getting started with Containers

* To create a container, use **docker run** command!!!

* Syntax:

  <small>
    _docker run [options] [image] [command] [args]_
  </small>

* Examples:

```
docker run ubuntu:14.04 echo "Hello docker"

docker run -it ubuntu /bin/bash

```

----sub

## Getting started with Containers
<center>
<video width="1000" height="500" controls>
<source src="../video/docker_run1.mp4" type="video/mp4">
</video>
</center>

----sub

## Container with terminal

With docker run use **-i** e **-t** options:
* the **-i** flag connect STDIN on the container
* the **-t** flag specifies to get a pseudo-terminal

<small>
**NOTE**: you need to run a terminal process as you command (es: /bin/bash)
</small>

```
docker run -i -t ubuntu:14.04 /bin/bash
```

----sub

## Container with terminal
<center>
<video width="1000" height="500" controls >
<source src="../video/docker_run2.mp4" type="video/mp4">
</video>
</center>

----sub

## Container processes

![small](/src/images/container_processes.png)
<small>
* command's process is always<br>
  PID 1 inside the container<br><br>
* container only runs as long as the<br>
  command process is running
</small>

----sub

## Container ID

* containers can be specified using their ID or name
* long ID or short ID
* short ID or name can be obtained using **docker ps** to list containers
* long ID obtained by inspecting a container

----sub

## Find your container

* use **docker ps** to list running containers
* the **-a** flag to list all containers (including stopped)

![big](/src/images/docker_ps.png)

----sub

## Running in detach mode

* use **-d** flag
* to observe output use **docker logs [container id/name]**

```
docker run -d ubuntu:14.04 ping 127.0.0.1 -c 50
```

----sub

## Running in detach mode

<center>
<video width="1000" height="500" controls >
<source src="../video/docker_detach.mp4" type="video/mp4">
</video>
</center>

----sub

## Example: A web application inside a container

<center><h3>GOAL</h3>
```
MAKE A PHP WEB APPLICATION WITH MYSQL DATABASE
```
</center>

we need:

* container web (apache) with php
* container mysql

----sub


## Example: A web application inside a container

* use **-p** flag to map containers ports to host ports

```
docker run -P -d eboraas/apache-php

docker run -p 80:80 -p 443:443 -d eboraas/apache-php
```

![big](/src/images/docker_ports.png)

----sub

## Example: A web application inside a container

- use **-v** flag to map containers volumes

```
docker run -p 80:80 -p 443:443 -d \
           -v /home/angelo/mysite/:/var/www/html/ \
           eboraas/apache-php
```

----sub

## Example: A web application inside a container

- use **--name** to name container
- use **--link** to link first container to another

```zsh
docker run --name dbcontainer -e MYSQL_ROOT_PASSWORD=my-secret-pw -d \
           mysql


docker run -p 80:80 -p 443:443 -d \
           -v /home/angelo/mysite/:/var/www/html/ \
           --name webcontainer --link dbcontainer:db
           eboraas/apache-php
```

----right

## Results:

<center>
![big](/src/images/docker-fire.gif)
</center>

----sub

## Real Example: A web application inside a container

<center>
![big](/src/images/docker-containers-schema.png)
</center>

----sub

## Real Example: A web application inside a container

<center>
![big](/src/images/docker-containers-schema2.png)
</center>

----sub

## Next?

Next geek evening:
* build image
* Dockerfile
* manage images and containers
* volumes
* basic container networking
* docker-compose

----sub

## Final goal

<center>
![big](/src/images/finaly.jpg)
</center>

----sub

## Resources

* Docker hub: [https://hub.docker.com/](https://hub.docker.com/)
* Docker Documentation: [https://docs.docker.com/](https://docs.docker.com/)
  * [docker run](https://docs.docker.com/engine/reference/run/)
  * [docker ps](https://docs.docker.com/engine/reference/commandline/ps/)
  * [docker images](https://docs.docker.com/engine/reference/commandline/images/)
* Thanks to "Docker self traning": [link](https://training.docker.com/self-paced-training)
