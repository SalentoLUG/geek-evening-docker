# Geek Evening su Docker

Slide dei talk su docker
* Geek 0x28: Introduction to Docker
* Geek 0xXX: Docker Fundamentals
* Geek 0xXX: Docker Operations

## Requisiti

Per visualizzare le slide e' necessario installare i seguenti pacchetti:

* git
* docker-engine

Seguire le istruzioni riportate al link seguente per installare docker sul proprio
sistema operativo: [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/)

## Download del repository

Da console digitare:

```
git clone https://github.com/SalentoLUG/geek-evening-docker.git
```

## Visualizzazione delle slide

* Build dell'immagine docker che conterra' le slide:

```
docker build -t slides-docker .
```

* Avvio del container:

```
docker run -d -p 8888:8888 --name slides slides-docker
```

* Accesso alle slide: aprire nel browser il link: http://localhost:8888

## Stop del container

```
docker stop slides
```

## Restart del container

```
docker start slides
```

## Rimozione del container

```
docker stop slides
docker rm -fv slides
```

## Rimozione dell'immagine delle slide

```
docker rmi slides-docker
```
