import { Route, Switch, BrowserRouter } from 'react-router-dom';
import FeedbackPage from './pages/FeedbackPage';
import HomePage from './pages/HomePage';
import SendPage from './pages/SendPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/send/start" component={SendPage} />
      <Route exact path="/send/done" component={FeedbackPage} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter;
