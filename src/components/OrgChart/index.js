import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {useDocsSidebar} from '@docusaurus/theme-common/internal';

// Organigramme de la chaîne de commandement (issue #374), affiché sur la page des métiers.
// Chaque case est une page du menu de gauche : libellé et lien viennent du menu, donc
// déjà dans la langue de la page. Un docId absent du menu fait échouer le build.
// Entrée = docId (sans préfixe numérique) ou {id, children, dotted}.
const J = 'HowToPlay/Jobs/';

const CAPTAIN = `${J}Command_roles/Captain`;
const AI = `${J}Synthetic_roles/Station-AI`;

const HEADS = [
  {
    id: `${J}Command_roles/Head-of-Personnel`,
    grow: 3.6, // largeur relative de la colonne (grand écran) : 3 sous-colonnes
    columns: [
      [{id: `${J}Cargo_roles/Quartermaster`, children: [`${J}Cargo_roles/Cargo-Technician`, `${J}Cargo_roles/Shaft-Miner`]}],
      [`${J}Service_roles/Botanist`, `${J}Service_roles/Cook`, `${J}Service_roles/Bartender`, `${J}Service_roles/Janitor`],
      [
        `${J}Entertainment_Roles/Chaplain`,
        `${J}Entertainment_Roles/Curator`,
        `${J}Entertainment_Roles/Clown`,
        `${J}Entertainment_Roles/Mime`,
        `${J}Service_roles/Assistant`,
      ],
    ],
  },
  {
    id: `${J}Security_roles/Head-of-Security`,
    grow: 1.4, // sous-subordonnés imbriqués : colonne plus large
    columns: [
      [
        {id: `${J}Security_roles/Warden`, children: [`${J}Security_roles/Detective`, `${J}Security_roles/Security-Officer`]},
        {id: `${J}Security_roles/Lawyer`, dotted: true},
      ],
    ],
  },
  {
    id: `${J}Medical_roles/Chief-Medical-Officer`,
    columns: [
      [
        `${J}Medical_roles/Medical-Doctor`,
        `${J}Medical_roles/Chemist`,
        `${J}Medical_roles/Paramedic`,
        `${J}Medical_roles/Psychologist`,
        `${J}Medical_roles/Virologist`,
      ],
    ],
  },
  {
    id: `${J}Science_roles/Research-Director`,
    grow: 1.25, // « Директор по исследованиям » : le mot le plus long tient à 1280 px
    // La fiche complète du généticien est dans Medical_roles ; celle de Science_roles n'est qu'un renvoi.
    columns: [[`${J}Science_roles/Scientist`, `${J}Science_roles/Roboticist`, `${J}Medical_roles/Geneticist`]],
  },
  {
    id: `${J}Engineering_roles/Chief-Engineer`,
    grow: 1.15, // « Атмосферный-Техник » ne doit pas être coupé avant le trait d'union
    columns: [[`${J}Engineering_roles/Engineer`, `${J}Engineering_roles/Atmospherics-Technician`]],
  },
];

// docId (sans préfixe numérique) -> {label, href}, d'après le menu de gauche.
function collectDocs(items, map = new Map()) {
  for (const item of items) {
    if (item.type === 'link' && item.docId) {
      map.set(item.docId.replace(/(^|\/)\d+_/g, '$1'), item);
    } else if (item.type === 'category') {
      collectDocs(item.items, map);
    }
  }
  return map;
}

// data-org-id / data-org-parent : docId de la case et de son chef (vide pour le Capitaine et l'IA), lus par le test e2e.
function Box({id, parent = '', doc}) {
  return (
    <Link className="org-box" to={doc.href} data-org-id={id} data-org-parent={parent}>
      {doc.label}
    </Link>
  );
}

function Entry({entry, parent, docs}) {
  const {id, children, dotted} = typeof entry === 'string' ? {id: entry} : entry;
  return (
    <li className={dotted ? 'org-dotted' : undefined}>
      <Box id={id} parent={parent} doc={docs.get(id)} />
      {children && (
        <ul className="org-col">
          {children.map((child) => (
            <Entry key={typeof child === 'string' ? child : child.id} entry={child} parent={id} docs={docs} />
          ))}
        </ul>
      )}
    </li>
  );
}

function walkIds(entry, out) {
  if (typeof entry === 'string') return out.push(entry);
  out.push(entry.id);
  (entry.children || []).forEach((c) => walkIds(c, out));
}

export default function OrgChart() {
  const sidebar = useDocsSidebar();
  if (!sidebar) return null;
  const docs = collectDocs(sidebar.items);
  const ids = [CAPTAIN, AI];
  HEADS.forEach((head) => {
    ids.push(head.id);
    head.columns.forEach((column) => column.forEach((entry) => walkIds(entry, ids)));
  });
  const missing = ids.filter((id) => !docs.has(id));
  if (missing.length > 0) {
    // Faire échouer le build plutôt que laisser une case vide ou retirer l'organigramme sans prévenir.
    throw new Error(`OrgChart : docId introuvable dans le menu : ${missing.join(', ')}`);
  }
  return (
    <figure className="org-chart" aria-labelledby="org-chart-title">
      <figcaption id="org-chart-title">
        <Translate id="orgChart.title" description="Jobs page: title of the chain of command chart">
          Chain of command
        </Translate>
      </figcaption>
      <ul className="org-top">
        <li>
          <Box id={CAPTAIN} doc={docs.get(CAPTAIN)} />
        </li>
      </ul>
      <ul className="org-heads">
        {HEADS.map((head) => (
          <li key={head.id} className="org-head" style={{'--org-grow': head.grow || 1}}>
            <Box id={head.id} parent={CAPTAIN} doc={docs.get(head.id)} />
            <div className="org-cols">
              {head.columns.map((column, i) => (
                <ul key={i} className="org-col">
                  {column.map((entry) => (
                    <Entry key={typeof entry === 'string' ? entry : entry.id} entry={entry} parent={head.id} docs={docs} />
                  ))}
                </ul>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <ul className="org-aside">
        <li>
          <Box id={AI} doc={docs.get(AI)} />
        </li>
      </ul>
    </figure>
  );
}
