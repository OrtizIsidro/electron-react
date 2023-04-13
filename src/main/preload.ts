// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { CHANNEL } from '../renderer/handleLists';
export type Channels = 'ipc-example';

const electronHandler = {
  handleLists: {
    get(channel: string, callback: any) {
      const subscription = (event: any, message: any) => {
        callback(message);
        ipcRenderer.removeListener(channel, subscription);
      };
      ipcRenderer.send(CHANNEL, { channel, type: 'get' });
      ipcRenderer.on(channel, subscription);
    },
    add(channel: string, data: Object) {
      ipcRenderer.send(CHANNEL, { channel, data, type: 'add' });
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
