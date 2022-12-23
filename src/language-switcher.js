import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  return(
    <div  >
      
              <select onClick={changeLanguage} className='bg-dark text-secondary'>
                    <option  value="en">English</option>
                    <option  value="lt">Lietuvių</option>
                </select>
        
    </div>
  )
}

export default LanguageSwitcher;