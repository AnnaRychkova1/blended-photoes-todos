import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';

export const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Query must contain at list two characters');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        value={query}
        onChange={handleChange}
        required
        autoFocus
      />
    </form>
  );
};
