import { ListContainer, ListWrapper, List } from '../styles';
import OfferCard from '../OfferCard/index';

const MyOffers: React.FC = () => {
    return (
        <ListWrapper>
            <ListContainer>
                <List>
                    <ul>
                        <OfferCard />
                    </ul>
                    <ul>
                        <OfferCard />
                    </ul>
                    <ul>
                        <OfferCard />
                    </ul>
                    <ul>
                        <OfferCard />
                    </ul>
                </List>
            </ListContainer>
        </ListWrapper>
    );
};

export default MyOffers;
