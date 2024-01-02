import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BusinessServices from './admin/businessServices';
import Main from './admin/main';
import Meeting from './admin/meeting';
import HomeUser from './user/homeUser';
function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomeUser></HomeUser>}></Route>
                    <Route path='/admin' element={<Main></Main>}>
                        <Route path='meeting' element={<Meeting></Meeting>}></Route>
                        <Route path='service' element={<BusinessServices></BusinessServices>}></Route>                       
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;