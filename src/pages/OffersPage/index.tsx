import { useTranslation } from 'react-i18next';
// import { useAppSelector } from 'hooks/redux';
import {
    Page,
    ListContainer,
    Title,
    OffersContainer,
    JobsList,
    TopButtonContainer,
    StyledNavBtn,
} from './styles';
import OfferCard from './OfferCard';

const OffersPage: React.FC = () => {
    const { t } = useTranslation();

    // const jobsData = useAppSelector((state) => state.jobsReducer.jobs);

    return (
        <Page>
            <TopButtonContainer>
                <StyledNavBtn>My Offers</StyledNavBtn>
                <StyledNavBtn>My Invitations</StyledNavBtn>
                <StyledNavBtn>My proposals</StyledNavBtn>
            </TopButtonContainer>
            <Title>My offers</Title>
            <OffersContainer>
                <ListContainer>
                    <JobsList>
                        <li>
                            <OfferCard />
                        </li>
                        <li>
                            <OfferCard />
                        </li>
                        <li>
                            <OfferCard />
                        </li>
                        <li>
                            <OfferCard />
                        </li>
                    </JobsList>

                    {/* {jobsData && (
                        <JobsList>
                            {jobsData.map((item) => {
                                const { id } = item;
                                return (
                                    <JobCard key={id}>
                                        <JobsListCard jobObj={item} />
                                    </JobCard>
                                );
                            })}
                        </JobsList>
                    )} */}
                </ListContainer>
            </OffersContainer>
        </Page>
    );
};

export default OffersPage;
