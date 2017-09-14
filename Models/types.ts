

import {Id} from "../types/index";

export type ISchemas = {
  account: any,
  user: any,
  company: any,
  companyJobPosition: any,
  jobPositionJobTitleMain: any,
  jobPosition: any,
  jobTitle: any,
  workflow: any,
  campaign: any,
  jobPositionCampaign: any,
  jobAd: any,
  campaignJobAd: any,
  campaignJobBoard: any,
  jobPositionWorkflow: any,
  jobBoard: any,
  jobPositionEducation: any,
  education: any,
  jobPositionLanguage: any,
  language: any,
  jobPositionSkill: any,
  skill: any,
  jobPositionJobTitle: any,
  jobPositionLocation: any,
  location: any,
  candidate: any,
  candidateWorkflowStage: any,
  candidateTask: any,
  candidateJobPosition: any,
  workflowStage: any,
  workflowStageTask: any,
  task: any,
  jobPositionTask: any,
  taskLocation: any,
  companyLocation: any,
  userTask: any,
  companyUser: any,
  taskCompletedBy: any,
  workExperience: any,
  candidateJobTitle: any,
  workflowWorkflowStage: any,
  companyIndustry: any,
  accountLocation: any,
  cardLocation: any,
  card: any,
  school: any,
  candidateSchool: any,
  degreeType: any,
  candidateDegreeType: any,
  fieldOfStudy: any,
  candidateFieldOfStudy: any,
  jobPositionFieldOfStudy: any,
  transaction: any,
  cardTransaction: any,
}

export type IModel = any;

export type IModelName = keyof ISchemas;

export type IModels = {
  [P in IModelName]: {
    [key: string /* Id */]: IModel
  }
}

export type IModelsArray = {
  [P in IModelName]: IModel[]
}

export type IModelsObject = {
  [key: string /* Id */]: IModel
}

export type IInclude = string | {
  relation: string;
  scope?: {
    where?: any;
    fields?: any,
    include?: IInclude[];
  }
}
