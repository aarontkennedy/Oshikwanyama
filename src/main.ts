import './style.css';
import { startApp } from './app';
import { applyAppearance } from './theme';

applyAppearance();

startApp(document.getElementById('app')!);
