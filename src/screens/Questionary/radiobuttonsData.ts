import text from '@/locales/translation.json';

const {
  questionaryFormPhysicalActivity,
  questionaryFormBodyTypes,
  questionaryFormPhysicalActivityWithDescription,
} = text;

export const variantsArrayStep2 = [
  {
    id: 1,
    name: 'minimal',
    title: questionaryFormPhysicalActivity.minimal,
  },
  {
    id: 2,
    name: 'normal',
    title: questionaryFormPhysicalActivity.normal,
  },
  {
    id: 3,
    name: 'high',
    title: questionaryFormPhysicalActivity.high,
  },
  {
    id: 4,
    name: 'sport',
    title: questionaryFormPhysicalActivity.sport,
  },
];

export const physicalActivityWithDescription = [
  {
    id: 1,
    name: 'minimal',
    title: questionaryFormPhysicalActivityWithDescription.minimal.title,
    description: questionaryFormPhysicalActivityWithDescription.minimal.description,
  },
  {
    id: 2,
    name: 'normal',
    title: questionaryFormPhysicalActivityWithDescription.normal.title,
    description: questionaryFormPhysicalActivityWithDescription.normal.description,
  },
  {
    id: 3,
    name: 'high',
    title: questionaryFormPhysicalActivityWithDescription.high.title,
    description: questionaryFormPhysicalActivityWithDescription.high.description,
  },
  {
    id: 4,
    name: 'sport',
    title: questionaryFormPhysicalActivityWithDescription.sport.title,
    description: questionaryFormPhysicalActivityWithDescription.sport.description,
  },
];

const [asthenic, normothenic, hypersthenic]: string[] = questionaryFormBodyTypes;

export const variantsArrayStep4 = [
  { id: 1, name: 'asthenic', text: asthenic },
  { id: 2, name: 'normothenic', text: normothenic },
  { id: 3, name: 'hypersthenic', text: hypersthenic },
];
