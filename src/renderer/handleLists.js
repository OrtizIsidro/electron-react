export const CHANNEL = 'handleLists';

export const getData = (channel, callback) => {
  electron.handleLists.get(channel, (msg) => {
    if (!msg) return;
    return callback(JSON.parse(msg));
  });
};
