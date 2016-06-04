---
title: High-level Architecture
section: Architecture
---

## Overview

JOSSO is a solution based on the Atricore IAM (Identity and Access Management) Platform, also known as the Atricore
Identity Bus. Technically, JOSSO is  just a distribution of the Atricore IAM Platform, in the same way Fedora or Ubuntu
are distributions of the Linux operating system. Therefore, this allows to deliver alternative products
potentially addressing alternative use-cases within the IAM space.

Much or this flexibility lies on the OSGi foundation the solution is based on. All platform components are OSGi bundles,
a common and standards-based interface for describing platform modules. For instance JOSSO spans to around 200
OSGi bundles. Even the core is a bundle. Different set of features are enabled based on on the bundles
you choose to use.

![High-level JOSSO architecture](assets/images/josso-architecture.png)

## Building Blocks

The main entry point for JOSSO is the Atricore Console, a web application for specifying and controlling your IAM stack.
More specifically, the console is used to visually design an IAM architecture, allowing for the transformation to a
working artifact realizing the defined services. In order to do so, it relies on the IAM capabilities enabled in the platform.

In addition to configuring and rolling out services, JOSSO can provision support onto the target systems in order to 
reduce the integration effort.

### Identity Appliance

IAM solutions are known within JOSSO as 'Identity Appliances'. An Identity Appliance is an artifact which
encompasses the definitions necessary to instantiate Internet SSO services, in order to realize a specific identity
architecture.

For instance, upon deployment of an identity appliance, defined Internet SSO endpoints are enabled. Each endpoint will
expose a specific behavior, such as for a specific authentication service, or identity data streams from an arbitrary
identity store responding to a specific user schema.

Identity Appliances can be specified either by using a visual notation (using the Atricore Console) or directly, using
a textual notation based on XML descriptors .

Identity Appliances are standard OSGi Bundles, as are all the artifacts that make up JOSSO. 

### IAM Modeling and Lifecycle Management

While JOSSO1 provides a command line console in order to provision SSO support onto the target environment, users are
still required to deal with low-level artifacts - such as XML descriptors - in order to fine tune the implementation.

This creates a high entry barrier for less technically-savvy users, due to the learning curve involved with JOSSO and
the constructs employed in order to set up the product to realize SSO usage scenarios. In addition, the people
responsible for the identity architecture do not have visibility or control of the federated single sign-on setting,
so they have to rely on more technically proficient people - usually not SME experts - in order to bring their project
to life. Chances for miscommunication increase as a consequence, and that poses a significant risk to the identity
and access management project.

With the Identity Appliance Modeler, the Identity Architect gains complete control of the process of mapping the
high-level identity architecture to something that will actually execute. Definition of the identity architecture can
be accomplished in a purely visual fashion, thus eliminating the high entry barrier that’s typically required to
engage in the delivery of IAM features.

The Identity Architect is also in control of transforming the identity architecture model into a fully executing
artifact. As with the Identity Appliance Modeler, it’s a simple point-and-click process.

### IAM Microkernel

The IAM microkernel contains the foundational services as well as the engine for compiling and managing the 
 lifecycle of IAM solutions, known as identity appliances. 

### IAM Capabilities

The essential building blocks of the Identity Bus are Identity Capabilities. An Identity Capability represents the
realization of a group of cohesive Identity and Access Management (IAM) features.

By deploying a capability onto the Identity Bus, specific IAM services become available to Identity Appliances and in
turn to Identity-centric business applications and their users.

Example Identity Capabilities include SAML2, OpenID Connect, Integrated Windows Authentication, MFA to name a few.

You're free to extend JOSSO by implementing your own IAM Capabilities.

## Knowing more

If you want to know more about how the inner workings of the Atricore platform on top JOSSO is built you can skim
through the source code on Github: http://github.com/atricore


