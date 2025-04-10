import {readFile, writeFile} from 'fs/promises';
const USERS_FILE = './data/users.json';

export async function getUsers() {
    const data = await readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
}

export async function saveUsers(users) {
    await writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

