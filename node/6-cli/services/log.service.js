import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printTasks = (res) => {
	res.results.forEach((item) => {
		const task_name = item.properties?.Name?.title.pop()?.plain_text;
		const isDone = item.properties.done.checkbox;
		if (task_name) {
			console.log(
				dedent`${chalk.bgYellow(`${task_name}`)}
						Статус: ${isDone ? 'Выполнен' : 'В процессе'}`
			);
		}
	})

};

export { printError, printSuccess, printTasks };