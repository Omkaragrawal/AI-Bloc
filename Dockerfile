# In the first line we specify what image we are using for which framework/language
FROM python:3.7-slim-buster
# 3.7-alpine is a lightweight version of python 3.7 hosted under python on hub.docker.com

# (Optional) Next we specify the maintainer of this docker file/image
# MAINTAINER Arc24

# Next we set some environment variables according to the project or images
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# This basically tells python to run in unbuffered mode and give the output immediately to avoid complications

# Next we will install our dependencies
# 1) First we will have to copy our requirements file to the docker image
COPY ./requirements.txt /requirements.txt
# 2) Now run pip install in docker image
RUN pip install -r /requirements.txt
# 3) Installing tensorflow==2.2.0
# RUN pip install https://storage.googleapis.com/tensorflow/windows/cpu/tensorflow_cpu-2.3.0-cp37-cp37m-win_amd64.whl

# Next we are going to create a directory in docker image to store our app data
RUN mkdir /web_app
# Swich to "/app" as working directory in the docker image
WORKDIR /web_app
# Now we copy our app folder to app directory in docker image
COPY ./web_app /web_app

# IMPORTANT FOR SECURITY PURPOSES
# We are going to crete a user that will run this docker image
RUN adduser user
# "-D" so that a user is only able to run the processes/applications in docker image and not get the root access
# Switching to that user
USER user 



