FROM node:6-slim
EXPOSE 8888

ADD slides /opt/slides

RUN cd /opt/slides && \
    apt-get update && apt-get install -y bzip2 git && \
    npm install && \
    npm install -g bower && \
    npm install -g grunt-cli && \
    bower --allow-root install

WORKDIR /opt/slides
CMD grunt serve
