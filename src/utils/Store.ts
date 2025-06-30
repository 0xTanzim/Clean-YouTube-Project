class Storage {
    save (key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    get (key: string): any {
        const json = localStorage.getItem(key);
        return json ? JSON.parse(json) : null;
    }
}

const storage = new Storage();

export default storage;