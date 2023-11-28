import { JobListingType, JobRequiredExperienceType } from '@/types';
import InfoCard from '../InfoCard';

const InfoGrid = ({ job }: { job: JobListingType }) => {
  const {
    job_employment_type: employmentType,
    job_salary_period: salaryPeriod,
    job_salary_currency: currencyType,
    job_max_salary: maxSalary,
    job_min_salary: minSalary,
    job_job_title: workLevel,
  } = job;

  const salaryInformation =
    currencyType && salaryPeriod
      ? minSalary && maxSalary
        ? `${currencyType}${minSalary} - ${maxSalary} / ${salaryPeriod}`
        : `${currencyType}${minSalary || maxSalary} / ${salaryPeriod}`
      : null;

  const { required_experience_in_months: requiredExperienceInMonths } =
    job?.job_required_experience as JobRequiredExperienceType;

  let requiredExperience: string | null | 0 =
    requiredExperienceInMonths &&
    `Minimum ${requiredExperienceInMonths} months`;
  if (requiredExperienceInMonths && requiredExperienceInMonths >= 12) {
    requiredExperience = `Minimum ${Math.floor(
      requiredExperienceInMonths / 12,
    )} years`;
  }

  const informationObject = {
    requiredExperience,
    workLevel,
    employmentType,
    salaryInformation,
  };

  const renderInfo = () => {
    const infoCards = [];
    for (const [key, value] of Object.entries(informationObject)) {
      if (value) {
        infoCards.push(<InfoCard key={key} title={key} body={value} />);
      }
    }

    return infoCards;
  };

  return (
    <section className='mt-4'>
      <div className='flex w-full items-start justify-evenly gap-2 rounded-lg bg-natural-3 py-4 dark:bg-darkbg-3 max-md:mx-auto max-md:flex-col md:items-center md:gap-4'>
        {renderInfo()}
      </div>
    </section>
  );
};

export default InfoGrid;
