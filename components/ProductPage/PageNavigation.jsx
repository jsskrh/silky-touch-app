import Link from "next/link";

const style = {
  navbar: `py-4 text-xs hidden md:flex capitalize items-center`,
  divider: `px-2`,
};

const PageNavigation = ({ path }) => {
  const paths = path
    .split("/")
    .slice(1)
    .reduce(
      (allPaths, subPath) => {
        const lastPath = allPaths[allPaths.length - 1];
        allPaths.push(
          lastPath.endsWith("/") ? lastPath + subPath : `${lastPath}/${subPath}`
        );
        return allPaths;
      },
      ["/"]
    );

  return (
    <div className={style.navbar}>
      {paths.map((path, index) => (
        <div key={index}>
          {index !== 0 && <span className={style.divider}>|</span>}
          <Link href={path}>
            <span>
              {path.substring(path.lastIndexOf("/") + 1) === ""
                ? "Home"
                : path.substring(path.lastIndexOf("/") + 1).replace(/-/g, " ")}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PageNavigation;
