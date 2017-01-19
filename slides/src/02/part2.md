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

----sub
