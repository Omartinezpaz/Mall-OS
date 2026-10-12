import { ImageSourcePropType } from 'react-native';
import type { AgeGroup } from './kids-data';

export const KIDS_IMAGES = {
  // Banners y Portadas
  paginaMpt: require('../../../assets/kids/pagina_mpt.jpg') as ImageSourcePropType,
  mapaDelTesoro: require('../../../assets/kids/mapa_del_tesoro.jpg') as ImageSourcePropType,
  juegaFamilia: require('../../../assets/kids/juega_familia.jpg') as ImageSourcePropType,
  jovenes: require('../../../assets/kids/jovenes.jpg') as ImageSourcePropType,

  // Temáticas Infantiles (4 - 8 años)
  leonExplorador: require('../../../assets/kids/leon_explorador.jpg') as ImageSourcePropType,
  detectiveNina: require('../../../assets/kids/detective_nina.jpg') as ImageSourcePropType,
  coheteExplorador: require('../../../assets/kids/cohete_explorador.jpg') as ImageSourcePropType,
  unicornio: require('../../../assets/kids/unicornio.jpg') as ImageSourcePropType,
  explorador: require('../../../assets/kids/explorador.jpg') as ImageSourcePropType,

  // Temáticas Teens / Gamers (9 - 14 años)
  cyberRunner: require('../../../assets/kids/cyber_runner.jpg') as ImageSourcePropType,
  mandoGamer: require('../../../assets/kids/mando_gamer.jpg') as ImageSourcePropType,
  mechaCiborg: require('../../../assets/kids/mecha_ciborg.jpg') as ImageSourcePropType,
  rayoDigital: require('../../../assets/kids/rayo_digital.jpg') as ImageSourcePropType,

  // Temáticas Juveniles / Urbano (15 - 25 años)
  urbanNeonHunter: require('../../../assets/kids/urban_neon_hunter.jpg') as ImageSourcePropType,
  creadorDigital: require('../../../assets/kids/creador_digital.jpg') as ImageSourcePropType,
  coronaImperial: require('../../../assets/kids/corona_imperial.jpg') as ImageSourcePropType,
};

/**
 * Obtiene la ilustración local correspondiente a cada estación según el grupo de edad y su índice (0 a 4).
 */
export function getStationIllustration(ageGroup: AgeGroup, stationIndex: number): ImageSourcePropType {
  const illustrationsByGroup: Record<AgeGroup, ImageSourcePropType[]> = {
    child: [
      KIDS_IMAGES.leonExplorador,
      KIDS_IMAGES.detectiveNina,
      KIDS_IMAGES.coheteExplorador,
      KIDS_IMAGES.unicornio,
      KIDS_IMAGES.explorador,
    ],
    teen: [
      KIDS_IMAGES.cyberRunner,
      KIDS_IMAGES.mandoGamer,
      KIDS_IMAGES.mechaCiborg,
      KIDS_IMAGES.rayoDigital,
      KIDS_IMAGES.jovenes,
    ],
    young: [
      KIDS_IMAGES.urbanNeonHunter,
      KIDS_IMAGES.creadorDigital,
      KIDS_IMAGES.coronaImperial,
      KIDS_IMAGES.cyberRunner,
      KIDS_IMAGES.jovenes,
    ],
  };

  const list = illustrationsByGroup[ageGroup] || illustrationsByGroup.child;
  return list[stationIndex % list.length];
}
