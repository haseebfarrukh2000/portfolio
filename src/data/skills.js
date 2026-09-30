/**
 * Skills — grouped by category. Only skills verified in source documents.
 * Edit this file to add/remove skills. Update the matching HTML in index.html.
 */
export const skills = [
  {
    category: "Cloud & Infrastructure",
    icon: "☁️",
    items: [
      "AWS (EKS, EC2, RDS, S3, Lambda, VPC, ALB, CloudWatch, IAM, CloudFormation, EventBridge, Route 53)",
      "Microsoft Azure",
    ],
  },
  {
    category: "Containers & Orchestration",
    icon: "🐳",
    items: [
      "Kubernetes (StatefulSets, HPA, RBAC, Taints/Tolerations, Resource Quotas)",
      "Docker",
      "Helm",
      "Harbor",
      "MinIO",
    ],
  },
  {
    category: "Infrastructure as Code",
    icon: "📐",
    items: ["Terraform", "AWS CloudFormation", "Ansible", "Kubernetes Manifests"],
  },
  {
    category: "CI/CD & GitOps",
    icon: "🔄",
    items: [
      "Argo CD (GitOps, App of Apps)",
      "Jenkins",
      "GitHub Actions",
      "GitLab CI/CD",
      "AWS CodePipeline",
      "Blue-Green Deployments",
    ],
  },
  {
    category: "Security & DevSecOps",
    icon: "🔒",
    items: [
      "RBAC & Network Policies",
      "Secrets Management",
      "Container Scanning (Trivy)",
      "SonarQube",
      "SSL/TLS Management",
    ],
  },
  {
    category: "Observability & Logging",
    icon: "📊",
    items: [
      "Prometheus",
      "Grafana",
      "AlertManager",
      "AWS CloudWatch",
      "ELK Stack",
    ],
  },
  {
    category: "MLOps & AI Infrastructure",
    icon: "🧠",
    items: [
      "AWS SageMaker",
      "NVIDIA GPU Operator",
      "Model Serving & Containerization",
      "MLflow & Experiment Tracking",
      "Kubernetes GPU Scheduling",
      "Data & Model Versioning (DVC)",
    ],
  },
  {
    category: "Automation & Scripting",
    icon: "⚡",
    items: ["Python", "Go", "Bash", "SQL", "Git", "UiPath RPA"],
  },
];
