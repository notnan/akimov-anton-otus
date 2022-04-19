import {program} from 'commander'
import {printError, printSuccess, printTasks} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY, getKeyValue} from "./services/storage.service.js";
import { getTasksFromNotion } from "./services/api.service.js";

const saveDB = async (db) => {
    if (!db.length) {
        printError('Нет id базы');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.db, db);
        printSuccess('ID базы данных сохранён');
    } catch (e) {
        printError(e.message);
    }
}

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан token');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранён');
    } catch (e) {
        printError(e.message);
    }
}

const geTasksList = async (options) => {
    try {
        const dbId = process.env.db ?? await getKeyValue(TOKEN_DICTIONARY.db);
        const tasksData = await getTasksFromNotion(dbId, options);

        if (tasksData.results.length) {
            printTasks(tasksData);
        } else {
            console.log('Задачи не найдены')
        }
    } catch (e) {
        if (e.code === "object_not_found") {
            printError('Неверно указан ID базы данных');
        } else if (e.code === "unauthorized") {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
}

const getAuthData = async () => {
    const token = process.env.NOTION_TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    const dbId = process.env.NOTION_DB ?? await getKeyValue(TOKEN_DICTIONARY.db)

    console.log(`Токен: ${token ?? 'Отсутствует'}`)
    console.log(`ID Базы данных: ${dbId ?? 'Отсутствует'}`)
}

const initCli = async () => {
    program.version('0.0.1')

    program
        .command('config')
        .option('-t, --token <token>', 'token для доступа')
        .option('-d, --db <dbId>', 'id базы данных')
        .action(async (options) => {
            if (options.db) {
                await saveDB(options.db)
            }
            if (options.token) {
                await saveToken(options.token);
            }

            await getAuthData()
        });

    program
        .command('tasks')
        .option('-a, --all', 'Вывод всех задач')
        .action(async (options) => {
            await geTasksList(options)
        });

    program.parse(process.argv);
}

await initCli();