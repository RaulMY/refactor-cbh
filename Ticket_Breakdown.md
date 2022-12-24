# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Before breaking this down into smaller tickets, we probably need to ask for some clarifications regarding the requirement. At the very least, I'd first ask whomever asked this to clarify what exactly the purpose is. I'm assuming this is to make it easier for facilities to request specific agents in the future using their own database. Perhaps agents are also provided by facilities in some manner, so they user their own ids rather than ours.

I'm also making the assumption that the three existing tables (Facilities, Shifts and Agents) are part of a relational database like MySQL.

Facitilies has information about each facility and has a unique Id as its primary key.

Agents has information about each agent, and similarly to Facilities, there is also a unique Id as its primary key.

Shifts has information about each shift, such as a timestamp, number of hours, status, etc. It also has a unique Id as its primary key, but on top of that there are foreign keys for the facility and the agent.

getShiftsByFacility does a query to SELECT all shifts for a given Facility Id, it also has a JOIN with the Agents table using the agents id foreign key, that is how it brings forward the agent metadata.

With that in mind, I think we could break down the tickets as follows:

1) Add an extra column to the Shifts Table named Custom Agent Id to save any future custom ids. This new column would not be a foreign key like the already existing agent Id, but rather it would just be a VARCHAR columns to store whatever custom id the facility provides.

Acceptance Criteria: The column being added to the prod database. This column should accept null values as default since any previous entries would not have that custom id, also it's possible for some facilities to choose to not use a custom Id.

Time Estimate: This is a relatively simple task so a single day should suffice. However, depending on how big the organization is, there could be some extra hurdles to go through to modify a table on the prod database, so we could add an extra day to this. If it's something that we know can be slow, we should aim to have this in the dev environemnt first so other tasks can be tested on that environment.

Implementation: The developer assigned to this task would be provided with an existing Pull Request that did something similar in the past (adding a new column is a relatively common occurrence). If any changes to tables on prod need a lot of help from external teams, then the developer would also be provided with information about how to accomplish that.

As part of the implementation, they will need to run all relevant tests after making the changes on a testing environemnt, in particular, they should test that all read, write and delete operations can be completed without any issue with the extra change.

2) Make any updates to any models built around the Shifts Table on our backend so they now include the new column.

Acceptance Criteria: All models are updated, and all tests should be updated and pass as expected. One of the tests should include those for the reports. They should test that adding anything to the custom Id will be included in the report that is generated.

Time Estimate: One day. Development should only take a day, as it's a relatively simple change, as the models should already exist and they probably have been modified before.

3) The next ticket will deal with modifying the UI for creating/updating new shifts. This would just be an extra field in whatever form we are using, so there would be little need for a designer. The developer would need to add that field, make sure it's optional and make sure it's being sent to backend when the form is submitted, and that the backend includes the custom id when creating/updating the entry in the Shifts table.

Acceptance Criteria: The extra field is added to the UI. Nothing in the UI should break, in any of its views (desktop, tablet, mobile). Facilities should be able to create/modify shifts without having to include a custom id for an agent.

Time Estimate: Assuming we already have a reusable components for our input, then it should be a simple addition to the UI. The writing in the backend should also be pretty straight forward.



These three tickets will allow facilities to add the Custom Id, and include them in the generated reports. As a whole this a relatively simple task, so one developer can probably take on all of these tickets and complete them in less than a week. Tickets 2 and 3 depend on the first one being finished, but they could be started before ticket 1 is finished, so there could be some benefit to having multiple developers work on these, but unless there is a lot of urgency about it, it's probably easier to have just one focus on this.

There are a few more tasks that could be built later on to make the experience better for the facilities, such as adding search functionality by Custom Id when looking up agents, overwriting previous shifts with a custom id when the same facility selects a previously used agent.
