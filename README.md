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

  ## Deployment Steps

1.  Configure MongoDB Atlas database access and network rules.
2.  Deploy the backend to EC2 and securely configure environment
    variables.
3.  Configure the backend target group and ALB; check target health.
4.  Deploy the frontend to EC2 and configure its backend API URL.
5.  Configure the frontend target group and ALB.
6.  Open the frontend ALB DNS name and test the app.

Use the actual ports, start commands, and health-check paths for your
project.

## Verification Checklist

-   [ ] Frontend opens through the frontend ALB DNS name.
-   [ ] Frontend and backend target groups show healthy targets.
-   [ ] Frontend API requests reach the backend.
-   [ ] Backend connects to MongoDB Atlas.
-   [ ] A new travel experience saves and appears in the UI.

Mark tests as successful only after you have verified them.

## DNS and Screenshots

**Cloudflare DNS was not configured.** Use the frontend ALB DNS name for
testing if publicly accessible. Use HTTPS only if an HTTPS listener and
valid certificate are configured.

Add screenshots of the app, target-group health, load balancers, saved
experience, and GitHub repository. Example:

``` markdown
![TravelMemory homepage](screenshots/travelmemory-homepage.png)
```

Hide all credentials and secrets in screenshots.

## Troubleshooting

-   **Frontend unavailable:** Check EC2 status, logs, ALB listener,
    target health, and security groups.
-   **API errors:** Check the frontend API URL, backend process, port,
    and target health.
-   **MongoDB errors:** Check the connection string, database
    permissions, and Atlas network access.
-   **Git push errors:** Check `git status`, `git branch`, and
    `git remote -v`.

## Security

-   Never commit `.env` files, passwords, AWS keys, or SSH private keys.
-   Restrict security groups and Atlas network access.
-   If a secret was committed, rotate it; removing it in a later commit
    does not erase it from Git history.

## Push Documentation to GitHub

Save as `README.md` in the repository root, then run:

``` bash
git add README.md
git commit -m "Add deployment documentation"
git push origin main
```

Before submission, replace placeholders, add real screenshots, and
update the checklist. Do not claim untested steps were successful.

  

