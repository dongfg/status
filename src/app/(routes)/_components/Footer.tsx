import Image from "next/image";

/**
 * 页脚
 */
export default function Footer() {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content hidden md:block">
      <aside className="items-center grid-flow-col">
        <p>Copyright © all right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="#" target="_blank">
          <Image
            src="/logo-fg.png"
            alt="fg logo"
            className="dark:invert"
            height={24}
            width={24}
            priority
          />
        </a>
        <a href="#" target="_blank">
          <Image
            src="/logo-dr.png"
            alt="dr logo"
            className="dark:invert"
            height={24}
            width={24}
            priority
          />
        </a>
      </nav>
    </footer>
  );
}
