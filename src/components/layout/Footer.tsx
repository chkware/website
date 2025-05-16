import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container max-w-[1200] mx-auto text-center">
        <p>© 2025 Your Company. All rights reserved. Design and developed by &nbsp;
          <Link
            href="https://mindscraft.net/"
            target="_blank"
            className="link text-lime-100 hover:text-lime-300 transition-colors">MindsCraft</Link>
        </p>
      </div>
    </footer>
  );
}
