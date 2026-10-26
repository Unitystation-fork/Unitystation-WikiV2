import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {useDocsSidebar} from '@docusaurus/theme-common/internal';

// Tableau des métiers construit à partir du menu de gauche (issue #84) :
// mêmes catégories, même ordre, mêmes pages, dans la langue de la page.
// Une page ajoutée dans un dossier de docs/3_HowToPlay/Jobs/ y apparaît toute seule.
// La catégorie Jobs a pour lien sa page d'index, docs/3_HowToPlay/Jobs/Jobs.md
// (/HowToPlay/Jobs/, précédé de /fr, /ru ou /de selon la langue).
const JOBS_PATH = '/HowToPlay/Jobs';

function docLinks(items) {
  return items.filter((item) => item.type === 'link');
}

function findJobsCategory(items) {
  for (const item of items) {
    if (item.type !== 'category') continue;
    if (item.href && item.href.replace(/\/$/, '').endsWith(JOBS_PATH)) return item;
    const found = findJobsCategory(item.items);
    if (found) return found;
  }
  return null;
}

function CategoryLabel({category}) {
  return category.href ? <Link to={category.href}>{category.label}</Link> : category.label;
}

function LinkList({links}) {
  return links.map((link, i) => (
    <React.Fragment key={link.href}>
      {i > 0 && ', '}
      <Link to={link.href}>{link.label}</Link>
    </React.Fragment>
  ));
}

// Une sous-catégorie (ex. Centcom dans Protagonist) : son nom en gras, puis ses pages.
function SubCategory({category}) {
  const subs = category.items.filter((item) => item.type === 'category');
  return (
    <>
      <strong>
        <CategoryLabel category={category} />
      </strong>
      {': '}
      <LinkList links={docLinks(category.items)} />
      {subs.map((sub) => (
        <React.Fragment key={sub.label}>
          {' · '}
          <SubCategory category={sub} />
        </React.Fragment>
      ))}
    </>
  );
}

function RolesCell({category}) {
  const links = docLinks(category.items);
  const subs = category.items.filter((item) => item.type === 'category');
  const parts = [];
  if (links.length > 0) parts.push(<LinkList key="links" links={links} />);
  subs.forEach((sub) => parts.push(<SubCategory key={sub.label} category={sub} />));
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </React.Fragment>
  ));
}

export default function JobsMenu() {
  const sidebar = useDocsSidebar();
  if (!sidebar) return null;
  const jobs = findJobsCategory(sidebar.items);
  if (!jobs) {
    // Faire échouer le build plutôt que retirer le tableau de toutes les pages sans prévenir.
    throw new Error(`JobsMenu : catégorie ${JOBS_PATH}/ introuvable dans le menu`);
  }
  const departments = jobs.items.filter((item) => item.type === 'category');
  return (
    <table className="jobs-menu">
      <thead>
        <tr>
          <th>
            <Translate id="jobsMenu.department" description="Jobs table: department column header">
              Department
            </Translate>
          </th>
          <th>
            <Translate id="jobsMenu.roles" description="Jobs table: roles column header">
              Roles
            </Translate>
          </th>
        </tr>
      </thead>
      <tbody>
        {departments.map((department) => (
          <tr key={department.label}>
            <td>
              <CategoryLabel category={department} />
            </td>
            <td>
              <RolesCell category={department} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
