---
title: Installing JOSSO
section: Install
---

## Overview

There are two ways to install JOSSO. One is by downloading and running the self-installer, which we'll call 'Traditional
install'. The outcome of this procedure will be a JOSSO installation in your local environment.

Alternatively, you may want to install JOSSO in a more isolated fashion, so that it doesn't mess with your environment.

## Traditional install

### Prerequisites

Make sure you have Java Runtime Environment (JRE) 8 or newer installed before executing the self-extracting installer.
The Java Runtime Environment can be downloaded from: http://www.java.com/getjava

### Download  

The first step is to download the JOSSO distribution.

To download the latest JOSSO Community Edition release, go to: https://sourceforge.net/projects/josso/files/latest/download?source=files

To request a trial version of the JOSSO Enterprise Edition, use this link: http://www.atricore.com/get-started .
Follow the instructions to enable your JOSSO Enterprise Edition installation.

### Install and Launch

After downloading the self-extracting installer, launch it.  

For Unix :

    $ java -jar josso-ce-2.4.3-unix.jar

For Windows :

    $ java -jar josso-ce-2.4.3-windows.jar
 
   > For "headless" installation use the "-console" flag (e.g. java -jar <josso-install-jar> -console)
   
Upon successfully completing the installation, start JOSSO Community Edition by running the "atricore" command located
within the "bin" directory, relative to the chosen installation directory.

Now you're ready to run the Atricore Console. In order to launch it, hit the following URL:
http://jossoserver:8081/atricore-console . You should be able to access the server directly from your local system
(localhost) as follows (for the default port 8081): http://localhost:8081/atricore-console

Next, sign in using the default credentials: 'admin' as the username and 'atricore' as the password.

The reference documentation for JOSSO can be found at this location:
http://docs.atricore.com/josso2/2.4/josso-reference-guide/html/en-US/JOSSO_Reference.html

## Docker Install

This section describes how to install JOSSO using a Docker image. Docker is a tool that allows all kinds of software
to be shipped and deployed in a standard format, much as cargo is shipped around the world in standardised shipping containers.

JOSSO is built into a binary image, which you can then use as a blueprint to launch multiple containers which run JOSSO
and IAM solutions in an isolated environment.

Providing a full introduction to Docker concepts is out of the scope of this document: you can learn more in the
Docker documentation.
 
### Prerequisites

In order to run JOSSO with Docker, you will need to have installed Docker. Please follow the instructions for
installing Docker from the Docker documentation.

### Install JOSSO

In the simplest case, installing JOSSO should be a matter of running one command.

      $ docker run -d -t --name josso atricore/josso:josso-ce-2.4.3
      
This will start a new JOSSO CE container in the background.

   > Please bear in mind that the default JOSSO container is INAPPROPRIATE FOR PRODUCTION USE.

The first time you run docker run commands, Docker will have to download the software images: this may be quite slow.
Once you’ve downloaded the images, however, subsequent calls to docker run will be much faster.

If all goes well you should now have a JOSSO instance running. You can use docker ps to verify that your container
started. You should see something like the following:

    CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS              PORTS                                                                     NAMES
    01ef0aec7244        atricore/josso:josso-ce-2.4.3   "/bin/sh -c /opt/atri"   2 seconds ago       Up 2 seconds        1099/tcp, 1527/tcp, 8081/tcp, 8101/tcp, 41041/tcp, 44444/tcp, 52416/tcp   josso

Using the JOSSO container id (here it’s 01ef0aec7244), you can perform other actions on your container, such as viewing
the logs:  
  
    docker logs 01ef0aec7244  
    
Or stopping the container:

    docker stop 01ef0aec7244 

### Customizing the Docker image

You may well find that you want to customize your JOSSO installation, either by setting custom configuration options not
exposed by the Docker image, or by installing additional extensions. A full guide to extending Docker images is
out of the scope of this installation documentation, but you can use the functionality provided by docker build to extend
the default image: http://docs.docker.com/reference/builder/. 

As an example you can build on the default Dockerfile for JOSSO CE 2.4.3:

    FROM openjdk:8
    
    ADD josso-ce-2.4.3.options /tmp/
    
    RUN wget -q --no-cookies --no-check-certificate http://sourceforge.net/projects/josso/files/JOSSO%202/JOSSO-2.4.3/josso-ce-2.4.3-unix.jar -O /tmp/josso-ce-2.4.3-unix.jar && \
        java -jar /tmp/josso-ce-2.4.3-unix.jar -options /tmp/josso-ce-2.4.3.options && \
        rm /tmp/josso-ce-2.4.3-unix.jar 
    
    EXPOSE 1099
    EXPOSE 1527
    EXPOSE 8081
    EXPOSE 8101
    EXPOSE 41041
    EXPOSE 44444
    EXPOSE 52416
    
    RUN chmod 700 /opt/atricore/josso-ce-2.4.3/bin/atricore
    RUN chmod 700 /opt/atricore/josso-ce-2.4.3/bin/start
    
    ENV JAVA_OPTS -Djava.security.egd=file:/dev/urandom
    
    CMD /opt/atricore/josso-ce-2.4.3/bin/atricore
    
You may want to explore the Git project used to build docker images: https://github.com/atricore/atricore-josso-playground
