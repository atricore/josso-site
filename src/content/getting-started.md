---
title: Test JOSSO in minutes
section: Getting Started 
---

## Introduction

JOSSO is an open source Identity and Access Management (IAM) platform for rapid and standards-based
Cloud-scale Single Sign-On, web services security, strong authentication and provisioning. 

## Agile IAM   

Identity and Access Management is widely considered to be a highly technical domain, with an implementation that’s out
of reach for most people. The process of setting up a system for identity and access management has a well-earned
reputation for technical difficulty, inconvenience, and errors; all in pursuit of an end product that most users dislike
and avoid.

Commercial identity and access management packages offer web-based facilities to set up their products; but without an
intimate knowledge of the product’s inner structure, the overall set up and roll-out experience is tedious and
error-prone.

JOSSO incorporates a visual modeling user experience to enable ease of use, which translates to productivity.
You can get on board with implementing identity-centric use-cases, significantly accelerating time-to-value for
streamlining IAM rollouts.


## Quick JOSSO Playground overview

Identity and Access Management systems - such as the JOSSO one - have many moving pieces. The product alone will not 
 prove to be very useful while it's not integrated with the underlying IT ecosystem, such as target systems,
 directories and other infrastructure pieces.
 
In order to make sure that you can kick the tires of JOSSO without having to perform manual and error prone 
tasks, we've made available a fully working virtual machine. This will also keep the host environment safe from any
changes that might be required at the infrastructure level, such as setting up DNS servers for instance.

Within the Vagrant virtual machine we're using Docker containers to host the components of the sandbox deployment. 
This simulates much more closely an IT ecosystem yet without the overhead of using multiple virtual machines in order 
to deliver additional isolation. For instance, the JOSSO server, the domain name server, and the two tomcat web
containers each live in separate containers. This also provides the flexibility of rolling out additional infrastructure
components, such as a directory server or an application server by just pulling and running the corresponding 
docker container.
 
Finally, docker compose is used for orchestrating containers, namely how containers are launched and their
configuration.

### Foreword about Vagrant and Docker

Vagrant is a multi-platform command line tool for creating lightweight, reproducible and portable virtual environments.
Vagrant acts as a glue layer between different virtualization solutions (Software, hardware PaaS and IaaS) and
different configuration management utilities (Puppet, Chef, etc’). 

Docker is a an open source framework for developing, distributing and deploying so called Containers, middle ground
between virtual machines and process.

It allows processes to be running on the same kernel as system processes, yet it uses separate runtime
(include basic things like libc). It basically allows you to run centos on ubuntu or (via Virtual Box) on your
Mac and Windows installation.

This pages show how to take advantage of both vagrant and docker sandboxing capabilities to do a number of
JOSSO related tasks, including installation and testing basic features.

These instructions are not meant to be a full blown vagrant nor docker guide for which we recommend looking at the
official documentation on the corresponding websites.
   
### Install Vagrant

Vagrant [installation packages](http://www.vagrantup.com/downloads.html) are available for OS X, Windows and Linux (deb
and rpm format). Installation is simple “Next, Next, Next, Done” process and doesn’t require any special user
interaction.

Since Vagrant is not a virtualization software by itself, it relies on 3rd party providers for doing the virtualization
part. For this tutorial I’ll assume you have installed Oracle’s VirtualBox. VirtualBox is a free multi-platform
virtualization software which is supported by Vagrant out of the box.

## Rollout the reference IAM ecosystem 

### Launch playground

Let us now setup a JOSSO-based IAM development environment in Vagrant with below steps:

Create a directory where we would be creating the instance:

    mkdir -p ~/Vagrant/josso-playground

    cd  ~/Vagrant/josso-playground

Now we are required to initialize the Vagrant box where the JOSSO playground lives.

    vagrant init atricore/josso-playground 

This will create a VagrantFile which you may want to edit in case you wish to configure specific virtual machine
parameters (e.g. networking). 

Finally, launch the vagrant box by issuing the following command : 

    vagrant up --provider virtualbox

This may take several minutes depending on your bandwidth and the processing power of your workstation. 
   
Once it's completed, connect to the vagrant box :

    vagrant ssh

and start the desktop environment :

    sudo startxfce4 &
    
This is required in order to launch a web browser for using the Atricore Console and example web application.    

### Setup the JOSSO server

The example identity appliance encompasses three main entities, namely an Identity Provider and two Service Providers.
The Identity Provider is responsible of determining the identity of users, typically through some form of 
authentication, and establishing a session for them. Conversely, the two service providers will trust authentication
assertions made by the Identity Provider. Once authenticated, users will be able to navigate seamlessly from one 
service provider to the other without having to authenticate a second time.

The Identity Provider is using an internal repository - more specifically an identity vault - for storing user details.
You're free to use different repository flavours such as directories and external databases. The identity provider is also 
using simple username and password authentication. Alternative mechanisms, potentially stronger, may be used instead.
The Identity Provider is also exposing it's services using SAML therefore external SAML service provider may be
on-boarded.

Service Providers are realized as JavaEE web applications hosted on Apache Tomcat. Both are exposed as SAML service 
providers therefore may be linked to any SAML-compliant identity provider. 

#### Launch the Atricore Console

Although the JOSSO server is running, it's not configured yet. The playground box is bundled with an example 
configuration - known as identity appliance - for testing web single sign-on with JavaEE applications.

In order to access the Atricore Console, open a web browser from the desktop environment of the box :

![Web Browser Launch](assets/images/web-browser-launch.png)

Access using 'admin' as the username and 'atricore' as the password.

![Sign-in to the Atricore Console](assets/images/atricore-console-1.png)

#### Import and launch the demo identity appliance

Click on the 'Import' button and select the *josso-quick-start-appliance.zip* file located in the
/home/vagrant/atricore-josso-playground/demo-josso-ce-2.4.1-javaee-tomcat folder.

![Import Identity Appliance](assets/images/atricore-console-2.png)

Click on the 'Identity and Lifecycle Management' tab. Drag the imported identity appliance entry to the 'Staged' section. 
Then drag it to the 'Deployed' section and start it.
  
![Deploy and Start the Identity Appliance](assets/images/atricore-console-4.png)

The Identity Appliance should be up and running now thus ready to serve requests.

#### Provision test user and group

Both JavaEE web applications are configured to let in only users that are part of the 'role1' group. 

Therefore, in order to manage users and their entitlements switch to the 'Account and Entitlement Management' panel.
Click on the 'Create Group' button and enter 'role1' as the group name.

![Create role1 group](assets/images/atricore-console-9.png)

Create an example user identified as 'jdoe'. Enter the user details.

![Create jdoe user](assets/images/atricore-console-5.png)

Press on the 'Groups' tab and drag the 'role1' entry to the 'Member Of' column.

![Create role1 group](assets/images/atricore-console-6.png)

Press on the 'Password' tab and fill in the password field. Make sure to remember it as you'll need it to access the
configured applications.

![Set password](assets/images/atricore-console-7.png)

## Test it

The first usage scenario we're going to test is accessing successfully a protected resource on the first JavaEE application by
authenticating with the identity provider using a unique identifier. 
The second use-case encompasses accessing a protected resource within the second JavaEE application without having to
re-authenticate. This is typically known as single sign-on.

Make sure to use the Firefox browser from within the virtual machine hosting the JOSSO playground.

### Protected resource access using unique user identifier
 
Open the following Url in the browser : (http://demo_tomcat1_1.josso.dev.docker:8080/partnerapp/protected) .

You should be redirected to the identity provider for authenticating. Enter the username and password for the user
you've provisioned earlier identified as 'jdoe'.

You should be able to access the protected resource and view the details of the user.

![Partner application one access](assets/images/atricore-console-11.png)

### Single sign-on 

Open the following Url in the browser : (http://demo_tomcat2_1.josso.dev.docker:8080/partnerapp/protected) .

You should be redirected to the identity provider and then be able to access the protected resource without
authenticating a second time.

![Partner application two access](assets/images/atricore-console-10.png)



