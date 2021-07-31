# **Sprint 4 Planning Meeting**

**Sprint Goal**: Implement the four assignment-related features (viewing an assignment, uploading a submission, viewing submissions as a mentor, and leaving feedback for assignments as a mentor), and add social media links to a user’s profile.

**Team Capacity**: Our team members have a range of responsibilities across different courses and jobs. Each team member agrees to commit 20 hours for sprint 3. If a team member reaches their limit, we will divide the additional hours between the other teammates. If that’s not possible, we will move corresponding tasks to future sprints.

**Spikes**: 



* Integrate CI/CD with MongoDB database tests.
* Deploy the program to a live website. 

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
   <td>As a user, I can add social media links in my profile so that I can connect with others on separate platforms.
   </td>
   <td>
<ul>

<li>A user can specify links for their personal site, their linkedin, and their twitter accounts.

<li>Links information is stored in the database.
</li>
</ul>
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td>As Eidi, I can click on an assignment to navigate to an assignment page.
   </td>
   <td>
<ul>

<li>Eidi can click on an assignment.

<li>The assignment redirects Eidi to an assignment-specific page.
</li>
</ul>
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>As Eidi, I can upload a corresponding submission for an assignment. 
   </td>
   <td>
<ul>

<li>Eidi can attach different file formats to the deliverables including .png, .jpg, .pdf, .mp3, and .mp4. 

<li>The submission is stored in the database.
</li>
</ul>
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>As Harold, I want to be able to view the submission of participants so that I can review their progress. 
   </td>
   <td>
<ul>

<li>Harold can click on an Assignment and see corresponding submissions.

<li>Only users with the “Mentor” or “Admin” role can see submissions.
</li>
</ul>
   </td>
   <td>4
   </td>
  </tr>
  <tr>
   <td>As Harold, I can provide feedback on assignment submissions so that I can help participants improve their products. 
   </td>
   <td>
<ul>

<li>Harold can add a text with assignment feedback.

<li>The corresponding entrepreneur can see the feedback submitted for the assessment. 
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
   <td rowspan="2" >[FIF-106] As a user, I can add social media links in my profile so that I can connect with others on separate platforms.
   </td>
   <td>[FIF-111] Backend Patch API to Update Links
   </td>
   <td>Ethan
   </td>
   <td>July 21st
   </td>
  </tr>
  <tr>
   <td>[FIF-115] Frontend UI to edit links
   </td>
   <td>Ethan
   </td>
   <td>July 21st
   </td>
  </tr>
  <tr>
   <td rowspan="5" >[FIF-107] As Eidi, I can click on an assignment to navigate to an assignment page.
   </td>
   <td>[FIF-126] Backend API for downloading assignment file
   </td>
   <td>Akira
   </td>
   <td>July 20
   </td>
  </tr>
  <tr>
   <td>[FIF-119] Backend entity and DAO for a submission
   </td>
   <td>Maryam
   </td>
   <td>July 20
   </td>
  </tr>
  <tr>
   <td>[FIF-123] Backend API for retrieving assignment + submissions data
   </td>
   <td>Maryam
   </td>
   <td>July 20
   </td>
  </tr>
  <tr>
   <td>[FIF-116] Make assignments clickable to an individual page
   </td>
   <td>Hai Yang
   </td>
   <td>July 22   
   </td>
  </tr>
  <tr>
   <td>[FIF-113] Frontend view Assignment Page
   </td>
   <td>Hai Yang
   </td>
   <td>July 22
   </td>
  </tr>
  <tr>
   <td rowspan="2" >[FIF-108] As Eidi, I can upload a corresponding submission for an assignment. 
   </td>
   <td>[FIF-120] Frontend button for uploading file
   </td>
   <td>Cat
   </td>
   <td>July 24
   </td>
  </tr>
  <tr>
   <td>[FIF-109] Backend API for uploading a submission file 
   </td>
   <td>Michael
   </td>
   <td>July 23
   </td>
  </tr>
  <tr>
   <td rowspan="3" >[FIF-110] As Harold, I want to be able to view the submission of participants so that I can review their progress. 
   </td>
   <td>[FIF-114] Backend API for submission pagination
   </td>
   <td>Jan
   </td>
   <td>July 24
   </td>
  </tr>
  <tr>
   <td>[FIF-117] Frontend for Mentor Assignment Page View
   </td>
   <td>Jan
   </td>
   <td>July 25
   </td>
  </tr>
  <tr>
   <td>[FIF-127] Backend API for downloading a submission file
   </td>
   <td>Akira
   </td>
   <td>July 23
   </td>
  </tr>
  <tr>
   <td rowspan="3" >[FIF-112] As Harold, I can provide feedback on assignment submissions so that I can help participants improve their products. 
   </td>
   <td rowspan="2" >[FIF-125] Frontend feedback textboxes (grade + feedback)
   </td>
   <td rowspan="2" >Cat
   </td>
   <td rowspan="2" >July 25
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td>[FIF-118] Backend Patch API to update the Feedback
   </td>
   <td>Michael
   </td>
   <td>July 23
   </td>
  </tr>
</table>


**Misc. tasks**:



* [FIF-128] Create Admin and Mentor Role
    * Maryam (July 20)
* [FIF-122] [Bug] Fix Role permission issues (only Admin should be able to approve/reject requests / mentors + admins should be able to see submissions and provide feedback)  
    * Michael (July 27)
* [FIF-121] _Add links for team creation, assignment creation, assignments, role request, admin request approval_. Remove any useless navbar links
    * Ethan (July 22nd)
* [FIF-124] Populate landing page (baobag logo? About us?) 
    * Ethan (July 29th)
* _Deploy_

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
   <td>Already done (proofread: Maryam)
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
   <td>Already done (proofread: Maryam)
   </td>
  </tr>
  <tr>
   <td>Sprint 3 Retrospect
   </td>
   <td>Already done (proofread: Maryam)
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
   <td>Fullstack
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
   <td>Frontend
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

