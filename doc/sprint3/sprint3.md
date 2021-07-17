<!-- Output copied to clipboard! -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 1.293 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β30
* Fri Jul 16 2021 18:30:53 GMT-0700 (PDT)
* Source doc: sprint3
* Tables are currently converted to HTML tables.
----->



# **Sprint 3 Planning Meeting**

**Sprint Goal**: Add five new features including the ability to upload assignment instructions as a file, view all assignments, upload a profile picture, add tags, and approve role request changes. 

**Team Capacity**: Our team members have a range of responsibilities across different courses and jobs. Each team member agrees to commit 20 hours for sprint 3. If a team member reaches their limit, we will divide the additional hours between the other teammates. If that’s not possible, we will move corresponding tasks to future sprints.

**Spikes**: 



* Integrate the database into the project.
* Store files in the database including the profile picture files and assignment deliverables. 

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
   <td>As Harold, I can upload instructions to an assignment page using a custom file format.
   </td>
   <td>
<ul>

<li>Harold can attach different file formats to the deliverables including .png, .jpg, .pdf, .mp3, and .mp4. 

<li>The deliverables are stored in the backend.
</li>
</ul>
   </td>
   <td>4
   </td>
  </tr>
  <tr>
   <td>As Eidi, I can see a page with all the assignments that must be completed.
   </td>
   <td>
<ul>

<li>Eidi can see all assignments.
</li>
</ul>
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>As a user, I can add a profile picture to personalize my profile. 
   </td>
   <td>
<ul>

<li>The profile picture is stored in the backend. 

<li>Users can see the profile picture in this user’s profile.  
</li>
</ul>
   </td>
   <td>4
   </td>
  </tr>
  <tr>
   <td>As a user, I can add a tag to a post so that my post can be associated with a corresponding category.
   </td>
   <td>
<ul>

<li>When a user creates a post they can select a corresponding post tag.

<li>Users can see a tag.
</li>
</ul>
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>As an admin, I can see pending investor, service owners, and corporation requests and approve them so that they are free to use the system. 
   </td>
   <td>
<ul>

<li>An admin can see a tab with pending requests to become an investor, service provider, or a corporation. 

<li>An admin can either deny or approve the request.
</li>
</ul>
   </td>
   <td>3
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
   <td rowspan="4" >As Harold, I can upload instructions to an assignment page using a custom file format.
   </td>
   <td>Frontend button/page to upload a document 
   </td>
   <td>Catherine
   </td>
   <td>July 12
   </td>
  </tr>
  <tr>
   <td>API endpoint to receive the file
   </td>
   <td>Akira
   </td>
   <td>July 10
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Change assignment DAO to support files.
   </td>
   <td rowspan="2" >Akira
   </td>
   <td rowspan="2" >July 10
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td rowspan="2" >As Eidi, I can see a page with all the assignments that must be completed.
   </td>
   <td>Pagination Assignment API
   </td>
   <td>Michael
   </td>
   <td>July 5
   </td>
  </tr>
  <tr>
   <td>Frontend to use the API and display assignments
   </td>
   <td>Ethan
   </td>
   <td>July 10
   </td>
  </tr>
  <tr>
   <td rowspan="3" >As a user, I can add a profile picture to personalize my profile. 
   </td>
   <td>Frontend button to modify the profile picture.
   </td>
   <td>Hai Yang
   </td>
   <td>July 6
   </td>
  </tr>
  <tr>
   <td>API endpoint to receive the picture file.
   </td>
   <td>Hai Yang
   </td>
   <td>July 6
   </td>
  </tr>
  <tr>
   <td>Create database DAO to store the picture file.
   </td>
   <td>Hai Yang
   </td>
   <td>July 6
   </td>
  </tr>
  <tr>
   <td rowspan="5" >As a user, I can add a tag to a post so that my post can be associated with a corresponding category.
   </td>
   <td>Update backend DAO and entity to support post tags. 
   </td>
   <td>Maryam
   </td>
   <td>July 5
   </td>
  </tr>
  <tr>
   <td>Update backend Create Post API to support tags
   </td>
   <td>Maryam
   </td>
   <td>July 8
   </td>
  </tr>
  <tr>
   <td>Update backend Get Post APIs to support tags
   </td>
   <td>Maryam
   </td>
   <td>July 8
   </td>
  </tr>
  <tr>
   <td>When a user makes a post, they can specify tags. 
   </td>
   <td>Jan
   </td>
   <td>July 12
   </td>
  </tr>
  <tr>
   <td>Display on frontend the tags a post has.
   </td>
   <td>Jan
   </td>
   <td>July 12
   </td>
  </tr>
  <tr>
   <td rowspan="4" >As an admin, I can see pending investor, service owners, and corporation requests and approve them so that they are free to use the system. 
   </td>
   <td rowspan="2" >Add frontend page for requests
   </td>
   <td rowspan="2" >Catherine
   </td>
   <td rowspan="2" >July 10
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td>Add backend to change Role of a user
   </td>
   <td>Michael 
   </td>
   <td>July 5
   </td>
  </tr>
  <tr>
   <td>Add backend pagination API to get requests. 
   </td>
   <td>Akira 
   </td>
   <td>July 6
   </td>
  </tr>
  <tr>
   <td rowspan="4" >Database
   </td>
   <td>Create an assignment DAO
   </td>
   <td>Ethan
   </td>
   <td>July 6
   </td>
  </tr>
  <tr>
   <td>Create a request DAO
   </td>
   <td>Jan
   </td>
   <td>July 6
   </td>
  </tr>
  <tr>
   <td>Create a userprofiles DAO
   </td>
   <td>Ethan
   </td>
   <td>July 6
   </td>
  </tr>
  <tr>
   <td>Create a post DAO 
   </td>
   <td>Jan
   </td>
   <td>July 6
   </td>
  </tr>
</table>


**Other tasks**:



* Handle Deadline Merges/Conflicts: Maryam
* Fix Challenging Bugs: Hai Yang
* Update documentation: Michael

**Bugs from sprint 1-2**:



* Edit requests should be converted from POST -> PATCH (Michael) (July 5, 2021)
* Fix Auth Dependency (Hai Yang)
* allow editing profile multiple times (Catherine) (July 5, 2021)
* don't allow creating teams with the same name (Michael)  (July 5, 2021)

**Documents Tasks:**


<table>
  <tr>
   <td>Burndown Chart
   </td>
   <td>Michael
   </td>
  </tr>
  <tr>
   <td>Sprint Planning 
   </td>
   <td>Already done (proofread: Michael)
   </td>
  </tr>
  <tr>
   <td>Schedule
   </td>
   <td>Cat
   </td>
  </tr>
  <tr>
   <td>Product Backlog
   </td>
   <td>Already done (proofread: Ethan)
   </td>
  </tr>
  <tr>
   <td>Sprint 2 Retrospect
   </td>
   <td>Already done (proofread: Akira)
   </td>
  </tr>
  <tr>
   <td>System Design
   </td>
   <td>Everyone does their own part!
   </td>
  </tr>
</table>


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
   <td>Frontend, DB
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
   <td>Frontend, DB
   </td>
  </tr>
  <tr>
   <td>Cat
   </td>
   <td>Frontend
   </td>
  </tr>
  <tr>
   <td>Ethan
   </td>
   <td>Frontend, DB
   </td>
  </tr>
  <tr>
   <td>Akira
   </td>
   <td>Backend
   </td>
  </tr>
</table>

