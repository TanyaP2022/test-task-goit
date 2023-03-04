
import TweetsList from './Tweets/Tweets'
import { Container } from './AppStyled';
import users from './users.json'


export const App = () => {

  return (
    <Container >
      <TweetsList users={users} />
    </Container>
  );
};
