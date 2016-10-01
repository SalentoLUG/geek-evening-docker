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
* slow deployment times
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

## Installation

Prerequisites:
* Docker requires a 64-bit installation of OS
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

### Images

----sub

### Containers

----sub

### Repositories

----sub

### Docker Hub

----sub

### Docker orchestation tools

----right

## Intro to Images

----right

## Getting started with Containers
