Ultron — Self-Hosted Full-Stack Infrastructure

Ultron is my personal bare-metal Linux server running a fully self-managed web stack that hosts all of my major projects — including GetYourStart, Retro-Resell, MyRPG, my personal portfolio, and blog.
It’s engineered for reliability, autonomy, and full control of deployment, database, and networking layers.

⸻

Core Technologies

Layer	Stack / Tools	Purpose
OS & Environment	Ubuntu Server 24.04 LTS	Stable, production-grade base for containerized services
Containerization	Docker & Docker-Compose	Runs each project in isolated environments with reproducible builds
Reverse Proxy & Web Serving	Nginx	Handles HTTPS termination, routing, caching, and asset delivery for all hosted domains
Databases	MySQL, PostgreSQL	Locally hosted relational databases for different projects; migrated from AWS RDS for full control
Storage	Local SSD storage, mounted /portfolio/ directory	Hosts static assets and uploaded images (replacing AWS S3 buckets)
Firewall & Security	UFW + Fail2Ban	Provides strong access control and intrusion protection
Automation & Monitoring	Cron jobs + Bash scripts	Monitors network connectivity, restarts containers, and auto-recovers from network failures
Networking	Static IP + Bridged Adapter + SSH	Allows external and internal remote access, development via SSH from native terminals
Version Control	Git + GitHub	Versioned deployment scripts and project codebases
Cert Management	Certbot (Let’s Encrypt)	Automated SSL certificates for all hosted domains


⸻

Hosted Projects
	•	GetYourStart (GYS) — Full-stack Angular + Spring Boot + PostgreSQL job aggregator for entry-level roles
	•	Retro-Resell — MERN-stack marketplace for buying/selling retro games
	•	MyRPG — Gamified self-improvement platform built with Angular + Spring Boot + MySQL
	•	Personal Portfolio — Static React site served through Nginx
	•	Nasir’s Blog — Markdown-based blog platform deployed with Docker and reverse-proxied by Nginx

⸻

Infrastructure Highlights

Reverse Proxy Architecture

Each app runs in its own container and is served via an Nginx reverse proxy on the host.
Example route:

https://myrpgapp.com  →  Nginx →  myrpg-frontend (port 80)
                     →  /api   →  myrpg-backend (port 8080)

Persistent Databases

All SQL data is locally stored and backed up automatically via mysqldump and pg_dump cron jobs.

Resilient Networking

A custom Bash script monitors connectivity (via ping to 8.8.8.8 and google.com) every 20 minutes.
If the network goes down, it automatically resets the Ethernet interface, re-applies IP configuration, and restarts Docker.

Auto-Deployment

On system boot, a startup script automatically runs:

sudo docker-compose up -d --build
sudo systemctl restart nginx

ensuring all sites come back online after any reboot.

⸻

Security & Access
	•	SSH access restricted via key authentication
	•	UFW allows only ports 22 (SSH), 80 (HTTP), and 443 (HTTPS)
	•	Fail2Ban monitors SSH logs and bans malicious IPs
	•	Regular updates and kernel patches applied via automated apt jobs

⸻

Development Flow
	1.	Code changes pushed to GitHub
	2.	Pull updates on Ultron
	3.	Rebuild Docker containers
	4.	Nginx auto-routes updated services
	5.	Logs tracked via:

sudo docker logs <container_name>
tail -f /var/log/nginx/access.log