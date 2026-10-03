/**
 * Work Experience — ordered most recent first.
 * Edit this file to update the timeline. Update the matching HTML in index.html.
 */
export const experience = [
  {
    title: "Associate Cloud DevOps Engineer",
    company: "QBS Co",
    location: "Pakistan",
    period: "Nov 2025 – Present",
    bullets: [
      "Designed production Kubernetes manifests for microservices (frontend, backend, PostgreSQL) with resource limits, health probes, and rolling updates for zero-downtime deployments.",
      "Engineered GitOps workflows using Argo CD with automated multi-environment sync (dev, staging, prod) — reduced deployment errors by 85% and deployment time from 2 hours to 15 minutes.",
      "Built a multi-node bare-metal Kubernetes cluster with NVIDIA GPU support, using taints/tolerations to isolate GPU-intensive AI workloads.",
      "Provisioned AWS infrastructure via Terraform: VPC with public/private subnets, routing, Internet Gateway, NAT Gateway, EC2, and S3.",
      "Developed a Go-based Docker image optimization utility that reduced AI workload image build times by 40%.",
      "Implemented end-to-end CI/CD integrating AWS ECR, EventBridge, Lambda, and Jenkins with automated rollback on failures.",
      "Deployed production Prometheus monitoring with custom scrape configs, ServiceMonitors, and alerting rules.",
      "Automated PostgreSQL backup pipeline with scheduled snapshots to S3 for disaster recovery.",
      "Automated SSL certificate lifecycle management via Bash scripting.",
    ],
  },
  {
    title: "Automation DevOps Engineer",
    company: "Rayan Technologies",
    location: "Pakistan",
    period: "Nov 2023 – Aug 2025",
    bullets: [
      "Automated backend workflows with UiPath, Python, and API integrations — reduced manual task overhead by 70%.",
      "Containerized automation components using Docker for consistent deployments across environments.",
      "Integrated automated test suites into CI/CD pipelines via Jenkins, GitLab CI, and AWS CodePipeline.",
      "Deployed and monitored test environments on AWS (EC2, Lambda, CloudWatch).",
      "Developed Git-based version control workflows with branching, pull requests, and structured releases.",
      "Designed reusable automation modules and configuration templates following IaC practices.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Dr. Ziauddin Hospital",
    location: "Pakistan",
    period: "May 2023 – Dec 2023",
    bullets: [
      "Engineered and maintained internal healthcare modules using ASP.NET Core for hospital management and patient records systems.",
      "Automated build, release, and deployment workflows for .NET web apps, configuring IIS hosting and staging environments to eliminate manual release downtime.",
      "Containerized backend application components with Docker to ensure consistent behavior across local development and production hospital servers.",
      "Collaborated with clinical teams and IT stakeholders to roll out secure software updates and database fixes under tight operational schedules.",
      "Improved data exchange and integration between hospital departments by building reliable REST APIs and optimizing backend queries.",
    ],
  },
];
