import {
  faBagShopping,
  faBook,
  faLocationDot,
  faMugHot,
  faSquareH,
  faTrainSubway,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { colorPalette } from '../../colorPalette';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type MarkerTemplateProps = {
  name: string;
  icon: IconProp;
  iconColor: string;
};

export const markerTemplates: MarkerTemplateProps[] = [
  {
    name: 'Метка',
    icon: faLocationDot,
    iconColor: colorPalette.accent,
  },
  {
    name: 'Кофейня',
    icon: faMugHot,
    iconColor: colorPalette.custom1,
  },
  {
    name: 'Библиотека',
    icon: faBook,
    iconColor: colorPalette.custom2,
  },
  {
    name: 'Продуктовый',
    icon: faBagShopping,
    iconColor: colorPalette.custom3,
  },
  {
    name: 'Мастерская',
    icon: faWrench,
    iconColor: colorPalette.custom4,
  },
  {
    name: 'Ж/д станция',
    icon: faTrainSubway,
    iconColor: colorPalette.custom5,
  },
  {
    name: 'Госпиталь',
    icon: faSquareH,
    iconColor: colorPalette.custom6,
  },
];
