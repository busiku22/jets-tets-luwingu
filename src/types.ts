export type DomainType = 
  | 'Sustainable Systems & Environment (SSE)'
  | 'Health, Food & Human Wellbeing System (HFWS)'
  | 'Digital, Robotics & Intelligent Systems (DRIS)'
  | 'Engineering, Design & Production Systems (EDPS)'
  | 'Mathematical Modelling & Investigation (MMSI)';

export type FocusAreaType =
  // SSE Focus Areas
  | 'Climate adaptation'
  | 'Renewable energy'
  | 'Waste management'
  | 'Water systems'
  // HFWS Focus Areas
  | 'Public health solutions'
  | 'Nutrition systems'
  | 'Food security'
  | 'Water safety'
  // DRIS Focus Areas
  | 'Software solutions'
  | 'Automation'
  | 'IoT systems'
  | 'AI applications'
  // EDPS Focus Areas
  | 'Infrastructure design'
  | 'Manufacturing systems'
  | 'Product design'
  | 'Smart mobility'
  // MMSI Focus Areas
  | 'Data analysis'
  | 'Simulation models'
  | 'Scientific research'
  | 'Evidence validation';

export type SubjectAlignmentType = 
  | 'Primary Science'
  | 'Primary Creative & Technology Studies'
  | 'Primary Mathematics';

export type CategoryType = 'JETS' | 'TETS';

export interface Participant {
  id: string;
  name: string;
  age: number;
  grade: string;
  school: string;
  category: CategoryType;
  gender: 'Boy' | 'Girl' | 'Other';
  registeredOffline: boolean;
  synced: boolean;
  createdAt: string;
  schoolLevel?: 'Primary' | 'Secondary';
}

export interface Project {
  id: string;
  title: string;
  domain: DomainType;
  focusArea: FocusAreaType;
  participantId: string;
  participantName: string;
  school: string;
  description: string;
  materialsUsed: string;
  synced: boolean;
  createdAt: string;
}

export interface Question {
  id: string;
  type: 'quiz' | 'olympiad';
  domain: DomainType;
  focusArea: FocusAreaType;
  subjectAlignment?: SubjectAlignmentType; // For Olympiads
  section?: 'Section A' | 'Section B'; // For Olympiads
  text: string;
  options: string[];
  correctAnswer: string;
  points: number;
  explanation?: string;
  createdByTeacher: boolean;
  teacherId?: string;
  approvedByOrganiser?: boolean;
}

export interface QuizResult {
  id: string;
  participantName: string;
  school: string;
  type: 'quiz' | 'olympiad';
  domain: DomainType;
  subjectAlignment?: SubjectAlignmentType;
  score: number;
  totalQuestions: number;
  percentage: number;
  synced: boolean;
  createdAt: string;
}

export const LUWINGU_SCHOOLS = [
  'Luwingu Primary School',
  'Lupando Primary School',
  'Buntungwa Primary School',
  'Ipusukilo Primary School',
  'Chulungoma Primary School',
  'Namalolo Primary School',
  'Katuta Primary School',
  'Chambeshi Primary School',
  'Mapela Primary School',
  'Luwingu Secondary School',
  'Nsombo Primary School',
  'Tungati Primary School',
  'Chulungoma Secondary School',
  'Isansa Primary School',
  // Attachment Schools
  'MUSHISHE PRIMARY',
  'KUUTA PRIMARY SCHOOL',
  'DON BOSCO PRIMARY',
  'SHIMUMBI PRIMARY',
  'NJOKO',
  'MALEKANI PRIMARY',
  'MASONDE',
  'MUSHITU WAMBOO',
  'FISONGE PRIMARY',
  'CHIKOTI PRIMARY',
  'LUWINGU PRIMARY',
  'MUKANGA PRIMARY',
  'CHIMPAMPA',
  'JEKE TOBELA COMMUNITY SCHOOL',
  'BULAMBO PRIMARY',
  'KABALE',
  'WASHENI',
  'FIKONI PRIMARY',
  'MICHELO PRIMARY',
  'KAPISHA PRIMARY',
  'KAPUPU PRIMARY',
  'KASEYA PRIMARY',
  'LOBATI PRIMARY',
  'LUBANSENSHI',
  'MAKOLONGO PRI',
  'KUMBWE MPANGA COMMUNITY SCHOOL',
  'MWINGILILA',
  'TOLOPA',
  'TUNGATI',
  'LAURENT CHITA PRIMARY',
  'KANDATA PRIMARY',
  'LUENA PRIMARY',
  'SOKONTWE PRIMARY SCHOOL',
  'MUCHELEKA',
  'MFUNGWE',
  'CHIBOFWE PRIMARY',
  'KASONDE K K',
  'CHIFUMO PRI',
  'KANSASA PRIMARY',
  'NJEKE PRIMARY',
  'CHIPUSHI PRIMARY',
  'KACHIBWE PRIMARY',
  'MENGA PRIMARY',
  'CHAKUNGUBALA',
  'CHANDA MWAMBA',
  'KASUNGA PRIMARY',
  'MISAMBULA PRIMARY',
  'NSANJA',
  'NYEMBA PRIMARY SCHOOL',
  'CHIFWILE',
  'NDOKI PRIMARY SCHOOL'
];
