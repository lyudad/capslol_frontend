import { useTranslation } from "react-i18next";
import {
  Page,
  ListContainer,
  Title,
  JobsContainer,
  JobsList,
  JobCard,
  FiltersContainer,
} from "./styles";
import "antd/dist/antd.min.css";
import JobsListCard from "./JobListCard";
import { jobsExample } from "./example";
import Filters from "./Filters";

const JobsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Title>{t("JobPage.jobPageTitle")}</Title>
      <JobsContainer>
        <ListContainer>
          {jobsExample && (
            <JobsList>
              {jobsExample.map((item) => {
                const { id } = item;
                return (
                  <JobCard key={id}>
                    <JobsListCard jobObj={item} />
                  </JobCard>
                );
              })}
            </JobsList>
          )}
        </ListContainer>
        <FiltersContainer>
          <Filters />
        </FiltersContainer>
      </JobsContainer>
    </Page>
  );
};

export default JobsPage;
