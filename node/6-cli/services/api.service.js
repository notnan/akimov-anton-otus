import {getKeyValue, TOKEN_DICTIONARY} from './storage.service.js';
import {Client} from "@notionhq/client";

const getTasksFromNotion = async (dbId, options) => {
	const token = process.env.NOTION_TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	}

	const notion = new Client({
	    auth: token,
	});

	const args = {
		database_id: dbId
	}

	if (!options?.all) {
		args.filter = {
			property: "done",
				checkbox: {
				equals: false
			},
		}
	}

	return await notion.databases.query(args);

};

export { getTasksFromNotion };