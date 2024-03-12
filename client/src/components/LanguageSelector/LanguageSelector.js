// LanguageSelector.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div>

      <select id="language-select" onChange={changeLanguage} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="es">Español (Spanish)</option>
        <option value="ht">Kreyòl Ayisyen (Haitian Creole)</option>
        <option value="fr">Français (French)</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
