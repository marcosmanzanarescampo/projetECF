import dotenv from 'dotenv';
import { fork } from 'child_process';

dotenv.config();

// Lancer le serveur backend
const backProcess = fork('./serverBack.js');

// Lancer le serveur frontend
const frontProcess = fork('./serverFront.js');