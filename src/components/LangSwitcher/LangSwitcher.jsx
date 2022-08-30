import { useTranslation } from "react-i18next";

const languages = { en: "English", uk: "Ukrainian" };

const LangSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {Object.keys(languages).map((lng) => {
        return (
          <button
            key={lng}
            onClick={() => {
              i18n.changeLanguage(lng);
            }}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lng}
          </button>
        );
      })}
    </>
  );
};

export default LangSwitcher;
