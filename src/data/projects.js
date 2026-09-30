/**
 * Projects — 8 projects total (4 from resume, 4 from NextWork portfolio).
 * Edit this file to update the projects section. Update the matching HTML in index.html.
 */
export const projects = [
  {
    title: "Ajeek: AWS Production Deployment",
    problem:
      "Deploy a production application with high availability, secure networking, and persistent storage on AWS.",
    stack: ["AWS EKS", "EC2 (t3.large)", "VPC", "EFS", "ALB", "SSL/TLS", "Terraform"],
    outcome:
      "Launched on Amazon EKS with multi-tier VPC (public/private subnets), EFS for persistent storage, and ALB with SSL termination and path-based routing.",
    link: "https://ajeeknow.com",
    linkLabel: "ajeeknow.com",
  },
  {
    title: "NeuConnect & WaslHub: Microservices Platform",
    problem:
      "Build a reliable Kubernetes platform for multiple microservices with persistent databases, secure ingress, and on-premises storage.",
    stack: ["Kubernetes", "PostgreSQL StatefulSets", "NGINX Ingress", "TLS", "HPA", "MinIO"],
    outcome:
      "Architected microservices environment with PostgreSQL StatefulSets, horizontal pod autoscaling, NGINX Ingress with TLS, and MinIO for on-prem object storage.",
    link: "",
    linkLabel: "",
  },
  {
    title: "CI/CD Pipeline: Jenkins + Argo CD",
    problem:
      "Eliminate manual deployment steps and reduce human errors across multiple environments.",
    stack: ["Jenkins", "Argo CD", "GitOps", "Docker", "AWS ECR", "Prometheus"],
    outcome:
      "Automated 95%+ of deployment processes, reduced human deployment errors by 80%, and decreased production incidents by 50% across 3+ environments.",
    link: "",
    linkLabel: "",
  },
  {
    title: "Bare-Metal GPU Kubernetes Cluster",
    problem:
      "Run GPU-intensive AI workloads alongside standard services without resource contention on physical hardware.",
    stack: ["Kubernetes", "NVIDIA GPU Operator", "Taints/Tolerations", "Docker", "Go"],
    outcome:
      "Built multi-node cluster with GPU scheduling isolation. Developed a Go utility that cut Docker image build times by 40% for AI workloads.",
    link: "",
    linkLabel: "",
  },
  {
    title: "AWS Native CI/CD Pipeline",
    problem:
      "Set up a full AWS-native deployment pipeline from source control through build, test, and deploy stages without third-party CI tools.",
    stack: ["AWS CodePipeline", "CodeBuild", "CodeDeploy", "CodeArtifact", "EC2", "GitHub"],
    outcome:
      "Connected GitHub to AWS CodePipeline, configured CodeBuild for continuous integration, managed dependencies with CodeArtifact, and deployed to EC2 using CodeDeploy with automated rollback triggers.",
    link: "",
    linkLabel: "",
  },
  {
    title: "Kubernetes Cluster + Backend Deployment",
    problem:
      "Stand up a Kubernetes cluster from scratch, write manifests, configure deployments, and deploy a backend application end to end.",
    stack: ["Kubernetes", "kubectl", "Deployments", "Services", "Manifests", "YAML"],
    outcome:
      "Launched a cluster, created Deployments and Services from custom manifests, set up pod scaling, and deployed a backend application with health checks and rolling updates.",
    link: "",
    linkLabel: "",
  },
  {
    title: "Azure Virtual Network Security Lab",
    problem:
      "Design a multi-tier Azure VNet with proper network segmentation and enforce least-privilege traffic flow using NSGs.",
    stack: ["Azure VNet", "NSGs", "Subnets", "Defender for Cloud", "Network Security"],
    outcome:
      "Built a three-tier virtual network (web, app, database), configured Network Security Groups for traffic isolation, and validated with Microsoft Defender for Cloud security assessments.",
    link: "",
    linkLabel: "",
  },
  {
    title: "Terraform IaC: S3 + Cloud Resources",
    problem:
      "Provision and manage cloud storage and infrastructure using Terraform instead of manual console operations.",
    stack: ["Terraform", "AWS S3", "IaC", "State Management", "HCL"],
    outcome:
      "Wrote Terraform configs to provision S3 buckets with versioning and lifecycle policies, managed state files, and applied plan/apply workflows for repeatable deployments.",
    link: "",
    linkLabel: "",
  },
];
