
# AnnounceSign

## Background

An easy to use, annoucement creating, updating and scheduling tool. 

### Tech Stack
* SQL
* Express
* React
* Node.js 

With other libraries and packages:

* TinyMCE
* Sequelize
* OAuth
* Passport
 
### User Stories
As a user I want to be able to login using my Google Account

As a user I want to be able to create a posting using the WYSIWYG editor

As a user I want to be able to set a date and time for when this posting should display

As a user I want to be able to set a interval for when it can repetitively show

As a user I should be notified if the post I am creating is unable to be posted due to space or time conflicts.

### Mockups
#### Login 
![Login](https://i.imgur.com/yX3J0af.png)
#### Create / edit annoucement with live preview
![Create Display V1](https://i.imgur.com/gcP3SJx.png)
#### Create / edit annoucement with live preview
![Create Display V1](https://i.imgur.com/cu5EBpp.png)

#### Create / edit announcement without preview
![Create Display V2](https://i.imgur.com/vl1JUWS.png)
#### Live display
![Display](https://i.imgur.com/w3MQxJJ.png)
#### Profile / announcement listing 
![Post Display](https://i.imgur.com/5VipkPH.png)
#### Editing announcement within profile 
![Post Display](https://i.imgur.com/9q6lXJd.png)

### Data Model
![Data Model](https://i.imgur.com/DpKYoOC.png)


### Routing

#### User routes
| Path | HTTP Action | SEQUELIZE CRUD | SQL | 
| -----| ---- | ----| ----- |
| /users | GET | 
| /users/:id | GET |

#### Announcement routes
| Path | HTTP Action | SEQUELIZE CRUD | SQL | 
| -----| ---- | ----| ----- |
| /announcements | GET | # | SELECT * FROM post_content;
| /announcements/:id | GET |
| /announcements| POST |
| /announements/:id/edit | GET
| /announcements/:id | PUT
| /announcements/:id | DELETE


### Sprint plan

Backlog| Duration
----------|------|
SETUP React Router | 3
Create TINYMCE Component | 1 
Create scheduling component | 1 |
Create announcement display component | 1 |
Create create profile component | 1 |
Create announcement component for profile listing | 1
Setup express server | 1 |
Setup oAuth | 1 |
Setup Passport | 1 |
Create SQL db (cli) | 1 |
Create Sequelize schemas | 1 |
Create sequelize migrations (seeds) | 1 |
Create sequelize models | 1 |
Create annoucements controller | 1 |
Create announcements router | 1 |
Test Routes (Postman) | 1 | 
Setup Mocha, Express / Sequelize unit tests | 1 | 

