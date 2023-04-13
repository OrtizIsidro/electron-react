import { useEffect, useState } from 'react';
import { getData } from 'renderer/handleLists';

const useData = (channel) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(channel, (data) => setData(data));
  }, []);
  return [
    data,
    (handleData) =>
      setData((prev) => {
        const updatedState = handleData(prev);
        electron.handleLists.add(channel, updatedState);
        return updatedState;
      }),
  ];
};
export default useData;
