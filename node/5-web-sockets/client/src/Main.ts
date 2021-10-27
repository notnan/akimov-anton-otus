export default class Main {
    constructor() {
        window.addEventListener('load', this.registerServiceWorker);

        navigator.serviceWorker.onmessage = (event) => {
            this.showMessage(event.data);
        };
    }

    public async registerServiceWorker(): Promise<void> {
        try {
            await navigator.serviceWorker.register('sw.js', { scope: "/" });

            if ('Notification' in window && window.Notification.permission !== 'granted') {
                await Notification.requestPermission();
            }

        } catch (error) {
            console.log(`Ошибка при регистрации ServiceWorker: ${error}`);
        }
    }

    public showMessage(data): void {
        console.log(data)
        new Notification(data);
    }
}

