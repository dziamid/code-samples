/**
 * Application schema, defines models and their relations
 *
 */

import * as normalizr from 'normalizr';
import {ISchemas} from "models/types";
import {E} from "react-router/lib/RouteUtils";
import {users} from "../HiringWorkflow/mocks";
const {Entity} = normalizr.schema;

const account = new Entity('account');
const accountLocation = new Entity('accountLocation');

const card = new Entity('card');
const transaction = new Entity('transaction');
const cardLocation = new Entity('cardLocation');
const cardTransaction = new Entity('cardTransaction');


const user = new Entity('user');
const userTask = new Entity('userTask');

const jobPosition = new Entity('jobPosition');
const jobPositionJobTitleMain = new Entity('jobPositionJobTitleMain');
const jobPositionCampaign = new Entity('jobPositionCampaign');
const jobPositionWorkflow = new Entity('jobPositionWorkflow');
const jobPositionEducation = new Entity('jobPositionEducation');
const education = new Entity('education');
const jobPositionLanguage = new Entity('jobPositionLanguage');
const language = new Entity('language');
const jobPositionSkill = new Entity('jobPositionSkill');
const skill = new Entity('skill');
const jobPositionJobTitle = new Entity('jobPositionJobTitle');
const jobTitle = new Entity('jobTitle');
const jobPositionLocation = new Entity('jobPositionLocation');
const location = new Entity('location');
const jobPositionTask = new Entity('jobPositionTask');
const workExperience = new Entity('workExperience');
const jobPositionFieldOfStudy = new Entity('jobPositionFieldOfStudy');

const candidate = new Entity('candidate');
const candidateWorkflowStage = new Entity('candidateWorkflowStage');
const candidateTask = new Entity('candidateTask');
const candidateJobPosition = new Entity('candidateJobPosition');
const candidateJobTitle = new Entity('candidateJobTitle');
const candidateSchool = new Entity('candidateSchool');
const candidateDegreeType = new Entity('candidateDegreeType');
const candidateFieldOfStudy = new Entity('candidateFieldOfStudy');

const company = new Entity('company');
const companyJobPosition = new Entity('companyJobPosition');
const companyLocation = new Entity('companyLocation');
const companyUser = new Entity('companyUser');
const companyIndustry = new Entity('companyIndustry');

const workflow = new Entity('workflow');
const workflowStage = new Entity('workflowStage');
const workflowStageTask = new Entity('workflowStageTask');
const workflowWorkflowStage = new Entity('workflowWorkflowStage');

const task = new Entity('task');
const taskLocation = new Entity('taskLocation');
const taskCompletedBy = new Entity('taskCompletedBy');

const campaign = new Entity('campaign');
const campaignJobAd = new Entity('campaignJobAd');
const campaignJobBoard = new Entity('campaignJobBoard');
const jobAd = new Entity('jobAd');
const jobBoard = new Entity('jobBoard');
const school = new Entity('school');
const degreeType = new Entity('degreeType');
const fieldOfStudy = new Entity('fieldOfStudy');

account.define({
  companies: [company],
  users: [user],
  refAccountLocation: [accountLocation],
  locations: [location],
  cards: [card],
});

card.define({
  refCardLocation: [cardLocation],
  refCardTransaction: [cardTransaction],
  transactions: [transaction],
});

user.define({
  accounts: [account],
  companies: [company],
  refUserTask: [userTask],
  tasks: [task],
  location: location,
  workflows: [workflow],
  workflowStages: [workflowStage],
  refCompanyUser: [companyUser],
});

company.define({
  jobPositions: [jobPosition],
  refCompanyJobPosition: [companyJobPosition],
  refCompanyLocation: [companyLocation],
  users: [user],
  workflows: [workflow],
  refCompanyUser: [companyUser],
  refCompanyIndustry: [companyIndustry],
  locations: [location],
});

jobPosition.define({
  companies: [company],
  refJobPositionJobTitleMain: [jobPositionJobTitleMain],
  refJobPositionCampaign: [jobPositionCampaign],
  refJobPositionJobTitle: [jobPositionJobTitle],
  jobTitlesMain: [jobTitle],
  jobTitles: [jobTitle],
  workflows: [workflow],
  refJobPositionWorkflow: [jobPositionWorkflow],
  campaigns: [campaign],
  jobAds: [jobAd],
  refJobPositionEducation: [jobPositionEducation],
  educations: [education],
  refJobPositionLanguage: [jobPositionLanguage],
  languages: [language],
  refJobPositionSkill: [jobPositionSkill],
  skills: [skill],
  refJobPositionLocation: [jobPositionLocation],
  locations: [location],
  candidates: [candidate],
  refJobPositionTask: [jobPositionTask],
  refJobPositionFieldOfStudy: [jobPositionFieldOfStudy],
  refCompanyJobPosition: [companyJobPosition],
  refCandidateJobPosition: [candidateJobPosition],
});

jobPositionFieldOfStudy.define({
  fieldOfStudy: fieldOfStudy,
  degreeType: degreeType,
})

campaign.define({
  jobAds: [jobAd],
  refCampaignJobAd: [campaignJobAd],
  refCampaignJobBoard: [campaignJobBoard],
  jobBoards: [jobBoard],
});

candidate.define({
  refCandidateWorkflowStage: [candidateWorkflowStage],
  refCandidateTask: [candidateTask],
  refCandidateJobPosition: [candidateJobPosition],
  tasks: [task],
  jobPositions: [jobPosition],
  workExperiences: [workExperience],
  educations: [education],
  languages: [language],
  refJobTitles: [candidateJobTitle],
  workflowStages: [workflowStage],
  locations: [location],
  schools: [school],
  refSchools: [candidateSchool],
  degreeTypes: [degreeType],
  refDegreeTypes: [candidateDegreeType],
  fieldOfStudy: [fieldOfStudy],
  refFieldOfStudy: [candidateFieldOfStudy],
});

workflow.define({
  workflowStages: [workflowStage],
  users: [user],
  refWorkflowWorkflowStage: [workflowWorkflowStage],
  jobPositions: [jobPosition],
});

workflowStage.define({
  refWorkflowStageTask: [workflowStageTask],
  tasks: [task],
  workflows: [workflow],
});

task.define({
  refJobPositionTask: [jobPositionTask],
  refTaskLocation: [taskLocation],
  refTaskCompletedBy: [taskCompletedBy],
  locations: [location],
  users: [user],
  jobPositions: [jobPosition],
});

taskCompletedBy.define({
  user: user,
});

const schema: ISchemas = {
  account,
  user,
  jobPosition,
  company,
  jobTitle,
  workflow,
  companyJobPosition,
  jobPositionJobTitleMain,
  campaign,
  jobPositionCampaign,
  jobAd,
  campaignJobAd,
  campaignJobBoard,
  jobPositionWorkflow,
  jobBoard,
  jobPositionEducation,
  education,
  jobPositionLanguage,
  language,
  jobPositionSkill,
  skill,
  jobPositionJobTitle,
  jobPositionLocation,
  location,
  candidate,
  candidateWorkflowStage,
  candidateTask,
  candidateJobPosition,
  workflowStage,
  workflowStageTask,
  task,
  jobPositionTask,
  taskLocation,
  companyLocation,
  userTask,
  companyUser,
  taskCompletedBy,
  workExperience,
  candidateJobTitle,
  workflowWorkflowStage,
  companyIndustry,
  accountLocation,
  cardLocation,
  card,
  school,
  candidateSchool,
  degreeType,
  candidateDegreeType,
  fieldOfStudy,
  candidateFieldOfStudy,
  jobPositionFieldOfStudy,
  transaction,
  cardTransaction
};

export default schema;
