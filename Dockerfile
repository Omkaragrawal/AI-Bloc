# In the first line we specify what image we are using for which framework/language
FROM python:3.7-alpine 
# 3.7-alpine is a lightweight version of python 3.7 hosted under python on hub.docker.com

# (Optional) Next we specify the maintainer of this docker file/image
# MAINTAINER Arc24

# Next we set some environment variables according to the project or images
ENV PYTHONUNBUFFERED 1
# This basically tells python to run in unbuffered mode and give the output immediately to avoid complications

# Next we will install our dependencies
# 1) First we will have to copy our requirements file to the docker image
COPY ./requirements.txt /requirements.txt
COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
      gcc libc-dev linux-headers postgresql-dev
# 2) Now run pip install in docker image
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

# Next we are going to create a directory in docker image to store our app data
RUN mkdir /web_app
# Swich to "/app" as working directory in the docker image
WORKDIR /web_app
# Now we copy our app folder to app directory in docker image
COPY ./web_app /web_app

# IMPORTANT FOR SECURITY PURPOSES
# We are going to crete a user that will run this docker image
RUN adduser -D user
# "-D" so that a user is only able to run the processes/applications in docker image and not get the root access
# Switching to that user
USER user 



