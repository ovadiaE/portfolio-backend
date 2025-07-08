export default interface JobOption {
    ok: boolean;
    hits: JobHit[];
    facets: Record<string, Facet[]>;
    total: number;
  }
  
  export interface JobHit {
    id: string;
    title: string;
    description: string;
    employment_type: "full-time" | "part-time" | "contract" | "temporary" | "internship" | string;
    workplace_type: "remote" | "onsite" | "hybrid" | string;
    hiring_organization_name: string;
    hiring_organization_url: string;
    hiring_organization_logo: string;
    country: string;
    region: string;
    city: string;
    base_salary_currency: string;
    base_salary_min_value: number;
    base_salary_max_value: number;
    base_salary_unit: "hour" | "month" | "year" | string;
    experience_requirements_months: number;
    education_requirements: string;
    skills_requirements: string[];
    responsibilities: string[];
    industry: string;
    website: string;
  }
  
  export interface Facet {
    key: string;
    doc_count: number;
  }
  