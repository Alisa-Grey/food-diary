// eslint-disable-next-line @typescript-eslint/naming-convention
import _ from 'lodash';

import text from '@/locales/nutritionist/translation.json';
import type { EducationProps } from '@/store/type/nutritionist/type';

import type { GetMyPortfolioResponse, GetPortfolioResponse } from '../nutritionist/types';
import { NutritionistPortfolioFieldsList } from '../nutritionist/types';

export const transformPortfolioData = (data: GetPortfolioResponse | GetMyPortfolioResponse) => {
  const { aboutFieldTitles } = text.portfolioScreen;
  const [
    aboutPracticeField,
    aboutStrongSides,
    aboutMissionMotivation,
    aboutAproach,
    aboutProblems,
    aboutParticipantsNum,
    aboutParticipantsAchivements,
    aboutConsultation,
    aboutHobbies,
    aboutGuidance,
  ] = aboutFieldTitles;
  const { data: portfolioData } = data;

  let aboutFieldsData = [
    {
      id: NutritionistPortfolioFieldsList.aboutPracticeField,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutPracticeField],
      prefix: aboutPracticeField,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutStrongSides,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutStrongSides],
      prefix: aboutStrongSides,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutMissionMotivation,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutMissionMotivation],
      prefix: aboutMissionMotivation,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutAproach,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutAproach],
      prefix: aboutAproach,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutProblems,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutProblems],
      prefix: aboutProblems,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutParticipantsNum,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutParticipantsNum],
      prefix: aboutParticipantsNum,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutParticipantsAchivements,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutParticipantsAchivements],
      prefix: aboutParticipantsAchivements,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutConsultation,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutConsultation],
      prefix: aboutConsultation,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutHobbies,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutHobbies],
      prefix: aboutHobbies,
    },
    {
      id: NutritionistPortfolioFieldsList.aboutGuidance,
      value: portfolioData[NutritionistPortfolioFieldsList.aboutGuidance],
      prefix: aboutGuidance,
    },
  ];
  aboutFieldsData = aboutFieldsData.filter(el => el.value);
  const aboutAsArray = aboutFieldsData.map(el => {
    return `${el.prefix} ${el.value}`;
  });
  const aboutString = aboutAsArray.join('\n\n');

  let educations: EducationProps[] = [];
  let certificates: string[] = [];
  let progress;

  const basicSpecialization = Array.isArray(
    portfolioData[NutritionistPortfolioFieldsList.basicSpecialization],
  )
    ? portfolioData[NutritionistPortfolioFieldsList.basicSpecialization][0]
    : portfolioData[NutritionistPortfolioFieldsList.basicSpecialization];

  if (typeof portfolioData.education === 'string') {
    const educationsString: string[] = JSON.parse(portfolioData.education);
    educations = educationsString.map((el: string) => {
      return JSON.parse(el) as EducationProps;
    });
  }

  if (typeof portfolioData.certificates === 'string') {
    const certificatesString = (portfolioData.certificates as string).slice(1, -1);
    certificates = certificatesString.length ? certificatesString.split(',') : [];
  }

  if (portfolioData.progress) {
    progress = +portfolioData.progress;
  }

  return {
    ...portfolioData,
    [NutritionistPortfolioFieldsList.basicSpecialization]: basicSpecialization,
    education: educations,
    certificates: certificates,
    about: aboutString,
    progress: progress,
  };
};
