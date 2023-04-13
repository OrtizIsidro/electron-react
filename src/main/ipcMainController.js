import { CHANNEL, paths } from './handleLists';

const { ipcMain } = require('electron');
const fs = require('fs');

const ipcMainController = () => {
  ipcMain.on(CHANNEL, ({ reply }, message) => {
    const { channel, type, data } = message;
    const path = paths[channel];
    const selectFileIf = (verdadero) => {
      if (verdadero) return fs.readFileSync(path).toString();
      return JSON.stringify([]).toString();
    };
    const action = {
      add: () => fs.writeFileSync(path, JSON.stringify(data)),
      get: () => {
        const fileExists = fs.existsSync(path);
        const file = selectFileIf(fileExists);
        if (fileExists) return reply(channel, file);

        fs.writeFileSync(path, file);
        if (!fileExists) return reply(channel, file);
      },
    };
    return action[type]();
  });
};

export default ipcMainController;
