import dotenv from 'dotenv';
import { fork } from 'child_process';

dotenv.config();

// Lancer le serveur frontend
const frontProcess = fork('./front/serverFront.js');

// Lancer le serveur backend
const backProcess = fork('./back/serverBack.js');