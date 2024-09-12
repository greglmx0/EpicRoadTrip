import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, NgModule } from '@angular/core';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';
import { SearchActivityButtonComponent } from '../input/search-activity-button/search-activity-button.component';
import { ActivityCheckboxSelectorComponent } from '../input/activity-checkbox-selector/activity-checkbox-selector.component';
import { MapTripComponent } from '../map/map-trip/map-trip.component';
import { AppDateRangePicker } from '../datepicker/date-range-picker/date-range-picker.component';
import { CardPointInterrestComponent } from '../card-point-interrest/card-point-interrest.component';
import ApiMapbox from 'src/api/mapbox';
import ApiDrink from 'src/api/apiDrink';
import DrinkDto from 'src/api/dto/drink.dto';
type ActivityType = 'enjoy' | 'sleep' | 'travel' | 'eat' | 'drink';
@Component({
  selector: 'app-trip-with-interest-points-container',
  standalone: true,
  templateUrl: './trip-with-interest-points-container.component.html',
  styleUrl: './trip-with-interest-points-container.component.scss',
  imports: [
    InputAddressSuggestionComponent,
    MapTripComponent,
    CommonModule,
    SearchActivityButtonComponent,
    AppDateRangePicker,
    ActivityCheckboxSelectorComponent,
    CardPointInterrestComponent,
  ],
})
export class TripWithInterestPointsContainerComponent {
  depart: [lat: number, lon: number] | null = [-1.657145, 48.114744];
  arrive: [lat: number, lon: number] | null = [-1.658784, 48.116956];
  trip: any = {
    code: 'Ok',
    routes: [
      {
        distance: 275.497,
        duration: 62.041,
        geometry: {
          coordinates: [
            [-1.657137, 48.114734],
            [-1.657159, 48.114762],
            [-1.657272, 48.114904],
            [-1.657366, 48.115015],
            [-1.657668, 48.115376],
            [-1.657693, 48.115405],
            [-1.657881, 48.115644],
            [-1.657947, 48.115727],
            [-1.658025, 48.115825],
            [-1.658113, 48.115939],
            [-1.65819, 48.116041],
            [-1.658232, 48.116093],
            [-1.658293, 48.116167],
            [-1.65837, 48.116265],
            [-1.658387, 48.116287],
            [-1.658422, 48.116332],
            [-1.658617, 48.116576],
            [-1.658651, 48.116626],
            [-1.658768, 48.116758],
            [-1.658902, 48.11691],
          ],
          type: 'LineString',
        },
        legs: [
          {
            admins: [{ iso_3166_1: 'FR', iso_3166_1_alpha3: 'FRA' }],
            distance: 275.497,
            duration: 62.041,
            steps: [
              {
                distance: 275.497,
                driving_side: 'right',
                duration: 62.041,
                geometry: {
                  coordinates: [
                    [-1.657137, 48.114734],
                    [-1.657159, 48.114762],
                    [-1.657272, 48.114904],
                    [-1.657366, 48.115015],
                    [-1.657668, 48.115376],
                    [-1.657693, 48.115405],
                    [-1.657881, 48.115644],
                    [-1.657947, 48.115727],
                    [-1.658025, 48.115825],
                    [-1.658113, 48.115939],
                    [-1.65819, 48.116041],
                    [-1.658232, 48.116093],
                    [-1.658293, 48.116167],
                    [-1.65837, 48.116265],
                    [-1.658387, 48.116287],
                    [-1.658422, 48.116332],
                    [-1.658617, 48.116576],
                    [-1.658651, 48.116626],
                    [-1.658768, 48.116758],
                    [-1.658902, 48.11691],
                  ],
                  type: 'LineString',
                },
                intersections: [
                  {
                    admin_index: 0,
                    bearings: [332],
                    duration: 5.141,
                    entry: [true],
                    geometry_index: 0,
                    is_urban: true,
                    location: [-1.657137, 48.114734],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 0,
                    traffic_signal: true,
                    weight: 5.67,
                  },
                  {
                    admin_index: 0,
                    bearings: [152, 237, 331],
                    duration: 3.426,
                    entry: [false, true, true],
                    geometry_index: 2,
                    in: 0,
                    is_urban: true,
                    location: [-1.657272, 48.114904],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 2,
                    turn_duration: 0.019,
                    turn_weight: 0.5,
                    weight: 4.28,
                  },
                  {
                    admin_index: 0,
                    bearings: [151, 245, 331],
                    duration: 11.054,
                    entry: [false, true, true],
                    geometry_index: 3,
                    in: 0,
                    is_urban: true,
                    location: [-1.657366, 48.115015],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 2,
                    turn_duration: 0.007,
                    turn_weight: 0.5,
                    weight: 12.92,
                  },
                  {
                    admin_index: 0,
                    bearings: [63, 151, 332],
                    duration: 8.114,
                    entry: [true, false, true],
                    geometry_index: 4,
                    in: 1,
                    is_urban: true,
                    location: [-1.657668, 48.115376],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 2,
                    turn_duration: 0.007,
                    turn_weight: 0.5,
                    weight: 9.68,
                  },
                  {
                    admin_index: 0,
                    bearings: [66, 152, 332],
                    duration: 2.518,
                    entry: [true, false, true],
                    geometry_index: 6,
                    in: 1,
                    is_urban: true,
                    location: [-1.657881, 48.115644],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 2,
                    turn_duration: 0.007,
                    turn_weight: 0.5,
                    weight: 3.2,
                  },
                  {
                    admin_index: 0,
                    bearings: [55, 152, 332],
                    duration: 6.398,
                    entry: [true, false, true],
                    geometry_index: 7,
                    in: 1,
                    is_urban: true,
                    location: [-1.657947, 48.115727],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 2,
                    turn_duration: 0.007,
                    turn_weight: 0.5,
                    weight: 7.79,
                  },
                  {
                    admin_index: 0,
                    bearings: [153, 232, 333],
                    duration: 7.724,
                    entry: [false, true, true],
                    geometry_index: 9,
                    in: 0,
                    is_urban: true,
                    location: [-1.658113, 48.115939],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 2,
                    turn_duration: 0.007,
                    turn_weight: 0.5,
                    weight: 9.05,
                  },
                  {
                    admin_index: 0,
                    bearings: [51, 153, 239, 331],
                    duration: 3.782,
                    entry: [false, false, false, true],
                    geometry_index: 11,
                    in: 1,
                    is_urban: true,
                    location: [-1.658232, 48.116093],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 3,
                    turn_duration: 0.021,
                    turn_weight: 1,
                    weight: 5.05,
                  },
                  {
                    admin_index: 0,
                    bearings: [63, 151, 256, 332],
                    duration: 2.367,
                    entry: [true, false, true, true],
                    geometry_index: 12,
                    in: 1,
                    is_urban: true,
                    location: [-1.658293, 48.116167],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 3,
                    turn_duration: 0.007,
                    turn_weight: 1.5,
                    weight: 4.141,
                  },
                  {
                    admin_index: 0,
                    bearings: [152, 237, 332],
                    duration: 5.709,
                    entry: [false, false, true],
                    geometry_index: 14,
                    in: 0,
                    is_urban: true,
                    location: [-1.658387, 48.116287],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 2,
                    turn_duration: 0.007,
                    turn_weight: 0.5,
                    weight: 6.839,
                  },
                  {
                    admin_index: 0,
                    bearings: [30, 152, 336],
                    duration: 0.889,
                    entry: [true, false, true],
                    geometry_index: 16,
                    in: 1,
                    is_urban: true,
                    location: [-1.658617, 48.116576],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 2,
                    turn_duration: 0.009,
                    turn_weight: 0.5,
                    weight: 1.472,
                  },
                  {
                    admin_index: 0,
                    bearings: [61, 156, 263, 329],
                    duration: 2.307,
                    entry: [true, false, true, true],
                    geometry_index: 17,
                    in: 1,
                    is_urban: true,
                    location: [-1.658651, 48.116626],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 3,
                    turn_duration: 0.03,
                    turn_weight: 1,
                    weight: 3.55,
                  },
                  {
                    admin_index: 0,
                    bearings: [149, 330],
                    entry: [false, true],
                    geometry_index: 18,
                    in: 0,
                    is_urban: true,
                    location: [-1.658768, 48.116758],
                    mapbox_streets_v8: { class: 'secondary' },
                    out: 1,
                    turn_weight: 0.5,
                  },
                ],
                maneuver: {
                  bearing_after: 332,
                  bearing_before: 0,
                  instruction: 'Conduisez vers le nord-ouest sur Boulevard de Metz.',
                  location: [-1.657137, 48.114734],
                  type: 'depart',
                },
                mode: 'driving',
                name: 'Boulevard de Metz',
                weight: 77.133,
              },
              {
                distance: 0,
                driving_side: 'right',
                duration: 0,
                geometry: {
                  coordinates: [
                    [-1.658902, 48.11691],
                    [-1.658902, 48.11691],
                  ],
                  type: 'LineString',
                },
                intersections: [
                  {
                    admin_index: 0,
                    bearings: [150],
                    entry: [true],
                    geometry_index: 19,
                    in: 0,
                    location: [-1.658902, 48.11691],
                  },
                ],
                maneuver: {
                  bearing_after: 0,
                  bearing_before: 330,
                  instruction: 'Votre destination est sur la droite.',
                  location: [-1.658902, 48.11691],
                  modifier: 'right',
                  type: 'arrive',
                },
                mode: 'driving',
                name: 'Boulevard de Metz',
                weight: 0,
              },
            ],
            summary: 'Boulevard de Metz',
            via_waypoints: [],
            weight: 77.133,
          },
        ],
        weight: 77.133,
        weight_name: 'auto',
      },
    ],
    uuid: 'mQFtyg15VPb6jCN2hF14Rm3E3iLTbhEQw64MiZMTvfXNwVFYzccCvA==',
    waypoints: [
      { distance: 1.262, location: [-1.657137, 48.114734], name: 'Boulevard de Metz' },
      { distance: 10.156, location: [-1.658902, 48.11691], name: 'Boulevard de Metz' },
    ],
  };

  center: { lat: number; lng: number } = { lat: 0, lng: 0 };
  distance: number = 0;
  points: any[] = [
    {
      name: 'FESTIVAL INTERNATIONAL VIVE LA MAGIE',
      coordinates: ['-1.655827', '48.087651'],
      description:
        "Le festival magique de référence fête sa 17ème année et revient vous ensorceler ! Chaque année depuis 2008, Monique et Gérard Souchet, les concepteurs et producteurs de VIVE LA MAGIE, choisissent avec une minutie particulière les plus grands magiciens du monde.Chaque année ce sont des milliers de bravos pour la nouvelle mise en scène magique, la nouvelle « comédie magicale  imaginée et mise en scène par l’excellent François Normag.Les nombreuses scènes et tableaux s'enchaînent sans aucun temps mort dans un rythme soutenu, tantôt drôle, tantôt émouvant..Mais toujours magique.Du personnage farfelu aux personnages poétiques, du délire au délicieusement magique, les séquences les plus improbables se succèdent, mais chut...comme des dizaines de milliers de spectateurs chaque année, il faut découvrir le nouveau spectacle de VIVE LA MAGIE, un spectacle qui ne ressemble en rien aux traditionnels galas de magie. Les Souchets sont allés parfois au bout du monde pour dénicher des artistes jamais vus en France.Et si au fil des années, ce festival est devenu le rendez-vous magique incontournable pour les familles, c’est que VIVE LA MAGIE aime à faire découvrir au public des artistes subtils et malicieux, représentants d'un art vivant totalement délivré de ses conventions. Ces magiciens aux multiples nationalités, représentent les différentes catégories de cet art totalement remis au goût du jour par les plus grands metteurs en scène. Comédiens, manipulateurs de l'imaginaire, enchanteurs de l'instant, humoristes magiciens, illusionnistes… Ces artistes sont très loin des clichés pour  Vivre la magie  en grand.VIVE LA MAGIE, c'est surtout l'assurance de découvrir un spectacle où le meilleur de l'art magique vous est présenté avec éclat.Les milliers de retours positifs sur la toile et sur les réseaux sociaux sont là pour le confirmer. Grâce à VIVE LA MAGIE, découvrez et vivez des émotions artistiques exceptionnelles ! Laissez-vous enchanter par la toute nouvelle création 2025 et ce tout nouveau spectacle avec à la clé plus de 10 artistes talentueux et singuliers. Venez rire, vibrer et vous émerveiller en duo, en famille ou entre amis.Un grand spectacle familial de 1h45, sans interruption, accessible à tous, à partir de 5 ans.IMPORTANT : VIVE LA MAGIE ce ne sont pas uniquement de grandes représentations prestigieuses, ce sont  aussi des ateliers pour les 7-10 ans pour apprendre l'art du mystère, sans oublier des spectacles dédiés aux 3-6 ans pour s'émerveiller à leur rythme et découvrir ses premières émotions artistiques avec ses parents et ses amis.",
    },
    {
      name: 'FESTIVAL INTERNATIONAL VIVE LA MAGIE',
      coordinates: ['-1.655827', '48.087651'],
      description:
        "Le festival magique de référence fête sa 17ème année et revient vous ensorceler ! Chaque année depuis 2008, Monique et Gérard Souchet, les concepteurs et producteurs de VIVE LA MAGIE, choisissent avec une minutie particulière les plus grands magiciens du monde.Chaque année ce sont des milliers de bravos pour la nouvelle mise en scène magique, la nouvelle « comédie magicale  imaginée et mise en scène par l’excellent François Normag.Les nombreuses scènes et tableaux s'enchaînent sans aucun temps mort dans un rythme soutenu, tantôt drôle, tantôt émouvant..Mais toujours magique.Du personnage farfelu aux personnages poétiques, du délire au délicieusement magique, les séquences les plus improbables se succèdent, mais chut...comme des dizaines de milliers de spectateurs chaque année, il faut découvrir le nouveau spectacle de VIVE LA MAGIE, un spectacle qui ne ressemble en rien aux traditionnels galas de magie. Les Souchets sont allés parfois au bout du monde pour dénicher des artistes jamais vus en France.Et si au fil des années, ce festival est devenu le rendez-vous magique incontournable pour les familles, c’est que VIVE LA MAGIE aime à faire découvrir au public des artistes subtils et malicieux, représentants d'un art vivant totalement délivré de ses conventions. Ces magiciens aux multiples nationalités, représentent les différentes catégories de cet art totalement remis au goût du jour par les plus grands metteurs en scène. Comédiens, manipulateurs de l'imaginaire, enchanteurs de l'instant, humoristes magiciens, illusionnistes… Ces artistes sont très loin des clichés pour  Vivre la magie  en grand.VIVE LA MAGIE, c'est surtout l'assurance de découvrir un spectacle où le meilleur de l'art magique vous est présenté avec éclat.Les milliers de retours positifs sur la toile et sur les réseaux sociaux sont là pour le confirmer. Grâce à VIVE LA MAGIE, découvrez et vivez des émotions artistiques exceptionnelles ! Laissez-vous enchanter par la toute nouvelle création 2025 et ce tout nouveau spectacle avec à la clé plus de 10 artistes talentueux et singuliers. Venez rire, vibrer et vous émerveiller en duo, en famille ou entre amis.Un grand spectacle familial de 1h45, sans interruption, accessible à tous, à partir de 5 ans.IMPORTANT : VIVE LA MAGIE ce ne sont pas uniquement de grandes représentations prestigieuses, ce sont  aussi des ateliers pour les 7-10 ans pour apprendre l'art du mystère, sans oublier des spectacles dédiés aux 3-6 ans pour s'émerveiller à leur rythme et découvrir ses premières émotions artistiques avec ses parents et ses amis.",
    },
    {
      name: 'FESTIVAL INTERNATIONAL VIVE LA MAGIE',
      coordinates: ['-1.655827', '48.087651'],
      description:
        "Le festival magique de référence fête sa 17ème année et revient vous ensorceler ! Chaque année depuis 2008, Monique et Gérard Souchet, les concepteurs et producteurs de VIVE LA MAGIE, choisissent avec une minutie particulière les plus grands magiciens du monde.Chaque année ce sont des milliers de bravos pour la nouvelle mise en scène magique, la nouvelle « comédie magicale  imaginée et mise en scène par l’excellent François Normag.Les nombreuses scènes et tableaux s'enchaînent sans aucun temps mort dans un rythme soutenu, tantôt drôle, tantôt émouvant..Mais toujours magique.Du personnage farfelu aux personnages poétiques, du délire au délicieusement magique, les séquences les plus improbables se succèdent, mais chut...comme des dizaines de milliers de spectateurs chaque année, il faut découvrir le nouveau spectacle de VIVE LA MAGIE, un spectacle qui ne ressemble en rien aux traditionnels galas de magie. Les Souchets sont allés parfois au bout du monde pour dénicher des artistes jamais vus en France.Et si au fil des années, ce festival est devenu le rendez-vous magique incontournable pour les familles, c’est que VIVE LA MAGIE aime à faire découvrir au public des artistes subtils et malicieux, représentants d'un art vivant totalement délivré de ses conventions. Ces magiciens aux multiples nationalités, représentent les différentes catégories de cet art totalement remis au goût du jour par les plus grands metteurs en scène. Comédiens, manipulateurs de l'imaginaire, enchanteurs de l'instant, humoristes magiciens, illusionnistes… Ces artistes sont très loin des clichés pour  Vivre la magie  en grand.VIVE LA MAGIE, c'est surtout l'assurance de découvrir un spectacle où le meilleur de l'art magique vous est présenté avec éclat.Les milliers de retours positifs sur la toile et sur les réseaux sociaux sont là pour le confirmer. Grâce à VIVE LA MAGIE, découvrez et vivez des émotions artistiques exceptionnelles ! Laissez-vous enchanter par la toute nouvelle création 2025 et ce tout nouveau spectacle avec à la clé plus de 10 artistes talentueux et singuliers. Venez rire, vibrer et vous émerveiller en duo, en famille ou entre amis.Un grand spectacle familial de 1h45, sans interruption, accessible à tous, à partir de 5 ans.IMPORTANT : VIVE LA MAGIE ce ne sont pas uniquement de grandes représentations prestigieuses, ce sont  aussi des ateliers pour les 7-10 ans pour apprendre l'art du mystère, sans oublier des spectacles dédiés aux 3-6 ans pour s'émerveiller à leur rythme et découvrir ses premières émotions artistiques avec ses parents et ses amis.",
    },
    {
      name: 'FESTIVAL INTERNATIONAL VIVE LA MAGIE',
      coordinates: ['-1.655827', '48.087651'],
      description:
        "Le festival magique de référence fête sa 17ème année et revient vous ensorceler ! Chaque année depuis 2008, Monique et Gérard Souchet, les concepteurs et producteurs de VIVE LA MAGIE, choisissent avec une minutie particulière les plus grands magiciens du monde.Chaque année ce sont des milliers de bravos pour la nouvelle mise en scène magique, la nouvelle « comédie magicale  imaginée et mise en scène par l’excellent François Normag.Les nombreuses scènes et tableaux s'enchaînent sans aucun temps mort dans un rythme soutenu, tantôt drôle, tantôt émouvant..Mais toujours magique.Du personnage farfelu aux personnages poétiques, du délire au délicieusement magique, les séquences les plus improbables se succèdent, mais chut...comme des dizaines de milliers de spectateurs chaque année, il faut découvrir le nouveau spectacle de VIVE LA MAGIE, un spectacle qui ne ressemble en rien aux traditionnels galas de magie. Les Souchets sont allés parfois au bout du monde pour dénicher des artistes jamais vus en France.Et si au fil des années, ce festival est devenu le rendez-vous magique incontournable pour les familles, c’est que VIVE LA MAGIE aime à faire découvrir au public des artistes subtils et malicieux, représentants d'un art vivant totalement délivré de ses conventions. Ces magiciens aux multiples nationalités, représentent les différentes catégories de cet art totalement remis au goût du jour par les plus grands metteurs en scène. Comédiens, manipulateurs de l'imaginaire, enchanteurs de l'instant, humoristes magiciens, illusionnistes… Ces artistes sont très loin des clichés pour  Vivre la magie  en grand.VIVE LA MAGIE, c'est surtout l'assurance de découvrir un spectacle où le meilleur de l'art magique vous est présenté avec éclat.Les milliers de retours positifs sur la toile et sur les réseaux sociaux sont là pour le confirmer. Grâce à VIVE LA MAGIE, découvrez et vivez des émotions artistiques exceptionnelles ! Laissez-vous enchanter par la toute nouvelle création 2025 et ce tout nouveau spectacle avec à la clé plus de 10 artistes talentueux et singuliers. Venez rire, vibrer et vous émerveiller en duo, en famille ou entre amis.Un grand spectacle familial de 1h45, sans interruption, accessible à tous, à partir de 5 ans.IMPORTANT : VIVE LA MAGIE ce ne sont pas uniquement de grandes représentations prestigieuses, ce sont  aussi des ateliers pour les 7-10 ans pour apprendre l'art du mystère, sans oublier des spectacles dédiés aux 3-6 ans pour s'émerveiller à leur rythme et découvrir ses premières émotions artistiques avec ses parents et ses amis.",
    },
    {
      name: 'FESTIVAL INTERNATIONAL VIVE LA MAGIE',
      coordinates: ['-1.655827', '48.087651'],
      description:
        "Le festival magique de référence fête sa 17ème année et revient vous ensorceler ! Chaque année depuis 2008, Monique et Gérard Souchet, les concepteurs et producteurs de VIVE LA MAGIE, choisissent avec une minutie particulière les plus grands magiciens du monde.Chaque année ce sont des milliers de bravos pour la nouvelle mise en scène magique, la nouvelle « comédie magicale  imaginée et mise en scène par l’excellent François Normag.Les nombreuses scènes et tableaux s'enchaînent sans aucun temps mort dans un rythme soutenu, tantôt drôle, tantôt émouvant..Mais toujours magique.Du personnage farfelu aux personnages poétiques, du délire au délicieusement magique, les séquences les plus improbables se succèdent, mais chut...comme des dizaines de milliers de spectateurs chaque année, il faut découvrir le nouveau spectacle de VIVE LA MAGIE, un spectacle qui ne ressemble en rien aux traditionnels galas de magie. Les Souchets sont allés parfois au bout du monde pour dénicher des artistes jamais vus en France.Et si au fil des années, ce festival est devenu le rendez-vous magique incontournable pour les familles, c’est que VIVE LA MAGIE aime à faire découvrir au public des artistes subtils et malicieux, représentants d'un art vivant totalement délivré de ses conventions. Ces magiciens aux multiples nationalités, représentent les différentes catégories de cet art totalement remis au goût du jour par les plus grands metteurs en scène. Comédiens, manipulateurs de l'imaginaire, enchanteurs de l'instant, humoristes magiciens, illusionnistes… Ces artistes sont très loin des clichés pour  Vivre la magie  en grand.VIVE LA MAGIE, c'est surtout l'assurance de découvrir un spectacle où le meilleur de l'art magique vous est présenté avec éclat.Les milliers de retours positifs sur la toile et sur les réseaux sociaux sont là pour le confirmer. Grâce à VIVE LA MAGIE, découvrez et vivez des émotions artistiques exceptionnelles ! Laissez-vous enchanter par la toute nouvelle création 2025 et ce tout nouveau spectacle avec à la clé plus de 10 artistes talentueux et singuliers. Venez rire, vibrer et vous émerveiller en duo, en famille ou entre amis.Un grand spectacle familial de 1h45, sans interruption, accessible à tous, à partir de 5 ans.IMPORTANT : VIVE LA MAGIE ce ne sont pas uniquement de grandes représentations prestigieuses, ce sont  aussi des ateliers pour les 7-10 ans pour apprendre l'art du mystère, sans oublier des spectacles dédiés aux 3-6 ans pour s'émerveiller à leur rythme et découvrir ses premières émotions artistiques avec ses parents et ses amis.",
    },
    {
      name: 'FESTIVAL INTERNATIONAL VIVE LA MAGIE',
      coordinates: ['-1.655827', '48.087651'],
      description:
        "Le festival magique de référence fête sa 17ème année et revient vous ensorceler ! Chaque année depuis 2008, Monique et Gérard Souchet, les concepteurs et producteurs de VIVE LA MAGIE, choisissent avec une minutie particulière les plus grands magiciens du monde.Chaque année ce sont des milliers de bravos pour la nouvelle mise en scène magique, la nouvelle « comédie magicale  imaginée et mise en scène par l’excellent François Normag.Les nombreuses scènes et tableaux s'enchaînent sans aucun temps mort dans un rythme soutenu, tantôt drôle, tantôt émouvant..Mais toujours magique.Du personnage farfelu aux personnages poétiques, du délire au délicieusement magique, les séquences les plus improbables se succèdent, mais chut...comme des dizaines de milliers de spectateurs chaque année, il faut découvrir le nouveau spectacle de VIVE LA MAGIE, un spectacle qui ne ressemble en rien aux traditionnels galas de magie. Les Souchets sont allés parfois au bout du monde pour dénicher des artistes jamais vus en France.Et si au fil des années, ce festival est devenu le rendez-vous magique incontournable pour les familles, c’est que VIVE LA MAGIE aime à faire découvrir au public des artistes subtils et malicieux, représentants d'un art vivant totalement délivré de ses conventions. Ces magiciens aux multiples nationalités, représentent les différentes catégories de cet art totalement remis au goût du jour par les plus grands metteurs en scène. Comédiens, manipulateurs de l'imaginaire, enchanteurs de l'instant, humoristes magiciens, illusionnistes… Ces artistes sont très loin des clichés pour  Vivre la magie  en grand.VIVE LA MAGIE, c'est surtout l'assurance de découvrir un spectacle où le meilleur de l'art magique vous est présenté avec éclat.Les milliers de retours positifs sur la toile et sur les réseaux sociaux sont là pour le confirmer. Grâce à VIVE LA MAGIE, découvrez et vivez des émotions artistiques exceptionnelles ! Laissez-vous enchanter par la toute nouvelle création 2025 et ce tout nouveau spectacle avec à la clé plus de 10 artistes talentueux et singuliers. Venez rire, vibrer et vous émerveiller en duo, en famille ou entre amis.Un grand spectacle familial de 1h45, sans interruption, accessible à tous, à partir de 5 ans.IMPORTANT : VIVE LA MAGIE ce ne sont pas uniquement de grandes représentations prestigieuses, ce sont  aussi des ateliers pour les 7-10 ans pour apprendre l'art du mystère, sans oublier des spectacles dédiés aux 3-6 ans pour s'émerveiller à leur rythme et découvrir ses premières émotions artistiques avec ses parents et ses amis.",
    },
    {
      name: 'PHILIPPE BAS & DAVID FELIX',
      coordinates: ['-1.636525', '48.114079'],
      description:
        'Qu’est ce que les événements TALENT de Boite en Scène ??A la manière d’un spectacle vivant, une série de soirées exceptionnelles mariant Parcours de vie, Invités VIP & Art de la scène?Dans des styles variés, hors cadre, hors norme, des invités d’honneur vous racontent leur histoire pour inspirer la vôtre ! ?Une première partie avec des talents locaux qui se mettent en scène pour la première fois.?Puis, des invités d’honneur se mettent en scène pour vous émouvoir, vous inspirer et vous faire rire.?Après le spectacle, un temps de photos et rencontres avec les invités d’honneur.26 SEPTEMBRE 2024 – SALLE DE SPECTACLE DU DIAPASON – RENNES – 20h00« De la passion à la réussite » avec Philippe BAS, acteur et David FELIX, champion du monde de karatéPlongez dans une soirée inoubliable et inspirante, « De la passion à la réussite », avec deux personnalités d’exception : David Félix, champion du monde de karaté, et Philippe Bas, acteur et comédien (Connu pour son rôle dans la série Profilage, entre autres). Pour la première fois à Rennes et sur scène, tous les deux vous partagent leurs parcours respectifs, leurs défis, leurs clés et leurs philosophies pour atteindre vos propres objectifs et révélez vos talents.Peu importe d’où l’on vient, il est toujours possible de viser les étoiles et de réaliser ses rêves !Préparez-vous à être surpris, émus, et à rire. Que vous soyez fans de séries télés, de cinéma ou de sport, rejoignez-nous !Une soirée TALENT par Boite en Scène David Félix, champion du monde de karaté et Philippe Bas, acteur',
    },
    {
      name: 'RVG',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'La connexion Melbourne-Rennes se porte bien, comme en témoigne cette soirée sous le signe du rock australien.RVG – pour Romy Vager Group, du nom de sa chanteuse-guitariste et frontwoman – rend en trois lettres un hommage à peine voilé au Patti Smith Group. Accompagnée par le guitariste Reuben Bloxham, le batteur Marc Nolte et la bassiste Isabele Wallace, Vager envoûte par sa captivante voix androgyne, soutenue par un rock parfois teinté de punk. Le tout sublimé par des textes intimes et teintés d’ironie, à l’image des morceaux du troisième album du quatuor, Brain Worms, qu’il viendra jouer en live sur la scène de l’Ubu.',
    },
    {
      name: '15 15',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'Des paysages sonores épiques, s’inspirant de mouvements underground façonnés par leur héritage tahitien : ainsi peut être décrit le langage musical hors norme de 15 15. Formé par deux Polynésiens de Tahiti (Tsi Min et Ennio) et trois Parisiens (Julia et les frères Marvin et Robin), le collectif s’appuie sur des influences musicales et vocales de l’Océan Pacifique, que viennent télescoper des cascades de sons produits par ordinateur ou tirés d’un instrumentarium traditionnel parfois modifié (flûtes, percussions, steelpans). Ancestrales et futuristes, les harmonies troublantes et oniriques de la musique de 15 15 semblent liées à une légende, une mythologie inconnue. Après leur passage aux Trans Musicales 2020 et 2022, c’est sur la scène de l’Ubu que les cinq de 15 15 viennent présenter leur dernier EP, Ataheva.',
    },
    {
      name: 'FUN! FUN! FUN!',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'FUN ! FUN ! FUN ! débarque dans la nuit rennaise, sourire aux lèvres, entre trance, house progressive et breaks rebondissants. Une parenthèse solaire à l’identité plurielle faisant le pont entre DJs rennais·es, breton·nes et figures plus installées de la scène électronique française. Un cocon festif, centré sur le respect des personnes, qui appartiendra aux amoureux·ses du dancefloor. Au programme de cette soirée, la Lyonnaise basée à Paris Desire, grande amatrice de sons évoquant le début des années 1990, trance mais aussi house progressive et acid house, et par ailleurs fondatrice de With Us (plateforme qui met en lumière des artistes queers à travers des interviews, des mixes et des soirées). Elle sera suivie par Célélé, qui jongle dans ses mixes avec tout ce qui fait la richesse de la bass music internationale et des styles basés sur des breakbeats. Et dès minuit, deux membres du collectif Comme Ça, Ninjaa & Kimona, uniront leurs forces autour d’un mix house et trance pour ouvrir les festivités de cette première FUN ! FUN ! FUN !',
    },
    {
      name: 'MUDDY MONK',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'Une âme jeune, et une voix angélique très haut perchée héritée des traditions vocales chrétiennes de Fribourg : il n’en faut pas plus pour décrire Muddy Monk. Depuis toujours, cet auteur-compositeur-interprète et claviériste suisse préfère l’improvisation et l’expérimentation à l’apprentissage classique. Un état d’esprit qui le conduit, aujourd’hui, à créer une forme de musique electro-pop synthétique, sublimée par un chant lyrique et romantique en français.',
    },
    {
      name: 'JORDAN MACKAMPA',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'Né au Congo, qu’il a quitté enfant pour grandir au Royaume-Uni, Jordan Mackampa est un chanteur et compositeur à l’origine d’une soul façonnée par des références héritées de sa mère. Le jeune Mackampa est en effet bercé par une écoute assidue de Curtis Mayfield, Whitney Houston, Diana Ross, Marvin Gaye… Des artistes dont l’œuvre résonne aujourd’hui dans ses propres compositions soul aux côtés d’autres influences, qu’elles soient à chercher du côté du R&B, du rap, du funk ou même du gospel (il cite tour à tour Brandy, Silk Sonic, Miguel, Janelle Monáe, Prince, Bobby Brown, Usher…). Dès son premier album Foreigner (2021), Jordan Mackampa évoque les difficultés qu’il rencontre en tant qu’immigré noir et queer, via des textes introspectifs et porteurs de ses émotions les plus intimes. L’amour, l’amitié et le pardon sont de nouveau au cœur de son second opus, Welcome Home, Kid!, grâce auquel Jordan Mackampa se reconnecte à son enfant intérieur. Un nouvel album tout en sensibilité, à découvrir à l’Ubu.',
    },
    {
      name: 'GETDOWN SERVICES   MONSTER FLORENCE',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'À première vue, on pourrait croire à un karaoké pendant un enterrement de vie de garçon... Mais en ouvrant son esprit, on ne peut que constater que Getdown Services est 500 fois plus que cela ! À l’origine du groupe : deux gars de Bristol, Josh Law et Ben Sadler, qui font de la musique chez eux, sur leurs ordinateurs. Des copains d’enfance qui, en provoquant la rencontre entre le post-punk de Sleaford Mods et le dance punk de LCD Soundsystem, engendrent une expérience musicale trempée de sueur et infusée d’un groove qui ne se prend pas au sérieux. En live, ils ont la réputation de livrer des performances anarchiques ponctuées d’interactions loufoques avec le public…Monster Florence est un groupe de hip hop anglais de Colchester composé de trois rappeurs/chanteurs et trois instrumentistes (basse, batterie, guitare et claviers). Dans leur troisième album Master System, ils affinent encore leur identité musicale où alternent beats hip hop lourds et titres sautillants nourris de grime. Avec – cerise sur la gâteau – un don pour les refrains dignes de tubes pop (comme sur le titre Borstal). Un groupe de hip hop singulier et rafraîchissant qui prend toute sa dimension sur scène, où une très large place est laissée aux instruments live.',
    },
    {
      name: 'HAPPY MONDAY : AUTOMOTION',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'Les Happy Monday, ce sont des concerts de découverte rock du lundi en début de soirée (19h-22h), où vous profitez d’un prix d’entrée accessible et d’une happy hour au bar avant 20h. Notre proposition pour faire le plein de rock et d’énergie en début de semaine !Automotion est un quatuor formé à Londres en 2020. En trois EPs et une poignée de singles, ces jeunes musiciens ont tracé leur sillon dans une esthétique post-rock où alternent passages calmes, où les textes sont autant parlés que chantés, et explosions lourdes et bruitistes, au milieu desquelles persistent toujours les mélodies des guitares. Leurs influences revendiquées vont de Robert Fripp et Steve Reich à Slint, et on perçoit dans certains titres leur goût pour le math rock avec des ruptures rythmiques inattendues. Une musique tout en nuance et en intensité pour une découverte à faire absolument en live.',
    },
    {
      name: 'CRYSTAL MURRAY',
      coordinates: ['-1.672912', '48.107713'],
      description:
        "Programmée aux Trans Musicales dès ses débuts (à 18 ans) lors de l’édition de 2020 qui a finalement dû être annulée, nous avons le plaisir d'accueillir enfin Crystal Murray, cette fois-ci dans la programmation de l’Ubu. Aujourd’hui, cette auteure-compositrice-interprète – fille d’une mère franco-espagnole et d’un célèbre jazzman afro-américain – a achevé sa mutation et elle est définitivement sortie de sa chrysalide. Si son projet a débuté dans un univers nu soul parfois teinté de jazz, de R&B et de house qui mettait particulièrement en valeur sa signature vocale unique, elle s’affirme désormais comme une artiste pop au sens large, ne s’interdisant aucun style – du rock à l’électro en passant par le hip hop – tout en conservant ses racines. C’est d’ailleurs en rappeuse au flow percutant qu’on la découvre sur le titre Payback (évoquant les débuts de M.I.A), premier single extrait de son premier album sorti cette année (Sad Lovers And Giants).",
    },
    {
      name: 'HAPPY MONDAY : THE SILVER LINES',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'The Silver Lines are back in town ! Après leur concert marquant au Parc Expo lors des dernières Trans Musicales, nous étions impatient·es de retrouver le gang de Birmingham dans le cadre d’un club rock incandescent comme l’Ubu. Pour mémoire, The Silver Lines est donc un quatuor de rock à guitares qui joue avec nos nerfs et nos émotions, alternant entre les titres punk misant tout sur l’énergie et la saturation (Cocaine) et les chansons aux mélodies pop imparables (Bound). Sur scène, ils ne se privent pas de mélanger les deux… Quand on n’arrive pas à choisir, autant tout prendre !',
    },
    {
      name: 'VOX LOW',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'À travers les eaux troubles du rock et des musiques électroniques, Vox Low apparaît comme prédicateur de l’anarchie, enfiévré par son fanatisme dévot envers Mark E. Smith (le leader de The Fall), et sa passion du désordre. Le son du quatuor parisien (à base de synthés, guitares, basse, batterie et percussions) invite à plonger dans une transe envoûtante, mélange d’electro-punk minimaliste et de post-disco sombre et hypnotique. Si le ton semble se durcir dans son deuxième album Keep On Falling (toujours chez Born Bad Records), Vox Low apparaît néanmoins à certains moments sous un jour plus pop et, étrangement, plus lumineux. Merci !',
    },
    {
      name: 'COSMO PYKE',
      coordinates: ['-1.672912', '48.107713'],
      description:
        'Auteur-compositeur et multi-instrumentiste, Cosmo Pyke est le fruit d’un monde multiculturel, qui transparaît dans ses morceaux. Entre blues, jazz et hip-hop, l’univers musical de cet artiste londonien d’origine jamaïcaine est porté par des textes forts, contant son quotidien et celui de celles et ceux nés dans les années 2000. Ancien étudiant de la Brit School for Performing Arts (l’école qui a formé Adele, Amy Winehouse ou encore Loyle Carner), Cosmo Pyke imprègnera bientôt l’Ubu de ses histoires captivantes, au groove irrésistible…',
    },
    {
      name: "LES FEMMES S'EN MÊLENT :MADAM CARRIEGOSS - LES FEMMES S'EN MÊLENT :",
      coordinates: ['-1.672912', '48.107713'],
      description:
        'Depuis 1997, le festival itinérant Les Femmes s’en Mêlent œuvre pour une plus grande visibilité des artistes femmes dans la musique. Nous sommes heureux·ses de collaborer à nouveau avec son équipe et d’accueillir un beau plateau à l’Ubu à l’occasion de son édition 2024.Héritiers de la hargne des Runaways ou de L7, traversés par le groove musclé de Queens Of The Stone Age, les brûlots des Toulousaines de Madam sont également portés par une guitare rageuse, une rythmique qui ne fait pas de prisonnier et un chant qui donne tout, jusqu’aux tripes. Depuis ses débuts et son passage lors des Trans Musicales 2018, le quatuor devenu trio a bien évolué : sa musique, plus rock que jamais, a acquis une dimension plus dansante, en faisant notamment entrer des rythmes dance punk et punk funk dans ses compositions. Comme sur leur dernier album Thanx For The Noise, à l’écoute duquel on comprend qu’elles veulent danser, nous faire danser mais qu’elles sont aussi toujours prêtes à en découdre !Avant cela, ce sera l’artiste rennaise Carriegoss – au chant, à la basse et au synthé – qui montera seule sur la scène de l’Ubu. Sous cet alias, elle compose des chansons électroniques, froides et dansantes mêlant new wave, synth-pop et synthwave. Un dancefloor en noir et blanc, avec quand même quelques touches de fluos…',
    },
    {
      name: 'USKY',
      coordinates: ['-1.676488', '48.105251'],
      description:
        "Usky, poète du rap français, imprègne le genre d'une poésie riche et mélancolique. Révéléau grand public par une série de mixtapes audacieuses, il a su se distinguer dans l'universdu rap avec son style unique. Son EP  Rétina , sorti le 25 mai 2023 sous l'égide dulégendaire label 92i de Booba, a marqué les esprits avec ses mélodies envoûtantes et sestextes introspectifs. Artiste au parcours singulier, Usky a forgé une signature musicale quitraverse le temps, loin des tendances éphémères.Natif du vibrant quartier d'Aligre à Paris, Usky a été bercé dès son plus jeune âge par lesrythmes du rap, porté par l'admiration de son père pour NTM et Booba.  Un homme passesa vie à compenser son enfance,  médite-t-il en évoquant ses racines. Cette quête dedépassement, de reconnaissance et d'ascension sociale a trouvé son exutoire dans le rap. Je suis né dans la rime , proclame-t-il, ses aspirations nourries par les valeurs d'ambition,de détermination et de patience inculquées par sa mère.Récemment, Usky a brillé sur  Ad Vitam Aeternam , le dernier opus de Booba, notammentavec le morceau poignant  Bénigni . Aujourd'hui, il s'apprête à investir la scène de la GaîtéLyrique le 24 mai 2024, pour un concert qui promet d'être un jalon dans sa carrière et unpont vers de nouveaux horizons musicaux. Venez vivre l'expérience Usky, là où la poésie etle rap se rencontrent, pour une soirée inoubliable",
    },
  ];
  activityType: ActivityType = 'enjoy';
  range: { start: Date; end: Date } = { start: new Date(), end: new Date() };
  activity: any[] = [
    {
      id: 'rZ7SnyZ1Ad-KGN',
      category: 'enjoy',
      name: 'SANGAM   SIÂN POTTOK',
      venue: 'CHAPITEAU - PARC DU THABOR',
      location: 'Rennes',
      genre: 'World',
      link: 'https://www.ticketmaster.fr/fr/manifestation/sangam-sian-pottok-billet/idmanif/589197/idtier/18864121',
      dateTime: '2024-10-02T18:30:00Z',
      latitude: '48.114614',
      longitude: '-1.673914',
      picture: 'https://s1.ticketm.net/dam/c/548/5fefbd1c-973b-4b0e-9b2e-d78e4ce37548_106111_RETINA_LANDSCAPE_16_9.jpg',
      priceRangeMin: 11.5,
      priceRangeMax: 21,
    },
    {
      id: 'rZ7SnyZ1Ad-Ko8',
      category: 'enjoy',
      name: 'LA DAME BLANCHE   FLEUVES',
      venue: 'CHAPITEAU - PARC DU THABOR',
      location: 'Rennes',
      genre: 'World',
      link: 'https://www.ticketmaster.fr/fr/manifestation/la-dame-blanche-fleuves-billet/idmanif/589237/idtier/18864121',
      dateTime: '2024-10-03T18:30:00Z',
      latitude: '48.114614',
      longitude: '-1.673914',
      picture: 'https://s1.ticketm.net/dam/c/548/5fefbd1c-973b-4b0e-9b2e-d78e4ce37548_106111_TABLET_LANDSCAPE_3_2.jpg',
      priceRangeMin: 11.5,
      priceRangeMax: 21,
    },
    {
      id: 'rZ7SnyZ1Ad-KuO',
      category: 'enjoy',
      name: "ACID ARAB   BAB L'BLUZ",
      venue: 'CHAPITEAU - PARC DU THABOR',
      location: 'Rennes',
      genre: 'World',
      link: 'https://www.ticketmaster.fr/fr/manifestation/acid-arab-bab-l-bluz-billet/idmanif/589207/idtier/18864121',
      extraLink: 'https://www.ticketmaster.com.mx/acid-arab-boletos/artist/2417163',
      dateTime: '2024-10-04T18:30:00Z',
      latitude: '48.114614',
      longitude: '-1.673914',
      picture: 'https://s1.ticketm.net/dam/a/d53/6a6230a3-8880-4094-b10a-813effaead53_941751_ARTIST_PAGE_3_2.jpg',
      priceRangeMin: 16,
      priceRangeMax: 30.2,
    },
    {
      id: 'rZ7SnyZ1Ad-KC9',
      category: 'enjoy',
      name: 'ËDA DIAZ   BARRUT & DIRIDOLLOU LAVIGNE',
      venue: 'CHAPITEAU - PARC DU THABOR',
      location: 'Rennes',
      genre: 'World',
      link: 'https://www.ticketmaster.fr/fr/manifestation/eda-diaz-barrut-diridollou-lavigne-billet/idmanif/589225/idtier/18864121',
      dateTime: '2024-10-05T18:30:00Z',
      latitude: '48.114614',
      longitude: '-1.673914',
      picture: 'https://s1.ticketm.net/dam/c/548/5fefbd1c-973b-4b0e-9b2e-d78e4ce37548_106111_TABLET_LANDSCAPE_3_2.jpg',
      priceRangeMin: 13.5,
      priceRangeMax: 25,
    },
    {
      id: 'rZ7SnyZ1Ad-KCd',
      category: 'enjoy',
      name: 'BAL TRAD',
      venue: 'CHAPITEAU - PARC DU THABOR',
      location: 'Rennes',
      genre: 'World',
      link: 'https://www.ticketmaster.fr/fr/manifestation/bal-trad-billet/idmanif/589211/idtier/18864121',
      dateTime: '2024-10-06T12:00:00Z',
      latitude: '48.114614',
      longitude: '-1.673914',
      picture: 'https://s1.ticketm.net/dam/c/548/5fefbd1c-973b-4b0e-9b2e-d78e4ce37548_106111_TABLET_LANDSCAPE_3_2.jpg',
      priceRangeMin: 10,
      priceRangeMax: 12,
    },
    {
      id: 'rZ7SnyZ1Ad-A87',
      category: 'enjoy',
      name: 'RVG',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'La connexion Melbourne-Rennes se porte bien, comme en témoigne cette soirée sous le signe du rock australien.RVG – pour Romy Vager Group, du nom de sa chanteuse-guitariste et frontwoman – rend en trois lettres un hommage à peine voilé au Patti Smith Group. Accompagnée par le guitariste Reuben Bloxham, le batteur Marc Nolte et la bassiste Isabele Wallace, Vager envoûte par sa captivante voix androgyne, soutenue par un rock parfois teinté de punk. Le tout sublimé par des textes intimes et teintés d’ironie, à l’image des morceaux du troisième album du quatuor, Brain Worms, qu’il viendra jouer en live sur la scène de l’Ubu.',
      genre: 'Rock',
      link: 'https://www.ticketmaster.fr/fr/manifestation/rvg-billet/idmanif/587591/idtier/18864121',
      extraLink: 'https://www.ticketmaster.co.nz/rvg-tickets/artist/2968305',
      dateTime: '2024-09-12T18:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture:
        'https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_TABLET_LANDSCAPE_LARGE_16_9.jpg',
      priceRangeMin: 16,
      priceRangeMax: 19,
    },
    {
      id: 'rZ7SnyZ1AdOPko',
      category: 'enjoy',
      name: '15 15',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'Des paysages sonores épiques, s’inspirant de mouvements underground façonnés par leur héritage tahitien : ainsi peut être décrit le langage musical hors norme de 15 15. Formé par deux Polynésiens de Tahiti (Tsi Min et Ennio) et trois Parisiens (Julia et les frères Marvin et Robin), le collectif s’appuie sur des influences musicales et vocales de l’Océan Pacifique, que viennent télescoper des cascades de sons produits par ordinateur ou tirés d’un instrumentarium traditionnel parfois modifié (flûtes, percussions, steelpans). Ancestrales et futuristes, les harmonies troublantes et oniriques de la musique de 15 15 semblent liées à une légende, une mythologie inconnue. Après leur passage aux Trans Musicales 2020 et 2022, c’est sur la scène de l’Ubu que les cinq de 15 15 viennent présenter leur dernier EP, Ataheva.',
      genre: 'World',
      link: 'https://www.ticketmaster.fr/fr/manifestation/15-15-billet/idmanif/583877/idtier/18864121',
      dateTime: '2024-09-27T18:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/c/548/5fefbd1c-973b-4b0e-9b2e-d78e4ce37548_106111_TABLET_LANDSCAPE_3_2.jpg',
      priceRangeMin: 16,
      priceRangeMax: 19,
    },
    {
      id: 'rZ7SnyZ1Adx6k8',
      category: 'enjoy',
      name: 'FUN! FUN! FUN!',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'FUN ! FUN ! FUN ! débarque dans la nuit rennaise, sourire aux lèvres, entre trance, house progressive et breaks rebondissants. Une parenthèse solaire à l’identité plurielle faisant le pont entre DJs rennais·es, breton·nes et figures plus installées de la scène électronique française. Un cocon festif, centré sur le respect des personnes, qui appartiendra aux amoureux·ses du dancefloor. Au programme de cette soirée, la Lyonnaise basée à Paris Desire, grande amatrice de sons évoquant le début des années 1990, trance mais aussi house progressive et acid house, et par ailleurs fondatrice de With Us (plateforme qui met en lumière des artistes queers à travers des interviews, des mixes et des soirées). Elle sera suivie par Célélé, qui jongle dans ses mixes avec tout ce qui fait la richesse de la bass music internationale et des styles basés sur des breakbeats. Et dès minuit, deux membres du collectif Comme Ça, Ninjaa & Kimona, uniront leurs forces autour d’un mix house et trance pour ouvrir les festivités de cette première FUN ! FUN ! FUN !',
      genre: 'Dance/Electronic',
      link: 'https://www.ticketmaster.fr/fr/manifestation/fun-fun-fun-billet/idmanif/598499/idtier/18864121',
      dateTime: '2024-09-27T22:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/c/df8/81eadad8-4449-412e-a2b1-3d8bbb78edf8_106181_RECOMENDATION_16_9.jpg',
      priceRangeMin: 12,
      priceRangeMax: 15,
    },
    {
      id: 'rZ7SnyZ1AdOPka',
      category: 'enjoy',
      name: 'MUDDY MONK',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'Une âme jeune, et une voix angélique très haut perchée héritée des traditions vocales chrétiennes de Fribourg : il n’en faut pas plus pour décrire Muddy Monk. Depuis toujours, cet auteur-compositeur-interprète et claviériste suisse préfère l’improvisation et l’expérimentation à l’apprentissage classique. Un état d’esprit qui le conduit, aujourd’hui, à créer une forme de musique electro-pop synthétique, sublimée par un chant lyrique et romantique en français.',
      genre: 'Rock',
      link: 'https://www.ticketmaster.fr/fr/manifestation/muddy-monk-billet/idmanif/583874/idtier/18864121',
      extraLink: 'https://www.ticketmaster.com/muddy-monk-tickets/artist/3143972',
      dateTime: '2024-10-09T18:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/c/4f2/0109888a-61b5-4525-8432-b026ef04f4f2_105631_RETINA_PORTRAIT_3_2.jpg',
      priceRangeMin: 18,
      priceRangeMax: 21,
    },
    {
      id: 'rZ7SnyZ1AdrZA-',
      category: 'enjoy',
      name: 'JORDAN MACKAMPA',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'Né au Congo, qu’il a quitté enfant pour grandir au Royaume-Uni, Jordan Mackampa est un chanteur et compositeur à l’origine d’une soul façonnée par des références héritées de sa mère. Le jeune Mackampa est en effet bercé par une écoute assidue de Curtis Mayfield, Whitney Houston, Diana Ross, Marvin Gaye… Des artistes dont l’œuvre résonne aujourd’hui dans ses propres compositions soul aux côtés d’autres influences, qu’elles soient à chercher du côté du R&B, du rap, du funk ou même du gospel (il cite tour à tour Brandy, Silk Sonic, Miguel, Janelle Monáe, Prince, Bobby Brown, Usher…). Dès son premier album Foreigner (2021), Jordan Mackampa évoque les difficultés qu’il rencontre en tant qu’immigré noir et queer, via des textes introspectifs et porteurs de ses émotions les plus intimes. L’amour, l’amitié et le pardon sont de nouveau au cœur de son second opus, Welcome Home, Kid!, grâce auquel Jordan Mackampa se reconnecte à son enfant intérieur. Un nouvel album tout en sensibilité, à découvrir à l’Ubu.',
      genre: 'R&B',
      link: 'https://www.ticketmaster.fr/fr/manifestation/jordan-mackampa-billet/idmanif/577401/idtier/18864121',
      extraLink: 'https://www.ticketmaster.co.uk/jordan-mackampa-tickets/artist/5216532',
      dateTime: '2024-10-13T15:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/a/561/6896d49d-e442-46d0-bf0f-ddce8f90d561_1382881_TABLET_LANDSCAPE_3_2.jpg',
      priceRangeMin: 14,
      priceRangeMax: 17,
    },
    {
      id: 'rZ7SnyZ1Ad-xjI',
      category: 'enjoy',
      name: 'GETDOWN SERVICES   MONSTER FLORENCE',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'À première vue, on pourrait croire à un karaoké pendant un enterrement de vie de garçon... Mais en ouvrant son esprit, on ne peut que constater que Getdown Services est 500 fois plus que cela ! À l’origine du groupe : deux gars de Bristol, Josh Law et Ben Sadler, qui font de la musique chez eux, sur leurs ordinateurs. Des copains d’enfance qui, en provoquant la rencontre entre le post-punk de Sleaford Mods et le dance punk de LCD Soundsystem, engendrent une expérience musicale trempée de sueur et infusée d’un groove qui ne se prend pas au sérieux. En live, ils ont la réputation de livrer des performances anarchiques ponctuées d’interactions loufoques avec le public…Monster Florence est un groupe de hip hop anglais de Colchester composé de trois rappeurs/chanteurs et trois instrumentistes (basse, batterie, guitare et claviers). Dans leur troisième album Master System, ils affinent encore leur identité musicale où alternent beats hip hop lourds et titres sautillants nourris de grime. Avec – cerise sur la gâteau – un don pour les refrains dignes de tubes pop (comme sur le titre Borstal). Un groupe de hip hop singulier et rafraîchissant qui prend toute sa dimension sur scène, où une très large place est laissée aux instruments live.',
      genre: 'Hip-Hop/Rap',
      link: 'https://www.ticketmaster.fr/fr/manifestation/getdown-services-monster-florence-billet/idmanif/591846/idtier/18864121',
      extraLink: 'https://www.ticketmaster.co.nz/getdown-services-tickets/artist/3136222',
      dateTime: '2024-10-19T19:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture:
        'https://s1.ticketm.net/dam/c/797/5e693c26-2881-4776-8f0c-3aa94bfa3797_106511_EVENT_DETAIL_PAGE_16_9.jpg',
      priceRangeMin: 16,
      priceRangeMax: 19,
    },
    {
      id: 'rZ7SnyZ1Ad-f8k',
      category: 'enjoy',
      name: 'HAPPY MONDAY : AUTOMOTION',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'Les Happy Monday, ce sont des concerts de découverte rock du lundi en début de soirée (19h-22h), où vous profitez d’un prix d’entrée accessible et d’une happy hour au bar avant 20h. Notre proposition pour faire le plein de rock et d’énergie en début de semaine !Automotion est un quatuor formé à Londres en 2020. En trois EPs et une poignée de singles, ces jeunes musiciens ont tracé leur sillon dans une esthétique post-rock où alternent passages calmes, où les textes sont autant parlés que chantés, et explosions lourdes et bruitistes, au milieu desquelles persistent toujours les mélodies des guitares. Leurs influences revendiquées vont de Robert Fripp et Steve Reich à Slint, et on perçoit dans certains titres leur goût pour le math rock avec des ruptures rythmiques inattendues. Une musique tout en nuance et en intensité pour une découverte à faire absolument en live.',
      genre: 'Rock',
      link: 'https://www.ticketmaster.fr/fr/manifestation/happy-monday-automotion-billet/idmanif/589361/idtier/18864121',
      extraLink: 'https://www.ticketmaster.com/automotion-tickets/artist/3083450',
      dateTime: '2024-10-21T17:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/c/797/5e693c26-2881-4776-8f0c-3aa94bfa3797_106511_TABLET_LANDSCAPE_3_2.jpg',
      priceRangeMin: 11,
      priceRangeMax: 14,
    },
    {
      id: 'rZ7SnyZ1Ad-Ov-',
      category: 'enjoy',
      name: 'CRYSTAL MURRAY',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        "Programmée aux Trans Musicales dès ses débuts (à 18 ans) lors de l’édition de 2020 qui a finalement dû être annulée, nous avons le plaisir d'accueillir enfin Crystal Murray, cette fois-ci dans la programmation de l’Ubu. Aujourd’hui, cette auteure-compositrice-interprète – fille d’une mère franco-espagnole et d’un célèbre jazzman afro-américain – a achevé sa mutation et elle est définitivement sortie de sa chrysalide. Si son projet a débuté dans un univers nu soul parfois teinté de jazz, de R&B et de house qui mettait particulièrement en valeur sa signature vocale unique, elle s’affirme désormais comme une artiste pop au sens large, ne s’interdisant aucun style – du rock à l’électro en passant par le hip hop – tout en conservant ses racines. C’est d’ailleurs en rappeuse au flow percutant qu’on la découvre sur le titre Payback (évoquant les débuts de M.I.A), premier single extrait de son premier album sorti cette année (Sad Lovers And Giants).",
      genre: 'Rock',
      link: 'https://www.ticketmaster.fr/fr/manifestation/crystal-murray-billet/idmanif/591201/idtier/18864121',
      extraLink: 'https://www.ticketmaster.com.au/crystal-murray-tickets/artist/2772732',
      dateTime: '2024-10-30T19:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture:
        'https://s1.ticketm.net/dam/c/48b/2352e3b5-8496-496b-97a3-e605177e848b_105851_TABLET_LANDSCAPE_LARGE_16_9.jpg',
      priceRangeMin: 18,
      priceRangeMax: 21,
    },
    {
      id: 'rZ7SnyZ1Ad-fAM',
      category: 'enjoy',
      name: 'HAPPY MONDAY : THE SILVER LINES',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'The Silver Lines are back in town ! Après leur concert marquant au Parc Expo lors des dernières Trans Musicales, nous étions impatient·es de retrouver le gang de Birmingham dans le cadre d’un club rock incandescent comme l’Ubu. Pour mémoire, The Silver Lines est donc un quatuor de rock à guitares qui joue avec nos nerfs et nos émotions, alternant entre les titres punk misant tout sur l’énergie et la saturation (Cocaine) et les chansons aux mélodies pop imparables (Bound). Sur scène, ils ne se privent pas de mélanger les deux… Quand on n’arrive pas à choisir, autant tout prendre !',
      genre: 'Rock',
      link: 'https://www.ticketmaster.fr/fr/manifestation/happy-monday-the-silver-lines-billet/idmanif/589350/idtier/18864121',
      dateTime: '2024-11-04T18:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_ARTIST_PAGE_3_2.jpg',
      priceRangeMin: 12,
      priceRangeMax: 15,
    },
    {
      id: 'rZ7SnyZ1Ad-f8a',
      category: 'enjoy',
      name: 'VOX LOW',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'À travers les eaux troubles du rock et des musiques électroniques, Vox Low apparaît comme prédicateur de l’anarchie, enfiévré par son fanatisme dévot envers Mark E. Smith (le leader de The Fall), et sa passion du désordre. Le son du quatuor parisien (à base de synthés, guitares, basse, batterie et percussions) invite à plonger dans une transe envoûtante, mélange d’electro-punk minimaliste et de post-disco sombre et hypnotique. Si le ton semble se durcir dans son deuxième album Keep On Falling (toujours chez Born Bad Records), Vox Low apparaît néanmoins à certains moments sous un jour plus pop et, étrangement, plus lumineux. Merci !',
      genre: 'Dance/Electronic',
      link: 'https://www.ticketmaster.fr/fr/manifestation/vox-low-billet/idmanif/589362/idtier/18864121',
      dateTime: '2024-11-15T19:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/c/df8/81eadad8-4449-412e-a2b1-3d8bbb78edf8_106181_RECOMENDATION_16_9.jpg',
      priceRangeMin: 16,
      priceRangeMax: 19,
    },
    {
      id: 'rZ7SnyZ1Adr_f7',
      category: 'enjoy',
      name: 'COSMO PYKE',
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'Auteur-compositeur et multi-instrumentiste, Cosmo Pyke est le fruit d’un monde multiculturel, qui transparaît dans ses morceaux. Entre blues, jazz et hip-hop, l’univers musical de cet artiste londonien d’origine jamaïcaine est porté par des textes forts, contant son quotidien et celui de celles et ceux nés dans les années 2000. Ancien étudiant de la Brit School for Performing Arts (l’école qui a formé Adele, Amy Winehouse ou encore Loyle Carner), Cosmo Pyke imprègnera bientôt l’Ubu de ses histoires captivantes, au groove irrésistible…',
      genre: 'Rock',
      link: 'https://www.ticketmaster.fr/fr/manifestation/cosmo-pyke-billet/idmanif/580188/idtier/18864121',
      extraLink: 'https://www.ticketmaster.com.mx/cosmo-pyke-boletos/artist/2324933',
      dateTime: '2024-11-18T18:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/a/a44/84eb1956-f6bd-4feb-be4b-366d4cca0a44_262411_CUSTOM.jpg',
      priceRangeMin: 14,
      priceRangeMax: 17,
    },
    {
      id: 'rZ7SnyZ1Ad-OZ0',
      category: 'enjoy',
      name: "LES FEMMES S'EN MÊLENT :MADAM CARRIEGOSS - LES FEMMES S'EN MÊLENT :",
      venue: 'Ubu Club',
      location: 'Rennes',
      description:
        'Depuis 1997, le festival itinérant Les Femmes s’en Mêlent œuvre pour une plus grande visibilité des artistes femmes dans la musique. Nous sommes heureux·ses de collaborer à nouveau avec son équipe et d’accueillir un beau plateau à l’Ubu à l’occasion de son édition 2024.Héritiers de la hargne des Runaways ou de L7, traversés par le groove musclé de Queens Of The Stone Age, les brûlots des Toulousaines de Madam sont également portés par une guitare rageuse, une rythmique qui ne fait pas de prisonnier et un chant qui donne tout, jusqu’aux tripes. Depuis ses débuts et son passage lors des Trans Musicales 2018, le quatuor devenu trio a bien évolué : sa musique, plus rock que jamais, a acquis une dimension plus dansante, en faisant notamment entrer des rythmes dance punk et punk funk dans ses compositions. Comme sur leur dernier album Thanx For The Noise, à l’écoute duquel on comprend qu’elles veulent danser, nous faire danser mais qu’elles sont aussi toujours prêtes à en découdre !Avant cela, ce sera l’artiste rennaise Carriegoss – au chant, à la basse et au synthé – qui montera seule sur la scène de l’Ubu. Sous cet alias, elle compose des chansons électroniques, froides et dansantes mêlant new wave, synth-pop et synthwave. Un dancefloor en noir et blanc, avec quand même quelques touches de fluos…',
      genre: 'Rock',
      link: 'https://www.ticketmaster.fr/fr/manifestation/les-femmes-s-en-melent-madamcarriegoss-billet/idmanif/591181/idtier/18864121',
      dateTime: '2024-11-21T19:00:00Z',
      latitude: '48.107713',
      longitude: '-1.672912',
      picture: 'https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_ARTIST_PAGE_3_2.jpg',
      priceRangeMin: 14,
      priceRangeMax: 17,
    },
    {
      id: 'rZ7SnyZ1Ad-NGp',
      category: 'enjoy',
      name: "TOUTE L'HISTOIRE DE LA PEINTURE - HECTOR OBALK TOUTE L'HISTOIRE DE LA PEINTURE",
      venue: 'COUVENT DES JACOBINS - AUDITORIUM',
      location: 'Rennes',
      description:
        'Hector Obalk fait un stand up en musique et en images sur l’histoire de la peinture occidentales accompagné de ses musiciens et d’un écran géant projetant des détails époustouflants.Spectacle complet, visuellement sophistiqué, musical et drolissime, d’un expert original, passionné et pédagogue.Pour tout public, de 9 a 99 ans.Sur la trame d’un  mur de 1000 images chaque show propose de visiter toute l’histoire de la peinture de Giotto a Picasso et au-delà. LE MONDEL’excellent Hector Obalk nous explique en musique les chefs d’œuvre de l’art… C’est très très drole et c’est très très richeTELERAMACeux qui n’y connaissent rien comprendront tout, et les spécialistes seront étonnés d’y apprendre des choses',
      genre: 'Theatre',
      link: 'https://www.ticketmaster.fr/fr/manifestation/toute-l-histoire-de-la-peinture-billet/idmanif/592080/idtier/18864121',
      dateTime: '2025-04-27T13:00:00Z',
      latitude: '48.11459',
      longitude: '-1.680861',
      picture:
        'https://s1.ticketm.net/dam/c/07d/fda8c807-42eb-4b81-9f16-f3a8367e107d_106371_TABLET_LANDSCAPE_LARGE_16_9.jpg',
      priceRangeMin: 37,
      priceRangeMax: 57,
    },
    {
      id: 'rZ7SnyZ1Ad-0Cv',
      category: 'enjoy',
      name: 'PHILIPPE BAS & DAVID FELIX',
      venue: 'LE DIAPASON',
      location: 'Rennes Cedex',
      description:
        'Qu’est ce que les événements TALENT de Boite en Scène ??A la manière d’un spectacle vivant, une série de soirées exceptionnelles mariant Parcours de vie, Invités VIP & Art de la scène?Dans des styles variés, hors cadre, hors norme, des invités d’honneur vous racontent leur histoire pour inspirer la vôtre ! ?Une première partie avec des talents locaux qui se mettent en scène pour la première fois.?Puis, des invités d’honneur se mettent en scène pour vous émouvoir, vous inspirer et vous faire rire.?Après le spectacle, un temps de photos et rencontres avec les invités d’honneur.26 SEPTEMBRE 2024 – SALLE DE SPECTACLE DU DIAPASON – RENNES – 20h00« De la passion à la réussite » avec Philippe BAS, acteur et David FELIX, champion du monde de karatéPlongez dans une soirée inoubliable et inspirante, « De la passion à la réussite », avec deux personnalités d’exception : David Félix, champion du monde de karaté, et Philippe Bas, acteur et comédien (Connu pour son rôle dans la série Profilage, entre autres). Pour la première fois à Rennes et sur scène, tous les deux vous partagent leurs parcours respectifs, leurs défis, leurs clés et leurs philosophies pour atteindre vos propres objectifs et révélez vos talents.Peu importe d’où l’on vient, il est toujours possible de viser les étoiles et de réaliser ses rêves !Préparez-vous à être surpris, émus, et à rire. Que vous soyez fans de séries télés, de cinéma ou de sport, rejoignez-nous !Une soirée TALENT par Boite en Scène David Félix, champion du monde de karaté et Philippe Bas, acteur',
      genre: 'Theatre',
      link: 'https://www.ticketmaster.fr/fr/manifestation/philippe-bas-david-felix-billet/idmanif/592425/idtier/18864121',
      dateTime: '2024-09-26T18:00:00Z',
      latitude: '48.114079',
      longitude: '-1.636525',
      picture:
        'https://s1.ticketm.net/dam/c/07d/fda8c807-42eb-4b81-9f16-f3a8367e107d_106371_TABLET_LANDSCAPE_LARGE_16_9.jpg',
      priceRangeMin: 29,
      priceRangeMax: 35,
    },
    {
      id: 'rZ7SnyZ1AdqSrf',
      category: 'enjoy',
      name: 'ALAIN SOUCHON',
      venue: 'LE LIBERTE - RENNES',
      location: 'Rennes',
      description:
        "Il y a un peu plus de 4 ans, Alain Souchon publiait un nouvel album acclamé par la critique, me fifties, fruit d'une étroite collaboration avec ses deux fils. S'en est suivi une tournée triomphale de plus de 100 dates.Cette année, Alain Souchon repartira pour une nouvelle tournée accompagnée de Ours et de Pierre Souchon. C'est tous les trois sur scène qu'ils s'apprêtent à revisiter le répertoire d'Alain Souchon, entre titres incontournables, perles rares et quelques surprises.",
      genre: 'Chanson Francaise',
      link: 'https://www.ticketmaster.fr/fr/manifestation/alain-souchon-billet/idmanif/575904/idtier/18864121',
      extraLink: 'https://www.ticketmaster.com/alain-souchon-tickets/artist/1950343',
      dateTime: '2024-09-21T18:00:00Z',
      latitude: '48.105831',
      longitude: '-1.676262',
      picture:
        'https://s1.ticketm.net/dam/c/0d2/1201f713-3288-4790-854a-ae42895450d2_105931_EVENT_DETAIL_PAGE_16_9.jpg',
      priceRangeMin: 39,
      priceRangeMax: 69,
    },
  ];
  activityTest: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  selectedDeparture(event: any) {
    this.depart = event as [lat: number, lon: number];
    this.searchTrip();
  }
  selectedDestination(event: any) {
    this.arrive = event as [lat: number, lon: number];
    this.searchTrip();
  }
  clearDeparture() {
    this.depart = null;
    this.trip = null;
    this.points = [];
  }
  clearDestination() {
    console.log('clearDestination');
    console.log('arrive: ', JSON.stringify(this.arrive));
    console.log('depart: ', JSON.stringify(this.depart));
    console.log('trip: ', JSON.stringify(this.trip));
    console.log('points: ', JSON.stringify(this.points));

    this.arrive = null;
    this.trip = null;
    this.points = [];
  }

  async searchTrip() {
    console.log('searchTrip');
    if (this.depart && this.arrive) {
      try {
        this.trip = await ApiMapbox.getTrip(this.depart, this.arrive);
        console.log('trip: ', this.trip);
        this.cdr.detectChanges();
      } catch (error: any) {
        console.error('Error: ', error);
      }
    }
  }

  setPoints(event: any) {
    // this.center = event;
    console.log('event places of interest?: ', JSON.stringify(event));
    const points = event.map((feature: DrinkDto) => {
      return {
        name: feature.name,
        coordinates: [feature.longitude, feature.latitude],
        description: feature.description,
      };
    });
    this.points = points;
  }

  logAll() {
    console.log('depart: ', this.depart);
    console.log('arrive: ', this.arrive);
    console.log('trip: ', this.trip);

    if (this.activityTest.length === 0) {
      this.activityTest = this.activity;
    } else {
      this.activityTest = [];
    }
  }

  updateCenter(event: any) {
    this.center = event.center;
    this.distance = event.distance;
  }

  async getDrinkRetrieve() {
    try {
      const data = await ApiDrink.getDrink(
        this.center.lat,
        this.center.lng,
        new Date().toISOString().split('T')[0].replace(/,/g, ''),
        new Date().toISOString().split('T')[0].replace(/,/g, ''),
        this.distance,
      );
      console.log('data: ', data);
      const points = data.map((feature: DrinkDto) => {
        return {
          name: feature.name,
          coordinates: [feature.longitude, feature.latitude],
          description: feature.description,
        };
      });
      this.points = points;
    } catch (error: any) {
      console.error('Error: ', error);
    }
  }

  searchDrink() {
    this.getDrinkRetrieve();
  }

  setRange(event: any) {
    this.range = event;
  }

  setType(event: string) {
    console.log('event: ', event);
    this.activityType = event as ActivityType;
  }
}
