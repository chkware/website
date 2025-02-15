import Layout from "@/components/Layout";
import Image from "next/image";

export default function HomePage() {
  return (
    <Layout>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
          {/* Left Side: Short Details */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider mb-4">Powerful Low-Code API Testing</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Simplify Your API Testing and Automation
            </h1>
            <p className="text-lg mb-8">
              Build, test, and automate APIs effortlessly with CHKwired.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#quickstart" className="bg-blue-500 text-white py-3 px-8 rounded-sm text-lg font-semibold">
                Get Started
              </a>
              <a href="#features" className="border-2 border-black text-black py-3 px-8 rounded-md text-lg font-semibold">
                Learn More
              </a>
            </div>
          </div>
          {/* Right Side: Hero Image */}
          <div className="md:w-1/2">
            <div className="relative w-full h-96 md:h-[600px] lg:h-[600px]">
              <Image src="/images/hero-image.svg" alt="Hero Image" layout="fill" objectFit="contain" className="" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-800">Powerful & Low-Code API Testing</h2>
          <p className="mt-4 text-lg text-gray-600">
            CHKwired simplifies API testing and automation with easy-to-write YAML configurations, cross-platform support, and reusable test cases.
          </p>
          <div className="mt-10 flex flex-nowrap justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
              <Image src="/images/feature-icons.png" alt="Feature 1" width={64} height={64} />
              <h3 className="text-2xl font-semibold text-gray-800 mt-4">Scriptable HTTP client</h3>
              <p className="text-gray-600 mt-2">Easily manage API testing and authentication workflows.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
              <Image src="/images/feature-icons.png" alt="Feature 2" width={64} height={64} />
              <h3 className="text-2xl font-semibold text-gray-800 mt-4">JSON Validator</h3>
              <p className="text-gray-600 mt-2">Ensure JSON structures match expected schemas effortlessly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
              <Image src="/images/feature-icons.png" alt="Feature 3" width={64} height={64} />
              <h3 className="text-2xl font-semibold text-gray-800 mt-4">Automate Workflows</h3>
              <p className="text-gray-600 mt-2">Build low-code API automations with simple workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-800">Integrate with Your Favorite Tools</h2>
          <p className="mt-4 text-lg text-gray-600">
            Connect your APIs with top integrations like Slack, Jira, Google Drive, and more.
          </p>
          <div className="mt-8">
            <Image src="/images/integration-logos.png" alt="Integrations" width={800} height={400} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Final Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-800">More Features to Power Your API Testing</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/4">
              <h3 className="text-2xl font-semibold text-gray-800">Low-Code API Testing</h3>
              <p className="text-gray-600 mt-2">Quickly create and test APIs with minimal coding.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/4">
              <h3 className="text-2xl font-semibold text-gray-800">Reusable Configurations</h3>
              <p className="text-gray-600 mt-2">Save time with modular test configurations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/4">
              <h3 className="text-2xl font-semibold text-gray-800">Cross-Platform Support</h3>
              <p className="text-gray-600 mt-2">Runs seamlessly across Windows, macOS, and Linux.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/4">
              <h3 className="text-2xl font-semibold text-gray-800">API Test Automation</h3>
              <p className="text-gray-600 mt-2">Automate API tests with CI/CD pipelines.</p>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
