import { createRoot } from 'react-dom/client';
import IndexRouter from './IndexRouter';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<IndexRouter />);
