import { Sidebar } from '../widgets/SideBar';
import { AppRouter } from './router';
import './styles/index.scss'

function App() {
    return (
        <>
            <div className='content_page'>
                <Sidebar />
                <AppRouter />
            </div>
        </>
    );
}

export default App;
