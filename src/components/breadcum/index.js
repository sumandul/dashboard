import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const convertBreadcrumb = string => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        const parts = path.split("?");
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className="breadcrumb flex ">
        <li className=' uppercase text-zapp-black text-[1rem] font-normal'>
          <Link href="/">business</Link><span className="mx-1">/</span>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          console.log(breadcrumb.breadcrumb,'suman')
          return (
            <li key={breadcrumb.href}>
              <Link href={breadcrumb.href}>
          
                  {convertBreadcrumb(breadcrumb.breadcrumb).split("?")[0]}
                
              </Link>
              {i !== breadcrumbs.length - 1 && <span className="mx-1">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;