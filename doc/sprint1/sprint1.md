<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.714 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Fri Jun 11 2021 20:44:27 GMT-0700 (PDT)
* Source doc: sprint1
* Tables are currently converted to HTML tables.
----->



# Sprint 1 Planning

**Sprint Goal**: Create a basic website where users can register, login, see others, and interact together. 

**Team Capacity**: Our team members have a range of responsibilities across different courses and jobs. Each team member agrees to commit 20 hours for sprint 1. Additional hours will be divided between other teammates, or moved to future sprints.

**Spikes**: The spikes include features in the Project Scope which teammates do not have experience with. 



*   A spike for members to learn how to work with NodeJS, NestJS, and NextJS since many members are unfamiliar with these tasks.
*   Another spike is for users to learn the new Git system and how to resolve conflicts.

	

**Meeting Participants**: 



*   Ethan Lam
*   Jan Garong
*   Michael Sheinman Orenstrakh
*   Akira Siddharth Takaki
*   Maryam Gohargani
*   Catherine Xia
*   Hai Yang Tang	

**Note**: We were not able to find time to schedule this meeting with the product team due to the short notice (Tuesday in lecture) and lack of available time slot. We emailed Efosa with these documents, and he was okay with this. Moving forwards, we will run all sprint planning meetings with a member of the product team.

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
   <td>1) As a user, I can register and log in to a web screen so that I can start my journey on the platform.
   </td>
   <td>
<ul>

<li>A new user can enter a url and see the homepage

<li>From the homepage, a user can login and register to the application 

<li>A user can log out from the application and log back in.

<li>Password is hashed in the backend.
</li>
</ul>
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>2) As a user, I would like to be able to communicate on a discussion board to discuss the challenge with others so that I can network and meet others.
   </td>
   <td>
<ul>

<li>A logged in user can navigate to some “Home” section and see all messages shown.

<li>A user can make a new post in the community.
</li>
</ul>
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>3) As Rahul, I can register myself as a user and request to be promoted to an investor so that other African entrepreneurs know about Riche.  
   </td>
   <td>
<ul>

<li>A newly registered user can ask to be promoted to one of the promotion categories.

<li>The promotion categories are investors, service owners, and corporations.
</li>
</ul>
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td>4) As a user, I want to be able to scroll through profiles of users in the system to learn about others. 
   </td>
   <td>
<ul>

<li>A user can view a list of profiles.

<li>A user can navigate between different pages in the system. Each page has distinct users. 

<li>The user can see (at the least) the name and the role of other users.
</li>
</ul>
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>5) As a user, I want to be able to edit and see my profile so that I can market myself. 
   </td>
   <td>The profile includes:
<ul>

<li>The user’s name

<li>An about me section.

<li>A role section.

<li>Activity tab.

<li>The tags and interests of the user.

<li>A picture
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
  </tr>
  <tr>
   <td rowspan="6" >1) As a user, I can register and log in to a web screen so that I can start my journey on the platform. 
   </td>
   <td>Task 1: Make registration & login API on the backend.
   </td>
   <td>Ethan
   </td>
  </tr>
  <tr>
   <td>Task 2: Make API controllers keep track of user sessions.
   </td>
   <td>Ethan
   </td>
  </tr>
  <tr>
   <td>Task 3: Create UI for taking in user login info + registration info.
   </td>
   <td>Hai Yang
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Task 4: Make in-memory user storage.
   </td>
   <td rowspan="2" >Michael 
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td>Task 5: Write code on the backend that generates a default profile.
   </td>
   <td>Ethan
   </td>
  </tr>
  <tr>
   <td rowspan="4" >2) As a user, I would like to be able to communicate on a discussion board to discuss the challenge with others so that I can network and meet others.
   </td>
   <td>Task 1: Make an API to create a message in the backend.
   </td>
   <td>Maryam
   </td>
  </tr>
  <tr>
   <td>Task 2: Create UI for getting a message and posting a message on the discussion board.
   </td>
   <td>Jan
   </td>
  </tr>
  <tr>
   <td>Task 3: Make in-memory message storage.
   </td>
   <td>Michael
   </td>
  </tr>
  <tr>
   <td>Task 4: Add a paginated API to fetch messages from the backend.
   </td>
   <td>Akira
   </td>
  </tr>
  <tr>
   <td rowspan="3" >3) As Rahul, I can register myself as a user and request to be promoted to an investor so that other African entrepreneurs know about Riche.
   </td>
   <td>Task 2: Create UI for a user requesting new permissions.
   </td>
   <td>Cat
   </td>
  </tr>
  <tr>
   <td>Task 3: Make a backend API for adding user requests.
   </td>
   <td>Maryam
   </td>
  </tr>
  <tr>
   <td>Task 4: Make in-memory request storage 
   </td>
   <td>Michael
   </td>
  </tr>
  <tr>
   <td rowspan="3" >4) As a user, I want to be able to scroll through profiles of users in the system to learn about others. 
   </td>
   <td>Task 1: Make a backend API for fetching profile(s).
   </td>
   <td>Akira
   </td>
  </tr>
  <tr>
   <td>Task 2: Create UI for displaying an individual user profile.
   </td>
   <td>Jan
   </td>
  </tr>
  <tr>
   <td>Task 3: Create UI for displaying multiple user profile (previews) at once
   </td>
   <td>Hai Yang
   </td>
  </tr>
  <tr>
   <td rowspan="3" >5) As a user, I want to be able to edit and see my profile so that I can market myself. 
   </td>
   <td>Task 1: Make a backend API for editing a user profile.
   </td>
   <td>Maryam
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Task 2: Create UI for editing a user profile.
   </td>
   <td rowspan="2" >Cat
   </td>
  </tr>
  <tr>
  </tr>
</table>


Roles:


<table>
  <tr>
   <td>Michael
   </td>
   <td>scrum master, back end
   </td>
  </tr>
  <tr>
   <td>Jan
   </td>
   <td>front end
   </td>
  </tr>
  <tr>
   <td>Maryam
   </td>
   <td>back end
   </td>
  </tr>
  <tr>
   <td>Hai Yang
   </td>
   <td>front end 
   </td>
  </tr>
  <tr>
   <td>Cat
   </td>
   <td>front end
   </td>
  </tr>
  <tr>
   <td>Ethan
   </td>
   <td>back end
   </td>
  </tr>
  <tr>
   <td>Akira
   </td>
   <td>back end
   </td>
  </tr>
</table>


Who to go to if you need help:


<table>
  <tr>
   <td>Area
   </td>
   <td>Assignee(s)
   </td>
  </tr>
  <tr>
   <td>Front End
   </td>
   <td>Ethan
   </td>
  </tr>
  <tr>
   <td>Back End
   </td>
   <td>Hai Yang, Akira
   </td>
  </tr>
  <tr>
   <td>Design
   </td>
   <td>Michael
   </td>
  </tr>
</table>

