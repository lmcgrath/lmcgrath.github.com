---
layout: post
title: "Using Perforce Chronicle for application configuration"
date: 2012-10-23 13:54
comments: false
categories:
---

Following Paul Hammant's post [App-config workflow using SCM](http://paulhammant.com/2012/07/10/app-config-workflow-using-scm/) and subsequent [proof of concept](http://paulhammant.com/2012/08/14/app-config-using-git-and-angular/) backed by Git, I will show that an app-config application backed by Perforce is possible using [Perforce Chronicle](http://www.perforce.com/products/chronicle).

[Perforce](http://en.wikipedia.org/wiki/Perforce) is an enterprise-class source control management system, remarkably similar to Subversion (they were inspired by Perforce :) Perforce is more bulletproof than Subversion in many ways and it's also significantly faster. Git does not impose any security constraints or permissions on branches, Perforce gives comprehensive security options allowing you to control access to different branches: for example, development, staging, and production. Subversion, however, can support permissions on branches with some extra configuration (Apache plus mod_dav_svn). For these reasons, Perforce is a better option for storing configuration data than either Git or Subversion.

Perforce Chronicle is a content management system (CMS) using Perforce as the backend store for configuration and content. The app-config application is built on top of Chronicle because Perforce does not offer a web view into the depot the way Subversion can through Apache. Branches between environments can be managed through the user interface, and Chronicle gives a full user management system as well, so access between different configuration files can be restricted appropriately. The INSTALL.txt file that is distributed with Chronicle helps with an easy install.

There is a key issue in using Chronicle, however. The system is designed for the management of _content_ and not necessarily _files_. In order to make the app-config application work, I had to add a custom content type and write a module. Configuration and HTML are both plain-text content, so I created a "Plain Text" content type:

1. Go to "Manage" > "Content Types"
1. Click "Add Content Type"
1. Enter the following information:

I've borrowed heavily from Paul's [app-config app script](https://github.com/paul-hammant/app-config-app/blob/master/index.html), which uses [AngularJS](http://angularjs.org/) to manage the UI and interaction with the server.
