import { Sidebar } from '@/components';
import { AppRouter } from '@/router';

import './styles/index.scss';

function App() {
    return (
        <div className="app">
            <div className="content_page">
                <Sidebar />
                <AppRouter />
            </div>
        </div>
    );
}

export default App;
