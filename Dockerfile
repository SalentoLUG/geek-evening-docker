FROM node:6-slim
# replace this with your application's default port
EXPOSE 8888

ADD slides /opt/slides

RUN cd /opt/slides && \
    npm install -g bower && \
    bower --allow-root install && \
    npm install -g grunt-cli

CMD cd /opt/slides && grunt serve
