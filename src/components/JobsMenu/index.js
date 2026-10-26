import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {useDocsSidebar} from '@docusaurus/theme-common/internal';

// Tableau des métiers construit à partir du menu de gauche (issue #84) :
// mêmes catégories, même ordre, mêmes pages, dans la langue de la page.
// Une page ajoutée dans un dossier de docs/3_HowToPlay/Jobs/ y apparaît toute seule.
const JOBS_PREFIX = 'HowToPlay/Jobs/';

function docLinks(items) {
  return items.filter((item) => item.type === 'link');
}

function allDocIds(items) {
  return items.flatMap((item) => {
    if (item.type === 'link') return item.docId ? [item.docId] : [null];
    if (item.type === 'category') return allDocIds(item.items);
    return [];
  });
}

// La catégorie « Jobs » : la plus haute dont toutes les pages sont sous HowToPlay/Jobs/.
function findJobsCategory(items) {
  for (const item of items) {
    if (item.type !== 'category') continue;
    const ids = allDocIds(item.items);
    if (ids.length > 0 && ids.every((id) => id && id.startsWith(JOBS_PREFIX))) {
      return item;
    }
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
      {' : '}
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
  const jobs = sidebar && findJobsCategory(sidebar.items);
  if (!jobs) return null;
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
