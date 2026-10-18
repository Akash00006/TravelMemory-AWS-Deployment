# TravelMemory AWS Deployment Documentation

# 1. Project Overview
TravelMemory is a web application for viewing and adding travel
experiences. This project documents deployment of the frontend and
backend on AWS, with MongoDB Atlas used as the database.

# 2. Technology Stack
- Frontend: React / JavaScript
- Backend: Node.js / Express (npm - 10.8.2 / node version -v20.20.2)
- Database: MongoDB Atlas
- Cloud platform: Amazon Web Services (AWS)
- Compute: Amazon EC2
- Load balancing: Application Load Balancer (ALB)
- Version control: Git and GitHub (git version 2.53.0) 


# 3. Architecture
The intended request flow is shown below:
                         <img width="820" height="572" alt="Screenshot 2026-10-18 204120" src="https://github.com/user-attachments/assets/26b74b5f-a0f0-4bae-ac12-a513cd2912ff" />

                      
The frontend ALB distributes web traffic to frontend instances. API
requests from the frontend go to the backend ALB, which distributes
requests to backend instances. The backend connects to MongoDB Atlas for
database operations.
Architecture note: This diagram represents the intended
architecture. Confirm that target groups are healthy and the API
connection works before describing the full architecture as verified.

# 4. AWS Resources
Fill in the actual resource names and values from your AWS account.
  Resource                 Name / Value
  AWS Region               [ap-south-1b]
  
  Frontend EC2 instances   [frontend-master]
  
  Backend EC2 instances    [backend-master]
  
  Frontend target group    [travelmemory-frontend-tg]
  
  Backend target group     [travelmemory-backend-tg-3001]
  
  Frontend ALB DNS name    [travelmemory-frontend-alb]
  
  Backend ALB DNS name     [travelmemory-backend-alb]
  
  MongoDB Atlas cluster    [mongodb+srv://akashkumardutta7_db_user:<db_password>@akashcluster.my5l18e.mongodb.net/?appName=akashcluster]

# 5. MongoDB Atlas Configuration

MongoDB Atlas is used as the application's database service.

1.  Create or select a MongoDB Atlas cluster.
2.  Create a database user with the required database permissions.
3.  Configure Atlas network access to allow connections from the backend
    environment. Restrict access to required IP addresses or network
    ranges where possible.
4.  Configure the application's MongoDB connection string on the
    backend.

# 6. Backend Deployment on EC2

The backend runs on EC2 and communicates with MongoDB Atlas.

General deployment steps:

1.  Connect to the backend EC2 instance using SSH.
2.  Install the required Node.js runtime and project dependencies.
3.  Place the backend source code on the instance.
4.  Configure required environment variables securely.
5.  Start the backend using the project's documented start command or
    process manager.
6.  Configure the backend target group to use the correct instance port
    and health-check path.
7.  Confirm the backend target is healthy in the EC2 console.
8.  Test the backend API locally on the instance and through the backend
    ALB.


# 7. Frontend Deployment on EC2

The frontend provides the user interface for TravelMemory.

1.  Connect to the frontend EC2 instance using SSH.
2.  Install the required Node.js runtime and project dependencies.
3.  Configure the frontend to call the backend ALB or the correct API
    endpoint.
4.  Build the frontend if the project uses a production build.
5.  Serve the frontend using the configured web server or application
    process.
6.  Configure the frontend target group and its health check.
7.  Confirm the frontend target is healthy in the EC2 console.
8.  Open the frontend ALB DNS name in a browser and test the
    application.


# 8. Load Balancers and Target Groups

Two Application Load Balancers are intended for this architecture:

-   **Frontend ALB:** Receives browser traffic and forwards it to the
    frontend target group.
-   **Backend ALB:** Receives API traffic and forwards it to the backend
    target group.


# 9. DNS and Custom Domain

**Cloudflare DNS configuration was skipped.**

The frontend ALB is publicly
accessible and its security settings allow access, use its DNS name for
testing:

``` text
http://travelmemory-frontend-alb-1354368306.ap-south-1.elb.amazonaws.com
```



# 10. Screenshots 

1.  TravelMemory frontend opened through the frontend ALB DNS name.
<img width="1920" height="948" alt="Screenshot (121)" src="https://github.com/user-attachments/assets/fa5f56d1-6f47-4dec-a625-606410191d82" />


2.  Frontend target group showing target health.
<img width="1920" height="1080" alt="Screenshot (116)" src="https://github.com/user-attachments/assets/31c58161-365c-4bb7-b078-edccc7da9b76" />


3.  Backend target group showing target health.
<img width="1920" height="1080" alt="Screenshot (115)" src="https://github.com/user-attachments/assets/9d6e513c-488b-42af-bbf6-2394ec85f2af" />


4.  Frontend and backend load balancers in the EC2 console.
<img width="1920" height="1080" alt="Screenshot (117)" src="https://github.com/user-attachments/assets/e81ed48c-3b82-49e7-854a-c81be4e8c158" />

   
5.  MongoDB Atlas cluster overview
<img width="1920" height="1080" alt="Screenshot (97)" src="https://github.com/user-attachments/assets/b9f40a24-f853-4e39-bcf2-161a17f9fd08" />

   
6.  A newly added travel experience displayed in the application.
<img width="1660" height="920" alt="Screenshot (122)" src="https://github.com/user-attachments/assets/4ad33077-4a50-4370-82ae-846c54ce79f3" />




# 11. Deployment Summary

This project documents deployment of the TravelMemory frontend and
backend using AWS EC2 instances, Application Load Balancers, and MongoDB
Atlas. The architecture separates frontend and backend traffic and uses
MongoDB Atlas as the database service.



