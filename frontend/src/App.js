import './styles/main.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory
} from 'react-router-dom'

import Alert from './components/core/Alert'
import LoginPage from './components/login/LoginPage'
import WelcomePage from './components/welcome/WelcomePage'

import IndexNavbar from './components/index/IndexNavbar'
import FeedPage from './components/index/Feed/FeedPage'
import CreatePage from './components/index/Create/CreatePage'

const App = () => {
    const showAlert = useSelector(state => state.app.showAlert)

    return (
        <Router>
            {showAlert && <Alert />}
            <Switch>
                <Route path={['/login', '/confirm', '/name']}>
                    <LoginPage />
                </Route>

                <Route exact path='/welcome'>
                    <WelcomePage />
                </Route>

                <Route path='/index'>
                    <div className='index'>
                        <Route path='/index/profile'>
                            <h2>Profile</h2>
                        </Route>

                        <Route path='/index/history'>
                            <h2>History</h2>
                        </Route>

                        <Route path='/index/add'>
                            <CreatePage />
                        </Route>

                        <Route path='/index/promotion'>
                            <h2>Promotion</h2>
                        </Route>

                        <Route path='/index/feed'>
                            <FeedPage />
                        </Route>

                        {/* <Route path='/index/*'>
                            <p>Not Found</p>
                        </Route> */}
                    </div>

                    <IndexNavbar />
                </Route>

                <Route>
                    <p>Not Found</p>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
