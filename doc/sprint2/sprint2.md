<!-- Output copied to clipboard! -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 1.517 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β30
* Fri Jul 02 2021 20:09:59 GMT-0700 (PDT)
* Source doc: sprint2
* Tables are currently converted to HTML tables.
----->



# **Sprint 2 Planning Meeting**

**Sprint Goal**: Add five new features including the ability to reply to posts, view other users’ profiles, create a team, and create an assignment.

**Team Capacity**: Our team members have a range of responsibilities across different courses and jobs. Each team member agrees to commit 20 hours for sprint 2. Additional hours will be divided between other teammates, or moved to future sprints.

**Spikes**: 



* Fix bugs from sprint 1. Some of the bugs such as “Fix Auth Dependency” are hard to estimate as the circumstances surrounding them will change. A list of bugs is outlined below in the “Bugs from sprint 1” section.   
* The majority of the team members have not worked with MongoDB. Teammates need to learn some MongoDB to integrate Mongo in the future.

**Meeting Participants**: 



* Ethan Lam
* Jan Garong
* Michael Sheinman Orenstrakh
* Akira Siddharth Takaki
* Maryam Gohargani
* Catherine Xia
* Hai Yang Tang	

**Note**: We were not able to find time to schedule this meeting with the product team due the conflicts in the team members’ schedules. We will asynchronously meet with Efosa to make sure he is okay with the features in this sprint as well as the sprint goal.

**User Stories**:


<table>
  <tr>
   <td>User Story
   </td>
   <td>Criteria of Satisfaction
   </td>
   <td>Points
   </td>
  </tr>
  <tr>
   <td>As a user, I can reply to a post in the discussion board, and see all posts so that I can communicate with others. 
   </td>
   <td>
<ul>

<li>There is a way to reply to posts. 

<li>Posts are stored in the backend

<li>When a user sends a post, the page refreshes. 

<li>Appropriate tests are included for the COS
</li>
</ul>
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>As Rahul, I can click on a user and see their profile so I can learn more about them.
   </td>
   <td>The link redirects the user to a profile page, and the profile includes:
<ul>

<li>The user’s name

<li>An about me section

<li>A role section
</li>
</ul>
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>As a user, I can view the posts a user sent in their profile. 
   </td>
   <td>
<ul>

<li>The profile section includes the posts the user sent. 

<li>The UI is similar to the Figma design in UX.pdf. 
</li>
</ul>
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>As Eidi, I can create a new team so that I can later connect with my team on this platform.
   </td>
   <td>
<ul>

<li>An entrepreneur can create a new team and specify a team name.

<li>The team data is stored in the backend
</li>
</ul>
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>As Harold, I can create a page for one deliverable assignment, with basic instructions for the deliverable.
   </td>
   <td>
<ul>

<li>Harold can create a page for a deliverable assignment.

<li>The deliverables information is stored in the backend.
</li>
</ul>
   </td>
   <td>4
   </td>
  </tr>
</table>


**Tasks**:


<table>
  <tr>
   <td>User Story 
   </td>
   <td>Task
   </td>
   <td>Assignee
   </td>
   <td>Deadline
   </td>
  </tr>
  <tr>
   <td rowspan="8" >As a user, I can reply to a post in the discussion board, and see all posts so that I can communicate with others. 
   </td>
   <td>Renaming messages to be posts (backend)
   </td>
   <td>Maryam
   </td>
   <td>June 20 23:59
   </td>
  </tr>
  <tr>
   <td>Renaming messages to be posts (frontend)
   </td>
   <td>Jan
   </td>
   <td>June 20 23:59
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Create a frontend UI for replying to a post
   </td>
   <td rowspan="2" >Jan
   </td>
   <td rowspan="2" >June 23 23:59
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td>Revamp post pagination API to include [start:end] number of posts without parents
   </td>
   <td>Akira
   </td>
   <td>June 23 23:59
   </td>
  </tr>
  <tr>
   <td>Create a new pagination API that only gives replies [start:end] for one post
   </td>
   <td>Akira
   </td>
   <td>June 23 23:59
   </td>
  </tr>
  <tr>
   <td>Fix frontend pagination for posts
   </td>
   <td>Hai Yang
   </td>
   <td>June 28 23:59
   </td>
  </tr>
  <tr>
   <td>Make pagination for replies of one post (frontend)
   </td>
   <td>Hai Yang
   </td>
   <td>June 28 23:59
   </td>
  </tr>
  <tr>
   <td rowspan="4" >As Rahul, I can click on a user and see their profile so I can learn more about them.
   </td>
   <td>Make profile API not session dependent (backend)
   </td>
   <td>Maryam
   </td>
   <td>June 23 23:59
   </td>
  </tr>
  <tr>
   <td>Make frontend give edit privileges only for logged in users
   </td>
   <td>Cat
   </td>
   <td>June 25 23:59
   </td>
  </tr>
  <tr>
   <td>Add frontend pagination for users
   </td>
   <td>Ethan
   </td>
   <td>June 25 22:23
   </td>
  </tr>
  <tr>
   <td>Make parameterized URL for profile pages
   </td>
   <td>Cat
   </td>
   <td>June 30 23:59
   </td>
  </tr>
  <tr>
   <td rowspan="3" >As Rahul, I can click on a user and view the posts they’ve sent. 
   </td>
   <td>Make backend API for grabbing posts (without parents) of one user
   </td>
   <td>Akira 
   </td>
   <td>June 25 23:59
   </td>
  </tr>
  <tr>
   <td>Add pagination for posts of one user
   </td>
   <td>Jan
   </td>
   <td>June 26 23:59 \

   </td>
  </tr>
  <tr>
   <td>Add frontend UI for the Activity tab of a user profile
   </td>
   <td>Jan
   </td>
   <td>June 27 23:59
   </td>
  </tr>
  <tr>
   <td rowspan="3" >As Eidi, I can create a new team so that I can later connect with my team on this platform.
   </td>
   <td>Make DAO for a team
   </td>
   <td>Michael
   </td>
   <td>June 23 23:59
   </td>
  </tr>
  <tr>
   <td>Add a frontend UI page where a user to create a team
   </td>
   <td>Cat
   </td>
   <td>June 28 23:59
   </td>
  </tr>
  <tr>
   <td>Add a backend API to create a team.
   </td>
   <td>Michael
   </td>
   <td>June 25 23:59
   </td>
  </tr>
  <tr>
   <td rowspan="4" >As Harold, I can create a page for one deliverable assignment, with basic instructions for the deliverable.
   </td>
   <td>Make DAO for an assignment
   </td>
   <td>Ethan
   </td>
   <td>June 22 22:23
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Add a frontend UI page where a user can create an assignment
   </td>
   <td rowspan="2" >Cat
   </td>
   <td rowspan="2" >June 28 23:59
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td>Add a backend API for an assignment to be stored
   </td>
   <td>Michael
   </td>
   <td>June 25 23:59
   </td>
  </tr>
</table>


**Other tasks**:



* Initial Sprint 2 Jira: Michael
* Fix product backlog: Michael
* Handle Deadline Merges/Conflicts: Maryam
* Fix Challenging Bugs: Hai Yang
* Update documentation: Michael

**Bugs from sprint 1**:



* Fix auth module dependency in the backend: Maryam (June 25 23:59)
* Fix server-side documentation to incorporate response type: Michael (June 25, 23:59)
* Store children posts when a reply occurs: Maryam (June 21 23:59)
* When editing name of user, the name in top right does not change: Hai Yang (June 25 23:59)
* Fill in the URLs in the navbar: Ethan (June 25th 23:59)
* Refactor user first name & last name, fix profile to include first & last name separately: Maryam (June 27 23:59)
* Rename messages to posts at backend:  Maryam (June 20 23:59)
* Rename messages to posts at frontend: Jan (June 20 23:59)

**Roles**:


<table>
  <tr>
   <td>Michael
   </td>
   <td>Backend
   </td>
  </tr>
  <tr>
   <td>Jan
   </td>
   <td>Frontend
   </td>
  </tr>
  <tr>
   <td>Maryam
   </td>
   <td>Backend 
   </td>
  </tr>
  <tr>
   <td>Hai Yang
   </td>
   <td>Frontend
   </td>
  </tr>
  <tr>
   <td>Cat
   </td>
   <td>Backend 
   </td>
  </tr>
  <tr>
   <td>Ethan
   </td>
   <td>Fullstack 
   </td>
  </tr>
  <tr>
   <td>Akira
   </td>
   <td>Backend
   </td>
  </tr>
</table>

