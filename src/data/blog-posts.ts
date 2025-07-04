export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: string[];
  readingTime: string;
}

export const authors: Record<string, Author> = {
  johnDoe: {
    name: "John Doe",
    avatar: "/images/authors/john-doe.jpg",
    role: "Lead Developer"
  },
  janeDoe: {
    name: "Jane Doe",
    avatar: "/images/authors/jane-doe.jpg",
    role: "API Specialist"
  },
  bobSmith: {
    name: "Bob Smith",
    avatar: "/images/authors/bob-smith.jpg",
    role: "QA Engineer"
  }
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with CHKware for API Testing",
    slug: "getting-started-with-chkware",
    excerpt: "Learn how to set up CHKware and create your first API test in minutes. This guide covers installation, configuration, and basic usage.",
    content: `
# Getting Started with CHKware for API Testing

CHKware is a powerful tool for API testing that allows you to create, run, and manage API tests with ease. In this guide, we'll walk through the process of setting up CHKware and creating your first API test.

## Installation

To install CHKware, you can use npm:

\`\`\`bash
npm install -g chkware
\`\`\`

Or using yarn:

\`\`\`bash
yarn global add chkware
\`\`\`

## Configuration

After installation, you'll need to create a configuration file. Create a file named \`chkware.config.yaml\` in your project root:

\`\`\`yaml
version: 1.0
environment:
  base_url: https://api.example.com
  headers:
    Content-Type: application/json
\`\`\`

## Creating Your First Test

Now, let's create a simple test. Create a file named \`first-test.chk\`:

\`\`\`yaml
---
version: default:http:0.7.2

request:
  url: "/users"
  method: GET

validate:
  status: 200
  json:
    type: array
    minItems: 1
\`\`\`

## Running the Test

To run your test, use the following command:

\`\`\`bash
chk run first-test.chk
\`\`\`

You should see output indicating whether the test passed or failed.

## Next Steps

Now that you've created your first test, you can explore more advanced features:

- Authentication
- Environment variables
- Test suites
- CI/CD integration

Check out our documentation for more detailed information on these topics.
    `,
    coverImage: "/images/blog/api-testing.jpg",
    date: "2025-06-15",
    author: authors.johnDoe,
    tags: ["Getting Started", "API Testing", "Tutorial"],
    readingTime: "5 min read"
  },
  {
    id: "2",
    title: "Advanced API Validation Techniques",
    slug: "advanced-api-validation-techniques",
    excerpt: "Take your API testing to the next level with advanced validation techniques. Learn how to validate complex JSON structures, use schemas, and more.",
    content: `
# Advanced API Validation Techniques

When testing APIs, simple status code validation is often not enough. In this article, we'll explore advanced validation techniques that will help you create more robust and reliable API tests.

## JSON Schema Validation

One of the most powerful validation techniques is using JSON Schema. CHKware supports JSON Schema validation out of the box:

\`\`\`yaml
validate:
  json:
    $schema: http://json-schema.org/draft-07/schema#
    type: object
    required:
      - id
      - name
      - email
    properties:
      id:
        type: integer
      name:
        type: string
      email:
        type: string
        format: email
\`\`\`

## Response Time Validation

You can also validate the response time to ensure your API is performing well:

\`\`\`yaml
validate:
  responseTime: 
    lessThan: 500  # milliseconds
\`\`\`

## Custom JavaScript Validation

For complex validation logic, you can use custom JavaScript:

\`\`\`yaml
validate:
  custom: |
    const response = JSON.parse(context.response.body);
    if (response.data.length === 0) {
      throw new Error("Expected non-empty data array");
    }
    if (!response.pagination.hasNextPage && response.pagination.page < 10) {
      throw new Error("Pagination logic error");
    }
\`\`\`

## Conditional Validation

Sometimes you need to validate different things based on the response:

\`\`\`yaml
validate:
  status: 200
  conditions:
    - if: "response.body.status === 'active'"
      then:
        json:
          properties:
            activeSince:
              type: string
              format: date-time
    - if: "response.body.status === 'pending'"
      then:
        json:
          properties:
            pendingReason:
              type: string
\`\`\`

## Conclusion

By using these advanced validation techniques, you can create more comprehensive API tests that catch subtle issues before they reach production. Remember that the goal of API testing is not just to verify that the API works, but to ensure it works correctly under all conditions.
    `,
    coverImage: "/images/blog/validation.jpg",
    date: "2025-06-22",
    author: authors.janeDoe,
    tags: ["API Testing", "Validation", "Advanced"],
    readingTime: "8 min read"
  },
  {
    id: "3",
    title: "Integrating CHKware with CI/CD Pipelines",
    slug: "integrating-chkware-with-cicd-pipelines",
    excerpt: "Learn how to integrate CHKware with popular CI/CD platforms like GitHub Actions, GitLab CI, and Jenkins for automated API testing.",
    content: `
# Integrating CHKware with CI/CD Pipelines

Automating your API tests as part of your CI/CD pipeline is essential for maintaining API quality. In this guide, we'll show you how to integrate CHKware with popular CI/CD platforms.

## GitHub Actions

To integrate with GitHub Actions, create a workflow file at \`.github/workflows/api-tests.yml\`:

\`\`\`yaml
name: API Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install CHKware
        run: npm install -g chkware
      - name: Run API Tests
        run: chk run tests/ --reporter github
\`\`\`

## GitLab CI

For GitLab CI, create a \`.gitlab-ci.yml\` file:

\`\`\`yaml
stages:
  - test

api_tests:
  stage: test
  image: node:16
  script:
    - npm install -g chkware
    - chk run tests/ --reporter gitlab
\`\`\`

## Jenkins

For Jenkins, you can create a Jenkinsfile:

\`\`\`groovy
pipeline {
    agent {
        docker {
            image 'node:16'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm install -g chkware'
                sh 'chk run tests/ --reporter jenkins'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'chkware-report.xml', fingerprint: true
            junit 'chkware-report.xml'
        }
    }
}
\`\`\`

## CircleCI

For CircleCI, create a \`.circleci/config.yml\` file:

\`\`\`yaml
version: 2.1
jobs:
  test:
    docker:
      - image: cimg/node:16.13
    steps:
      - checkout
      - run:
          name: Install CHKware
          command: npm install -g chkware
      - run:
          name: Run API Tests
          command: chk run tests/ --reporter circle
      - store_artifacts:
          path: ./chkware-report.json

workflows:
  version: 2
  build_and_test:
    jobs:
      - test
\`\`\`

## Best Practices

When integrating CHKware with CI/CD pipelines, consider these best practices:

1. **Environment Management**: Use environment-specific configuration files for different environments (dev, staging, prod).
2. **Parallelization**: For large test suites, run tests in parallel to speed up the pipeline.
3. **Reporting**: Use the appropriate reporter for your CI/CD platform to get nicely formatted test results.
4. **Artifacts**: Store test reports as artifacts for later analysis.
5. **Notifications**: Configure notifications for test failures.

By following these guidelines, you can create a robust API testing pipeline that catches issues early in the development process.
    `,
    coverImage: "/images/blog/cicd.jpg",
    date: "2025-06-29",
    author: authors.bobSmith,
    tags: ["CI/CD", "DevOps", "Automation"],
    readingTime: "10 min read"
  },
  {
    id: "4",
    title: "Creating Reusable Test Components with CHKware",
    slug: "creating-reusable-test-components",
    excerpt: "Learn how to create reusable test components to improve maintainability and reduce duplication in your API test suite.",
    content: `
# Creating Reusable Test Components with CHKware

As your API test suite grows, you'll likely find yourself repeating similar test patterns. CHKware provides several ways to create reusable components that can help keep your tests DRY (Don't Repeat Yourself).

## Using Includes

The simplest way to reuse code is with includes:

\`\`\`yaml
# common-headers.yaml
headers:
  Content-Type: application/json
  Authorization: Bearer <% env.API_TOKEN %>
\`\`\`

\`\`\`yaml
# user-test.chk
---
version: default:http:0.7.2

request:
  url: "/users"
  method: GET
  include: ./common-headers.yaml

validate:
  status: 200
\`\`\`

## Creating Test Libraries

For more complex reuse, you can create test libraries:

\`\`\`yaml
# auth-lib.yaml
functions:
  login:
    request:
      url: "/auth/login"
      method: POST
      json:
        username: <% args.username %>
        password: <% args.password %>
    expose:
      token: <% response.body.token %>
\`\`\`

\`\`\`yaml
# user-test.chk
---
version: default:http:0.7.2

imports:
  auth: ./auth-lib.yaml

steps:
  - name: Login
    call: auth.login
    args:
      username: "testuser"
      password: "password123"
  
  - name: Get User Profile
    request:
      url: "/users/profile"
      method: GET
      headers:
        Authorization: Bearer <% steps.Login.token %>
\`\`\`

## Template Variables

You can also use template variables for reuse:

\`\`\`yaml
variables:
  baseUserPayload: |
    {
      "name": "<% args.name %>",
      "email": "<% args.email %>",
      "role": "user"
    }

steps:
  - name: Create User
    request:
      url: "/users"
      method: POST
      body: <% variables.baseUserPayload | args: { name: "John Doe", email: "john@example.com" } %>
\`\`\`

## Workflows

For complex test scenarios, use workflows:

\`\`\`yaml
# user-workflow.chk
---
version: default:workflow:0.8.0

tasks:
  - name: Create User
    uses: fetch
    file: ./create-user.chk
    variables:
      name: "John Doe"
      email: "john@example.com"

  - name: Get User
    uses: fetch
    file: ./get-user.chk
    variables:
      userId: <% _steps.0._response.body.id %>

  - name: Update User
    uses: fetch
    file: ./update-user.chk
    variables:
      userId: <% _steps.0._response.body.id %>
      name: "John Updated"
\`\`\`

## Benefits of Reusable Components

Creating reusable components offers several benefits:

1. **Reduced Duplication**: Write common code once and reuse it across tests.
2. **Improved Maintainability**: When APIs change, you only need to update code in one place.
3. **Better Organization**: Break complex tests into manageable, logical components.
4. **Easier Collaboration**: Team members can work on different components independently.

By leveraging these reusability features, you can create a more maintainable and scalable test suite that grows with your API.
    `,
    coverImage: "/images/blog/reusable-components.jpg",
    date: "2025-07-05",
    author: authors.johnDoe,
    tags: ["Best Practices", "Maintainability", "Advanced"],
    readingTime: "7 min read"
  },
  {
    id: "5",
    title: "Performance Testing APIs with CHKware",
    slug: "performance-testing-apis",
    excerpt: "Discover how to use CHKware for performance testing your APIs. Learn about load testing, stress testing, and analyzing performance metrics.",
    content: `
# Performance Testing APIs with CHKware

While CHKware is primarily designed for functional API testing, it also provides capabilities for basic performance testing. In this article, we'll explore how to use CHKware to evaluate the performance of your APIs.

## Load Testing Basics

Load testing involves sending multiple requests to your API to simulate real-world usage. With CHKware, you can use the \`--concurrency\` flag:

\`\`\`bash
chk run api-test.chk --iterations 100 --concurrency 10
\`\`\`

This command runs your test 100 times with 10 concurrent users.

## Creating a Performance Test Suite

For more comprehensive performance testing, create a dedicated test suite:

\`\`\`yaml
# performance-suite.chk
---
version: default:suite:0.6.0

config:
  baseUrl: https://api.example.com
  iterations: 1000
  concurrency: 20
  rampUp: 10s
  coolDown: 5s

tests:
  - name: Get Users
    file: ./get-users.chk
  - name: Create User
    file: ./create-user.chk
    weight: 5  # This test will be run 5x more frequently
  - name: Update User
    file: ./update-user.chk
  - name: Delete User
    file: ./delete-user.chk
\`\`\`

## Analyzing Performance Metrics

CHKware collects various performance metrics:

\`\`\`bash
chk run performance-suite.chk --reporter performance
\`\`\`

This generates a report with metrics like:

- Response time (min, max, average, percentiles)
- Throughput (requests per second)
- Error rate
- CPU and memory usage

## Visualizing Results

For better visualization, you can export the results to formats compatible with visualization tools:

\`\`\`bash
chk run performance-suite.chk --reporter json --output results.json
\`\`\`

Then use tools like Grafana or custom dashboards to visualize the data.

## Performance Testing Best Practices

When performance testing APIs with CHKware, follow these best practices:

1. **Test in Isolation**: Ensure no other processes are affecting the system under test.
2. **Start Small**: Begin with low concurrency and gradually increase.
3. **Monitor Resources**: Watch CPU, memory, and network usage during tests.
4. **Test Regularly**: Run performance tests as part of your CI/CD pipeline.
5. **Compare Results**: Track performance metrics over time to identify regressions.

## Limitations

While CHKware is useful for basic performance testing, it's not a replacement for dedicated performance testing tools like JMeter or Gatling for very high-load scenarios. Consider using CHKware for:

- Regular performance regression testing
- Basic load testing during development
- Initial performance evaluation

For enterprise-grade performance testing with complex scenarios and very high loads, consider complementing CHKware with specialized tools.

## Conclusion

Performance testing is a crucial aspect of API quality assurance. By incorporating performance tests into your CHKware test suite, you can catch performance issues early and ensure your APIs meet performance requirements.
    `,
    coverImage: "/images/blog/performance.jpg",
    date: "2025-07-12",
    author: authors.janeDoe,
    tags: ["Performance", "Load Testing", "Metrics"],
    readingTime: "9 min read"
  },
  {
    id: "6",
    title: "Securing Your API Tests with CHKware",
    slug: "securing-api-tests",
    excerpt: "Learn best practices for handling sensitive data in your API tests, including authentication tokens, passwords, and personal information.",
    content: `
# Securing Your API Tests with CHKware

Security is a critical concern when testing APIs, especially when tests involve authentication, sensitive data, or production environments. In this guide, we'll explore best practices for keeping your API tests secure with CHKware.

## Handling Sensitive Data

Never hardcode sensitive information in your test files. Instead, use environment variables:

\`\`\`yaml
request:
  url: "/login"
  method: POST
  json:
    username: <% env.TEST_USERNAME %>
    password: <% env.TEST_PASSWORD %>
\`\`\`

Then provide these values at runtime:

\`\`\`bash
export TEST_USERNAME=testuser
export TEST_PASSWORD=securepassword
chk run login-test.chk
\`\`\`

## Using Credential Files

For local development, you can use credential files that are excluded from version control:

\`\`\`yaml
# credentials.yaml (add to .gitignore)
variables:
  api_key: "abc123xyz789"
  client_secret: "verysecretvalue"
\`\`\`

\`\`\`yaml
# api-test.chk
---
version: default:http:0.7.2

imports:
  creds: ./credentials.yaml

request:
  url: "/protected-resource"
  method: GET
  headers:
    Authorization: Bearer <% creds.variables.api_key %>
\`\`\`

## Masking Sensitive Data in Logs

Configure CHKware to mask sensitive data in logs:

\`\`\`yaml
# chkware.config.yaml
security:
  maskInLogs:
    - "password"
    - "token"
    - "secret"
    - "key"
    - "authorization"
\`\`\`

## Secure Storage of Tokens

For tests that obtain tokens, store them securely:

\`\`\`yaml
steps:
  - name: Login
    request:
      url: "/login"
      method: POST
      json:
        username: <% env.TEST_USERNAME %>
        password: <% env.TEST_PASSWORD %>
    expose:
      token: <% response.body.token %>
    security:
      maskExposed: true  # Masks the token in logs
\`\`\`

## CI/CD Security

When running tests in CI/CD pipelines, use the platform's secret management:

- GitHub Actions: Use secrets in your workflow file
- GitLab CI: Use CI/CD variables
- Jenkins: Use credentials binding

Example for GitHub Actions:

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run API Tests
        run: chk run tests/
        env:
          TEST_USERNAME: \${{ secrets.TEST_USERNAME }}
          TEST_PASSWORD: \${{ secrets.TEST_PASSWORD }}
          API_KEY: \${{ secrets.API_KEY }}
\`\`\`

## Testing Security Endpoints

When testing security-related endpoints, include negative tests:

\`\`\`yaml
suite:
  - name: Valid Login
    request:
      url: "/login"
      method: POST
      json:
        username: <% env.TEST_USERNAME %>
        password: <% env.TEST_PASSWORD %>
    validate:
      status: 200
      
  - name: Invalid Password
    request:
      url: "/login"
      method: POST
      json:
        username: <% env.TEST_USERNAME %>
        password: "wrongpassword"
    validate:
      status: 401
      
  - name: Rate Limiting
    request:
      url: "/login"
      method: POST
      repeat: 10
      json:
        username: "nonexistent"
        password: "wrongpassword"
    validate:
      status: 429  # Too Many Requests
\`\`\`

## Conclusion

Securing your API tests is essential for protecting sensitive data and ensuring that your tests themselves don't introduce security vulnerabilities. By following these best practices, you can create secure, robust API tests with CHKware that can be safely run in any environment.
    `,
    coverImage: "/images/blog/security.jpg",
    date: "2025-07-19",
    author: authors.bobSmith,
    tags: ["Security", "Best Practices", "Authentication"],
    readingTime: "6 min read"
  }
];
