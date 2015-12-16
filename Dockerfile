# Ubuntu 14.04 Trusty (LTS)
FROM ubuntu:14.04
WORKDIR /home/simple-api

#RUN /bin/bash -c echo 'creating the Cats API Docker container'
# Commented out for now because apt-get update adds time to the build
RUN DEBIAN_FRONTEND=noninteractive apt-get -y update && apt-get -y install nodejs npm git
# RUN DEBIAN_FRONTEND=noninteractive apt-get -y install curl
# RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
# RUN DEBIAN_FRONTEND=noninteractive apt-get -y install nodejs npm git
# Create a symbolic link from nodejs to node
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN node -v
RUN npm -v
RUN cd /home && git clone https://github.com/danifitz/simple-api.git
COPY appconfig.js /home/simple-api/appconfig.js
RUN cd /home/simple-api && npm install
EXPOSE 8080
CMD ["npm", "start"]
