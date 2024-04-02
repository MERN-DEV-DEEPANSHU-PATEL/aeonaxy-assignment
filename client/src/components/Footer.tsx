import Logo from "@/assets/Logo";
import { FC } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

interface FooterItem {
  heading: string;
  items: { text: string; link: string }[];
}

const Footer: FC = () => {
  const footerItems: FooterItem[] = [
    {
      heading: "For designers",
      items: [
        { text: "Go Pro!", link: "/go-pro" },
        { text: "Explore design work", link: "/explore" },
        { text: "Design blog", link: "/design-blog" },
        { text: "Overtime podcast", link: "/overtime-podcast" },
        { text: "Playoffs", link: "/playoffs" },
        { text: "Weekly Warm-Up", link: "/weekly-warm-up" },
        { text: "Refer a Friend", link: "/refer-a-friend" },
        { text: "Code of conduct", link: "/code-of-conduct" },
      ],
    },
    {
      heading: "Hire designers",
      items: [
        { text: "Post a job opening", link: "/post-a-job" },
        { text: "Post a freelance project", link: "/post-a-freelance-project" },
        { text: "Search for designers", link: "/search-for-designers" },
        { text: "Brands", link: "/brands" },
        { text: "Advertise with us", link: "/advertise-with-us" },
      ],
    },
    {
      heading: "Company",
      items: [
        { text: "About", link: "/about" },
        { text: "Careers", link: "/careers" },
        { text: "Support", link: "/support" },
        { text: "Media kit", link: "/media-kit" },
        { text: "Testimonials", link: "/testimonials" },
        { text: "API", link: "/api" },
      ],
    },
    {
      heading: "Directories",
      items: [
        { text: "Design jobs", link: "/Design-jobs" },
        { text: "Designers for hire", link: "/" },
        { text: "Freelance designers for hire", link: "/" },
        { text: "Tags", link: "/" },
        { text: "Places", link: "/" },
      ],
    },
    {
      heading: "Design Resources",
      items: [
        { text: "Freelancer", link: "/Design-jobs" },
        { text: "Design Portfolio", link: "/" },
        { text: "Design Education", link: "/" },
        { text: "Creative Process", link: "/" },
        { text: "Design Industry Trends", link: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        <div className="mx-auto">
          <Logo className="text-pink-600 mb-4 w-28" />
          <p className="mb-4">
            Dribbble is the world's leading community for creatives to share,
            grow, and get hired.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/dribbble"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-400 hover:text-white" />
            </a>
            <a
              href="https://www.facebook.com/dribbble"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-gray-400 hover:text-white" />
            </a>
            <a
              href="https://www.instagram.com/dribbble"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-gray-400 hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/company/dribbble"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
        {footerItems.map((item, index) => (
          <div className="ml-5 sm:ml-0 " key={index}>
            <h3 className="font-bold mb-4">{item.heading}</h3>
            <ul className="space-y-2 flex flex-wrap gap-5 items-center  sm:block">
              {item.items.map((listItem, listItemIndex) => (
                <li key={listItemIndex}>
                  <a
                    href={listItem.link}
                    className="text-gray-400 hover:text-white"
                  >
                    {listItem.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
