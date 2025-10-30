import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import DescriptionModal from './Components/DescriptionModal';

function App() {
  const technologies =[{
    name : "Ubuntu",
    description : `Ultron runs on Ubuntu Server, a rock-solid Linux distribution known for its stability, security, and versatility in production environments. I chose Ubuntu because it provides complete control over the operating system — no hidden layers, no restrictive dashboards, just pure command-line power and full root access.
      Ubuntu serves as the backbone of Ultron, handling everything from network configuration to system-level resource management. It’s the platform that makes self-hosting possible. Through Ubuntu, I configured essential services like Nginx, Docker, PostgreSQL, and UFW, all orchestrated directly through the terminal.
      Running Ubuntu on bare metal means every packet, process, and port is mine to manage. It allowed me to:
      <ul>
        <li>Fine-tune network interfaces for static IP configuration and DNS resolution.</li><br />
        <li>Secure the system using UFW firewalls and SSH key authentication.<br /></li><br />
        <li>Optimize performance at the kernel level, ensuring each hosted app runs efficiently.<br /></li><br />
        <li>Automate startup and container management through systemd services.<br /></li><br />
      </ul>
      In essence, Ubuntu transformed Ultron from just a computer into a fully-fledged self-hosted ecosystem — one capable of powering multiple full-stack applications, databases, and APIs simultaneously. It’s the foundation that ties every other technology on this server together.`,
    icon : "/Ubuntu.png"
  }, {
    name : "Nginx",
    description : `At the heart of Ultron’s web infrastructure is Nginx, acting as the reverse proxy and traffic orchestrator for every hosted application. Nginx is what makes it possible for multiple web services — like RetroResell, MyRPG, and GetYourStart — to coexist seamlessly on the same server, each mapped to its own custom domain and secured with SSL.
      I configured Nginx manually from the ground up, writing and fine-tuning each server block to handle routing, compression, and caching. It serves as the gateway between the internet and Ultron’s internal network, directing incoming requests to the correct containerized backend while maintaining peak efficiency.
      Through Nginx, Ultron achieves:
      <ul>
        <li>Reverse Proxy Routing: Directs traffic to the appropriate backend app or API running in a Docker container.</li><br />
        <li>HTTPS Security: Handles SSL/TLS certificates for encrypted, secure communication across all domains.</li><br />
        <li>Load Efficiency: Uses lightweight, event-driven architecture to handle high concurrency with minimal system overhead.</li><br />
        <li>Compression and Caching: Reduces latency and bandwidth usage, keeping responses fast and responsive.</li><br />
      </ul>
      In short, Nginx is Ultron’s frontline web engine — the silent guardian that ensures stability, security, and scalability for every site and service running behind it.`,
    icon : "/nginx.png"
  }, {
    name : "Docker",
    description : `Docker is the backbone of Ultron’s application environment — a powerful containerization platform that lets me run multiple independent systems on a single physical server without conflict. Every major service on Ultron — from GetYourStart’s Spring Boot backend to RetroResell’s Node.js API — runs inside its own isolated container, fully encapsulated with the exact dependencies it needs.
      By using Docker, I transformed Ultron into a modular ecosystem, where updates, scaling, and debugging are seamless. Instead of juggling complex configurations across environments, each container defines its setup in code through a Dockerfile, ensuring everything runs consistently — whether it’s a database, frontend, or API service.
      Docker allows Ultron to:
      <ul>
        <li>Isolate Environments: Each app and database runs independently, eliminating dependency conflicts.</li><br />
        <li>Automate Deployment: Using docker-compose, I can spin up entire stacks with a single command.</li><br />
        <li>Optimize Resource Usage: Containers share the same kernel but remain lightweight and efficient.</li><br />
        <li>Enable Portability: Every container can be redeployed anywhere with identical performance and behavior.</li><br />
      </ul>
      With Docker, Ultron isn’t just a server — it’s a cluster of orchestrated services, each communicating through well-defined networks and ports. This modular design gives me full control, faster deployments, and the confidence that every project hosted on Ultron runs exactly as intended.`,
    icon : "/docker.png"
  }, {
    name : "Uncomplicated Firewall",
    description : `<p>
    <strong>UFW (Uncomplicated Firewall)</strong> is Ultron’s first line of defense at the network edge.
    It provides a clean, declarative way to control inbound and outbound traffic on Ubuntu, so only
    the services I explicitly expose are reachable from the internet. With UFW, I can codify security
    posture into simple rules that are easy to audit, version, and maintain.
  </p>

  <h3>Why UFW on Ultron</h3>
  <ul>
    <li><strong>Simplicity with Power:</strong> Human-readable rule syntax over raw <code>iptables</code>, without losing capability.</li>
    <li><strong>Default-deny stance:</strong> Blocks unsolicited traffic by default, then I selectively allow what each app needs.</li>
    <li><strong>Safe Remote Access:</strong> Restricts SSH to known ports/IPs and rate-limits attempts to reduce brute-force risk.</li>
    <li><strong>Clear Auditing:</strong> Rules are explicit and ordered, making security reviews straightforward.</li>
  </ul>

  <h3>How I Use It</h3>
  <ul>
    <li><strong>Service Gatekeeping:</strong> Only reverse-proxied HTTP/HTTPS (via Nginx) are exposed; app ports stay private.</li>
    <li><strong>Per-App Profiles:</strong> Custom application profiles for services (APIs, databases) to keep rules organized.</li>
    <li><strong>Environment Safety:</strong> SSH locked down with key auth and rate limiting; admin ports restricted to my network.</li>
    <li><strong>Logging &amp; Monitoring:</strong> UFW logs integrated with system logs to observe drops and tune rules.</li>
  </ul>

  <h3>Example Rule Set (Conceptual)</h3>
  <ul>
    <li><code>ufw default deny incoming</code> and <code>ufw default allow outgoing</code> to establish a secure baseline.</li>
    <li><code>ufw allow 22/tcp</code> (or a custom SSH port) with optional rate limiting for admin access.</li>
    <li><code>ufw allow 80/tcp</code> and <code>ufw allow 443/tcp</code> for Nginx, keeping backend containers internal.</li>
    <li>Optional: restrict management ports to my LAN (e.g., <code>ufw allow from 192.168.1.0/24 to any port 22 proto tcp</code>).</li>
  </ul>

  <p>
    By combining UFW’s default-deny policy with targeted allowances, Ultron maintains a tight external surface
    while letting internal services communicate freely behind Nginx. It’s a pragmatic, reliable layer that
    complements Docker’s network isolation and Ubuntu’s security model.
  </p>`,
    icon : "/UncomplicatedFirewall.png"
  }, {
    name : "Fail2Ban",
    description : `<p>
    <strong>Fail2Ban</strong> acts as Ultron’s automated security watchdog, continuously monitoring log files
    for signs of unauthorized access or brute-force attempts. Whenever a suspicious pattern is detected—such as
    repeated failed logins—it automatically bans the offending IP address by updating the system’s firewall rules.
    This adds a dynamic, adaptive layer of protection on top of UFW’s static rule set.
  </p>

  <h3>How Fail2Ban Protects Ultron</h3>
  <ul>
    <li><strong>Real-Time Monitoring:</strong> Continuously scans authentication and service logs for intrusion patterns.</li>
    <li><strong>Automated Bans:</strong> Offending IPs are immediately blocked for a configurable duration to prevent further attempts.</li>
    <li><strong>Dynamic Defense:</strong> Adjusts to new threats as they occur, reinforcing UFW’s static rule set with active response.</li>
    <li><strong>Reduced Noise:</strong> Keeps the server logs clean by suppressing repeated malicious connection attempts.</li>
  </ul>

  <h3>Key Services Protected</h3>
  <ul>
    <li><strong>SSH:</strong> The most common attack vector, protected by rate-limiting and temporary bans for failed logins.</li>
    <li><strong>Nginx:</strong> Monitors access logs to identify repeated 404s or suspicious request patterns.</li>
    <li><strong>Postfix:</strong> Watches mail authentication logs for brute-force attempts on SMTP.</li>
    <li><strong>Custom Filters:</strong> Tailored configurations to monitor additional services hosted on Ultron.</li>
  </ul>

  <h3>Configuration Highlights</h3>
  <ul>
    <li><code>/etc/fail2ban/jail.local</code> defines monitored services and ban parameters.</li>
    <li>Common settings include:
      <ul>
        <li><code>bantime = 10m</code> — how long an IP stays banned.</li>
        <li><code>findtime = 10m</code> — the window of time in which failed attempts are counted.</li>
        <li><code>maxretry = 5</code> — number of failures before banning.</li>
      </ul>
    </li>
    <li>Integrates directly with <strong>UFW</strong> to enforce bans efficiently at the network layer.</li>
  </ul>

  <p>
    Fail2Ban gives Ultron the ability to <strong>learn from attacks in real time</strong>, shutting down threats before
    they escalate. Combined with UFW’s strict firewall rules, it transforms the server into a proactive, self-defending system—
    resilient against the constant background noise of the internet.
  </p>`,
    icon : "/fail2ban.png"
  }]
  
  const [technology, setTechnology] = useState(technologies[0]);
  const [showDetails, setShowDetails] = useState(false);

  const selectTechnology = (index) => {
    setShowDetails(!showDetails)
    setTechnology(technologies[index])
  }

  return (
    <>      
      {showDetails ? <DescriptionModal Technology={technology} toggleDetails={setShowDetails}/> : <></>}            
      <div className="App">
        <div className='background'>
          <div className="UltronSillouette">
            <img src="/ultron_prestige.png"/>
          </div>
          
        </div>
        <div className="IntroPage">
          <div className='TitleContainer'>
            <p className="Title">WELCOME TO ULTRON</p>
          </div>
          <div className='PrimaryDescriptor'>
            <p>UBUNTU SERVER  + HOME-LAB</p>
          </div>
          
        </div>
        <div className='SecondSection'>
          <div className='TitleContainer'>
            <p className="Title">EXPLORE ULTRON'S TECHNOLOGIES</p>
          </div>
          <div className='dark-ultron'>
            <img src="dark-ultron.jpg" />
          </div>
          <div className='Technologies'>
            {
              technologies.map((technology, index) => (
                <div className='Technology' onClick={() => selectTechnology(index)}>
                  <img src={technology.icon} />
                </div>
              ))
            }
          </div>
        </div>
        <div className='ThirdSection'>
          <div>
            
          </div>
        </div>
        <p className='Scroll-Down'>SCROLL DOWN ↓</p>
      </div>
    </>   
  );
}

export default App;
