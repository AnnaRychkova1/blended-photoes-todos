import { RingLoader } from 'react-spinners';
import style from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={style.backdrop}>
      <RingLoader color="#21e4e8" size="230px" />
    </div>
  );
};
