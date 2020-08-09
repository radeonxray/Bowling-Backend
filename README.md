# Bowling-Backend

## Background
This project was developed as a supplement/companion for the [Bowling Assignment](https://github.com/radeonxray/Bowling) that I developed for my job interview with ***SKAT*** (Danish IRS). For the [Bowling Assignment](https://github.com/radeonxray/Bowling), I used Java to develop a program that could GET bowling scores from the provided ***SKAT-API***, correctly calculate the scores and POST the scores back through the provided API-path.

After having developed my solution, I noticed that the [assignment description](https://github.com/skat/bowling-opgave) had been updated a couple of times over the years and certain techincal details and specifications had changed or been removed as well. This made me fear that my own solution, in the furture, potentially might no longer be compatible or work correctly with the API-paths that ***SKAT*** had provided. Since I only had the API-path and no access to the actual code, I decided to develop my own REST-api that would be able to perform exactly as ***SKAT***, thus making sure that my Java solution would work in the future, even if ***Skat*** changed their structure.



## Techincal Details

**Developed with:** *JavaScript & Express JS*

**Database:** *NoSQL (MongoDB)*

## Development and Challenges 

- Be able to GET a bowling score to be calculated
- Be able to POST a calculated bowling score and get a response on wether or not the provided calculated score was correct.
- Be able to add new scores to the database

For development, I used my existing personal *Express JS* backend server and expanded it with a new API-path *bowling*, in which the *GET/POST/ADD* functionalities was developed. I also used my existing *MongoDB (NoSQL)* database for hosting the bowling scores and correct results.

To Add new scores and results to the database, I manually added new entries into to the database using [PostMan](https://www.postman.com/). I used [BowlingGenius](https://www.bowlinggenius.com/) to make sure and verify, that the added scores also had the correct results. All entries in the database was also run through my Java solution, both to make sure that my assignment solution could communicate correctly with the my backend, but also to see if my Java solution could calculate all the scores correctly, which it turned out (for a few scores) it couldn't! So this project also resultet in me discovering and fixing a few errors/bugs in my Java solution, yah!

To handle the bowlingscores in the backend, I created a new mongoose-schema containing the following:

```javascript
var bowlingpoints= new Schema({
    token: String,
    points: [[Number]],
    result: [Number],
})
```

- *token*: Contains the token used to identify the correct score and results in the database
- *points*: An Array of Array's, containing the scores of the bolwing game to be calculated
- *result*: The correct calcualted result of the *points*

This schema would be used to as a JSON-element in communication to/from the backend.

### What is the token used for?
When using GET to get a score to be calculated, the user will also get a unique-token. When the user wants to POST their calculated results, the token that was retrieved in the GET-call has to be provided in the POST-call, in order for the backend to find the correct entry and *reult* in the database to compare with.
When adding a new data entry into the database, the entry is automatically assigned a random unique token.

### Communication with the Java Solution
My Java solution, [Bowling Assignment](https://github.com/radeonxray/Bowling), currently have both the API to **SKAT** and the API to my online backend, which the user can freely switch between.

## Can I run and test the files in this project/repo myself?

**Short answer:** *No* 

**Long answer:** *Yes*, but you will need to insert, edit and fit them into your own existing backend server, running *Express JS* with a *MongoDB* database. Because I developed this project using my existing personal backend, this repo only contains the files for the API-part of the project and not the source code for my entire personal backend. 


## Potential future development

### Automatically generate new database entries
New scores are added through the ```/api/add```-api, but currently have to be done so manually and be verified before being added. In order to automate the process of adding new entries to the database a bit more, I see the following two options:

- Develop a native JavaScript-version of the bowling calculator in the backend server
  - Be able to enter (manually) a new score, that then gets calculated and uploaded to the database
  - Be able to automatically generate a new score, that then gets calculated and uploaded to the database
- Expand the functionality of the Java solution
  - Be able to enter (manually) a new score, that then gets calculated and uploaded to the database
  - Be able to automatically generate a new score, that then gets calculated and uploaded to the database
