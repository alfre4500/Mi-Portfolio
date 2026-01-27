import dayjs from "dayjs";

import { navIcons, navLinks } from "#constants";

const NavBar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Alfredo Portfolio</p>
        <ul>
          {navLinks.map(({ id,name }) => (
            <li key={id}>
                <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
            {navIcons.map(({id , img }) =>(
                <li key={id} >
                    <img src={img}  className="icon-hover" alt={`icon-${id}`}  />
                </li>
            ))}
        </ul>
        <time>{dayjs().format("DD/MM/YYYY h:mm ")}</time>
      </div>
    </nav>
  );
};

export default NavBar;
