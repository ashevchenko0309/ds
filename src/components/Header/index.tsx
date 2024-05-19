import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "~/components/uiKit/ui/button.tsx";

const navLinks = [
  {
    label: "Dashboards",
    path: "/dashboard/1",
  },
  {
    label: "Connections",
    path: "/connections",
  },
  {
    label: "Charts",
    path: "/charts",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center w-full px-10 border-b border-[#F0F0F0]">
      <div className="relative flex w-full">
        <div className="mr-32 font-semibold text-[20px] py-5">Logo</div>
        <ul className="flex items-center gap-12 text-[14px]">
          {navLinks.map(({ label, path }) => {
            const isRouteSame = location.pathname === path;
            return (
              <li className="cursor-pointer py-5">
                <Button
                  className={`font-normal after:absolute after:bottom-0 after:content-[''] after:h-[1px] after:w-20 ${isRouteSame ? "after:bg-black" : `after:bg-transparent`}`}
                  onClick={() => navigate(path)}
                  variant="link"
                >
                  {label}
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Header;
