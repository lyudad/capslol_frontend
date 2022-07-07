import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { userRole } from 'constants/index';
import { Col, Row } from 'antd';
import { StyledPagination } from 'components/StyledPagination/pagination-styles';
import { useGetInvitationsByJobOwnerQuery } from 'store/apis/invitations';
import { IMyInvitation } from 'store/apis/invitations/invitations.types';
import { HideWrapper } from 'components/HideWrapper/styles';
import TalentListCard from './TalentListCard';
import Filters from './Filters';

import {
    Page,
    ListContainer,
    Title,
    TalentsContainer,
    TalentsList,
    FiltersContainer,
    TalentCard,
} from './styles';
import { talentProfile } from './TalentListCard/props';

interface IFilter {
    page: number;
}

const TalentsPage: React.FC = () => {
    const [filter, setFilter] = useState<IFilter>({
        page: 1,
    });
    const { t } = useTranslation();
    const { user: userStore } = useAppSelector((s) => s.auth);

    const freelancers = useAppSelector(
        (state) => state.talentsReducer.talents
    ).filter((item) => item.user?.role === userRole.freelancer);

    const data = useMemo(() => {
        const index = filter.page - 1;
        if (freelancers.length) {
            return [...freelancers]
                .filter((item) => item.user?.role === userRole.freelancer)
                .splice(index, 12);
        }
        return [];
    }, [filter, freelancers]);

    const { data: myInvitations } = useGetInvitationsByJobOwnerQuery(
        userStore?.id
    );

    const idArray: Array<number> = [];

    myInvitations?.map((e: IMyInvitation) =>
        idArray.push(e.freelancerId.id as number)
    );

    return (
        <Page>
            <Title>{t('TalentPage.talents')}</Title>
            <TalentsContainer>
                <FiltersContainer>
                    <Filters />
                </FiltersContainer>
                <ListContainer>
                    {data && (
                        <TalentsList style={{ paddingBottom: 24 }}>
                            {data.map((item: talentProfile) => {
                                const { id } = item;

                                return (
                                    <TalentCard key={id}>
                                        <TalentListCard
                                            jobObj={item}
                                            freelancerIdInInvitations={idArray}
                                        />
                                    </TalentCard>
                                );
                            })}
                        </TalentsList>
                    )}
                    <HideWrapper showWhen={freelancers.length > 12}>
                        <Row justify="center">
                            <Col>
                                <StyledPagination
                                    defaultPageSize={12}
                                    defaultCurrent={filter?.page}
                                    current={filter?.page}
                                    total={freelancers?.length}
                                    onChange={(targetPage) =>
                                        setFilter((prev) => ({
                                            ...prev,
                                            page: targetPage,
                                        }))
                                    }
                                />
                            </Col>
                        </Row>
                    </HideWrapper>
                </ListContainer>
            </TalentsContainer>
        </Page>
    );
};

export default TalentsPage;
