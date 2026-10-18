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


# 4. Architecture
The intended request flow is shown below:
                         <img width="820" height="572" alt="Screenshot 2026-10-18 204120" src="https://github.com/user-attachments/assets/26b74b5f-a0f0-4bae-ac12-a513cd2912ff" />

                      
The frontend ALB distributes web traffic to frontend instances. API
requests from the frontend go to the backend ALB, which distributes
requests to backend instances. The backend connects to MongoDB Atlas for
database operations.
Architecture note: This diagram represents the intended
architecture. Confirm that target groups are healthy and the API
connection works before describing the full architecture as verified.
5. AWS Resources
Fill in the actual resource names and values from your AWS account.
  Resource                 Name / Value
  AWS Region               [Enter region, e.g. ap-south-1]
  Frontend EC2 instances   [Enter instance IDs or names]
  Backend EC2 instances    [Enter instance IDs or names]
  Frontend target group    [Enter target group name]
  Backend target group     [Enter target group name]
  Frontend ALB DNS name    [Enter frontend ALB DNS name]
  Backend ALB DNS name     [Enter backend ALB DNS name]
  MongoDB Atlas cluster    [Enter cluster name; no credentials]
  Custom domain            Not configured through Cloudflare
6. MongoDB Atlas Configuration
MongoDB Atlas is used as the application's database service.
1. Create or select a MongoDB Atlas cluster.
2. Create a database user with the required database permissions.
3. Configure Atlas network access to allow connections from the backend
   environment. Restrict access to required IP addresses or network
   ranges where possible.
4. Configure the application's MongoDB connection string on the
   backend.
5. Keep database usernames, passwords, and connection strings
   containing credentials out of GitHub.
Use a placeholder in documentation or examples:
MONGODB_URI=<your-mongodb-atlas-connection-string>
Do not commit a real .env file or paste a connection string containing
a password into this document.
7. Backend Deployment on EC2
The backend runs on EC2 and communicates with MongoDB Atlas.
General deployment steps:
1. Connect to the backend EC2 instance using SSH.
2. Install the required Node.js runtime and project dependencies.
3. Place the backend source code on the instance.
4. Configure required environment variables securely.
5. Start the backend using the project's documented start command or
   process manager.
6. Configure the backend target group to use the correct instance port
   and health-check path.
7. Confirm the backend target is healthy in the EC2 console.
8. Test the backend API locally on the instance and through the backend
   ALB.
Example checks; adjust the port and endpoint to match the application:
sudo ss -lntp
curl http://<backend-alb-dns-name>/<api-health-or-valid-endpoint>
8. Frontend Deployment on EC2
The frontend provides the user interface for TravelMemory.
1. Connect to the frontend EC2 instance using SSH.
2. Install the required Node.js runtime and project dependencies.
3. Configure the frontend to call the backend ALB or the correct API
   endpoint.
4. Build the frontend if the project uses a production build.
5. Serve the frontend using the configured web server or application
   process.
6. Configure the frontend target group and its health check.
7. Confirm the frontend target is healthy in the EC2 console.
8. Open the frontend ALB DNS name in a browser and test the
   application.
Ensure the frontend API URL points to the actual backend endpoint. Do
not leave a local development URL such as localhost in a production
frontend configuration unless the architecture specifically requires it.
9. Load Balancers and Target Groups
Two Application Load Balancers are intended for this architecture:
- Frontend ALB: Receives browser traffic and forwards it to the
  frontend target group.
- Backend ALB: Receives API traffic and forwards it to the backend
  target group.
Verification checklist:
- [ ] Frontend target group uses the correct protocol and port.
- [ ] Backend target group uses the correct protocol and port.
- [ ] Health-check paths match valid application endpoints.
- [ ] Registered targets show healthy status.
- [ ] Security groups allow traffic from the appropriate load balancer
  to target instances.
- [ ] Frontend can reach the backend API.
- [ ] Backend can connect to MongoDB Atlas.
10. DNS and Custom Domain
Cloudflare DNS configuration was skipped.
This document therefore does not claim that a custom domain was
configured through Cloudflare. If the frontend ALB is publicly
accessible and its security settings allow access, use its DNS name for
testing:
http://<frontend-alb-dns-name>
Use https:// only if an HTTPS listener and a valid certificate have
been configured. Replace the placeholder with the actual DNS name shown
in the AWS console.
11. Testing and Verification
Complete these tests and record the actual outcome before submission.
  Test                    Expected result         Actual result
  Open frontend ALB DNS   Frontend page loads     [Pass / Fail / Not tested]
  name                                            
  Frontend target group   Targets are healthy     [Pass / Fail / Not tested]
  Backend target group    Targets are healthy     [Pass / Fail / Not tested]
  Frontend API request    Request reaches backend [Pass / Fail / Not tested]
  MongoDB Atlas           Backend connects to     [Pass / Fail / Not tested]
  connection              database                
  Add a travel experience Experience saves and    [Pass / Fail / Not tested]
                          appears in UI           
  Reload the page         Saved experience        [Pass / Fail / Not tested]
                      remains available       
Do not mark a test as passed until you have performed it and observed
the expected result.
12. Screenshots to Include
Add screenshots from your own AWS account and application. Suggested
screenshots:
1. TravelMemory frontend opened through the frontend ALB DNS name.
2. Frontend target group showing target health.
3. Backend target group showing target health.
4. Frontend and backend load balancers in the EC2 console.
5. MongoDB Atlas cluster overview, with sensitive information hidden.
6. A newly added travel experience displayed in the application.
7. GitHub repository showing the project files.
Insert images using relative paths, for example:
![TravelMemory application](screenshots/travelmemory-homepage.png)
Create a screenshots folder in the repository and place image files
there. Do not include screenshots that expose passwords, access keys,
database credentials, private keys, or other secrets.
13. Troubleshooting
Frontend does not load
- Confirm the frontend EC2 instance is running.
- Check frontend application or web-server logs.
- Confirm the frontend target is healthy.
- Review ALB listeners, target-group port, and security-group rules.
API requests fail
- Verify the API URL configured in the frontend.
- Confirm the backend process is running and listening on the expected
  port.
- Check backend ALB listener rules and target health.
- Review browser developer tools and backend logs.
MongoDB Atlas connection fails
- Verify the connection string and database credentials.
- Confirm the database user has appropriate permissions.
- Review Atlas network access rules.
- Check backend environment variables.
- Never commit credentials to GitHub as a workaround.
Git rejects a push or repository files are missing
- Check the branch with git branch.
- Check the working tree with git status.
- Confirm the remote with git remote -v.
- Confirm intended files were staged and committed.
- Make sure .env files, node_modules, and private keys are not
  committed.
14. Security Notes
- Do not commit .env files, MongoDB passwords, AWS access keys, SSH
  private keys, or other secrets.
- Use IAM roles where appropriate instead of hard-coded AWS
  credentials.
- Restrict security-group rules and MongoDB Atlas network access to
  the minimum required.
- Use HTTPS with a valid certificate for production traffic where
  configured.
- If a secret was committed to GitHub, rotate or revoke it. Removing
  it in a later commit alone does not remove it from Git history.
15. GitHub Repository
Repository: https://github.com/Akash00006/TravelMemory-AWS-Deployment
To update this documentation from the project directory:
git add README.md
git commit -m "Add TravelMemory AWS deployment documentation"
git push origin main
Save this document as README.md in the repository root if you want it
to appear on the repository's main GitHub page.
16. Deployment Summary
This project documents deployment of the TravelMemory frontend and
backend using AWS EC2 instances, Application Load Balancers, and MongoDB
Atlas. The architecture separates frontend and backend traffic and uses
MongoDB Atlas as the database service.
Cloudflare DNS and custom-domain configuration were not completed as
part of this deployment. Replace all placeholders, add genuine
screenshots, and update the testing table with observed results before
submitting.
