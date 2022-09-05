import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconSvg } from '../IconSvg';

import svgSprite from '../../../images/sprite.svg';
import s from './GoBackButton.module.scss';

export const GoBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [from, setFrom] = useState();

  useEffect(() => {
    if (location?.state?.from) {
      setFrom(location?.state?.from);
    }
  }, [location?.state?.from]);

  return (
    <button
      className={s.wrapper}
      type="button"
      onClick={() => navigate(from ?? '/')}
    >
      <IconSvg sprite={svgSprite} icon="go_back" className={s.categoryIcon} />
    </button>
  );
};
