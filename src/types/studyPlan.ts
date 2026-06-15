export type StudyPlanStatus = 'learning' | 'done';

export type StudyPlanCoverVariant = 'indigo' | 'green' | 'orange';

export type StudyPlanResource = {
  id: string;
  title: string;
  meta: string;
  progress: number;
  updatedAt: string;
  done: boolean;
  cover: string;
};

export type StudyPlan = {
  id: string;
  title: string;
  cover: string;
  coverVariant: StudyPlanCoverVariant;
  status: StudyPlanStatus;
  progress: number;
  meta: string;
  updatedAt: string;
  resources: StudyPlanResource[];
};
