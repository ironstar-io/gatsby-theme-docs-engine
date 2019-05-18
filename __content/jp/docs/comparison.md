---
title: 東海道を比較
root: '/docs'
parents: ['root']
tags: ['一般情報', '比較']
---

# 東海道を比較

If you're thinking about checking out Tokaido, we've prepared this section to help explain how Tokaido stacks up against some popular alternatives.

Tokaido is of course far from the first local Drupal development environment manager. There are many competing solutions in this space and a most of them are wonderful.

We especially want to tip our hat to utilities like DrupalVM, Lando, and Docker4Drupal. A lot of work goes into making these incredible tools and if you use them, you might like to send a note to the developer(s) to commend them. Trust us, they deserve the credit.

So if good tools already exist in this space, why did we create Tokaido? The main reason and driving force behind Tokaido is a desire to build something that makes setting up Drupal environments truly effortless. If you don't have to learn Tokaido in order to use Tokaido, then we feel we've succeeded.

VM-Based Solutions
While virtual machine (VM) based solutions like DrupalVM and Beetbox are powerful tools, the fact that they use a VM puts them in a different class than Tokaido. Ultimately, using a VM means using lots of memory and disk space just to get started. Most developer workstations can only run one or maybe two VMs at a time before they run out of memory and CPU power.

For these reasons, we haven't listed VM-based solutions below because we don't think they're competitive enough. Docker-based solutions are the future, because they're very lightweight and easily ported between different platforms.

Performance and Features

Tokaido Docker4Drupal Lando
Startup Time
(excluding initial download) < 60 seconds < 60 seconds < 60 seconds
Installation brew install tokaido Manual Manual
Usability Easy Complex\* Moderate+
Works out-of-the-box\*\* Yes No No
Start new Drupal projects in 5 minutes Yes No No
Full Drush/Drush SSH Environment Yes No No
Production-grade containers Yes No No
Automated DB Configuration Yes No No
Automated SSL Configuration Yes No No
Modify PHP Runtime Config Yes Yes Yes
Run multiple environments easily Yes No No
Dev Tools (yarn, npm, ruby, etc) Yes No No
Tokaido also ships with an incredible powerful CLI that helps eliminate the need for you to manually manage config files.

Tokaido Docker4Drupal Lando
Powerful CLI Yes No Kinda
Start new projects tok new - -
Launch an environment tok up docker-compose up -d lando start
Edit configuration tok config - -
Connect Drupal to database tok up - -
Perform environment self-check tok status - -
SSH into the environment ssh {project}.tok - lando ssh ++
Run commands in the environment tok exec "{command}" docker-compose exec -
Reset Varnish cache tok purge - -
Open site in browser tok open - -
Open services in browser tok open {service} - -
Generate a Drupal hash salt tok hash - -
Docker4Drupal is controlled by a Docker Compose file and requires an in-depth understanding of Docker and Docker Compose in order to make changes.
Lando provides a helpful CLI that makes starting and managing environments easier, but we still think Tokaido has it beat in this department.
++ Lando's 'ssh' environment is really just a docker-compose exec command, which is helpful for running commands but is not a full-featured dev environment

\*\* Nearly every Drupal project we've tested works with Tokaido without any special config. When testing Lando and Docker4Drupal, even the most basic Drupal minimal installation required special config to get going.
