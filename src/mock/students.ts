import type { Student } from '../types'

// Programs: Data Science, Cyber Security, Artificial Intelligence, AWS, VLSI
export const MOCK_STUDENTS: Student[] = [
  { id: 1, name: 'Sam Wilson', program: 'Data Science', grad_year: 2026, bio: 'Enjoys building ML pipelines and dashboards.', skills: ['Python', 'Pandas', 'scikit-learn'], portfolio_url: 'https://sam.example.com', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'John Carter', program: 'Cyber Security', grad_year: 2025, bio: 'CTF enthusiast focused on web security.', skills: ['Burp Suite', 'OWASP ZAP', 'Node.js'], linkedin_url: 'https://linkedin.com/in/john-carter', created_at: '2024-01-02T00:00:00Z', updated_at: '2024-01-02T00:00:00Z' },
  { id: 3, name: 'Rhea Kapoor', program: 'Artificial Intelligence', grad_year: 2024, bio: 'Researches LLM prompting and evaluation.', skills: ['PyTorch', 'Transformers', 'LangChain'], portfolio_url: 'https://rhea.example.com', created_at: '2024-01-03T00:00:00Z', updated_at: '2024-01-03T00:00:00Z' },
  { id: 4, name: 'Smith Johnson', program: 'AWS', grad_year: 2026, bio: 'Cloud practitioner automating infra with IaC.', skills: ['AWS', 'Terraform', 'Docker'], linkedin_url: 'https://linkedin.com/in/smith-j', created_at: '2024-01-04T00:00:00Z', updated_at: '2024-01-04T00:00:00Z' },
  { id: 5, name: 'Ava Chen', program: 'VLSI', grad_year: 2025, bio: 'Interested in ASIC design and verification.', skills: ['Verilog', 'SystemVerilog', 'UVM'], created_at: '2024-01-05T00:00:00Z', updated_at: '2024-01-05T00:00:00Z' },
  { id: 6, name: 'Omar Ali', program: 'Data Science', grad_year: 2024, bio: 'Time-series forecasting and MLOps.', skills: ['Prophet', 'Airflow', 'SQL'], created_at: '2024-01-06T00:00:00Z', updated_at: '2024-01-06T00:00:00Z' },
  { id: 7, name: 'Jane Smith', program: 'Cyber Security', grad_year: 2026, bio: 'Blue teamer focusing on detection engineering.', skills: ['SIEM', 'KQL', 'Python'], created_at: '2024-01-07T00:00:00Z', updated_at: '2024-01-07T00:00:00Z' },
  { id: 8, name: 'Rahul Mehta', program: 'Artificial Intelligence', grad_year: 2025, bio: 'Computer vision and edge deployment.', skills: ['OpenCV', 'TensorRT', 'C++'], created_at: '2024-01-08T00:00:00Z', updated_at: '2024-01-08T00:00:00Z' },
]


