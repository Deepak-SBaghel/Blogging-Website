import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
// used to extract values from the store
import { useNavigate } from "react-router-dom";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // this is nnavigation bar
  // it have all the btn , items ,
  // loop through it
  // easier to add btn
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            {/* use to prop to add logo */}
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                // only on the html items which are repeating we have to add keys
                // A “key” is a special string attribute you need to include when creating lists of elements in React. Keys are used in React to identify which items in the list are changed, updated, or deleted.

                // Keys are used to give an identity to the elements in the lists. It is recommended to use a string as a key that uniquely identifies the items in the list.

                <li key={item.name}>
                  {/* navigate uses  a link  
                      gives the url to on lcick*/}
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* only if authStatus is true , it will show the after element */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
